# -*- coding: utf-8 -*-
"""
Extract real UTV market data from the Excel pivot file.
Builds value.json, volume.json, and segmentation_analysis.json
with proper geography hierarchy.
"""
import openpyxl
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

YEARS = [str(y) for y in range(2021, 2034)]
EXCEL_FILE = 'Pivot-ASEAN and MEA Utility Terrain Vehicles (UTVs) Market.xlsx'

# Geography hierarchy definition
GEO_HIERARCHY = {
    'ASEAN and MEA': ['ASEAN', 'Middle East & Africa'],
    'ASEAN': ['Thailand', 'Vietnam', 'Cambodia', 'Laos', 'Myanmar',
              'Indonesia', 'Malaysia', 'Philippines', 'Singapore', 'Brunei'],
    'Middle East & Africa': ['GCC', 'Turkey', 'South Africa', 'Rest of Middle East & Africa'],
    'GCC': ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Oman', 'Bahrain']
}

# Map Excel region names to our JSON geo names
REGION_MAP = {
    'ASEAN & Middle East & Africa': 'ASEAN and MEA',
    'Middle East & Africa': 'MEA',
    'Rest of Middle East & Africa': 'Rest of MEA',
    'UAE': 'United Arab Emirates (UAE)'
}

def read_master_sheet(sheet_type='Value'):
    """Read the Master Sheet and extract structured data."""
    wb = openpyxl.load_workbook(EXCEL_FILE, data_only=True)
    ws = wb['Master Sheet']

    # Find where Value and Volume sections start
    # Value marker: row with col2="Value" or col1="Value"
    # Volume marker: row with col1="Volume"
    value_start = None
    volume_start = None
    for row_idx in range(1, ws.max_row + 1):
        a = ws.cell(row=row_idx, column=1).value
        b = ws.cell(row=row_idx, column=2).value
        if b == 'Value':
            value_start = row_idx + 2  # Skip header row
        if a == 'Volume' and b is None:
            volume_start = row_idx + 2  # Skip header row

    if value_start is None:
        print("ERROR: Could not find Value section in Master Sheet")
        return None, None

    print(f"Value section starts at row {value_start}")
    if volume_start:
        print(f"Volume section starts at row {volume_start}")

    def extract_section(start_row, end_row):
        """Extract data from a section of the Master Sheet."""
        data = {}  # region -> segment_type -> sub_segment -> sub_segment_1 -> {year: value}

        for row_idx in range(start_row, end_row):
            region = ws.cell(row=row_idx, column=1).value
            segment = ws.cell(row=row_idx, column=2).value
            sub_segment = ws.cell(row=row_idx, column=3).value
            sub_segment_1 = ws.cell(row=row_idx, column=4).value

            if not region or not segment:
                continue

            region = str(region).strip()
            segment = str(segment).strip()

            # Skip header rows
            if region == 'Region' or segment == 'Segment':
                continue

            # Map region names
            mapped_region = REGION_MAP.get(region, region)

            sub_segment = str(sub_segment).strip() if sub_segment else None
            sub_segment_1 = str(sub_segment_1).strip() if sub_segment_1 else None

            # Read year values (cols 5-17 = 2021-2033)
            year_data = {}
            for i, year in enumerate(YEARS):
                val = ws.cell(row=row_idx, column=5 + i).value
                if isinstance(val, (int, float)):
                    year_data[year] = val

            if not year_data:
                continue

            if mapped_region not in data:
                data[mapped_region] = {}
            if segment not in data[mapped_region]:
                data[mapped_region][segment] = {}

            # Handle hierarchical segments
            if sub_segment and sub_segment_1 and sub_segment != sub_segment_1:
                # Hierarchical: e.g., ICE UTVs > Gasoline
                if sub_segment not in data[mapped_region][segment]:
                    data[mapped_region][segment][sub_segment] = {}
                data[mapped_region][segment][sub_segment][sub_segment_1] = year_data
            elif sub_segment:
                # Flat or self-referencing
                seg_name = sub_segment
                if sub_segment_1 and sub_segment_1 != sub_segment:
                    seg_name = sub_segment_1
                data[mapped_region][segment][seg_name] = year_data

        return data

    # Determine section boundaries
    value_end = volume_start if volume_start else ws.max_row + 1
    value_data = extract_section(value_start, value_end)

    volume_data = None
    if volume_start:
        volume_data = extract_section(volume_start, ws.max_row + 1)

    return value_data, volume_data


def build_json_with_hierarchy(raw_data):
    """Build the JSON structure with By Region for geography hierarchy."""
    result = {}

    # Include ALL geos from raw data, not just top-level ones
    # This ensures every geography (countries, sub-regions) has chart data
    for geo, geo_data in raw_data.items():
        result[geo] = {}

        # Copy all segment types except "By Country" (replaced by "By Region" in hierarchy)
        for seg_type, segments in geo_data.items():
            if seg_type == 'By Country':
                continue  # User requested removal — regions moved up to geo level
            if seg_type == 'By Region':
                continue  # Will be rebuilt below from hierarchy
            result[geo][seg_type] = segments

    # Now add "By Region" to parent geos based on GEO_HIERARCHY
    for parent_key, hierarchy_key in [
        ('ASEAN and MEA', 'ASEAN and MEA'),
        ('ASEAN', 'ASEAN'),
        ('MEA', 'Middle East & Africa'),
        ('GCC', 'GCC'),
    ]:
        if parent_key not in result or hierarchy_key not in GEO_HIERARCHY:
            continue

        by_region = {}
        for child in GEO_HIERARCHY[hierarchy_key]:
            child_mapped = REGION_MAP.get(child, child)
            if child_mapped in raw_data:
                # Compute geo total by summing first segment type's leaf values
                first_seg_type = next(
                    (st for st in raw_data[child_mapped] if st not in ('By Country', 'By Region')),
                    None
                )
                if first_seg_type:
                    seg_data = raw_data[child_mapped][first_seg_type]
                    total_years = {}
                    for seg_name, values in seg_data.items():
                        if isinstance(values, dict):
                            has_years = any(y in values for y in YEARS)
                            if has_years:
                                for y in YEARS:
                                    if y in values:
                                        total_years[y] = total_years.get(y, 0) + values[y]
                            else:
                                for sub_name, sub_values in values.items():
                                    if isinstance(sub_values, dict):
                                        for y in YEARS:
                                            if y in sub_values:
                                                total_years[y] = total_years.get(y, 0) + sub_values[y]

                    total_years = dict(total_years)
                    by_region[child_mapped] = total_years

        if by_region:
            result[parent_key]['By Region'] = by_region

    return result


def build_segmentation(json_data):
    """Build segmentation_analysis.json from the data structure."""
    seg = {}
    for geo, geo_data in json_data.items():
        seg[geo] = {}
        for seg_type, segments in geo_data.items():
            seg[geo][seg_type] = {}
            if isinstance(segments, dict):
                for seg_name, values in segments.items():
                    if isinstance(values, dict):
                        has_years = any(y in values for y in YEARS)
                        if has_years:
                            seg[geo][seg_type][seg_name] = {}
                        else:
                            # Nested hierarchy
                            seg[geo][seg_type][seg_name] = {}
                            for sub_name in values:
                                seg[geo][seg_type][seg_name][sub_name] = {}
    return seg


# Main execution
print("=" * 60)
print("Extracting real UTV market data from Excel")
print("=" * 60)

value_raw, volume_raw = read_master_sheet()

if value_raw:
    print(f"\nValue data regions: {list(value_raw.keys())}")
    for region, segments in value_raw.items():
        print(f"  {region}: {list(segments.keys())}")

    # Build hierarchical JSON
    value_json = build_json_with_hierarchy(value_raw)
    print(f"\nValue JSON geos: {list(value_json.keys())}")

    # Validate
    for geo in value_json:
        seg_types = [k for k in value_json[geo] if k != 'By Region']
        by_region = value_json[geo].get('By Region', {})
        print(f"  {geo}: {len(seg_types)} segment types, "
              f"{len(by_region)} children: {list(by_region.keys())}")
        # Show 2025 total from first segment type
        first_st = seg_types[0] if seg_types else None
        if first_st:
            total_2025 = 0
            for seg, vals in value_json[geo][first_st].items():
                if isinstance(vals, dict) and '2025' in vals:
                    total_2025 += vals['2025']
                elif isinstance(vals, dict):
                    for sv in vals.values():
                        if isinstance(sv, dict) and '2025' in sv:
                            total_2025 += sv['2025']
            print(f"    {first_st} total 2025: ${total_2025:.2f}M")

    with open('public/data/value.json', 'w') as f:
        json.dump(value_json, f, indent=2)
    print("\nWrote public/data/value.json")

if volume_raw:
    print(f"\nVolume data regions: {list(volume_raw.keys())}")
    volume_json = build_json_with_hierarchy(volume_raw)
    print(f"Volume JSON geos: {list(volume_json.keys())}")

    with open('public/data/volume.json', 'w') as f:
        json.dump(volume_json, f, indent=2)
    print("Wrote public/data/volume.json")

# Build segmentation
seg_json = build_segmentation(value_json)
with open('public/data/segmentation_analysis.json', 'w') as f:
    json.dump(seg_json, f, indent=2)
print("Wrote public/data/segmentation_analysis.json")

print("\n" + "=" * 60)
print("DONE — Real data extracted successfully")
print("=" * 60)
