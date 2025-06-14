import { NextRequest, NextResponse } from 'next/server'

interface InteractionData {
  event: string
  data?: Record<string, any>
  timestamp?: string
  sessionId?: string
  userAgent?: string
  url?: string
}

// Input sanitization helper
function sanitizeString(input: string): string {
  if (typeof input !== 'string') return 'invalid'
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
             .replace(/[<>\"']/g, '')
             .substring(0, 500) // Limit length
}

function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[sanitizeString(key)] = sanitizeString(value)
    } else if (typeof value === 'number' && !isNaN(value)) {
      sanitized[sanitizeString(key)] = value
    } else if (typeof value === 'boolean') {
      sanitized[sanitizeString(key)] = value
    }
  }
  return sanitized
}

export async function POST(request: NextRequest) {
  try {
    const body: InteractionData = await request.json()
    
    // Validate and sanitize input
    if (!body.event || typeof body.event !== 'string') {
      return NextResponse.json(
        { error: 'Invalid event type' },
        { status: 400 }
      )
    }
    
    const interaction = {
      event: sanitizeString(body.event),
      data: body.data ? sanitizeObject(body.data) : {},
      timestamp: body.timestamp || new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: sanitizeString(body.userAgent || request.headers.get('user-agent') || 'unknown'),
      url: sanitizeString(body.url || request.headers.get('referer') || 'unknown')
    }

    // In a production environment, you would:
    // 1. Send to analytics service (Google Analytics, Mixpanel, etc.)
    // 2. Store in database for later analysis
    // 3. Send to marketing automation tools
    // 4. Trigger conversion tracking pixels
    
    // For demo purposes, we'll just log and return success
    console.log('Interaction tracked:', interaction)
    
    // Simulate sending to external services
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Google Analytics
      // await sendToGoogleAnalytics(interaction)
      
      // Example: Send to Mixpanel
      // await sendToMixpanel(interaction)
      
      // Example: Store in database
      // await storeInDatabase(interaction)
    }

    return NextResponse.json({
      success: true,
      message: 'Interaction tracked successfully'
    })
  } catch (error) {
    console.error('Interaction tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track interaction' },
      { status: 500 }
    )
  }
}

// Helper functions for production analytics (implement as needed)
async function sendToGoogleAnalytics(interaction: InteractionData) {
  // Implementation for Google Analytics 4
  // Use Measurement Protocol or gtag
}

async function sendToMixpanel(interaction: InteractionData) {
  // Implementation for Mixpanel tracking
}

async function storeInDatabase(interaction: InteractionData) {
  // Implementation for database storage
  // Could use PostgreSQL, MongoDB, etc.
}