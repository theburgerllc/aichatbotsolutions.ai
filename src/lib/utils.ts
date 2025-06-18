import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ROICalculation, IndustryData } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateROI(
  industryData: IndustryData,
  ticketsPerMonth: number = industryData.avgTicketsPerMonth
): ROICalculation {
  const currentCost = industryData.monthlyStaffCost
  const aiCost = industryData.aiCost
  const monthlySavings = currentCost - aiCost
  const annualSavings = monthlySavings * 12
  const roi = ((annualSavings - (aiCost * 12)) / (aiCost * 12)) * 100
  const paybackPeriod = aiCost / monthlySavings

  return {
    currentCost,
    aiCost,
    monthlySavings,
    annualSavings,
    roi,
    paybackPeriod
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function trackInteraction(event: string, data: Record<string, any> = {}) {
  if (typeof window !== 'undefined') {
    // Track interaction for analytics
    const interaction = {
      event,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }

    // Store locally for demo purposes
    const interactions = JSON.parse(localStorage.getItem('interactions') || '[]')
    interactions.push(interaction)
    localStorage.setItem('interactions', JSON.stringify(interactions.slice(-100))) // Keep last 100

    // In production, send to analytics service
    console.log('Interaction tracked:', interaction)
  }
}
