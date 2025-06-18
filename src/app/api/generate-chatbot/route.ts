import { NextRequest, NextResponse } from 'next/server'

// Runtime configuration for Vercel
export const runtime = 'nodejs'
export const maxDuration = 10

interface ChatbotGenerationRequest {
  industry: string
  persona: string
  businessName?: string
  primaryGoals?: string[]
  customization?: {
    tone: string
    features: string[]
    integrations: string[]
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatbotGenerationRequest = await request.json()
    const { industry, persona, businessName, primaryGoals, customization } = body

    // Simulate AI-powered chatbot generation
    // In production, this would connect to your chatbot platform's API
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate processing time

    const chatbotConfig = generateChatbotConfig(industry, persona, businessName, primaryGoals, customization)

    return NextResponse.json({
      success: true,
      chatbot: chatbotConfig,
      message: 'Chatbot generated successfully'
    })
  } catch (error) {
    console.error('Chatbot generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate chatbot' },
      { status: 500 }
    )
  }
}

function generateChatbotConfig(
  industry: string,
  persona: string,
  businessName?: string,
  primaryGoals?: string[],
  customization?: any
) {
  const industryConfigs = {
    healthcare: {
      name: `${businessName || 'MedCare'} AI Assistant`,
      greeting: "Hi! I'm here to help with appointments, patient questions, and general information. How can I assist you today?",
      capabilities: [
        'Appointment scheduling and management',
        'Insurance verification assistance',
        'Prescription refill requests',
        'General health information',
        'Office hours and location details',
        'HIPAA-compliant patient communication'
      ],
      workflows: [
        {
          name: 'Appointment Booking',
          description: 'Seamlessly schedule patient appointments',
          steps: ['Collect patient info', 'Check availability', 'Confirm appointment', 'Send reminders']
        },
        {
          name: 'Symptom Assessment',
          description: 'Basic symptom checker with provider recommendations',
          steps: ['Gather symptoms', 'Risk assessment', 'Provider recommendation', 'Urgent care routing']
        }
      ],
      compliance: ['HIPAA', 'Patient Privacy Standards'],
      tone: 'Professional, caring, and trustworthy'
    },
    legal: {
      name: `${businessName || 'LegalPro'} Virtual Assistant`,
      greeting: "Welcome! I can help you with case inquiries, consultation scheduling, and legal information. How may I assist you?",
      capabilities: [
        'Consultation scheduling',
        'Case status updates',
        'Document requests',
        'Legal information (non-advice)',
        'Fee structure inquiries',
        'Attorney-client privilege protection'
      ],
      workflows: [
        {
          name: 'Client Intake',
          description: 'Streamlined new client onboarding',
          steps: ['Initial consultation', 'Document collection', 'Conflict check', 'Engagement letter']
        },
        {
          name: 'Case Updates',
          description: 'Automated case status communication',
          steps: ['Status inquiry', 'Authentication', 'Update delivery', 'Next steps']
        }
      ],
      compliance: ['Attorney-Client Privilege', 'Bar Association Standards'],
      tone: 'Professional, authoritative, and confidential'
    },
    retail: {
      name: `${businessName || 'RetailBot'} Customer Helper`,
      greeting: "Hello! I'm here to help with orders, products, returns, and any questions you have. What can I do for you?",
      capabilities: [
        'Order tracking and status',
        'Product recommendations',
        'Return and exchange processing',
        'Inventory availability',
        'Promotional information',
        'Customer account management'
      ],
      workflows: [
        {
          name: 'Order Support',
          description: 'Complete order lifecycle assistance',
          steps: ['Order lookup', 'Status update', 'Issue resolution', 'Follow-up']
        },
        {
          name: 'Product Discovery',
          description: 'AI-powered product recommendations',
          steps: ['Need assessment', 'Product matching', 'Comparison', 'Purchase assistance']
        }
      ],
      compliance: ['PCI Compliance', 'Consumer Protection Standards'],
      tone: 'Friendly, helpful, and enthusiastic'
    }
  }

  const personaCustomizations = {
    cfo: {
      focus: 'Cost reduction and ROI optimization',
      metrics: ['Cost per interaction', 'Response time', 'Resolution rate', 'Customer satisfaction']
    },
    founder: {
      focus: 'Scalability and growth enablement',
      metrics: ['Lead generation', 'Conversion rate', 'Customer acquisition', 'Business growth']
    },
    operations: {
      focus: 'Process automation and efficiency',
      metrics: ['Automation rate', 'Process time', 'Error reduction', 'Team productivity']
    },
    'cx-manager': {
      focus: 'Customer experience and satisfaction',
      metrics: ['Customer satisfaction', 'Response time', 'Issue resolution', 'Service quality']
    }
  }

  const baseConfig = industryConfigs[industry as keyof typeof industryConfigs] || industryConfigs.retail
  const personaConfig = personaCustomizations[persona as keyof typeof personaCustomizations] || personaCustomizations.founder

  return {
    ...baseConfig,
    persona: personaConfig,
    customization: customization || {},
    primaryGoals: primaryGoals || [],
    createdAt: new Date().toISOString(),
    estimatedSetupTime: '2-3 business days',
    features: {
      multiChannel: true,
      analytics: true,
      humanHandoff: true,
      multilingual: true,
      api: true,
      customBranding: true
    }
  }
}
