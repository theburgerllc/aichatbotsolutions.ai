import { POST } from '../submit-lead/route'
import { NextRequest } from 'next/server'

// Mock the Supabase module
jest.mock('@/lib/supabase', () => ({
  saveLead: jest.fn(),
}))

const { saveLead } = require('@/lib/supabase')

describe('/api/submit-lead', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const createMockRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

  it('successfully submits a valid lead', async () => {
    const mockLead = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      industry: 'healthcare',
      created_at: new Date().toISOString(),
    }

    saveLead.mockResolvedValue(mockLead)

    const validLead = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      industry: 'healthcare',
    }

    const request = createMockRequest(validLead)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.leadId).toBe('123')
    expect(saveLead).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      phone: undefined,
      industry: 'healthcare',
      persona: undefined,
      message: undefined,
      roi_calculation: null,
      source: 'website_lead_form',
      status: 'new',
    })
  })

  it('validates required fields', async () => {
    const incompleteLead = {
      name: 'John Doe',
      // missing email and company
    }

    const request = createMockRequest(incompleteLead)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Name, email, and company are required')
    expect(saveLead).not.toHaveBeenCalled()
  })

  it('validates email format', async () => {
    const invalidEmailLead = {
      name: 'John Doe',
      email: 'invalid-email',
      company: 'Acme Corp',
    }

    const request = createMockRequest(invalidEmailLead)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid email format')
    expect(saveLead).not.toHaveBeenCalled()
  })

  it('sanitizes input data', async () => {
    const maliciousLead = {
      name: 'John<script>alert("xss")</script>Doe',
      email: 'john@example.com',
      company: 'Acme<>Corp',
      message: 'Hello<script>alert("xss")</script>World',
    }

    saveLead.mockResolvedValue({ id: '123', ...maliciousLead })

    const request = createMockRequest(maliciousLead)
    const response = await POST(request)

    expect(saveLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'JohnDoe',
        company: 'AcmeCorp',
        message: 'HelloWorld',
      })
    )
  })

  it('handles database save failure', async () => {
    saveLead.mockResolvedValue(null)

    const validLead = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
    }

    const request = createMockRequest(validLead)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to save lead')
  })

  it('handles unexpected errors', async () => {
    saveLead.mockRejectedValue(new Error('Database connection failed'))

    const validLead = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
    }

    const request = createMockRequest(validLead)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to submit lead')
  })

  it('includes optional fields when provided', async () => {
    const completeLead = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      phone: '+1-555-0123',
      industry: 'healthcare',
      persona: 'cfo',
      message: 'Interested in chatbot solutions',
      roiCalculation: { savings: 5000, roi: 300 },
      source: 'demo_page',
    }

    saveLead.mockResolvedValue({ id: '123', ...completeLead })

    const request = createMockRequest(completeLead)
    const response = await POST(request)

    expect(saveLead).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: '+1-555-0123',
        persona: 'cfo',
        message: 'Interested in chatbot solutions',
        roi_calculation: { savings: 5000, roi: 300 },
        source: 'demo_page',
      })
    )
  })
})