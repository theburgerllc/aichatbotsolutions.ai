import { NextRequest, NextResponse } from 'next/server'
import { trackInteraction } from '@/lib/supabase'

// Runtime configuration for Vercel
export const runtime = 'nodejs'
export const maxDuration = 10

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

    // Store in database
    const success = await trackInteraction({
      session_id: body.sessionId || 'anonymous',
      event_type: interaction.event,
      event_data: interaction.data,
      page_url: interaction.url,
      user_agent: interaction.userAgent,
      ip_address: interaction.ip,
    })

    if (!success) {
      console.error('Failed to store interaction in database')
    }

    // Send to analytics services
    if (process.env.NODE_ENV === 'production') {
      await sendToGoogleAnalytics(interaction)
      await sendToMixpanel(interaction)
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
