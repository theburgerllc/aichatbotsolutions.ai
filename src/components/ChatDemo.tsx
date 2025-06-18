'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Clock, CheckCircle } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface ChatDemoProps {
  persona: string
  onDemoComplete: () => void
}

interface DemoScript {
  [key: string]: {
    title: string
    subtitle: string
    initialMessage: string
    quickActions: Array<{
      text: string
      action: string
    }>
    responses: {
      [key: string]: string[]
    }
  }
}

const demoScripts: DemoScript = {
  healthcare: {
    title: 'Sunshine Medical Center',
    subtitle: 'AI Assistant Online',
    initialMessage: "Hi! I'm your AI assistant for Sunshine Medical Center. I can help you schedule appointments, answer questions about your visit, or provide general information. How can I assist you today?",
    quickActions: [
      { text: 'Schedule Appointment', action: 'appointment' },
      { text: 'Prescription Refill', action: 'prescription' },
      { text: 'Insurance Question', action: 'insurance' }
    ],
    responses: {
      appointment: [
        "I'd be happy to help you schedule an appointment! Let me check our available times with Dr. Smith for this week.",
        "I found several available slots. Would you prefer morning or afternoon appointments?",
        "Perfect! I can book you for Tuesday, January 16th at 2:00 PM with Dr. Smith. Should I confirm this appointment?",
        "Appointment confirmed! I'll send you a confirmation email with all the details and a calendar invite. Is there anything else I can help you with today?"
      ],
      prescription: [
        "I can help with prescription refills. Let me look up your recent medications in our system.",
        "I found your prescription for Lisinopril 10mg. Would you like me to send a refill request to your pharmacy?",
        "Refill request sent to CVS Pharmacy on Main Street. It should be ready for pickup in 2-3 hours. You'll receive a text notification when it's ready."
      ],
      insurance: [
        "I can help with insurance questions. I see you have Blue Cross Blue Shield coverage. What specific information do you need?",
        "Your insurance covers preventive care visits at 100% with no copay. For specialist visits, you have a $30 copay after meeting your deductible.",
        "Is there anything specific about your coverage you'd like me to clarify?"
      ]
    }
  },
  legal: {
    title: 'Smith & Associates Law Firm',
    subtitle: 'Legal AI Assistant',
    initialMessage: "Hello! I'm the AI assistant for Smith & Associates. I can help you with legal inquiries, schedule consultations, or provide information about our services. What brings you here today?",
    quickActions: [
      { text: 'Schedule Consultation', action: 'consultation' },
      { text: 'Personal Injury Case', action: 'injury' },
      { text: 'Family Law Question', action: 'family' }
    ],
    responses: {
      consultation: [
        "I'd be happy to schedule a consultation for you. First, let me gather some basic information about your legal matter.",
        "What type of legal issue are you dealing with? This helps me connect you with the right attorney.",
        "Thank you. I can schedule you for a 30-minute consultation with Attorney Johnson next Thursday at 3:00 PM. This consultation is free of charge.",
        "Consultation scheduled! You'll receive a confirmation email with our office address and what to bring. We look forward to helping you with your legal matter."
      ],
      injury: [
        "I'm sorry to hear about your injury. Let me collect some preliminary information to help our personal injury team assist you.",
        "When did the incident occur, and have you received medical treatment?",
        "Thank you for that information. I'm connecting you with our personal injury specialist who will call you within 2 hours to discuss your case in detail."
      ],
      family: [
        "I can help with family law matters. Our firm handles divorce, child custody, adoption, and other family legal issues.",
        "What specific family law matter do you need assistance with?",
        "I've noted your inquiry. Attorney Martinez specializes in this area and can provide a consultation to discuss your options."
      ]
    }
  },
  retail: {
    title: 'TechShop Customer Service',
    subtitle: 'Shopping Assistant Online',
    initialMessage: "Welcome to TechShop! I'm here to help you with product questions, order tracking, returns, or finding the perfect tech solution. How can I assist you today?",
    quickActions: [
      { text: 'Track My Order', action: 'tracking' },
      { text: 'Product Recommendation', action: 'recommendation' },
      { text: 'Return/Exchange', action: 'return' }
    ],
    responses: {
      tracking: [
        "I can help you track your order. Could you please provide your order number or the email address used for the purchase?",
        "Great! I found your order #TS-2024-0156. Your laptop is currently in transit and expected to arrive tomorrow by 5 PM.",
        "You'll receive tracking updates via text and email. Is there anything else I can help you with regarding your order?"
      ],
      recommendation: [
        "I'd love to help you find the perfect product! What type of device are you looking for, and what's your intended use?",
        "Based on your needs, I recommend the Dell XPS 13 or MacBook Air M2. Both are excellent for productivity and portable enough for travel.",
        "Would you like me to show you the specifications and current pricing for these options? I can also check if we have any current promotions."
      ],
      return: [
        "I can assist with returns and exchanges. Our return policy allows 30 days from purchase for most items.",
        "What item would you like to return, and what's the reason for the return?",
        "No problem! I've generated a prepaid return label for you. Package the item and drop it off at any UPS location. Your refund will process within 3-5 business days."
      ]
    }
  },
  business: {
    title: 'Your Business Assistant',
    subtitle: 'AI Support Online',
    initialMessage: "Hello! I'm your AI business assistant. I can help answer questions about our services, schedule meetings, or connect you with the right team member. What can I help you with today?",
    quickActions: [
      { text: 'Learn About Services', action: 'services' },
      { text: 'Schedule Meeting', action: 'meeting' },
      { text: 'Get Quote', action: 'quote' }
    ],
    responses: {
      services: [
        "I'd be happy to tell you about our services. We specialize in helping businesses improve their operations and customer experience.",
        "Our main service areas include consulting, implementation, and ongoing support. Which area interests you most?",
        "Great choice! Let me connect you with one of our specialists who can provide detailed information and answer any specific questions you have."
      ],
      meeting: [
        "I can schedule a meeting for you with our team. What type of meeting are you looking for - a general consultation or something more specific?",
        "Perfect! I have availability for a 30-minute consultation next week. Would Tuesday at 2 PM or Thursday at 10 AM work better for you?",
        "Meeting scheduled for Tuesday at 2 PM! I'll send you a calendar invite with the meeting link and agenda. Looking forward to speaking with you!"
      ],
      quote: [
        "I can help you get a quote for our services. Let me gather some information about your business needs.",
        "What industry are you in, and approximately how many customers do you serve monthly?",
        "Thank you for that information. I'll have our pricing specialist prepare a custom quote and send it to you within 2 hours."
      ]
    }
  }
}

export default function ChatDemo({ persona, onDemoComplete }: ChatDemoProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [demoProgress, setDemoProgress] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const script = demoScripts[persona] || demoScripts.business

  useEffect(() => {
    // Initial bot message
    const initialMessage: Message = {
      id: '1',
      type: 'bot',
      content: script.initialMessage,
      timestamp: new Date()
    }
    setMessages([initialMessage])
    setDemoProgress(25)
  }, [persona, script.initialMessage])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addMessage = (type: 'user' | 'bot', content: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleQuickAction = async (action: string, text: string) => {
    setShowQuickActions(false)
    addMessage('user', text)
    setDemoProgress(50)

    // Simulate typing delay
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsTyping(false)

    // Get responses for this action
    const responses = script.responses[action] || []

    // Send responses with delays
    for (let i = 0; i < responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      addMessage('bot', responses[i])
      setDemoProgress(50 + ((i + 1) / responses.length) * 40)
    }

    // Complete demo after all responses
    setTimeout(() => {
      setDemoProgress(100)
      onDemoComplete()
    }, 3000)
  }

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return

    const userMessage = currentInput.trim()
    setCurrentInput('')
    addMessage('user', userMessage)
    setShowQuickActions(false)

    // Simple keyword detection for responses
    let action = 'services'
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
      action = persona === 'healthcare' ? 'appointment' : 'meeting'
    } else if (lowerMessage.includes('prescription') || lowerMessage.includes('refill')) {
      action = 'prescription'
    } else if (lowerMessage.includes('insurance')) {
      action = 'insurance'
    } else if (lowerMessage.includes('consultation')) {
      action = 'consultation'
    } else if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
      action = 'tracking'
    }

    // Simulate typing and respond
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsTyping(false)

    const responses = script.responses[action] || ["I understand. Let me connect you with someone who can help you with that specific request."]

    for (let i = 0; i < responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      addMessage('bot', responses[i])
    }

    setTimeout(() => {
      setDemoProgress(100)
      onDemoComplete()
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Demo Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Demo Progress</span>
          <span className="text-sm text-gray-500">{demoProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${demoProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl shadow-large overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="w-8 h-8" />
              <div>
                <h3 className="font-semibold text-lg">{script.title}</h3>
                <p className="text-blue-100 text-sm">{script.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 bg-gray-50">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'bot' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'
                  }`}>
                    {message.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'bot'
                      ? 'bg-white border border-gray-200'
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center mt-2 text-xs ${
                      message.type === 'bot' ? 'text-gray-500' : 'text-blue-100'
                    }`}>
                      <Clock className="w-3 h-3 mr-1" />
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3 mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2 mt-4"
            >
              {script.quickActions.map((action, index) => (
                <motion.button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action, action.text)}
                  className="w-full text-left p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-blue-600 font-medium">{action.text}</span>
                </motion.button>
              ))}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              aria-label="Type your message to the chatbot"
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <motion.button
              onClick={handleSendMessage}
              disabled={!currentInput.trim()}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
