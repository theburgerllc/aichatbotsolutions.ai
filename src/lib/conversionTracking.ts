interface ConversionEvent {
  stage: string
  value: number
  timestamp: number
  sessionId: string
  metadata: Record<string, any>
}

interface ConversionWeights {
  page_view: number
  voice_trigger_attempt: number
  voice_trigger_activated: number
  persona_hover: number
  persona_select: number
  roi_slider_move: number
  roi_calculate: number
  demo_start: number
  form_start: number
  form_field_complete: number
  email_enter: number
  phone_enter: number
  cta_click: number
  exit_intent_triggered: number
  live_activity_feed_clicked: number
  urgency_timer_clicked: number
  hero_sequence_completed: number
}

export class ConversionTracker {
  private sessionId: string
  private events: ConversionEvent[] = []
  private startTime: number
  private engagementScore: number = 0
  private hasTriggeredHighIntent = false
  private hasTriggeredMediumIntent = false
  
  private weights: ConversionWeights = {
    page_view: 1,
    voice_trigger_attempt: 3,
    voice_trigger_activated: 8,
    persona_hover: 2,
    persona_select: 12,
    roi_slider_move: 4,
    roi_calculate: 18,
    demo_start: 25,
    form_start: 30,
    form_field_complete: 8,
    email_enter: 35,
    phone_enter: 20,
    cta_click: 15,
    exit_intent_triggered: 5,
    live_activity_feed_clicked: 6,
    urgency_timer_clicked: 10,
    hero_sequence_completed: 12
  }
  
  constructor() {
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
    this.loadFromStorage()
    this.trackMicroConversion('page_view', 1, { url: window.location.pathname })
  }
  
  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 16) + '_' + Date.now()
  }
  
  trackMicroConversion(stage: string, value: number = 1, metadata: Record<string, any> = {}) {
    const event: ConversionEvent = {
      stage,
      value,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      metadata: {
        ...metadata,
        timeOnPage: Date.now() - this.startTime,
        url: window.location.pathname
      }
    }
    
    this.events.push(event)
    this.saveToStorage()
    this.updateProgressScore()
    this.sendToAnalytics(event)
    
    // Log for debugging
    console.log(`🎯 Conversion Event: ${stage}`, {
      score: this.engagementScore,
      value,
      metadata
    })
  }
  
  private updateProgressScore() {
    this.engagementScore = this.calculateEngagementScore()
    
    // Trigger personalization based on score
    if (this.engagementScore > 70 && !this.hasTriggeredHighIntent) {
      this.triggerHighIntentExperience()
      this.hasTriggeredHighIntent = true
    } else if (this.engagementScore > 40 && !this.hasTriggeredMediumIntent) {
      this.triggerMediumIntentExperience()
      this.hasTriggeredMediumIntent = true
    }
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('conversionScoreUpdate', {
      detail: { 
        score: this.engagementScore,
        level: this.getIntentLevel(),
        events: this.events.length
      }
    }))
  }
  
  private calculateEngagementScore(): number {
    const baseScore = this.events.reduce((score, event) => {
      const weight = this.weights[event.stage as keyof ConversionWeights] || 0
      return score + (weight * event.value)
    }, 0)
    
    // Time-based bonus (up to 20 points for staying longer)
    const timeOnSite = Date.now() - this.startTime
    const timeBonus = Math.min(20, Math.floor(timeOnSite / 30000)) // 1 point per 30 seconds, max 20
    
    // Variety bonus (trying different features)
    const uniqueStages = new Set(this.events.map(e => e.stage)).size
    const varietyBonus = Math.min(15, uniqueStages * 2) // 2 points per unique action, max 15
    
    return Math.min(100, baseScore + timeBonus + varietyBonus)
  }
  
  private triggerHighIntentExperience() {
    console.log('🔥 High Intent User Detected! Score:', this.engagementScore)
    
    // Show premium offers, priority support options, etc.
    window.dispatchEvent(new CustomEvent('highIntentTrigger', {
      detail: { 
        score: this.engagementScore,
        sessionId: this.sessionId,
        recommendations: this.getHighIntentRecommendations()
      }
    }))
    
    this.trackMicroConversion('high_intent_triggered', 1, { score: this.engagementScore })
  }
  
  private triggerMediumIntentExperience() {
    console.log('⚡ Medium Intent User Detected! Score:', this.engagementScore)
    
    // Show helpful nudges, social proof, etc.
    window.dispatchEvent(new CustomEvent('mediumIntentTrigger', {
      detail: { 
        score: this.engagementScore,
        sessionId: this.sessionId,
        recommendations: this.getMediumIntentRecommendations()
      }
    }))
    
    this.trackMicroConversion('medium_intent_triggered', 1, { score: this.engagementScore })
  }
  
  private getHighIntentRecommendations(): string[] {
    const recentStages = this.events.slice(-5).map(e => e.stage)
    
    if (recentStages.includes('roi_calculate')) {
      return ['priority_demo_booking', 'custom_roi_report', 'direct_sales_contact']
    }
    if (recentStages.includes('demo_start')) {
      return ['extended_trial', 'implementation_consultation', 'priority_support']
    }
    
    return ['personalized_demo', 'roi_calculator', 'direct_contact']
  }
  
  private getMediumIntentRecommendations(): string[] {
    const recentStages = this.events.slice(-3).map(e => e.stage)
    
    if (recentStages.includes('persona_select')) {
      return ['industry_case_studies', 'roi_calculator', 'interactive_demo']
    }
    if (recentStages.includes('voice_trigger_activated')) {
      return ['persona_selection', 'demo_preview', 'feature_highlights']
    }
    
    return ['social_proof', 'feature_comparison', 'demo_options']
  }
  
  getIntentLevel(): 'low' | 'medium' | 'high' {
    if (this.engagementScore > 70) return 'high'
    if (this.engagementScore > 40) return 'medium'
    return 'low'
  }
  
  getEngagementScore(): number {
    return this.engagementScore
  }
  
  getSessionInsights() {
    const totalTime = Date.now() - this.startTime
    const uniqueStages = new Set(this.events.map(e => e.stage)).size
    const lastActivity = this.events[this.events.length - 1]
    
    return {
      sessionId: this.sessionId,
      totalTime,
      engagementScore: this.engagementScore,
      intentLevel: this.getIntentLevel(),
      totalEvents: this.events.length,
      uniqueActions: uniqueStages,
      lastActivity: lastActivity?.stage || 'none',
      timeOnPage: totalTime,
      isHighValue: this.engagementScore > 60,
      recommendedNextActions: this.getRecommendedNextActions()
    }
  }
  
  private getRecommendedNextActions(): string[] {
    const recentEvents = this.events.slice(-3)
    const lastStage = recentEvents[recentEvents.length - 1]?.stage
    
    switch (lastStage) {
      case 'roi_calculate':
        return ['demo_booking', 'personalized_demo', 'contact_sales']
      case 'demo_start':
        return ['form_complete', 'book_followup', 'download_resources']
      case 'persona_select':
        return ['roi_calculator', 'interactive_demo', 'case_studies']
      case 'voice_trigger_activated':
        return ['persona_selection', 'skip_to_demo', 'view_features']
      default:
        return ['try_voice_demo', 'view_pricing', 'explore_features']
    }
  }
  
  private sendToAnalytics(event: ConversionEvent) {
    // Send to your analytics platform
    if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'micro_conversion', {
        event_category: 'engagement',
        event_label: event.stage,
        value: event.value,
        custom_parameters: {
          session_id: this.sessionId,
          engagement_score: this.engagementScore,
          intent_level: this.getIntentLevel()
        }
      })
    }
    
    // Send to your custom analytics API
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/track-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(err => console.warn('Analytics tracking failed:', err))
    }
  }
  
  private saveToStorage() {
    try {
      const data = {
        sessionId: this.sessionId,
        events: this.events,
        startTime: this.startTime,
        engagementScore: this.engagementScore
      }
      localStorage.setItem('conversion_tracker', JSON.stringify(data))
    } catch (err) {
      console.warn('Failed to save conversion data:', err)
    }
  }
  
  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('conversion_tracker')
      if (stored) {
        const data = JSON.parse(stored)
        
        // Only load if session is recent (within 4 hours)
        if (Date.now() - data.startTime < 4 * 60 * 60 * 1000) {
          this.events = data.events || []
          this.engagementScore = data.engagementScore || 0
        }
      }
    } catch (err) {
      console.warn('Failed to load conversion data:', err)
    }
  }
  
  // Method to reset session (for testing or new visits)
  resetSession() {
    this.events = []
    this.engagementScore = 0
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
    this.hasTriggeredHighIntent = false
    this.hasTriggeredMediumIntent = false
    localStorage.removeItem('conversion_tracker')
  }
}

// Create singleton instance
let tracker: ConversionTracker

export function getConversionTracker(): ConversionTracker {
  if (!tracker) {
    tracker = new ConversionTracker()
  }
  return tracker
}

// Export convenience function for easy tracking
export function trackConversion(stage: string, value?: number, metadata?: Record<string, any>) {
  return getConversionTracker().trackMicroConversion(stage, value, metadata)
}

// React hook for components that need to respond to engagement changes
export function useConversionTracking() {
  const tracker = getConversionTracker()
  
  return {
    track: tracker.trackMicroConversion.bind(tracker),
    score: tracker.getEngagementScore(),
    intentLevel: tracker.getIntentLevel(),
    insights: tracker.getSessionInsights(),
    tracker
  }
}