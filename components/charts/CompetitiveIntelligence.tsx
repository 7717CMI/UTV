'use client'

import { useState } from 'react'

interface ProductSpecification {
  origin: string
  brand: string
  model: string
  productType: string
  driveType: string
  loadCapacity: string
  seating: string
  soldUnits2022: number
  soldUnits2023: number
  soldUnits2024: number
  soldUnits2025: number
  payloadCapacity: number
  towingCapacity: number
  motorPowerOutput: number
  topSpeed: number
  distributorMarginPercent: number
  distributorMarginDollar: number
  distributorPrice: number
  retailerMarginPercent: number
  retailerMarginDollar: number
  retailPrice: number
}

// UTV Product Specifications Data from actual market
const productData: ProductSpecification[] = [
  // Chinese companies first
  { origin: 'Chinese', brand: 'CFMOTO', model: 'UForce 500', productType: 'ICE - Gasoline', driveType: '2WD', loadCapacity: 'Light-duty', seating: '2-Seater', soldUnits2022: 6500, soldUnits2023: 7200, soldUnits2024: 6800, soldUnits2025: 6400, payloadCapacity: 660, towingCapacity: 1100, motorPowerOutput: 38, topSpeed: 38, distributorMarginPercent: 18, distributorMarginDollar: 1337, distributorPrice: 8767, retailerMarginPercent: 30, retailerMarginDollar: 2630, retailPrice: 11397 },
  { origin: 'Chinese', brand: 'CFMOTO', model: 'UForce 800', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '2-Seater', soldUnits2022: 8500, soldUnits2023: 9500, soldUnits2024: 9000, soldUnits2025: 8600, payloadCapacity: 850, towingCapacity: 1500, motorPowerOutput: 62, topSpeed: 50, distributorMarginPercent: 18, distributorMarginDollar: 1979, distributorPrice: 12976, retailerMarginPercent: 30, retailerMarginDollar: 3893, retailPrice: 16868 },
  { origin: 'Chinese', brand: 'CFMOTO', model: 'UForce 1000', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 11500, soldUnits2023: 12800, soldUnits2024: 12200, soldUnits2025: 11800, payloadCapacity: 1000, towingCapacity: 2000, motorPowerOutput: 80, topSpeed: 55, distributorMarginPercent: 18, distributorMarginDollar: 2693, distributorPrice: 17655, retailerMarginPercent: 30, retailerMarginDollar: 5296, retailPrice: 22951 },
  { origin: 'Chinese', brand: 'Hisun Motors', model: 'Strike 250', productType: 'ICE - Gasoline', driveType: '2WD', loadCapacity: 'Light-duty', seating: '2-Seater', soldUnits2022: 5200, soldUnits2023: 5800, soldUnits2024: 5500, soldUnits2025: 5300, payloadCapacity: 500, towingCapacity: 800, motorPowerOutput: 18, topSpeed: 30, distributorMarginPercent: 15, distributorMarginDollar: 945, distributorPrice: 7245, retailerMarginPercent: 28, retailerMarginDollar: 2029, retailPrice: 9274 },
  { origin: 'Chinese', brand: 'Hisun Motors', model: 'Strike 550', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '2-Seater', soldUnits2022: 7800, soldUnits2023: 8500, soldUnits2024: 8100, soldUnits2025: 7900, payloadCapacity: 800, towingCapacity: 1200, motorPowerOutput: 40, topSpeed: 45, distributorMarginPercent: 17, distributorMarginDollar: 1530, distributorPrice: 10530, retailerMarginPercent: 30, retailerMarginDollar: 3159, retailPrice: 13689 },
  { origin: 'Chinese', brand: 'Hisun Motors', model: 'Strike 1000', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '4-Seater', soldUnits2022: 6500, soldUnits2023: 7200, soldUnits2024: 6900, soldUnits2025: 6700, payloadCapacity: 1200, towingCapacity: 1800, motorPowerOutput: 75, topSpeed: 50, distributorMarginPercent: 18, distributorMarginDollar: 2520, distributorPrice: 16520, retailerMarginPercent: 30, retailerMarginDollar: 4956, retailPrice: 21476 },
  { origin: 'Chinese', brand: 'Segway Powersports', model: 'Snarler 570', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '2-Seater', soldUnits2022: 8200, soldUnits2023: 9100, soldUnits2024: 8700, soldUnits2025: 8500, payloadCapacity: 750, towingCapacity: 1300, motorPowerOutput: 44, topSpeed: 50, distributorMarginPercent: 18, distributorMarginDollar: 1782, distributorPrice: 11682, retailerMarginPercent: 30, retailerMarginDollar: 3505, retailPrice: 15187 },
  { origin: 'Chinese', brand: 'Segway Powersports', model: 'Villain SX10', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 5900, soldUnits2023: 6600, soldUnits2024: 6300, soldUnits2025: 6100, payloadCapacity: 1000, towingCapacity: 2000, motorPowerOutput: 82, topSpeed: 60, distributorMarginPercent: 19, distributorMarginDollar: 2850, distributorPrice: 17850, retailerMarginPercent: 30, retailerMarginDollar: 5355, retailPrice: 23205 },
  { origin: 'Chinese', brand: 'Segway Powersports', model: 'Fugleman UT10', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '4-Seater', soldUnits2022: 4800, soldUnits2023: 5400, soldUnits2024: 5100, soldUnits2025: 4900, payloadCapacity: 1100, towingCapacity: 2200, motorPowerOutput: 85, topSpeed: 55, distributorMarginPercent: 20, distributorMarginDollar: 3200, distributorPrice: 19200, retailerMarginPercent: 30, retailerMarginDollar: 5760, retailPrice: 24960 },
  // Non-Chinese companies
  { origin: 'Non-Chinese', brand: 'Polaris', model: 'Ranger 500', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Light-duty', seating: '2-Seater', soldUnits2022: 8415, soldUnits2023: 8200, soldUnits2024: 7800, soldUnits2025: 7400, payloadCapacity: 1000, towingCapacity: 1500, motorPowerOutput: 32, topSpeed: 44, distributorMarginPercent: 20, distributorMarginDollar: 2245, distributorPrice: 13473, retailerMarginPercent: 35, retailerMarginDollar: 4715, retailPrice: 18006 },
  { origin: 'Non-Chinese', brand: 'Polaris', model: 'Ranger SP 570', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '2-Seater', soldUnits2022: 12500, soldUnits2023: 13200, soldUnits2024: 12800, soldUnits2025: 12200, payloadCapacity: 1250, towingCapacity: 2000, motorPowerOutput: 44, topSpeed: 45, distributorMarginPercent: 20, distributorMarginDollar: 2695, distributorPrice: 16168, retailerMarginPercent: 35, retailerMarginDollar: 5659, retailPrice: 21826 },
  { origin: 'Non-Chinese', brand: 'Polaris', model: 'Ranger 1000', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 18500, soldUnits2023: 19200, soldUnits2024: 18500, soldUnits2025: 17800, payloadCapacity: 1500, towingCapacity: 2500, motorPowerOutput: 61, topSpeed: 50, distributorMarginPercent: 20, distributorMarginDollar: 3211, distributorPrice: 19267, retailerMarginPercent: 35, retailerMarginDollar: 6743, retailPrice: 26010 },
  { origin: 'Non-Chinese', brand: 'Polaris', model: 'Ranger XP 1000', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 32500, soldUnits2023: 34200, soldUnits2024: 31800, soldUnits2025: 29500, payloadCapacity: 1500, towingCapacity: 2500, motorPowerOutput: 82, topSpeed: 63, distributorMarginPercent: 25, distributorMarginDollar: 4639, distributorPrice: 23193, retailerMarginPercent: 30, retailerMarginDollar: 6958, retailPrice: 30151 },
  { origin: 'Non-Chinese', brand: 'Polaris', model: 'Ranger XP 1000 NorthStar', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 8200, soldUnits2023: 8800, soldUnits2024: 8200, soldUnits2025: 7800, payloadCapacity: 1500, towingCapacity: 2500, motorPowerOutput: 82, topSpeed: 63, distributorMarginPercent: 25, distributorMarginDollar: 6473, distributorPrice: 32363, retailerMarginPercent: 30, retailerMarginDollar: 9709, retailPrice: 42072 },
  { origin: 'Non-Chinese', brand: 'Can-Am', model: 'Defender HD7', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '2-Seater', soldUnits2022: 15200, soldUnits2023: 16500, soldUnits2024: 15800, soldUnits2025: 15200, payloadCapacity: 1500, towingCapacity: 2500, motorPowerOutput: 52, topSpeed: 55, distributorMarginPercent: 22, distributorMarginDollar: 3208, distributorPrice: 17790, retailerMarginPercent: 35, retailerMarginDollar: 6227, retailPrice: 24017 },
  { origin: 'Non-Chinese', brand: 'Can-Am', model: 'Defender DPS HD9', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '2-Seater', soldUnits2022: 18500, soldUnits2023: 19800, soldUnits2024: 18900, soldUnits2025: 18200, payloadCapacity: 1500, towingCapacity: 2500, motorPowerOutput: 65, topSpeed: 60, distributorMarginPercent: 22, distributorMarginDollar: 4302, distributorPrice: 23859, retailerMarginPercent: 35, retailerMarginDollar: 8351, retailPrice: 32210 },
  { origin: 'Non-Chinese', brand: 'Can-Am', model: 'Defender DPS HD10', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 22500, soldUnits2023: 24200, soldUnits2024: 22800, soldUnits2025: 21500, payloadCapacity: 1500, towingCapacity: 2500, motorPowerOutput: 82, topSpeed: 65, distributorMarginPercent: 25, distributorMarginDollar: 4230, distributorPrice: 21149, retailerMarginPercent: 30, retailerMarginDollar: 6345, retailPrice: 27494 },
  { origin: 'Non-Chinese', brand: 'Can-Am', model: 'Defender PRO Limited', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 6500, soldUnits2023: 7200, soldUnits2024: 6800, soldUnits2025: 6400, payloadCapacity: 1500, towingCapacity: 3500, motorPowerOutput: 82, topSpeed: 65, distributorMarginPercent: 25, distributorMarginDollar: 7012, distributorPrice: 35060, retailerMarginPercent: 30, retailerMarginDollar: 10518, retailPrice: 45578 },
  { origin: 'Non-Chinese', brand: 'Yamaha', model: 'Wolverine X2 850 XT-R', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Light-duty', seating: '2-Seater', soldUnits2022: 9500, soldUnits2023: 10200, soldUnits2024: 9800, soldUnits2025: 9200, payloadCapacity: 600, towingCapacity: 2000, motorPowerOutput: 80, topSpeed: 55, distributorMarginPercent: 20, distributorMarginDollar: 3880, distributorPrice: 23277, retailerMarginPercent: 35, retailerMarginDollar: 8147, retailPrice: 31424 },
  { origin: 'Non-Chinese', brand: 'Yamaha', model: 'Wolverine X4 850 XT-R', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '4-Seater', soldUnits2022: 11500, soldUnits2023: 12200, soldUnits2024: 11600, soldUnits2025: 11000, payloadCapacity: 600, towingCapacity: 2000, motorPowerOutput: 80, topSpeed: 55, distributorMarginPercent: 20, distributorMarginDollar: 4350, distributorPrice: 26099, retailerMarginPercent: 35, retailerMarginDollar: 9135, retailPrice: 35233 },
  { origin: 'Non-Chinese', brand: 'Yamaha', model: 'Wolverine RMAX2 1000 R-Spec', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '2-Seater', soldUnits2022: 8200, soldUnits2023: 8800, soldUnits2024: 8400, soldUnits2025: 8000, payloadCapacity: 600, towingCapacity: 2000, motorPowerOutput: 108, topSpeed: 75, distributorMarginPercent: 20, distributorMarginDollar: 4895, distributorPrice: 29372, retailerMarginPercent: 35, retailerMarginDollar: 10280, retailPrice: 39653 },
  { origin: 'Non-Chinese', brand: 'Yamaha', model: 'Wolverine RMAX4 1000 Limited', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '4-Seater', soldUnits2022: 7500, soldUnits2023: 8200, soldUnits2024: 7800, soldUnits2025: 7400, payloadCapacity: 1000, towingCapacity: 2500, motorPowerOutput: 108, topSpeed: 75, distributorMarginPercent: 22, distributorMarginDollar: 7262, distributorPrice: 40272, retailerMarginPercent: 35, retailerMarginDollar: 14095, retailPrice: 54367 },
  { origin: 'Non-Chinese', brand: 'Honda', model: 'Pioneer 500', productType: 'ICE - Gasoline', driveType: '2WD', loadCapacity: 'Light-duty', seating: '2-Seater', soldUnits2022: 10500, soldUnits2023: 11200, soldUnits2024: 10600, soldUnits2025: 10000, payloadCapacity: 1000, towingCapacity: 1500, motorPowerOutput: 32, topSpeed: 35, distributorMarginPercent: 20, distributorMarginDollar: 2435, distributorPrice: 14611, retailerMarginPercent: 35, retailerMarginDollar: 5114, retailPrice: 19725 },
  { origin: 'Non-Chinese', brand: 'Honda', model: 'Pioneer 700', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '2-Seater', soldUnits2022: 14500, soldUnits2023: 15500, soldUnits2024: 14800, soldUnits2025: 14000, payloadCapacity: 1000, towingCapacity: 1500, motorPowerOutput: 40, topSpeed: 45, distributorMarginPercent: 20, distributorMarginDollar: 3247, distributorPrice: 19482, retailerMarginPercent: 35, retailerMarginDollar: 6819, retailPrice: 26300 },
  { origin: 'Non-Chinese', brand: 'Honda', model: 'Pioneer 1000', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 18200, soldUnits2023: 19500, soldUnits2024: 18600, soldUnits2025: 17800, payloadCapacity: 1000, towingCapacity: 2500, motorPowerOutput: 72, topSpeed: 52, distributorMarginPercent: 20, distributorMarginDollar: 4267, distributorPrice: 25600, retailerMarginPercent: 35, retailerMarginDollar: 8960, retailPrice: 34560 },
  { origin: 'Non-Chinese', brand: 'Kawasaki', model: 'Mule SX', productType: 'ICE - Gasoline', driveType: '2WD', loadCapacity: 'Light-duty', seating: '2-Seater', soldUnits2022: 12500, soldUnits2023: 13200, soldUnits2024: 12600, soldUnits2025: 12000, payloadCapacity: 800, towingCapacity: 1200, motorPowerOutput: 24, topSpeed: 25, distributorMarginPercent: 22, distributorMarginDollar: 2238, distributorPrice: 12412, retailerMarginPercent: 35, retailerMarginDollar: 4344, retailPrice: 16756 },
  { origin: 'Non-Chinese', brand: 'Kawasaki', model: 'Mule PRO-FXT', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '6-Seater', soldUnits2022: 16500, soldUnits2023: 17800, soldUnits2024: 17000, soldUnits2025: 16200, payloadCapacity: 1000, towingCapacity: 2000, motorPowerOutput: 48, topSpeed: 40, distributorMarginPercent: 20, distributorMarginDollar: 2890, distributorPrice: 17339, retailerMarginPercent: 30, retailerMarginDollar: 5202, retailPrice: 22541 },
  { origin: 'Non-Chinese', brand: 'Kawasaki', model: 'Teryx4 LE', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '4-Seater', soldUnits2022: 8500, soldUnits2023: 9200, soldUnits2024: 8800, soldUnits2025: 8400, payloadCapacity: 850, towingCapacity: 1300, motorPowerOutput: 50, topSpeed: 65, distributorMarginPercent: 25, distributorMarginDollar: 3884, distributorPrice: 19418, retailerMarginPercent: 30, retailerMarginDollar: 5825, retailPrice: 25243 },
  { origin: 'Non-Chinese', brand: 'John Deere', model: 'Gator XUv 590M', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Medium-duty', seating: '2-Seater', soldUnits2022: 9500, soldUnits2023: 10200, soldUnits2024: 9600, soldUnits2025: 9200, payloadCapacity: 1400, towingCapacity: 1500, motorPowerOutput: 35, topSpeed: 44, distributorMarginPercent: 25, distributorMarginDollar: 3595, distributorPrice: 17976, retailerMarginPercent: 30, retailerMarginDollar: 5393, retailPrice: 23369 },
  { origin: 'Non-Chinese', brand: 'John Deere', model: 'Gator XUv 845M', productType: 'ICE - Gasoline', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 7200, soldUnits2023: 7800, soldUnits2024: 7400, soldUnits2025: 7000, payloadCapacity: 1400, towingCapacity: 1500, motorPowerOutput: 54, topSpeed: 53, distributorMarginPercent: 25, distributorMarginDollar: 5610, distributorPrice: 28048, retailerMarginPercent: 30, retailerMarginDollar: 8414, retailPrice: 36462 },
  { origin: 'Non-Chinese', brand: 'John Deere', model: 'Gator XUv 865M Diesel', productType: 'ICE - Diesel', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 5500, soldUnits2023: 6200, soldUnits2024: 5800, soldUnits2025: 5600, payloadCapacity: 1400, towingCapacity: 1500, motorPowerOutput: 23, topSpeed: 44, distributorMarginPercent: 25, distributorMarginDollar: 6133, distributorPrice: 30666, retailerMarginPercent: 30, retailerMarginDollar: 9200, retailPrice: 39866 },
  { origin: 'Non-Chinese', brand: 'Kubota', model: 'RTV-X900', productType: 'ICE - Diesel', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '2-Seater', soldUnits2022: 4500, soldUnits2023: 5200, soldUnits2024: 4900, soldUnits2025: 4700, payloadCapacity: 1100, towingCapacity: 1300, motorPowerOutput: 22, topSpeed: 25, distributorMarginPercent: 22, distributorMarginDollar: 3859, distributorPrice: 21401, retailerMarginPercent: 35, retailerMarginDollar: 7490, retailPrice: 28891 },
  { origin: 'Non-Chinese', brand: 'Kubota', model: 'RTV-X1140', productType: 'ICE - Diesel', driveType: '4WD', loadCapacity: 'Heavy-duty', seating: '4-Seater', soldUnits2022: 3800, soldUnits2023: 4500, soldUnits2024: 4200, soldUnits2025: 4000, payloadCapacity: 1630, towingCapacity: 1300, motorPowerOutput: 25, topSpeed: 25, distributorMarginPercent: 22, distributorMarginDollar: 5828, distributorPrice: 32321, retailerMarginPercent: 35, retailerMarginDollar: 11312, retailPrice: 43633 }
]

interface CountryPricing {
  country: string
  distributorMarginPercent: number
  distributorMarginDollar: number
  distributorPrice: number
  retailerMarginPercent: number
  retailerMarginDollar: number
  retailPrice: number
}

// Country-wise retail pricing data
const countryPricingData: CountryPricing[] = [
  { country: 'Thailand', distributorMarginPercent: 20, distributorMarginDollar: 2245, distributorPrice: 13473, retailerMarginPercent: 35, retailerMarginDollar: 4715, retailPrice: 18006 },
  { country: 'UAE', distributorMarginPercent: 20, distributorMarginDollar: 2695, distributorPrice: 16168, retailerMarginPercent: 35, retailerMarginDollar: 5659, retailPrice: 21826 },
  { country: 'Malaysia', distributorMarginPercent: 20, distributorMarginDollar: 3211, distributorPrice: 19267, retailerMarginPercent: 35, retailerMarginDollar: 6743, retailPrice: 26010 },
  { country: 'Saudi Arabia', distributorMarginPercent: 25, distributorMarginDollar: 4639, distributorPrice: 23193, retailerMarginPercent: 30, retailerMarginDollar: 6958, retailPrice: 30151 },
  { country: 'Philippines', distributorMarginPercent: 25, distributorMarginDollar: 6473, distributorPrice: 32363, retailerMarginPercent: 30, retailerMarginDollar: 9709, retailPrice: 42072 },
  { country: 'Indonesia', distributorMarginPercent: 22, distributorMarginDollar: 3208, distributorPrice: 17790, retailerMarginPercent: 35, retailerMarginDollar: 6227, retailPrice: 24017 },
  { country: 'Singapore', distributorMarginPercent: 22, distributorMarginDollar: 4302, distributorPrice: 23859, retailerMarginPercent: 35, retailerMarginDollar: 8351, retailPrice: 32210 },
  { country: 'Vietnam', distributorMarginPercent: 25, distributorMarginDollar: 4230, distributorPrice: 21149, retailerMarginPercent: 30, retailerMarginDollar: 6345, retailPrice: 27494 },
  { country: 'Cambodia', distributorMarginPercent: 25, distributorMarginDollar: 7012, distributorPrice: 35060, retailerMarginPercent: 30, retailerMarginDollar: 10518, retailPrice: 45578 },
  { country: 'Laos', distributorMarginPercent: 20, distributorMarginDollar: 3880, distributorPrice: 23277, retailerMarginPercent: 35, retailerMarginDollar: 8147, retailPrice: 31424 },
  { country: 'Myanmar', distributorMarginPercent: 20, distributorMarginDollar: 4350, distributorPrice: 26099, retailerMarginPercent: 35, retailerMarginDollar: 9135, retailPrice: 35233 },
  { country: 'Brunei', distributorMarginPercent: 20, distributorMarginDollar: 4895, distributorPrice: 29372, retailerMarginPercent: 35, retailerMarginDollar: 10280, retailPrice: 39653 },
  { country: 'Qatar', distributorMarginPercent: 22, distributorMarginDollar: 7262, distributorPrice: 40272, retailerMarginPercent: 35, retailerMarginDollar: 14095, retailPrice: 54367 },
  { country: 'Oman', distributorMarginPercent: 20, distributorMarginDollar: 2435, distributorPrice: 14611, retailerMarginPercent: 35, retailerMarginDollar: 5114, retailPrice: 19725 },
  { country: 'Bahrain', distributorMarginPercent: 20, distributorMarginDollar: 3247, distributorPrice: 19482, retailerMarginPercent: 35, retailerMarginDollar: 6819, retailPrice: 26300 },
  { country: 'Turkey', distributorMarginPercent: 20, distributorMarginDollar: 4267, distributorPrice: 25600, retailerMarginPercent: 35, retailerMarginDollar: 8960, retailPrice: 34560 },
  { country: 'South Africa', distributorMarginPercent: 22, distributorMarginDollar: 2238, distributorPrice: 12412, retailerMarginPercent: 35, retailerMarginDollar: 4344, retailPrice: 16756 },
  { country: 'Rest of MEA', distributorMarginPercent: 20, distributorMarginDollar: 2890, distributorPrice: 17339, retailerMarginPercent: 30, retailerMarginDollar: 5202, retailPrice: 22541 }
]

interface CompetitiveIntelligenceProps {
  height?: number
}

export function CompetitiveIntelligence({ height }: CompetitiveIntelligenceProps) {
  const [activeTab, setActiveTab] = useState<'intelligence' | 'pricing'>('intelligence')

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-6">Competitive Intelligence 2022-2025</h2>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('intelligence')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'intelligence'
              ? 'text-[#4A7C9D] border-b-2 border-[#4A7C9D]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Competitive Intelligence
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'pricing'
              ? 'text-[#4A7C9D] border-b-2 border-[#4A7C9D]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Countrywise Retail Pricing
        </button>
      </div>

      {/* Competitive Intelligence Table */}
      {activeTab === 'intelligence' && (
        <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-[10px]">
          <thead>
            <tr>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[90px]">
                Origin
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[80px]">
                Brand
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                Model
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[90px]">
                Product Type
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[70px]">
                Drive Type
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[90px]">
                Load Capacity
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[70px]">
                Seating
              </th>
              <th colSpan={4} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white">
                No of Unit Sold
              </th>
              <th colSpan={4} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white">
                Specification Analysis
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[80px]">
                Distributor Margin %,(2025)
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[90px]">
                Distributor Margin $(2025)
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[90px]">
                Distributor Price(2025)
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[80px]">
                Retailer Margin %(2025)
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[90px]">
                Retailer Margin $(2025)
              </th>
              <th rowSpan={2} className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[100px]">
                Retail Price (USD)(2025)
              </th>
            </tr>
            <tr>
              <th className="bg-[#4A7C9D] border border-gray-400 px-1 py-1 text-center text-[10px] font-bold text-white min-w-[60px]">2022</th>
              <th className="bg-[#4A7C9D] border border-gray-400 px-1 py-1 text-center text-[10px] font-bold text-white min-w-[60px]">2023</th>
              <th className="bg-[#4A7C9D] border border-gray-400 px-1 py-1 text-center text-[10px] font-bold text-white min-w-[60px]">2024</th>
              <th className="bg-[#4A7C9D] border border-gray-400 px-1 py-1 text-center text-[10px] font-bold text-white min-w-[60px]">2025</th>
              <th className="bg-[#4A7C9D] border border-gray-400 px-1 py-1 text-center text-[10px] font-bold text-white min-w-[85px]">Payload Capacity (lbs)</th>
              <th className="bg-[#4A7C9D] border border-gray-400 px-1 py-1 text-center text-[10px] font-bold text-white min-w-[85px]">Towing Capacity (lbs)</th>
              <th className="bg-[#4A7C9D] border border-gray-400 px-1 py-1 text-center text-[10px] font-bold text-white min-w-[85px]">Motor Power Output (HP)</th>
              <th className="bg-[#4A7C9D] border border-gray-400 px-1 py-1 text-center text-[10px] font-bold text-white min-w-[70px]">Top Speed (mph)</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, index) => {
              // Count Chinese and Non-Chinese entries
              const chineseCount = productData.filter(p => p.origin === 'Chinese').length
              const nonChineseCount = productData.filter(p => p.origin === 'Non-Chinese').length

              // Determine if we should render the origin cell
              const isFirstChinese = index === 0 && product.origin === 'Chinese'
              const isFirstNonChinese = index === chineseCount && product.origin === 'Non-Chinese'

              return (
                <tr key={index} className="hover:bg-gray-100">
                  {isFirstChinese && (
                    <td rowSpan={chineseCount} className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-bold">
                      {product.origin}
                    </td>
                  )}
                  {isFirstNonChinese && (
                    <td rowSpan={nonChineseCount} className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-bold">
                      {product.origin}
                    </td>
                  )}
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black font-medium">
                    {product.brand}
                  </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black">
                  {product.model}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.productType}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.driveType}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.loadCapacity}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.seating}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-medium">
                  {product.soldUnits2022.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-medium">
                  {product.soldUnits2023.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-medium">
                  {product.soldUnits2024.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-medium">
                  {product.soldUnits2025.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.payloadCapacity.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.towingCapacity.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.motorPowerOutput}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.topSpeed}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.distributorMarginPercent}%
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  ${product.distributorMarginDollar.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  ${product.distributorPrice.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  {product.retailerMarginPercent}%
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                  ${product.retailerMarginDollar.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-semibold">
                  ${product.retailPrice.toLocaleString()}
                </td>
              </tr>
            )
            })}
          </tbody>
        </table>
      </div>
      )}

      {/* Countrywise Retail Pricing Table */}
      {activeTab === 'pricing' && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-[10px]">
            <thead>
              <tr>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[120px]">
                  Country/Region (2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[100px]">
                  Distributor Margin % (2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[120px]">
                  Distributor Margin $ (2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[120px]">
                  Distributor Price (2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[100px]">
                  Retailer Margin % (2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[120px]">
                  Retailer Margin $ (2025)
                </th>
                <th className="bg-[#4A7C9D] border border-gray-400 px-2 py-2 text-center text-[10px] font-bold text-white min-w-[140px]">
                  Retail Price (USD) (2025)
                </th>
              </tr>
            </thead>
            <tbody>
              {countryPricingData.map((country, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black font-medium">
                    {country.country}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {country.distributorMarginPercent}%
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    ${country.distributorMarginDollar.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    ${country.distributorPrice.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    {country.retailerMarginPercent}%
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center">
                    ${country.retailerMarginDollar.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-[10px] text-black text-center font-semibold">
                    ${country.retailPrice.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CompetitiveIntelligence
