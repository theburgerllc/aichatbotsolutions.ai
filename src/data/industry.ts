import { IndustryData } from '@/types'

export const industryData: Record<string, IndustryData> = {
  healthcare: {
    aiCost: 297,
    monthlyStaffCost: 4000,
    avgTicketsPerMonth: 150,
    automationRate: 0.8,
    compliance: ['HIPAA', 'Patient Privacy']
  },
  legal: {
    aiCost: 497,
    monthlyStaffCost: 6000,
    avgTicketsPerMonth: 200,
    automationRate: 0.7,
    compliance: ['Attorney-Client Privilege', 'Bar Standards']
  },
  retail: {
    aiCost: 297,
    monthlyStaffCost: 5000,
    avgTicketsPerMonth: 500,
    automationRate: 0.9,
    compliance: ['PCI Compliance', 'Return Policy']
  }
}

export const getIndustryData = (industry: string): IndustryData => {
  return industryData[industry] || industryData.retail
}