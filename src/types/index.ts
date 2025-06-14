export interface IndustryData {
  aiCost: number
  monthlyStaffCost: number
  avgTicketsPerMonth: number
  automationRate: number
  compliance: string[]
}

export interface PersonaData {
  id: string
  title: string
  subtitle: string
  painPoints: string[]
  solutions: string[]
  cta: string
  color: string
  icon: string
}

export interface ROICalculation {
  currentCost: number
  aiCost: number
  monthlySavings: number
  annualSavings: number
  roi: number
  paybackPeriod: number
}

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface ConversionMetrics {
  pageViews: number
  demoStarts: number
  calculatorUses: number
  trialSignups: number
  conversionRate: number
}

export interface InteractionEvent {
  type: string
  data: Record<string, any>
  timestamp: Date
  sessionId: string
}

export type Industry = 'healthcare' | 'legal' | 'retail'
export type Persona = 'cfo' | 'founder' | 'operations' | 'cx-manager'