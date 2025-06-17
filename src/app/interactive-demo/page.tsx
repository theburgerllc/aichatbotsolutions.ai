'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Play, Pause, RotateCcw, CheckCircle, Star } from 'lucide-react'

export default function InteractiveDemoPage() {
  const [currentDemo, setCurrentDemo] = useState<'healthcare' | 'legal' | 'retail'>('healthcare')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [userMessage, setUserMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'bot', message: string}>>([])

  const demoScenarios = {
    healthcare: {
      title: "Healthcare Patient Support",
      description: "Experience how our AI handles patient inquiries, appointment scheduling, and medical information requests.",
      icon: "🏥",
      color: "from-blue-500 to-cyan-500",
      sampleQuestions: [
        "I need to schedule an appointment with Dr. Smith",
        "What are your office hours?",
        "Can you help me with my insurance information?",
        "I need to refill my prescription"
      ],
      responses: {
        "I need to schedule an appointment with Dr. Smith": "I'd be happy to help you schedule an appointment with Dr. Smith. I can see he has availability this week on Wednesday at 2:00 PM or Friday at 10:30 AM. Which time works better for you?",
        "What are your office hours?": "Our office hours are Monday through Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We're closed on Sundays. Is there a specific day you'd like to visit?",
        "Can you help me with my insurance information?": "Absolutely! I can help you verify your insurance coverage. Could you please provide your insurance provider name and member ID? I'll check what services are covered under your plan.",
        "I need to refill my prescription": "I can help you with prescription refills. Please provide your prescription number or the medication name, and I'll check if it's ready for refill. You can also request refills through our patient portal."
      }
    },
    legal: {
      title: "Legal Consultation Assistant",
      description: "See how our AI manages legal inquiries, appointment scheduling, and case information collection.",
      icon: "⚖️",
      color: "from-purple-500 to-indigo-500",
      sampleQuestions: [
        "I need a consultation for a personal injury case",
        "What are your consultation fees?",
        "Can you help me understand my rights in a contract dispute?",
        "I want to schedule a meeting with an attorney"
      ],
      responses: {
        "I need a consultation for a personal injury case": "I can help you schedule a consultation for your personal injury case. Our experienced attorneys typically offer a free initial consultation. When did the incident occur, and would you prefer to meet in person or via video call?",
        "What are your consultation fees?": "Our consultation fees vary by practice area. Personal injury consultations are free, family law consultations are $150, and business law consultations are $250. All consultation fees are applied toward your case if you decide to proceed with our services.",
        "Can you help me understand my rights in a contract dispute?": "I can provide general information about contract disputes, but for specific legal advice, you'll need to speak with one of our attorneys. I can schedule a consultation where they can review your contract and explain your rights and options.",
        "I want to schedule a meeting with an attorney": "I'd be happy to schedule a meeting for you. Which practice area does your legal matter involve - personal injury, family law, business law, or estate planning? This will help me connect you with the right attorney."
      }
    },
    retail: {
      title: "E-commerce Customer Support",
      description: "Discover how our AI handles order inquiries, returns, product recommendations, and customer service.",
      icon: "🛒",
      color: "from-green-500 to-emerald-500",
      sampleQuestions: [
        "I want to return an item I purchased last week",
        "Can you help me track my order?",
        "I'm looking for a laptop under $1000",
        "What's your return policy?"
      ],
      responses: {
        "I want to return an item I purchased last week": "I can absolutely help you with your return. Could you please provide your order number? Our return policy allows returns within 30 days of purchase. Most items can be returned for a full refund if they're in original condition.",
        "Can you help me track my order?": "Of course! I can help you track your order. Please provide your order number or the email address used for the purchase. I'll give you real-time updates on your shipment status and expected delivery date.",
        "I'm looking for a laptop under $1000": "Great! I can help you find the perfect laptop within your budget. What will you primarily use it for - work, gaming, or general use? This will help me recommend the best options with the right specifications for your needs.",
        "What's your return policy?": "Our return policy is very customer-friendly: 30 days for full refunds, 60 days for store credit, and we cover return shipping costs. Items need to be in original condition with packaging. Electronics have a 15-day return window due to their nature."
      }
    }
  }

  const handleSendMessage = () => {
    if (!userMessage.trim()) return

    const newChatHistory = [...chatHistory, { role: 'user' as const, message: userMessage }]
    setChatHistory(newChatHistory)

    // Simulate AI response
    setTimeout(() => {
      const scenario = demoScenarios[currentDemo]
      const response = scenario.responses[userMessage as keyof typeof scenario.responses] || 
        "I understand your question. In a real implementation, our AI would provide a comprehensive response based on your specific inquiry and our trained knowledge base. Would you like to try another question from the examples above?"
      
      setChatHistory(prev => [...prev, { role: 'bot', message: response }])
    }, 1000)

    setUserMessage('')
  }

  const handleQuickQuestion = (question: string) => {
    setUserMessage(question)
    handleSendMessage()
  }

  const resetDemo = () => {
    setChatHistory([])
    setCurrentStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">AI Chatbot Solutions</Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/interactive-demo" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">Interactive Demo</Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 transition-colors">Personalized Demo</Link>
              <Link href="/industries" className="text-gray-600 hover:text-gray-900 transition-colors">Industries</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/demo-booking" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Try Our AI Chatbot
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Live Interactive Demo
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Experience real conversations with our AI across different industries. No signup required.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Demo Selection */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Industry Demo</h2>
            <p className="text-gray-600">Select an industry to see how our AI handles specific scenarios</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(demoScenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentDemo(key as keyof typeof demoScenarios)
                  resetDemo()
                }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  currentDemo === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-3xl mb-3">{scenario.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{scenario.title}</h3>
                <p className="text-sm text-gray-600">{scenario.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Chat Interface */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${demoScenarios[currentDemo].color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{demoScenarios[currentDemo].title}</h3>
                    <p className="text-sm opacity-90">AI Assistant</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={resetDemo}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {chatHistory.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Start a conversation by typing a message or clicking a sample question</p>
                  </div>
                )}
                
                <AnimatePresence>
                  {chatHistory.map((chat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        chat.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {chat.message}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="p-6 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!userMessage.trim()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Sample Questions & Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Try These Sample Questions</h3>
                <div className="space-y-3">
                  {demoScenarios[currentDemo].sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                    >
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{question}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Demo Features</h3>
                <div className="space-y-3">
                  {[
                    "Natural language understanding",
                    "Context-aware responses",
                    "Industry-specific knowledge",
                    "Instant response times",
                    "Multi-turn conversations"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Ready for Your Custom Solution?</h3>
                <p className="mb-4 opacity-90">Get a personalized demo tailored to your specific business needs</p>
                <Link
                  href="/demo"
                  className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
                >
                  Get Personalized Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Impressed by What You Saw?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              This was just a taste of what our AI can do. Get your custom chatbot built for your specific business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo-booking"
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Book Personal Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/demo"
                className="bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:bg-blue-800 border border-blue-500 transition-colors inline-flex items-center justify-center"
              >
                Try Personalized Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">AI Chatbot Solutions</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Transforming customer service with AI-powered automation. 
              Powered by BotPenguin for healthcare, legal, retail, and service businesses.
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-400">
                &copy; 2025 AI Chatbot Solutions. Powered by BotPenguin. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}