"""
Fix UTV geography structure:
- Remove "By Country" segment type
- Add ASEAN, MEA, GCC as top-level geos
- Each geo gets proportionally split segment data
- Each geo gets "By Region" with child geographies
"""
import json, copy

YEARS = [str(y) for y in range(2021, 2034)]

def get_year_data(obj):
    """Extract {year: value} from an object, handling nested self-ref keys."""
    if isinstance(obj, dict):
        if '2021' in obj or '2025' in obj:
            return {y: obj.get(y, 0) for y in YEARS}
        # Check one level deeper for self-ref like {"ASEAN": {"2021": ...}}
        for k, v in obj.items():
            if isinstance(v, dict) and ('2021' in v or '2025' in v):
                return {y: v.get(y, 0) for y in YEARS}
    return None

def proportional_split(parent_segment_data, ratio_by_year):
    """Recursively split segment data by year-based ratio."""
    result = {}
    for key, val in parent_segment_data.items():
        if key in YEARS or key == 'CAGR':
            continue
        if isinstance(val, dict):
            if any(y in val for y in YEARS):
                # Leaf node with year data
                result[key] = {}
                for y in YEARS:
                    if y in val:
                        result[key][y] = val[y] * ratio_by_year.get(y, 0.5)
            else:
                # Nested structure - recurse
                result[key] = proportional_split(val, ratio_by_year)
    return result

def compute_ratio(child_years, parent_years):
    """Compute per-year ratio child/parent."""
    ratio = {}
    for y in YEARS:
        p = parent_years.get(y, 0)
        c = child_years.get(y, 0)
        ratio[y] = c / p if p > 0 else 0.5
    return ratio

def extract_country_years(by_country, prefix):
    """Extract country year data from By Country using 'prefix - country' keys."""
    countries = {}
    for key, val in by_country.items():
        if key.startswith(prefix + ' - '):
            country_name = key[len(prefix) + 3:]  # Skip "prefix - "
            # val is like {"CountryName": {"2021": ...}}
            year_data = get_year_data(val)
            if year_data:
                countries[country_name] = year_data
    return countries

# Load data
with open('public/data/value.json') as f:
    value = json.load(f)
with open('public/data/volume.json') as f:
    volume = json.load(f)
with open('public/data/segmentation_analysis.json') as f:
    seg = json.load(f)

combined = value['ASEAN and MEA']
combined_vol = volume.get('ASEAN and MEA', {})
by_country_val = combined.get('By Country', {})
by_country_vol = combined_vol.get('By Country', {})

# Get region totals
asean_years = get_year_data(by_country_val.get('ASEAN', {}))
mea_years = get_year_data(by_country_val.get('MEA', {}))
gcc_years = get_year_data(by_country_val.get('MEA - GCC', {}))

# Compute combined total per year (ASEAN + MEA)
combined_total = {}
for y in YEARS:
    combined_total[y] = asean_years[y] + mea_years[y]

print(f"ASEAN 2025: {asean_years['2025']}")
print(f"MEA 2025: {mea_years['2025']}")
print(f"GCC 2025: {gcc_years['2025']}")
print(f"Combined 2025: {combined_total['2025']}")

# Ratios
asean_ratio = compute_ratio(asean_years, combined_total)
mea_ratio = compute_ratio(mea_years, combined_total)
gcc_ratio_of_mea = compute_ratio(gcc_years, mea_years)

# Segment types to keep (everything except By Country)
segment_types = [st for st in combined.keys() if st != 'By Country']

# --- Build new value.json ---
new_value = {}

# 1. "ASEAN and MEA" - keep all segments, add "By Region"
new_value['ASEAN and MEA'] = {}
for st in segment_types:
    new_value['ASEAN and MEA'][st] = copy.deepcopy(combined[st])
# Add "By Region" with ASEAN and MEA totals
new_value['ASEAN and MEA']['By Region'] = {
    'ASEAN': asean_years,
    'MEA': mea_years
}

# 2. "ASEAN" - proportionally split + "By Region" with countries
asean_countries = extract_country_years(by_country_val, 'ASEAN')
new_value['ASEAN'] = {}
for st in segment_types:
    new_value['ASEAN'][st] = proportional_split(combined[st], asean_ratio)
new_value['ASEAN']['By Region'] = asean_countries

# 3. "MEA" - proportionally split + "By Region" with GCC + other countries
mea_countries = extract_country_years(by_country_val, 'MEA')
# Remove GCC sub-countries from MEA direct children (they go under GCC)
mea_direct_children = {}
for name, data in mea_countries.items():
    if not name.startswith('GCC - '):
        mea_direct_children[name] = data

new_value['MEA'] = {}
for st in segment_types:
    new_value['MEA'][st] = proportional_split(combined[st], mea_ratio)
new_value['MEA']['By Region'] = mea_direct_children

# 4. "GCC" - proportionally split from MEA + "By Region" with GCC countries
gcc_countries = {}
for key, val in by_country_val.items():
    if key.startswith('MEA - GCC - '):
        country_name = key[len('MEA - GCC - '):]
        year_data = get_year_data(val)
        if year_data:
            gcc_countries[country_name] = year_data

new_value['GCC'] = {}
for st in segment_types:
    mea_segment = new_value['MEA'][st]
    new_value['GCC'][st] = proportional_split(combined[st],
                                               compute_ratio(gcc_years, combined_total))
new_value['GCC']['By Region'] = gcc_countries

# Write value.json
with open('public/data/value.json', 'w') as f:
    json.dump(new_value, f, indent=2)
print(f"\nWrote value.json with geos: {list(new_value.keys())}")

# --- Build new volume.json ---
if combined_vol:
    by_country_vol_data = combined_vol.get('By Country', {})

    # Volume region totals
    asean_vol_years = get_year_data(by_country_vol_data.get('ASEAN', {}))
    mea_vol_years = get_year_data(by_country_vol_data.get('MEA', {}))
    gcc_vol_years = get_year_data(by_country_vol_data.get('MEA - GCC', {}))

    if asean_vol_years and mea_vol_years:
        combined_vol_total = {y: asean_vol_years[y] + mea_vol_years[y] for y in YEARS}
        asean_vol_ratio = compute_ratio(asean_vol_years, combined_vol_total)
        mea_vol_ratio = compute_ratio(mea_vol_years, combined_vol_total)

        vol_segment_types = [st for st in combined_vol.keys() if st != 'By Country']

        new_volume = {}

        # ASEAN and MEA
        new_volume['ASEAN and MEA'] = {}
        for st in vol_segment_types:
            new_volume['ASEAN and MEA'][st] = copy.deepcopy(combined_vol[st])
        new_volume['ASEAN and MEA']['By Region'] = {
            'ASEAN': asean_vol_years,
            'MEA': mea_vol_years
        }

        # ASEAN
        asean_vol_countries = extract_country_years(by_country_vol_data, 'ASEAN')
        new_volume['ASEAN'] = {}
        for st in vol_segment_types:
            new_volume['ASEAN'][st] = proportional_split(combined_vol[st], asean_vol_ratio)
        new_volume['ASEAN']['By Region'] = asean_vol_countries

        # MEA
        mea_vol_countries = extract_country_years(by_country_vol_data, 'MEA')
        mea_vol_direct = {k: v for k, v in mea_vol_countries.items() if not k.startswith('GCC - ')}
        new_volume['MEA'] = {}
        for st in vol_segment_types:
            new_volume['MEA'][st] = proportional_split(combined_vol[st], mea_vol_ratio)
        new_volume['MEA']['By Region'] = mea_vol_direct

        # GCC
        gcc_vol_countries = {}
        for key, val in by_country_vol_data.items():
            if key.startswith('MEA - GCC - '):
                country_name = key[len('MEA - GCC - '):]
                year_data = get_year_data(val)
                if year_data:
                    gcc_vol_countries[country_name] = year_data

        new_volume['GCC'] = {}
        for st in vol_segment_types:
            new_volume['GCC'][st] = proportional_split(combined_vol[st],
                                                        compute_ratio(gcc_vol_years, combined_vol_total))
        new_volume['GCC']['By Region'] = gcc_vol_countries

        with open('public/data/volume.json', 'w') as f:
            json.dump(new_volume, f, indent=2)
        print(f"Wrote volume.json with geos: {list(new_volume.keys())}")

# --- Update segmentation_analysis.json ---
seg_combined = seg.get('ASEAN and MEA', {})
seg_types_keep = {k: v for k, v in seg_combined.items() if k != 'By Country'}

new_seg = {}
# ASEAN and MEA
new_seg['ASEAN and MEA'] = copy.deepcopy(seg_types_keep)
new_seg['ASEAN and MEA']['By Region'] = {
    'ASEAN': {},
    'MEA': {}
}

# ASEAN
new_seg['ASEAN'] = copy.deepcopy(seg_types_keep)
new_seg['ASEAN']['By Region'] = {}
for country in asean_countries.keys():
    new_seg['ASEAN']['By Region'][country] = {}

# MEA
new_seg['MEA'] = copy.deepcopy(seg_types_keep)
new_seg['MEA']['By Region'] = {}
for country in mea_direct_children.keys():
    new_seg['MEA']['By Region'][country] = {}

# GCC
new_seg['GCC'] = copy.deepcopy(seg_types_keep)
new_seg['GCC']['By Region'] = {}
for country in gcc_countries.keys():
    new_seg['GCC']['By Region'][country] = {}

with open('public/data/segmentation_analysis.json', 'w') as f:
    json.dump(new_seg, f, indent=2)
print(f"Wrote segmentation_analysis.json with geos: {list(new_seg.keys())}")

# Validation
print("\n=== VALIDATION ===")
for geo in new_value:
    seg_types = [k for k in new_value[geo].keys() if k != 'By Region']
    by_region = new_value[geo].get('By Region', {})
    print(f"{geo}: {len(seg_types)} segment types, {len(by_region)} child regions: {list(by_region.keys())}")
