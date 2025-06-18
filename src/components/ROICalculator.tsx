'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Calculator, DollarSign, TrendingUp, Clock, Users } from 'lucide-react'
import { industryData } from '@/data/industry'
import { calculateROI, formatCurrency, formatPercentage, trackInteraction } from '@/lib/utils'
import { trackConversion } from '@/lib/conversionTracking'
import { Industry } from '@/types'
import ROIRevealSequence from './ROIRevealSequence'

interface ROICalculatorProps {
  industry: Industry
  className?: string
}

export default function ROICalculator({ industry, className = '' }: ROICalculatorProps) {
  const [ticketsPerMonth, setTicketsPerMonth] = useState(industryData[industry].avgTicketsPerMonth)
  const [currentStaffCost, setCurrentStaffCost] = useState(industryData[industry].monthlyStaffCost)
  const [showResults, setShowResults] = useState(false)
  const [showRevealSequence, setShowRevealSequence] = useState(false)

  const data = industryData[industry]
  const roiData = calculateROI(data, ticketsPerMonth)

  useEffect(() => {
    const timer = setTimeout(() => setShowResults(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    trackInteraction('roi_calculator_used', {
      industry,
      ticketsPerMonth,
      currentStaffCost,
      calculatedSavings: roiData.monthlySavings
    })
  }, [industry, ticketsPerMonth, currentStaffCost, roiData.monthlySavings])

  const chartData = [
    {
      name: 'Current Cost',
      monthly: currentStaffCost,
      annual: currentStaffCost * 12,
      color: '#ef4444'
    },
    {
      name: 'AI Cost',
      monthly: data.aiCost,
      annual: data.aiCost * 12,
      color: '#3b82f6'
    },
    {
      name: 'Savings',
      monthly: roiData.monthlySavings,
      annual: roiData.annualSavings,
      color: '#10b981'
    }
  ]

  const pieData = [
    { name: 'AI Automated', value: data.automationRate * 100, color: '#10b981' },
    { name: 'Human Required', value: (1 - data.automationRate) * 100, color: '#6b7280' }
  ]

  const handleSliderChange = (value: number, type: 'tickets' | 'cost') => {
    if (type === 'tickets') {
      setTicketsPerMonth(value)
      trackConversion('roi_slider_move', 0.2, { field: 'tickets', value })
    } else {
      setCurrentStaffCost(value)
      trackConversion('roi_slider_move', 0.2, { field: 'cost', value })
    }
  }

  const handleCalculateROI = () => {
    setShowRevealSequence(true)
    trackConversion('roi_calculate', 1, {
      industry,
      ticketsPerMonth,
      currentStaffCost,
      savings: roiData.monthlySavings
    })
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Calculator className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ROI Calculator</h2>
        <p className="text-gray-600">See your potential savings with AI automation</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Monthly Support Tickets
            </label>
            <div className="relative">
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={ticketsPerMonth}
                onChange={(e) => handleSliderChange(parseInt(e.target.value), 'tickets')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>50</span>
                <span className="font-semibold text-blue-600">{ticketsPerMonth}</span>
                <span>1,000</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Current Monthly Staff Cost
            </label>
            <div className="relative">
              <input
                type="range"
                min="2000"
                max="10000"
                step="100"
                value={currentStaffCost}
                onChange={(e) => handleSliderChange(parseInt(e.target.value), 'cost')}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>$2,000</span>
                <span className="font-semibold text-blue-600">{formatCurrency(currentStaffCost)}</span>
                <span>$10,000</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Industry Standards:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">AI Cost:</span>
                <div className="font-semibold text-blue-600">{formatCurrency(data.aiCost)}/month</div>
              </div>
              <div>
                <span className="text-gray-600">Automation Rate:</span>
                <div className="font-semibold text-green-600">{formatPercentage(data.automationRate * 100)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button or Results */}
        <div className="space-y-6">
          {!showRevealSequence ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <button
                onClick={handleCalculateROI}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold py-6 px-12 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                🚀 Calculate My Savings
              </button>
              <p className="text-gray-600 mt-4">See your exact ROI in real-time</p>
            </motion.div>
          ) : (
            <ROIRevealSequence
              currentCost={currentStaffCost}
              aiCost={data.aiCost}
              savings={roiData.monthlySavings}
              onComplete={() => {
                trackConversion('roi_reveal_completed', 1, { savings: roiData.monthlySavings })
              }}
            />
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
              <Bar dataKey="monthly" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Automation Coverage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Saving?</h3>
          <p className="text-blue-100 mb-6">
            Join 2,500+ businesses already saving with AI automation
          </p>
          <motion.button
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => trackInteraction('roi_calculator_cta_clicked', { savings: roiData.monthlySavings })}
          >
            Start Free Trial - Save {formatCurrency(roiData.monthlySavings)}/Month
          </motion.button>
        </div>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  )
}
