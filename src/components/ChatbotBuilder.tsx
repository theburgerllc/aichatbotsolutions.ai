'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Code, MessageSquare, Settings, CheckCircle, Loader } from 'lucide-react'

interface ChatbotBuilderProps {
  persona: string
  industry: string
  onComplete?: (chatbotConfig: any) => void
}

interface BuildStep {
  id: string
  title: string
  description: string
  duration: number
  completed: boolean
  icon: any
}

export default function ChatbotBuilder({ persona, industry, onComplete }: ChatbotBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [buildSteps, setBuildSteps] = useState<BuildStep[]>([
    {
      id: 'analyze',
      title: 'Analyzing Requirements',
      description: 'Understanding your business needs and industry requirements...',
      duration: 2000,
      completed: false,
      icon: Settings
    },
    {
      id: 'configure',
      title: 'Configuring AI Models',
      description: 'Setting up specialized conversation flows for your industry...',
      duration: 3000,
      completed: false,
      icon: Bot
    },
    {
      id: 'integrate',
      title: 'Building Integrations',
      description: 'Connecting to your existing systems and databases...',
      duration: 2500,
      completed: false,
      icon: Code
    },
    {
      id: 'test',
      title: 'Testing Conversations',
      description: 'Running automated tests to ensure quality responses...',
      duration: 2000,
      completed: false,
      icon: MessageSquare
    }
  ])
  
  const [generatedCode, setGeneratedCode] = useState('')
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildComplete, setBuildComplete] = useState(false)

  const codeSnippets = useMemo(() => ({
    healthcare: `
// Healthcare AI Chatbot Configuration
const chatbot = {
  name: "MedCare Assistant",
  industry: "healthcare",
  compliance: ["HIPAA", "Patient Privacy"],
  capabilities: [
    "appointment_scheduling",
    "symptom_assessment",
    "insurance_verification",
    "prescription_refills"
  ],
  conversationFlow: {
    greeting: "Hi! I'm here to help with your healthcare needs.",
    intentRecognition: true,
    humanHandoff: true,
    emergencyRouting: true
  }
}`,
    legal: `
// Legal Services AI Chatbot Configuration  
const chatbot = {
  name: "LegalPro Assistant",
  industry: "legal",
  compliance: ["Attorney-Client Privilege", "Bar Standards"],
  capabilities: [
    "consultation_scheduling",
    "case_status_updates", 
    "document_collection",
    "legal_information"
  ],
  conversationFlow: {
    greeting: "Welcome! I can help with legal inquiries.",
    confidentialityNotice: true,
    intakeForm: true,
    conflictCheck: true
  }
}`,
    retail: `
// Retail AI Chatbot Configuration
const chatbot = {
  name: "RetailBot Assistant", 
  industry: "retail",
  compliance: ["PCI Compliance", "Consumer Protection"],
  capabilities: [
    "order_tracking",
    "product_recommendations",
    "return_processing",
    "inventory_check"
  ],
  conversationFlow: {
    greeting: "Hi! How can I help with your order today?",
    productCatalog: true,
    paymentProcessing: true,
    loyaltyProgram: true
  }
}`
  }), [])

  const typewriterEffect = (text: string, callback: () => void) => {
    let index = 0
    const interval = setInterval(() => {
      setGeneratedCode(text.slice(0, index))
      index++
      if (index > text.length) {
        clearInterval(interval)
        callback()
      }
    }, 20)
  }

  useEffect(() => {
    if (isBuilding && currentStep < buildSteps.length) {
      const timer = setTimeout(() => {
        setBuildSteps(prev => 
          prev.map((step, index) => 
            index === currentStep ? { ...step, completed: true } : step
          )
        )
        
        if (currentStep === buildSteps.length - 1) {
          // Start typewriter effect for code generation
          const code = codeSnippets[industry as keyof typeof codeSnippets] || codeSnippets.retail
          typewriterEffect(code, () => {
            setBuildComplete(true)
            if (onComplete) {
              onComplete({
                persona,
                industry,
                code,
                timestamp: new Date().toISOString()
              })
            }
          })
        } else {
          setCurrentStep(prev => prev + 1)
        }
      }, buildSteps[currentStep].duration)

      return () => clearTimeout(timer)
    }
  }, [isBuilding, currentStep, buildSteps, industry, persona, onComplete, codeSnippets])

  const startBuild = () => {
    setIsBuilding(true)
    setCurrentStep(0)
    setBuildSteps(prev => prev.map(step => ({ ...step, completed: false })))
    setGeneratedCode('')
    setBuildComplete(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Bot className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Chatbot Builder</h2>
        <p className="text-gray-600">
          Watch as we build your custom {industry} chatbot for {persona} goals
        </p>
      </div>

      {!isBuilding && !buildComplete && (
        <div className="text-center">
          <motion.button
            onClick={startBuild}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot className="w-5 h-5" />
            <span>Build My Chatbot</span>
          </motion.button>
        </div>
      )}

      {isBuilding && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Building Your Chatbot...</h3>
          
          {buildSteps.map((step, index) => {
            const IconComponent = step.icon
            const isActive = index === currentStep
            const isCompleted = step.completed
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50' 
                    : isActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : isActive 
                    ? 'bg-blue-500' 
                    : 'bg-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    <IconComponent className="w-6 h-6 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    isCompleted ? 'text-green-900' : isActive ? 'text-blue-900' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-sm ${
                    isCompleted ? 'text-green-700' : isActive ? 'text-blue-700' : 'text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}

          {currentStep === buildSteps.length - 1 && buildSteps[currentStep].completed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Generated Configuration:</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-hidden">
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {generatedCode}
                </pre>
              </div>
            </motion.div>
          )}
        </div>
      )}

      <AnimatePresence>
        {buildComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4">Your Chatbot is Ready!</h3>
              <p className="text-green-100 mb-6">
                Your custom {industry} chatbot has been configured and is ready for deployment.
                Estimated setup time: 2-3 business days.
              </p>
              
              <motion.button
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}