'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PersonaSelector from '@/components/PersonaSelector'
import VoiceInterface from '@/components/VoiceInterface'
import LiveActivityFeed from '@/components/LiveActivityFeed'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import HeroSequence from '@/components/HeroSequence'
import UrgencyTimer from '@/components/UrgencyTimer'
import SmartProgressForm from '@/components/SmartProgressForm'
import { trackInteraction } from '@/lib/utils'
import { trackConversion } from '@/lib/conversionTracking'

export default function HomePage() {
  const [showPersonas, setShowPersonas] = useState(false)
  const [showHeroSequence, setShowHeroSequence] = useState(true)
  const [showMainContent, setShowMainContent] = useState(false)
  
  useEffect(() => {
    trackConversion('page_view', 1, { page: 'homepage' })
  }, [])
  
  const handleVoiceTrigger = () => {
    trackInteraction('voice_trigger_activated')
    trackConversion('voice_trigger_activated', 1)
    setShowPersonas(true)
  }

  const handleHeroSequenceComplete = () => {
    setShowHeroSequence(false)
    setShowMainContent(true)
    trackConversion('hero_sequence_completed', 1)
  }

  const handleFormSubmit = async (formData: any) => {
    trackConversion('form_submit_success', 1, formData)
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  // Show hero sequence first, then main content
  if (showHeroSequence) {
    return (
      <div>
        <HeroSequence onComplete={handleHeroSequenceComplete} />
        <LiveActivityFeed />
        <ExitIntentPopup />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Conversion Optimization Components */}
      <LiveActivityFeed />
      <ExitIntentPopup />
      <UrgencyTimer variant="banner" className="fixed top-0 left-0 right-0 z-40" />
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-12 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">AI Chatbot Solutions</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/interactive-demo" className="text-gray-600 hover:text-gray-900 transition-colors">Interactive Demo</Link>
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
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center pt-40">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Never Miss Another Customer with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              24/7 AI Support
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Transform your customer service with intelligent chatbots that work round the clock. 
            Get started in just 24 hours.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/demo-booking" 
                className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-5 px-10 rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-2xl"
                onClick={() => trackConversion('cta_click', 1, { type: 'book_demo', location: 'hero' })}
              >
                🔥 Book Free Demo - Save $3,200/Month
              </Link>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                HOT
              </div>
            </motion.div>
            
            <Link 
              href="/interactive-demo" 
              className="bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl hover:bg-orange-700 transition-colors shadow-lg"
              onClick={() => trackConversion('cta_click', 1, { type: 'interactive_demo', location: 'hero' })}
            >
              ⚡ Try Demo Now
            </Link>
            
            <Link 
              href="/demo" 
              className="bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:bg-blue-800 border border-blue-500 transition-colors shadow-lg"
              onClick={() => trackConversion('cta_click', 1, { type: 'personalized_demo', location: 'hero' })}
            >
              🎯 Personalized Demo →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-center mb-8"
          >
            <p className="text-blue-200 mb-4 text-lg">
              👋 Say <strong>"Help me"</strong> to begin your AI-powered demo
            </p>
            <div className="mb-6">
              <VoiceInterface onTrigger={handleVoiceTrigger} />
            </div>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex justify-center gap-8 text-center text-white"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold">675%</div>
              <div className="text-blue-200 text-sm">Average ROI</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">24hrs</div>
              <div className="text-blue-200 text-sm">Setup Time</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">80%</div>
              <div className="text-blue-200 text-sm">Query Automation</div>
            </div>
          </motion.div>
        </motion.div>
        
      </section>

      {/* Persona Selection - Shows after voice trigger or skip */}
      {showPersonas && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <PersonaSelector />
        </motion.div>
      )}
      
      {/* Demo Options Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Experience AI in <span className="text-blue-600">Three Different Ways</span>
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the demo experience that best fits your needs and see how AI can transform your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Demo</h3>
              <p className="text-gray-600 mb-6">
                Try our chatbot live with real conversation flows. Perfect for a quick 5-minute experience.
              </p>
              <ul className="text-sm text-gray-500 mb-8 space-y-2">
                <li>✓ Live chat simulation</li>
                <li>✓ Healthcare scenarios</li>
                <li>✓ Quick 5-minute experience</li>
              </ul>
              <Link 
                href="/interactive-demo"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
              >
                Try Interactive Demo
              </Link>
            </motion.div>

            {/* Personalized Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border-2 border-blue-500 relative"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Demo</h3>
              <p className="text-gray-600 mb-6">
                Choose your role and industry for a customized experience with ROI calculations and AI building.
              </p>
              <ul className="text-sm text-gray-500 mb-8 space-y-2">
                <li>✓ Role-based scenarios</li>
                <li>✓ Industry-specific features</li>
                <li>✓ ROI calculator</li>
                <li>✓ AI chatbot builder</li>
              </ul>
              <Link 
                href="/demo"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
              >
                Start Personalized Demo
              </Link>
            </motion.div>

            {/* Live Demo Booking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Demo</h3>
              <p className="text-gray-600 mb-6">
                Book a personal 15-minute demo with our team to see how AI works for your specific business.
              </p>
              <ul className="text-sm text-gray-500 mb-8 space-y-2">
                <li>✓ One-on-one consultation</li>
                <li>✓ Custom business analysis</li>
                <li>✓ Implementation roadmap</li>
              </ul>
              <Link 
                href="/demo-booking"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
              >
                Book Live Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Split Screen Animation - Chaos to Organized */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              From Chaos to <span className="text-blue-600">Organized Excellence</span>
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how AI transforms your customer service from overwhelming to effortless
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Before - Chaos */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">Before: The Chaos</h3>
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 relative overflow-hidden">
                <div className="space-y-4">
                  {[
                    "📞 Phone ringing constantly",
                    "😤 Customers waiting on hold",
                    "💸 Expensive staff costs",
                    "🌙 No support after hours",
                    "😵 Overwhelmed team",
                    "📉 Missed opportunities"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, rotate: Math.random() * 20 - 10 }}
                      whileInView={{ opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white p-3 rounded-lg shadow-sm transform hover:scale-105 transition-transform"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full opacity-20 -mr-16 -mt-16"></div>
              </div>
            </motion.div>
            
            {/* After - Organized */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">After: AI Excellence</h3>
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 relative">
                <div className="space-y-4">
                  {[
                    "🤖 AI handles 80% of inquiries",
                    "⚡ Instant response 24/7",
                    "💰 80% cost reduction",
                    "🌟 Happy customers",
                    "🎯 Team focuses on growth",
                    "📈 675% ROI increase"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      className="bg-white p-3 rounded-lg shadow-sm border border-green-200"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 -mr-16 -mt-16"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Social Proof and CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join 2,500+ businesses already saving 80% on customer service costs while providing better support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.div>
                <Link
                  href="/demo-booking"
                  className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-8 rounded-xl transition-colors inline-block"
                >
                  Book Free Demo →
                </Link>
              </motion.div>
              <motion.button
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-8 rounded-xl border border-blue-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPersonas(true)}
              >
                Start Personalized Demo
              </motion.button>
            </div>

            <p className="text-blue-100 text-sm">
              ✓ 15-minute setup call &nbsp;&nbsp; ✓ Custom industry configuration &nbsp;&nbsp; ✓ 30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Saving $3,200+/Month?
            </h2>
            <p className="text-xl text-gray-600">
              Get your free demo and custom ROI report in less than 60 seconds
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <UrgencyTimer className="mb-8" />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Get:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</span>
                    Personalized AI chatbot demo for your industry
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</span>
                    Custom ROI calculation showing your exact savings
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</span>
                    30-day free trial with full setup support
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</span>
                    24-hour implementation guarantee
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <SmartProgressForm onSubmit={handleFormSubmit} />
            </div>
          </div>
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