'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CustomerData {
  // Customer Information
  customerName: string
  businessOverview: string
  industryVertical: string
  assetFootprint: string
  estimatedFleetSize: string
  ownershipType: string
  // Contact Details
  keyContactPerson: string
  designation: string
  emailAddress: string
  phoneNumber: string
  linkedInProfile: string
  websiteUrl: string
  // Professional Drivers (for Proposition 2 & 3)
  primaryMotivation: string
  keyPainPoints: string
  upcomingTriggers: string
  // Purchasing Behaviour Metrics (for Proposition 3)
  budgetOwnership: string
  procurementModel: string
  buyingFrequency: string
  decisionDrivers: string
  // Solution Requirements (for Proposition 3)
  preferredProductType: string
  preferredConfiguration: string
  performanceExpectations: string
  technologyAddOns: string
  // CMI Insights (for Proposition 3)
  customerBenchmarking: string
  additionalComments: string
}

// Sample data for UTV Industry
const sampleCustomerData: CustomerData[] = [
  {
    customerName: 'Saudi ARAMCO',
    businessOverview: 'Oil & Gas Operations',
    industryVertical: 'Industrial & Logistics',
    assetFootprint: '8 refineries, 15 oil fields, multiple industrial sites',
    estimatedFleetSize: '450 units (50 passenger, 400 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Khalid Al-Rashid',
    designation: 'Fleet Operations Manager',
    emailAddress: 'k.alrashid@aramco.com.sa',
    phoneNumber: '+966 13 876 5000',
    linkedInProfile: 'linkedin.com/in/khalidalrashid',
    websiteUrl: 'www.aramco.com',
    primaryMotivation: 'Worker transportation in hazardous areas, Equipment mobility',
    keyPainPoints: 'Extreme heat durability, Maintenance downtime in remote locations',
    upcomingTriggers: 'Vision 2030 infrastructure expansion, Safety compliance upgrades',
    budgetOwnership: 'Central corporate budget, CAPEX',
    procurementModel: 'Direct purchase',
    buyingFrequency: 'Multi-year replacement cycle (7-10 years)',
    decisionDrivers: 'Durability and safety features, After-sales support',
    preferredProductType: 'Diesel UTVs for industrial sites, Some electric for controlled environments',
    preferredConfiguration: '4-6 seater utility, Heavy-duty cargo bed',
    performanceExpectations: 'Extreme heat resistance, High payload capacity, 12+ hour runtime',
    technologyAddOns: 'Fleet tracking, Preventive maintenance alerts, Safety monitoring',
    customerBenchmarking: 'High potential - Strategic account',
    additionalComments: 'Stringent safety and quality requirements, long procurement cycles'
  },
  {
    customerName: 'Emirates Global Aluminium',
    businessOverview: 'Mining & Manufacturing',
    industryVertical: 'Industrial & Logistics',
    assetFootprint: '2 smelter complexes, 1 bauxite mine',
    estimatedFleetSize: '280 units (30 passenger, 250 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Ahmed Hassan',
    designation: 'Head of Operations',
    emailAddress: 'a.hassan@ega.ae',
    phoneNumber: '+971 4 315 9999',
    linkedInProfile: 'linkedin.com/in/ahmedhassan-ega',
    websiteUrl: 'www.ega.ae',
    primaryMotivation: 'Heavy material transport, Worker mobility in industrial sites',
    keyPainPoints: 'Harsh industrial environment, High maintenance costs',
    upcomingTriggers: 'Plant expansion, Equipment modernization',
    budgetOwnership: 'Central corporate budget',
    procurementModel: 'Direct purchase',
    buyingFrequency: 'Phased rollout across sites',
    decisionDrivers: 'Total cost of ownership, Ruggedness and durability',
    preferredProductType: 'Diesel UTVs for heavy-duty applications',
    preferredConfiguration: 'Heavy-duty utility, High payload (1500+ kg)',
    performanceExpectations: 'Industrial grade, Extreme durability',
    technologyAddOns: 'Fleet tracking, Load monitoring',
    customerBenchmarking: 'High potential - Industrial segment',
    additionalComments: 'Focus on heavy-duty utility vehicles for mining operations'
  },
  {
    customerName: 'Dubai Parks & Resorts',
    businessOverview: 'Theme Park & Entertainment',
    industryVertical: 'Hospitality & Tourism',
    assetFootprint: '3 theme parks, 1 water park, resort hotels',
    estimatedFleetSize: '180 units (120 passenger, 60 utility)',
    ownershipType: 'Private enterprise',
    keyContactPerson: 'Sarah Mitchell',
    designation: 'VP - Operations',
    emailAddress: 's.mitchell@dubaiparks.com',
    phoneNumber: '+971 4 820 0000',
    linkedInProfile: 'linkedin.com/in/sarahmitchell-dp',
    websiteUrl: 'www.dubaiparks.com',
    primaryMotivation: 'Guest transportation, Staff mobility, Maintenance operations',
    keyPainPoints: 'Fleet availability during peak seasons, Heat management',
    upcomingTriggers: 'New attraction launches, Fleet modernization',
    budgetOwnership: 'Site-level operational budget',
    procurementModel: 'Leasing or rental',
    buyingFrequency: 'Annual contract renewal',
    decisionDrivers: 'Guest experience, Total cost of ownership',
    preferredProductType: 'Electric UTVs for guest areas, Gasoline for utility',
    preferredConfiguration: '6-seater passenger models, 4-seater utility',
    performanceExpectations: 'All-day runtime, Comfort features, AC options',
    technologyAddOns: 'Fleet tracking, GPS navigation',
    customerBenchmarking: 'High potential - Large fleet',
    additionalComments: 'Mix of passenger transport and utility applications'
  },
  {
    customerName: 'King Abdullah University',
    businessOverview: 'Educational Campus',
    industryVertical: 'Defense & Security',
    assetFootprint: '1 main campus with research facilities, 12,000 acre site',
    estimatedFleetSize: '95 units (60 passenger, 35 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Dr. Nasser Al-Mahmoud',
    designation: 'Director of Campus Services',
    emailAddress: 'n.almahmoud@kaust.edu.sa',
    phoneNumber: '+966 12 808 0000',
    linkedInProfile: 'linkedin.com/in/nasseralmahmoud',
    websiteUrl: 'www.kaust.edu.sa',
    primaryMotivation: 'Campus mobility, Sustainability goals',
    keyPainPoints: 'Large campus distances, Battery range limitations',
    upcomingTriggers: 'Campus expansion, Green campus initiatives',
    budgetOwnership: 'Central university budget',
    procurementModel: 'Direct purchase',
    buyingFrequency: 'Multi-year replacement cycle',
    decisionDrivers: 'Environmental sustainability, After-sales support',
    preferredProductType: 'Electric UTVs preferred for zero emissions',
    preferredConfiguration: '4-6 seater passenger focus',
    performanceExpectations: 'Long battery range, Fast charging',
    technologyAddOns: 'Fleet tracking, Charging management systems',
    customerBenchmarking: 'High potential - Education segment',
    additionalComments: 'Focus on sustainable transportation solutions'
  },
  {
    customerName: 'Buraimi Farms Group',
    businessOverview: 'Agricultural Operations',
    industryVertical: 'Industrial & Logistics',
    assetFootprint: '25 farms across Oman and UAE, Agricultural processing facilities',
    estimatedFleetSize: '220 units (20 passenger, 200 utility)',
    ownershipType: 'Private enterprise',
    keyContactPerson: 'Mohammed Al Kindi',
    designation: 'Operations Director',
    emailAddress: 'm.alkindi@buraimifarms.com',
    phoneNumber: '+968 2568 7000',
    linkedInProfile: 'linkedin.com/in/mohammedalkindi',
    websiteUrl: 'www.buraimifarms.com',
    primaryMotivation: 'Farm operations, Crop transport, Worker mobility',
    keyPainPoints: 'Rough terrain handling, Fuel costs',
    upcomingTriggers: 'Farm expansion, Equipment modernization',
    budgetOwnership: 'Site-level operational budget',
    procurementModel: 'Direct purchase',
    buyingFrequency: 'Annual additions, phased replacement',
    decisionDrivers: 'Fuel efficiency, Terrain capability',
    preferredProductType: 'Diesel UTVs for long-range operations',
    preferredConfiguration: 'Heavy-duty utility, 4WD capability',
    performanceExpectations: 'All-terrain capability, High payload',
    technologyAddOns: 'Basic GPS tracking',
    customerBenchmarking: 'High potential - Agricultural segment',
    additionalComments: 'Focus on utility vehicles for agricultural applications'
  },
  {
    customerName: 'Royal Guard Command',
    businessOverview: 'Military & Security Operations',
    industryVertical: 'Defense & Security',
    assetFootprint: 'Multiple military bases and training facilities',
    estimatedFleetSize: '350 units (150 passenger, 200 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Major General Abdullah Al Saud',
    designation: 'Procurement Director',
    emailAddress: 'a.alsaud@rgc.gov.sa',
    phoneNumber: '+966 11 491 0000',
    linkedInProfile: 'linkedin.com/in/abdullahalsaud-mil',
    websiteUrl: 'www.rgc.gov.sa',
    primaryMotivation: 'Base patrol, Personnel transport, Equipment mobility',
    keyPainPoints: 'Durability requirements, Spare parts availability',
    upcomingTriggers: 'Military modernization programs, New base developments',
    budgetOwnership: 'Central defense budget, CAPEX',
    procurementModel: 'Government tender',
    buyingFrequency: 'Project-based procurement',
    decisionDrivers: 'Reliability and durability, Local service presence',
    preferredProductType: 'Diesel UTVs for military applications',
    preferredConfiguration: 'Military-spec utility, Customization for defense needs',
    performanceExpectations: 'Extreme durability, Desert terrain capability',
    technologyAddOns: 'Secure fleet tracking, Communications equipment mounting',
    customerBenchmarking: 'High potential - Government defense',
    additionalComments: 'Requires compliance with military specifications'
  },
  {
    customerName: 'Dubai Municipality',
    businessOverview: 'Municipal Services',
    industryVertical: 'Defense & Security',
    assetFootprint: '50+ parks, public facilities, maintenance yards',
    estimatedFleetSize: '160 units (40 passenger, 120 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Rashid Al Mansoori',
    designation: 'Director - Fleet Management',
    emailAddress: 'r.almansoori@dm.gov.ae',
    phoneNumber: '+971 4 221 5555',
    linkedInProfile: 'linkedin.com/in/rashidalmansoori',
    websiteUrl: 'www.dm.gov.ae',
    primaryMotivation: 'Park maintenance, Public facility operations',
    keyPainPoints: 'Operating cost management, Environmental compliance',
    upcomingTriggers: 'Smart city initiatives, Green fleet mandates',
    budgetOwnership: 'Municipal operational budget',
    procurementModel: 'Government tender',
    buyingFrequency: 'Annual procurement cycles',
    decisionDrivers: 'Environmental compliance, Total cost of ownership',
    preferredProductType: 'Electric UTVs for urban areas, Diesel for heavy-duty',
    preferredConfiguration: 'Utility focus with cargo beds',
    performanceExpectations: 'Low emissions, Daily operational reliability',
    technologyAddOns: 'Fleet tracking, Maintenance scheduling',
    customerBenchmarking: 'High potential - Municipal segment',
    additionalComments: 'Preference for environmentally friendly options'
  },
  {
    customerName: 'NEOM Project Development',
    businessOverview: 'Smart City Construction',
    industryVertical: 'Industrial & Logistics',
    assetFootprint: 'Mega construction site, 26,500 km² development area',
    estimatedFleetSize: '500 units (100 passenger, 400 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Eng. Fahad Al Qahtani',
    designation: 'Head of Site Operations',
    emailAddress: 'f.alqahtani@neom.com',
    phoneNumber: '+966 12 345 6789',
    linkedInProfile: 'linkedin.com/in/fahadAlqahtani',
    websiteUrl: 'www.neom.com',
    primaryMotivation: 'Construction site mobility, Material transport',
    keyPainPoints: 'Scale of operations, Terrain challenges',
    upcomingTriggers: 'Vision 2030 megaproject, Continuous expansion',
    budgetOwnership: 'Project CAPEX budget',
    procurementModel: 'Framework agreements',
    buyingFrequency: 'Ongoing procurement as project expands',
    decisionDrivers: 'Scalability, Reliability, After-sales support',
    preferredProductType: 'Mix of Diesel and Electric UTVs',
    preferredConfiguration: 'Heavy-duty utility, Various configurations',
    performanceExpectations: 'All-terrain, High durability, Long operational hours',
    technologyAddOns: 'Advanced fleet management, Telematics',
    customerBenchmarking: 'Very high potential - Megaproject',
    additionalComments: 'Massive scale opportunity, long-term partnership potential'
  },
  {
    customerName: 'Pulau Pinang National Park',
    businessOverview: 'National Park & Conservation',
    industryVertical: 'Defense & Security',
    assetFootprint: '1 national park, multiple conservation sites',
    estimatedFleetSize: '45 units (25 passenger, 20 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Dr. Lim Wei Chen',
    designation: 'Park Director',
    emailAddress: 'w.lim@ppnp.gov.my',
    phoneNumber: '+60 4 881 3500',
    linkedInProfile: 'linkedin.com/in/limweichen',
    websiteUrl: 'www.ppnp.gov.my',
    primaryMotivation: 'Eco-tourism transport, Park maintenance',
    keyPainPoints: 'Environmental impact concerns, Terrain accessibility',
    upcomingTriggers: 'Tourism expansion, Conservation initiatives',
    budgetOwnership: 'Government operational budget',
    procurementModel: 'Government procurement',
    buyingFrequency: 'One-time bulk purchase',
    decisionDrivers: 'Environmental sustainability, Low noise',
    preferredProductType: 'Electric UTVs for zero emissions in protected areas',
    preferredConfiguration: 'Passenger focus, All-terrain capability',
    performanceExpectations: 'Minimal environmental impact, Trail capability',
    technologyAddOns: 'GPS tracking',
    customerBenchmarking: 'Medium potential - Conservation segment',
    additionalComments: 'Strong preference for environmentally friendly solutions'
  },
  {
    customerName: 'Al Ain Farms & Zoo',
    businessOverview: 'Zoo & Agricultural Facility',
    industryVertical: 'Hospitality & Tourism',
    assetFootprint: '1 zoo facility, agricultural research areas',
    estimatedFleetSize: '70 units (40 passenger, 30 utility)',
    ownershipType: 'Government / Semi-government',
    keyContactPerson: 'Fatima Al Kaabi',
    designation: 'Operations Manager',
    emailAddress: 'f.alkaabi@alainzoo.ae',
    phoneNumber: '+971 3 799 2000',
    linkedInProfile: 'linkedin.com/in/fatimakaabi',
    websiteUrl: 'www.alainzoo.ae',
    primaryMotivation: 'Visitor transport, Animal care operations',
    keyPainPoints: 'Noise disturbance to animals, Reliability during peak seasons',
    upcomingTriggers: 'Facility expansion, Visitor experience upgrades',
    budgetOwnership: 'Facility operational budget',
    procurementModel: 'Direct purchase',
    buyingFrequency: 'Multi-year replacement cycle',
    decisionDrivers: 'Low noise operation, Visitor comfort',
    preferredProductType: 'Electric UTVs for quiet operation',
    preferredConfiguration: 'Passenger models with weather protection',
    performanceExpectations: 'Quiet operation, Reliability, All-day runtime',
    technologyAddOns: 'Route planning, Fleet tracking',
    customerBenchmarking: 'Medium potential - Tourism segment',
    additionalComments: 'Emphasis on visitor experience and animal welfare'
  }
]

interface PrepositionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function Preposition({ title, isOpen, onToggle, children }: PrepositionProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="text-lg font-semibold text-black">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-2 pb-4 bg-white rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  )
}

interface CustomerIntelligenceDatabaseProps {
  title?: string
  height?: number
}

export default function CustomerIntelligenceDatabase({ title }: CustomerIntelligenceDatabaseProps) {
  const [openPreposition, setOpenPreposition] = useState<number | null>(1)

  const togglePreposition = (num: number) => {
    setOpenPreposition(openPreposition === num ? null : num)
  }

  // Preposition 1 Table - Customer Information + Contact Details
  const renderPreposition1Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={6} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Customer Information */}
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Customer Name/Company Name</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Business Overview</div>
              <div className="font-normal text-[10px] text-gray-600">(industrial, agriculture, defense, tourism, construction)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Industry Vertical</div>
              <div className="font-normal text-[10px] text-gray-600">(Industrial & Logistics, Defense & Security, Hospitality & Tourism, Agriculture, Mining & Construction)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Asset Footprint / Mobility Environment</div>
              <div className="font-normal text-[10px] text-gray-600">(Number of facilities, sites, campuses, parks, farms, or operational areas)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Estimated Fleet Size (Units)</div>
              <div className="font-normal text-[10px] text-gray-600">(Current UTV fleet size, Passenger vs utility split)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Ownership Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Government / Semi-government, Private enterprise, Public private partnership, Family owned)</div>
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Key Contact Person</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Designation/Role</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Email Address</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Phone/WhatsApp Number</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">LinkedIn Profile</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Website URL</th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.businessOverview}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.industryVertical}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.assetFootprint}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.estimatedFleetSize}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.ownershipType}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{customer.linkedInProfile}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.websiteUrl}`} target="_blank" rel="noopener noreferrer">{customer.websiteUrl}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Preposition 2 Table - Same as Preposition 1 + Professional Drivers
  const renderPreposition2Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={6} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={3} className="bg-[#90EE90] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Professional Drivers
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Customer Information */}
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Customer Name/Company Name</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Business Overview</div>
              <div className="font-normal text-[10px] text-gray-600">(hospitality, transportation, real estate)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Industry Vertical</div>
              <div className="font-normal text-[10px] text-gray-600">(Golf & Leisure, Hospitality & Tourism, Airports & Transportation Hubs, Industrial & Logistics, Residential Communities)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Asset Footprint / Mobility Environment</div>
              <div className="font-normal text-[10px] text-gray-600">(Number of golf courses, resorts, terminals, campuses, or industrial sites)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Estimated Fleet Size (Units)</div>
              <div className="font-normal text-[10px] text-gray-600">(Current golf cart fleet size, Passenger vs utility split)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Ownership Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Government / Semi-government, Private enterprise, Public private partnership, Family owned resort or developer)</div>
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Key Contact Person</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Designation/Role</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Email Address</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Phone/WhatsApp Number</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">LinkedIn Profile</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Website URL</th>
            {/* Professional Drivers */}
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Primary Motivation for UTV Adoption</div>
              <div className="font-normal text-[10px] text-gray-600">(Operational efficiency, Worker/material transport, Cost optimization, Terrain accessibility, Safety and durability, Environmental compliance)</div>
            </th>
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Key Pain Points</div>
              <div className="font-normal text-[10px] text-gray-600">(High maintenance costs, Durability in harsh environments, Spare parts availability, Fuel/energy efficiency, Terrain capability limitations, Downtime issues)</div>
            </th>
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Upcoming Triggers and Initiatives</div>
              <div className="font-normal text-[10px] text-gray-600">(Facility expansion, Equipment modernization, Fleet replacement cycle, Safety compliance upgrades, Environmental mandates, New project developments)</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.businessOverview}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.industryVertical}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.assetFootprint}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.estimatedFleetSize}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.ownershipType}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{customer.linkedInProfile}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.websiteUrl}`} target="_blank" rel="noopener noreferrer">{customer.websiteUrl}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.primaryMotivation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyPainPoints}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.upcomingTriggers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Preposition 3 Table - Same as Preposition 2 + Purchasing Behaviour Metrics + Solution Requirements + CMI Insights
  const renderPreposition3Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={6} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={3} className="bg-[#90EE90] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Professional Drivers
            </th>
            <th colSpan={4} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Purchasing Behaviour Metrics
            </th>
            <th colSpan={4} className="bg-[#FFDAB9] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Solution Requirements
            </th>
            <th colSpan={2} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              CMI Insights
            </th>
          </tr>
          <tr className="bg-gray-100">
            {/* Customer Information */}
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Customer Name/Company Name</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Business Overview</div>
              <div className="font-normal text-[10px] text-gray-600">(hospitality, transportation, real estate)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Industry Vertical</div>
              <div className="font-normal text-[10px] text-gray-600">(Golf & Leisure, Hospitality & Tourism, Airports & Transportation Hubs, Industrial & Logistics, Residential Communities)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Asset Footprint / Mobility Environment</div>
              <div className="font-normal text-[10px] text-gray-600">(Number of golf courses, resorts, terminals, campuses, or industrial sites)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[150px]">
              <div>Estimated Fleet Size (Units)</div>
              <div className="font-normal text-[10px] text-gray-600">(Current golf cart fleet size, Passenger vs utility split)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Ownership Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Government / Semi-government, Private enterprise, Public private partnership, Family owned resort or developer)</div>
            </th>
            {/* Contact Details */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Key Contact Person</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Designation/Role</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Email Address</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Phone/WhatsApp Number</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">LinkedIn Profile</th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black whitespace-nowrap">Website URL</th>
            {/* Professional Drivers */}
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Primary Motivation for UTV Adoption</div>
              <div className="font-normal text-[10px] text-gray-600">(Operational efficiency, Worker/material transport, Cost optimization, Terrain accessibility, Safety and durability, Environmental compliance)</div>
            </th>
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Key Pain Points</div>
              <div className="font-normal text-[10px] text-gray-600">(High maintenance costs, Durability in harsh environments, Spare parts availability, Fuel/energy efficiency, Terrain capability limitations, Downtime issues)</div>
            </th>
            <th className="bg-[#98FB98] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Upcoming Triggers and Initiatives</div>
              <div className="font-normal text-[10px] text-gray-600">(Facility expansion, Equipment modernization, Fleet replacement cycle, Safety compliance upgrades, Environmental mandates, New project developments)</div>
            </th>
            {/* Purchasing Behaviour Metrics */}
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Budget Ownership</div>
              <div className="font-normal text-[10px] text-gray-600">(Central corporate budget, Site-level operational budget, CAPEX for purchase or OPEX for lease)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Procurement Model</div>
              <div className="font-normal text-[10px] text-gray-600">(Direct purchase, Leasing or rental, Managed mobility contracts, Project-based procurement (new builds))</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Buying Frequency</div>
              <div className="font-normal text-[10px] text-gray-600">(One-time bulk purchase/Phased rollout across sites/Annual or multi-year replacement cycle)</div>
            </th>
            <th className="bg-[#CCE5FF] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Decision Drivers</div>
              <div className="font-normal text-[10px] text-gray-600">(Total cost of ownership/After-sales support and SLA/Battery warranty and lifecycle/Local service presence/Brand reputation)</div>
            </th>
            {/* Solution Requirements */}
            <th className="bg-[#FFE4B5] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Preferred Product Type</div>
              <div className="font-normal text-[10px] text-gray-600">(Electric UTVs/Gasoline UTVs/Diesel UTVs for heavy-duty/Hybrid options/Battery type preference)</div>
            </th>
            <th className="bg-[#FFE4B5] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Preferred Configuration</div>
              <div className="font-normal text-[10px] text-gray-600">(Seating capacity (2, 4, 6, 8+ seater)/Passenger vs utility focus/Customization needs (enclosure, AC, branding, luggage racks))</div>
            </th>
            <th className="bg-[#FFE4B5] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[220px]">
              <div>Performance Expectations</div>
              <div className="font-normal text-[10px] text-gray-600">(Battery runtime per shift/Charging time/Payload or passenger capacity/Durability in heat, humidity, or sand environments)</div>
            </th>
            <th className="bg-[#FFE4B5] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[200px]">
              <div>Technology Add-ons</div>
              <div className="font-normal text-[10px] text-gray-600">(Fleet tracking or telematics/Preventive maintenance alerts/Charging management systems)</div>
            </th>
            {/* CMI Insights */}
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Customer Benchmarking Summary</div>
              <div className="font-normal text-[10px] text-gray-600">(Potential Customers)</div>
            </th>
            <th className="bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[180px]">
              <div>Additional Comments/Notes By CMI team</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((customer, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {/* Customer Information */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerName}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.businessOverview}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.industryVertical}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.assetFootprint}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.estimatedFleetSize}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.ownershipType}</td>
              {/* Contact Details */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyContactPerson}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`mailto:${customer.emailAddress}`}>{customer.emailAddress}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.phoneNumber}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{customer.linkedInProfile}</a>
              </td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline">
                <a href={`https://${customer.websiteUrl}`} target="_blank" rel="noopener noreferrer">{customer.websiteUrl}</a>
              </td>
              {/* Professional Drivers */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.primaryMotivation}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.keyPainPoints}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.upcomingTriggers}</td>
              {/* Purchasing Behaviour Metrics */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.budgetOwnership}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.procurementModel}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.buyingFrequency}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.decisionDrivers}</td>
              {/* Solution Requirements */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.preferredProductType}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.preferredConfiguration}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.performanceExpectations}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.technologyAddOns}</td>
              {/* CMI Insights */}
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.customerBenchmarking}</td>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black">{customer.additionalComments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="w-full">
      <Preposition
        title="Customer Intelligence Database"
        isOpen={openPreposition === 1}
        onToggle={() => togglePreposition(1)}
      >
        {renderPreposition1Table()}
      </Preposition>
    </div>
  )
}
