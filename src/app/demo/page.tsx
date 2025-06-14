'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PersonaSelection from '@/components/PersonaSelection'
import ChatDemo from '@/components/ChatDemo'
import ROICalculator from '@/components/ROICalculator'
import { ArrowLeft, CheckCircle, Star, TrendingUp } from 'lucide-react'

type DemoStep = 'persona' | 'chat' | 'roi' | 'complete'

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState<DemoStep>('persona')
  const [selectedPersona, setSelectedPersona] = useState<string>('')
  const [calculatedSavings, setCalculatedSavings] = useState<number>(0)

  const handlePersonaSelect = (persona: string) => {
    setSelectedPersona(persona)
    setCurrentStep('chat')
  }

  const handleDemoComplete = () => {
    setCurrentStep('roi')
  }

  const handleROIComplete = (savings: number) => {
    setCalculatedSavings(savings)
    setCurrentStep('complete')
  }

  const resetDemo = () => {
    setCurrentStep('persona')
    setSelectedPersona('')
    setCalculatedSavings(0)
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 'persona':
        return 'Choose Your Industry'
      case 'chat':
        return 'Experience AI in Action'
      case 'roi':
        return 'Calculate Your ROI'
      case 'complete':
        return 'Ready to Get Started?'
      default:
        return 'AI Chatbot Demo'
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 'persona':
        return 'Select your industry to see a customized demo experience'
      case 'chat':
        return 'See how our AI handles real customer conversations'
      case 'roi':
        return 'Discover your potential savings and return on investment'
      case 'complete':
        return 'Get your custom AI chatbot solution'
      default:
        return 'Experience the power of AI customer service'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">AI Chatbot Solutions</h1>
            </div>
            <div className="flex items-center space-x-4">
              {currentStep !== 'persona' && (
                <button
                  onClick={resetDemo}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Start Over
                </button>
              )}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{getStepTitle()}</h2>
            <span className="text-sm text-gray-500">
              Step {currentStep === 'persona' ? 1 : currentStep === 'chat' ? 2 : currentStep === 'roi' ? 3 : 4} of 4
            </span>
          </div>
          <p className="text-gray-600 mb-4">{getStepDescription()}</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: currentStep === 'persona' ? '25%' : 
                       currentStep === 'chat' ? '50%' : 
                       currentStep === 'roi' ? '75%' : '100%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'persona' && (
            <motion.div
              key="persona"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PersonaSelection onPersonaSelect={handlePersonaSelect} />
            </motion.div>
          )}

          {currentStep === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedPersona.charAt(0).toUpperCase() + selectedPersona.slice(1)} Demo
                </h3>
                <p className="text-gray-600">
                  Try the conversation flows below or type your own questions
                </p>
              </div>
              <ChatDemo persona={selectedPersona} onDemoComplete={handleDemoComplete} />
            </motion.div>
          )}

          {currentStep === 'roi' && (
            <motion.div
              key="roi"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ROICalculator industry="healthcare" />
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto text-center">
                {/* Success Message */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-8"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Demo Complete!</h2>
                  <p className="text-xl text-gray-600">
                    You've seen how AI can transform your {selectedPersona} business
                  </p>
                </motion.div>

                {/* Results Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-large p-8 mb-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Demo Results</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                        <Star className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Demo Completed</h4>
                      <p className="text-gray-600">Experienced AI conversations</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Potential Savings</h4>
                      <p className="text-green-600 font-bold">${calculatedSavings.toLocaleString()}/month</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                        <CheckCircle className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Industry Match</h4>
                      <p className="text-gray-600 capitalize">{selectedPersona} optimized</p>
                    </div>
                  </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900">Ready to Get Started?</h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Get your custom AI chatbot built for your {selectedPersona} business. 
                    Our team will set up everything in just 2-4 weeks.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Your Custom Quote
                    </motion.button>
                    
                    <motion.button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Schedule Live Demo
                    </motion.button>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    ✓ 15-minute setup call &nbsp;&nbsp; ✓ Custom industry configuration &nbsp;&nbsp; ✓ 30-day money-back guarantee
                  </p>
                </motion.div>

                {/* Try Another Demo */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 pt-8 border-t border-gray-200"
                >
                  <button
                    onClick={resetDemo}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Try Another Industry Demo →
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}