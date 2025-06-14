'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, TrendingUp, Users, Clock, Shield } from 'lucide-react'
import ROICalculator from '@/components/ROICalculator'
import ChatbotBuilder from '@/components/ChatbotBuilder'
import { personaData } from '@/data/personas'
import { industryData } from '@/data/industry'
import { trackInteraction } from '@/lib/utils'
import { Industry } from '@/types'

export default function PersonaDemoPage() {
  const params = useParams()
  const router = useRouter()
  const persona = params.persona as string
  
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('healthcare')
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatbotConfig, setChatbotConfig] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const personaConfig = personaData[persona] || personaData.founder

  useEffect(() => {
    trackInteraction('demo_page_visited', { persona, timestamp: new Date().toISOString() })
  }, [persona])

  const handleIndustrySelect = (industry: Industry) => {
    setSelectedIndustry(industry)
    trackInteraction('industry_selected', { persona, industry })
  }

  const generateChatbot = async () => {
    setIsGenerating(true)
    trackInteraction('chatbot_generation_started', { persona, industry: selectedIndustry })
    
    try {
      const response = await fetch('/api/generate-chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: selectedIndustry,
          persona,
          primaryGoals: personaConfig.solutions
        })
      })
      
      const result = await response.json()
      if (result.success) {
        setChatbotConfig(result.chatbot)
        setShowChatbot(true)
        trackInteraction('chatbot_generated', { persona, industry: selectedIndustry })
      }
    } catch (error) {
      console.error('Failed to generate chatbot:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {personaConfig.title} Demo
            </h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Persona Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {personaConfig.title}
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                {personaConfig.subtitle}
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Pain Points:</h3>
                {personaConfig.painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Solutions:</h3>
              <div className="space-y-4">
                {personaConfig.solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Industry Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Your Industry</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(industryData).map(([key, data]) => (
              <motion.button
                key={key}
                onClick={() => handleIndustrySelect(key as Industry)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedIndustry === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="font-semibold text-gray-900 mb-2 capitalize">{key}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Avg tickets: {data.avgTicketsPerMonth}/month</p>
                  <p>Staff cost: ${data.monthlyStaffCost.toLocaleString()}</p>
                  <p>Automation: {(data.automationRate * 100)}%</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <ROICalculator industry={selectedIndustry} />
        </motion.div>

        {/* Chatbot Builder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ChatbotBuilder 
            persona={persona}
            industry={selectedIndustry}
            onComplete={(config) => {
              setChatbotConfig(config)
              setShowChatbot(true)
              trackInteraction('chatbot_builder_completed', { persona, industry: selectedIndustry })
            }}
          />
        </motion.div>

        {/* Legacy Chatbot Generation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 mt-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              See Your Custom AI Chatbot
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch as we generate a personalized chatbot configured specifically for your {selectedIndustry} business and {personaConfig.title.toLowerCase()} goals.
            </p>
          </div>

          {!showChatbot ? (
            <div className="text-center">
              <motion.button
                onClick={generateChatbot}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-4 px-8 rounded-xl transition-colors inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating Your Chatbot...</span>
                  </>
                ) : (
                  <>
                    <span>Generate My Custom Chatbot</span>
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Chatbot Preview */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {chatbotConfig?.name}
                  </h4>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-md">
                    {/* Chat Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          🤖
                        </div>
                        <span className="font-medium">{chatbotConfig?.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Online</span>
                      </div>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="p-4 space-y-4 h-64 overflow-y-auto">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                          🤖
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">{chatbotConfig?.greeting}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                          <p className="text-sm">I need help with scheduling</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                          🤖
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">I'd be happy to help with scheduling! Let me check available times for you...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Configuration Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Chatbot Configuration
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Key Capabilities:</h5>
                      <ul className="space-y-1">
                        {chatbotConfig?.capabilities.slice(0, 4).map((capability: string, index: number) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Compliance:</h5>
                      <div className="flex flex-wrap gap-2">
                        {chatbotConfig?.compliance.map((item: string, index: number) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Setup Time:</h5>
                      <p className="text-sm text-gray-600">{chatbotConfig?.estimatedSetupTime}</p>
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => trackInteraction('trial_signup_clicked', { persona, industry: selectedIndustry })}
                  >
                    Start Free Trial
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}