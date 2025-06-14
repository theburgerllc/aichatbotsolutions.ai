'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// import HeroScene from '@/components/HeroScene'
import PersonaSelector from '@/components/PersonaSelector'
import VoiceInterface from '@/components/VoiceInterface'
import { trackInteraction } from '@/lib/utils'

export default function HomePage() {
  const [showPersonas, setShowPersonas] = useState(false)
  
  const handleVoiceTrigger = () => {
    trackInteraction('voice_trigger_activated')
    setShowPersonas(true)
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            AI Chatbots That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Actually Work
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Transform your customer service with AI that understands your business.
            <br />
            Reduce costs by 80% while providing instant, accurate support 24/7.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center"
          >
            <p className="text-blue-200 mb-4 text-lg">
              👋 Say <strong>"Help me"</strong> to begin your personalized demo
            </p>
            <div className="mb-6">
              <VoiceInterface onTrigger={handleVoiceTrigger} />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Skip to Demo Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="absolute bottom-8 right-8 z-20 bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
          onClick={() => setShowPersonas(true)}
        >
          Skip to Demo →
        </motion.button>
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
                    "📈 300% ROI increase"
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
              <motion.button
                className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-8 rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPersonas(true)}
              >
                Start Personalized Demo →
              </motion.button>
              <motion.button
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-8 rounded-xl border border-blue-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Calculate Your ROI
              </motion.button>
            </div>

            <p className="text-blue-100 text-sm">
              ✓ 15-minute setup call &nbsp;&nbsp; ✓ Custom industry configuration &nbsp;&nbsp; ✓ 30-day money-back guarantee
            </p>
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