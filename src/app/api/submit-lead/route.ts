import { NextRequest, NextResponse } from 'next/server'
import { saveLead } from '@/lib/supabase'

// Runtime configuration for Vercel
export const runtime = 'nodejs'
export const maxDuration = 10

interface LeadFormData {
  name: string
  email: string
  company: string
  phone?: string
  industry: string
  persona?: string
  monthlyCustomers?: string
  currentSolution?: string
  mainChallenge?: string
  message?: string
  roiCalculation?: any
  source?: string
}

// Input sanitization helper
function sanitizeString(input: string): string {
  if (typeof input !== 'string') return ''
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
             .replace(/[<>]/g, '')
             .trim()
             .substring(0, 500) // Limit length
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadFormData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { error: 'Name, email, and company are required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Sanitize input data
    const leadData = {
      name: sanitizeString(body.name),
      email: sanitizeString(body.email).toLowerCase(),
      company: sanitizeString(body.company),
      phone: body.phone ? sanitizeString(body.phone) : undefined,
      industry: sanitizeString(body.industry || 'Not specified'),
      persona: sanitizeString(body.persona || 'General Business User'),
      message: body.message ? sanitizeString(body.message) : undefined,
      roi_calculation: body.roiCalculation || null,
      source: body.source || 'website_lead_form',
      status: 'new' as const,
    }

    // Save lead to database
    const savedLead = await saveLead(leadData)
    
    if (!savedLead) {
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    // Send notifications (implement as needed)
    if (process.env.NODE_ENV === 'production') {
      await sendEmailNotification(leadData)
      await sendToCRM(leadData)
    }

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      leadId: savedLead.id
    })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
}

// Helper function to send email notification
async function sendEmailNotification(leadData: any) {
  // Implement email notification using your preferred service
  // Examples: SendGrid, AWS SES, Resend, etc.
  
  const emailService = process.env.EMAIL_SERVICE || 'resend'
  
  try {
    if (emailService === 'resend' && process.env.RESEND_API_KEY) {
      // Example Resend implementation
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@aichatbotsolutions.ai',
          to: process.env.NOTIFICATION_EMAIL || 'leads@aichatbotsolutions.ai',
          subject: `New Lead: ${leadData.name} from ${leadData.company}`,
          html: `
            <h2>New Lead Submitted</h2>
            <p><strong>Name:</strong> ${leadData.name}</p>
            <p><strong>Email:</strong> ${leadData.email}</p>
            <p><strong>Company:</strong> ${leadData.company}</p>
            <p><strong>Industry:</strong> ${leadData.industry}</p>
            ${leadData.phone ? `<p><strong>Phone:</strong> ${leadData.phone}</p>` : ''}
            ${leadData.message ? `<p><strong>Message:</strong> ${leadData.message}</p>` : ''}
            <p><strong>Source:</strong> ${leadData.source}</p>
            <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
          `
        })
      })

      if (!response.ok) {
        throw new Error(`Email service error: ${response.statusText}`)
      }
    }
  } catch (error) {
    console.error('Email notification failed:', error)
  }
}

// Helper function to send to CRM
async function sendToCRM(leadData: any) {
  // Implement CRM integration (HubSpot, Salesforce, etc.)
  
  try {
    if (process.env.HUBSPOT_API_KEY) {
      // Example HubSpot implementation
      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            email: leadData.email,
            firstname: leadData.name.split(' ')[0],
            lastname: leadData.name.split(' ').slice(1).join(' '),
            company: leadData.company,
            phone: leadData.phone,
            industry: leadData.industry,
            lead_source: leadData.source,
          }
        })
      })

      if (!response.ok) {
        throw new Error(`CRM integration error: ${response.statusText}`)
      }
    }
  } catch (error) {
    console.error('CRM integration failed:', error)
  }
}