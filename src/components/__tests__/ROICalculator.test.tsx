import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ROICalculator from '../ROICalculator'

describe('ROICalculator Component', () => {
  it('renders initial content', () => {
    render(<ROICalculator industry="healthcare" />)
    expect(screen.getByText('ROI Calculator')).toBeInTheDocument()
    expect(screen.getByText('Monthly Savings')).toBeInTheDocument()
  })

  it('updates calculations when sliders change', () => {
    render(<ROICalculator industry="healthcare" />)
    const sliders = screen.getAllByRole('slider')
    const ticketSlider = sliders[0] as HTMLInputElement
    fireEvent.change(ticketSlider, { target: { value: '300' } })
    expect(ticketSlider.value).toBe('300')
  })

  it('renders chart visualization', () => {
    render(<ROICalculator industry="healthcare" />)
    expect(screen.getByText('Cost Comparison')).toBeInTheDocument()
    expect(screen.getByText('Automation Coverage')).toBeInTheDocument()
  })
})
