import { PersonaData } from '@/types'

export const personaData: Record<string, PersonaData> = {
  'cfo': {
    id: 'cfo',
    title: 'Reduce Costs',
    subtitle: 'Cut customer service expenses by 80%',
    painPoints: [
      'Rising customer service costs eating into profit margins',
      'Paying $4000-6000 monthly for staff handling routine inquiries',
      'Scaling support requires hiring more expensive agents',
      'Budget pressure from leadership to optimize operations'
    ],
    solutions: [
      'Automate 80% of routine customer inquiries',
      'Reduce staff costs from $5000 to $297/month',
      'Scale support without hiring additional agents',
      'ROI visible within 30 days of implementation'
    ],
    cta: 'Show Me The Savings',
    color: 'primary',
    icon: 'TrendingDown'
  },
  'founder': {
    id: 'founder',
    title: 'Scale Business',
    subtitle: '24/7 support without scaling headcount',
    painPoints: [
      'Customer support becomes bottleneck as you grow',
      'Hiring and training support staff is expensive and slow',
      'Can\'t provide 24/7 support with current resources',
      'Support quality inconsistent across different agents'
    ],
    solutions: [
      'Instant 24/7 customer support without hiring',
      'Handle 10x more inquiries with same resources',
      'Consistent, accurate responses every time',
      'Focus team on revenue-generating activities'
    ],
    cta: 'Scale My Support',
    color: 'success',
    icon: 'TrendingUp'
  },
  'operations': {
    id: 'operations',
    title: 'Automate Tasks',
    subtitle: 'Eliminate repetitive support workflows',
    painPoints: [
      'Team spends 80% of time on repetitive questions',
      'Manual processes slow down response times',
      'Difficult to maintain consistent service quality',
      'Staff burnout from handling same issues repeatedly'
    ],
    solutions: [
      'Automate routine inquiries and workflows',
      'Instant responses to common questions',
      'Free up team for complex, high-value tasks',
      'Standardized processes across all interactions'
    ],
    cta: 'Automate My Workflows',
    color: 'purple',
    icon: 'Zap'
  },
  'cx-manager': {
    id: 'cx-manager',
    title: 'Improve Experience',
    subtitle: 'Deliver instant, accurate customer support',
    painPoints: [
      'Customers frustrated with long wait times',
      'Inconsistent support quality across channels',
      'Limited availability outside business hours',
      'Difficult to track and improve customer satisfaction'
    ],
    solutions: [
      'Instant responses to customer inquiries 24/7',
      'Consistent, accurate information every time',
      'Seamless handoff to human agents when needed',
      'Built-in analytics to track satisfaction metrics'
    ],
    cta: 'Enhance Customer Experience',
    color: 'primary',
    icon: 'Heart'
  }
}

export const getPersonaData = (persona: string): PersonaData => {
  return personaData[persona] || personaData.founder
}
