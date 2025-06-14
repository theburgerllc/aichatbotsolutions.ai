import { NextRequest, NextResponse } from 'next/server'
import { industryData } from '@/data/industry'
import { calculateROI } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { industry, ticketsPerMonth, currentStaffCost } = body

    if (!industry || !industryData[industry]) {
      return NextResponse.json(
        { error: 'Invalid industry specified' },
        { status: 400 }
      )
    }

    const data = industryData[industry]
    const roiData = calculateROI(data, ticketsPerMonth || data.avgTicketsPerMonth)

    // Override with custom staff cost if provided
    if (currentStaffCost) {
      const customRoi = calculateROI({
        ...data,
        monthlyStaffCost: currentStaffCost
      }, ticketsPerMonth || data.avgTicketsPerMonth)
      
      return NextResponse.json({
        success: true,
        data: customRoi,
        industry,
        inputs: {
          ticketsPerMonth: ticketsPerMonth || data.avgTicketsPerMonth,
          currentStaffCost: currentStaffCost,
          aiCost: data.aiCost,
          automationRate: data.automationRate
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: roiData,
      industry,
      inputs: {
        ticketsPerMonth: ticketsPerMonth || data.avgTicketsPerMonth,
        currentStaffCost: data.monthlyStaffCost,
        aiCost: data.aiCost,
        automationRate: data.automationRate
      }
    })
  } catch (error) {
    console.error('ROI calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate ROI' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const industry = searchParams.get('industry')
  
  if (!industry || !industryData[industry]) {
    return NextResponse.json(
      { error: 'Invalid or missing industry parameter' },
      { status: 400 }
    )
  }

  const data = industryData[industry]
  const roiData = calculateROI(data)

  return NextResponse.json({
    success: true,
    data: roiData,
    industry,
    defaults: {
      ticketsPerMonth: data.avgTicketsPerMonth,
      currentStaffCost: data.monthlyStaffCost,
      aiCost: data.aiCost,
      automationRate: data.automationRate
    }
  })
}