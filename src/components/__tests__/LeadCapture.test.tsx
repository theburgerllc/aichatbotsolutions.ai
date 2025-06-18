import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LeadCapture from '../LeadCapture'

// Mock fetch
global.fetch = jest.fn()

const mockFetch = fetch as jest.MockedFunction<typeof fetch>

describe('LeadCapture Component', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('renders initial step correctly', () => {
    render(<LeadCapture />)
    
    expect(screen.getByText('Contact Information')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('John Smith')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('john@company.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Company Inc.')).toBeInTheDocument()
  })

  it('validates required fields on first step', async () => {
    const user = userEvent.setup()
    render(<LeadCapture />)
    
    const nextButton = screen.getByText('Next Step')
    expect(nextButton).toBeDisabled()
    
    // Fill in name
    await user.type(screen.getByPlaceholderText('John Smith'), 'John Doe')
    expect(nextButton).toBeDisabled()
    
    // Fill in email
    await user.type(screen.getByPlaceholderText('john@company.com'), 'john@example.com')
    expect(nextButton).toBeDisabled()
    
    // Fill in company
    await user.type(screen.getByPlaceholderText('Company Inc.'), 'Acme Corp')
    expect(nextButton).not.toBeDisabled()
  })

  it('progresses through all steps', async () => {
    const user = userEvent.setup()
    render(<LeadCapture />)
    
    // Step 1: Fill basic info
    await user.type(screen.getByPlaceholderText('John Smith'), 'John Doe')
    await user.type(screen.getByPlaceholderText('john@company.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Company Inc.'), 'Acme Corp')
    
    await user.click(screen.getByText('Next Step'))
    
    // Step 2: Should show industry selection
    expect(screen.getByText('Business Information')).toBeInTheDocument()
    expect(screen.getAllByRole('combobox')[0]).toBeInTheDocument()
    
    // Fill step 2
    await user.selectOptions(screen.getAllByRole('combobox')[0], 'healthcare')
    await user.selectOptions(screen.getAllByRole('combobox')[1], '500-1000')
    
    await user.click(screen.getByText('Next Step'))
    
    // Step 3: Should show challenges
    expect(screen.getByText('Current Situation')).toBeInTheDocument()
  })

  it('submits form successfully', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = jest.fn()
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, leadId: '123' }),
    } as Response)
    
    render(<LeadCapture onSubmit={mockOnSubmit} />)
    
    // Fill all required fields
    await user.type(screen.getByPlaceholderText('John Smith'), 'John Doe')
    await user.type(screen.getByPlaceholderText('john@company.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Company Inc.'), 'Acme Corp')
    await user.click(screen.getByText('Next Step'))
    
    await user.selectOptions(screen.getAllByRole('combobox')[0], 'healthcare')
    await user.selectOptions(screen.getAllByRole('combobox')[1], '500-1000')
    await user.click(screen.getByText('Next Step'))
    
    await screen.findByText('Current Situation')
    await user.selectOptions(screen.getByRole('combobox'), 'phone-only')
    await user.type(screen.getByPlaceholderText(/missing leads/i), 'Efficiency')
    
    await user.click(screen.getByText('Get My Custom Quote'))
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('John Doe'),
      })
    })
    
    // Should show success message
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup()
    
    mockFetch.mockRejectedValueOnce(new Error('API Error'))
    
    render(<LeadCapture />)
    
    // Fill and submit form
    await user.type(screen.getByPlaceholderText('John Smith'), 'John Doe')
    await user.type(screen.getByPlaceholderText('john@company.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Company Inc.'), 'Acme Corp')
    await user.click(screen.getByText('Next Step'))
    
    await user.selectOptions(screen.getAllByRole('combobox')[0], 'healthcare')
    await user.selectOptions(screen.getAllByRole('combobox')[1], '500-1000')
    await user.click(screen.getByText('Next Step'))
    
    await screen.findByText('Current Situation')
    await user.selectOptions(screen.getByRole('combobox'), 'phone-only')
    await user.type(screen.getByPlaceholderText(/missing leads/i), 'Efficiency')
    
    await user.click(screen.getByText('Get My Custom Quote'))
    
    // Should handle error and stop loading
    await waitFor(() => {
      expect(screen.getByText('Get My Custom Quote')).not.toBeDisabled()
    })
  })

  it('navigates back to previous steps', async () => {
    const user = userEvent.setup()
    render(<LeadCapture />)
    
    // Fill step 1 and go to step 2
    await user.type(screen.getByPlaceholderText('John Smith'), 'John Doe')
    await user.type(screen.getByPlaceholderText('john@company.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Company Inc.'), 'Acme Corp')
    await user.click(screen.getByText('Next Step'))
    
    // Should be on step 2
    expect(screen.getByText('Business Information')).toBeInTheDocument()
    
    // Go back to step 1
    await user.click(screen.getByText('Previous'))
    
    // Should be back on step 1
    expect(screen.getByText('Contact Information')).toBeInTheDocument()
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
  })
})