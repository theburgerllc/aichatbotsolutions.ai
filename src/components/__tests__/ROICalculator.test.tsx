import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ROICalculator from '../ROICalculator'

describe('ROICalculator Component', () => {
  it('renders initial state correctly', () => {
    render(<ROICalculator />)
    
    expect(screen.getByText('ROI Calculator')).toBeInTheDocument()
    expect(screen.getByLabelText(/industry/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/monthly customer interactions/i)).toBeInTheDocument()
  })

  it('calculates ROI when inputs change', async () => {
    const user = userEvent.setup()
    render(<ROICalculator />)
    
    // Change industry
    await user.selectOptions(screen.getByLabelText(/industry/i), 'healthcare')
    
    // Change monthly interactions
    const interactionsInput = screen.getByLabelText(/monthly customer interactions/i)
    await user.clear(interactionsInput)
    await user.type(interactionsInput, '1000')
    
    // Should show calculated values
    expect(screen.getByText(/Monthly Savings/)).toBeInTheDocument()
    expect(screen.getByText(/Annual ROI/)).toBeInTheDocument()
  })

  it('updates calculations for different industries', async () => {
    const user = userEvent.setup()
    render(<ROICalculator />)
    
    // Set initial interactions
    const interactionsInput = screen.getByLabelText(/monthly customer interactions/i)
    await user.clear(interactionsInput)
    await user.type(interactionsInput, '500')
    
    // Check healthcare calculations
    await user.selectOptions(screen.getByLabelText(/industry/i), 'healthcare')
    const healthcareSavings = screen.getByText(/\$[\d,]+/).textContent
    
    // Switch to retail and verify different calculations
    await user.selectOptions(screen.getByLabelText(/industry/i), 'retail')
    const retailSavings = screen.getByText(/\$[\d,]+/).textContent
    
    // Savings should be different between industries
    expect(healthcareSavings).not.toBe(retailSavings)
  })

  it('handles zero and negative values appropriately', async () => {
    const user = userEvent.setup()
    render(<ROICalculator />)
    
    const interactionsInput = screen.getByLabelText(/monthly customer interactions/i)
    
    // Test with zero
    await user.clear(interactionsInput)
    await user.type(interactionsInput, '0')
    
    // Should handle gracefully
    expect(screen.getByDisplayValue('0')).toBeInTheDocument()
    
    // Test with negative (should be handled)
    await user.clear(interactionsInput)
    await user.type(interactionsInput, '-100')
    
    // Component should either prevent negative values or handle them gracefully
    const value = (interactionsInput as HTMLInputElement).value
    expect(parseInt(value)).toBeGreaterThanOrEqual(0)
  })

  it('displays compliance information for selected industry', async () => {
    const user = userEvent.setup()
    render(<ROICalculator />)
    
    // Select healthcare
    await user.selectOptions(screen.getByLabelText(/industry/i), 'healthcare')
    
    // Should show healthcare compliance
    expect(screen.getByText(/HIPAA/)).toBeInTheDocument()
    
    // Switch to legal
    await user.selectOptions(screen.getByLabelText(/industry/i), 'legal')
    
    // Should show legal compliance
    expect(screen.getByText(/Attorney-Client Privilege/)).toBeInTheDocument()
  })

  it('calls onCalculate callback when values change', async () => {
    const user = userEvent.setup()
    const mockOnCalculate = jest.fn()
    
    render(<ROICalculator onCalculate={mockOnCalculate} />)
    
    // Change values
    await user.selectOptions(screen.getByLabelText(/industry/i), 'healthcare')
    
    const interactionsInput = screen.getByLabelText(/monthly customer interactions/i)
    await user.clear(interactionsInput)
    await user.type(interactionsInput, '1000')
    
    // Should call callback with calculation results
    expect(mockOnCalculate).toHaveBeenCalledWith(
      expect.objectContaining({
        industry: 'healthcare',
        monthlyInteractions: 1000,
        monthlySavings: expect.any(Number),
        annualROI: expect.any(Number),
      })
    )
  })

  it('renders chart visualization', () => {
    render(<ROICalculator />)
    
    // Should have a chart container (Recharts components)
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
  })
})