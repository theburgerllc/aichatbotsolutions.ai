'use client'

import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, Zap, Heart, ArrowRight } from 'lucide-react'
import { personaData } from '@/data/personas'
import { trackInteraction } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const iconMap = {
  TrendingDown,
  TrendingUp,
  Zap,
  Heart
}

interface PersonaSelectorProps {
  onPersonaSelect?: (persona: string) => void
}

export default function PersonaSelector({ onPersonaSelect }: PersonaSelectorProps) {
  const router = useRouter()

  const handlePersonaClick = (personaId: string) => {
    trackInteraction('persona_selected', { 
      persona: personaId,
      timestamp: new Date().toISOString()
    })
    
    if (onPersonaSelect) {
      onPersonaSelect(personaId)
    } else {
      router.push(`/demo/${personaId}`)
    }
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-blue-500',
          hover: 'hover:bg-blue-600',
          text: 'text-blue-600',
          border: 'border-blue-200',
          shadow: 'hover:shadow-blue-200'
        }
      case 'success':
        return {
          bg: 'bg-green-500',
          hover: 'hover:bg-green-600',
          text: 'text-green-600',
          border: 'border-green-200',
          shadow: 'hover:shadow-green-200'
        }
      case 'purple':
        return {
          bg: 'bg-purple-500',
          hover: 'hover:bg-purple-600',
          text: 'text-purple-600',
          border: 'border-purple-200',
          shadow: 'hover:shadow-purple-200'
        }
      default:
        return {
          bg: 'bg-blue-500',
          hover: 'hover:bg-blue-600',
          text: 'text-blue-600',
          border: 'border-blue-200',
          shadow: 'hover:shadow-blue-200'
        }
    }
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What's Your Primary Goal?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your role to see personalized ROI calculations and solutions 
            tailored to your specific challenges and objectives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(personaData).map((persona, index) => {
            const IconComponent = iconMap[persona.icon as keyof typeof iconMap]
            const colors = getColorClasses(persona.color)
            
            return (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => handlePersonaClick(persona.id)}
              >
                <div className={`
                  bg-white rounded-2xl shadow-lg ${colors.shadow} transition-all duration-300 
                  border-2 ${colors.border} hover:border-opacity-50 h-full p-8
                  group-hover:shadow-2xl
                `}>
                  <div className="text-center">
                    <motion.div
                      className={`
                        w-16 h-16 ${colors.bg} ${colors.hover} rounded-full 
                        flex items-center justify-center mx-auto mb-6 transition-colors duration-300
                      `}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {persona.title}
                    </h3>
                    
                    <p className={`text-lg ${colors.text} font-medium mb-6`}>
                      {persona.subtitle}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {persona.painPoints.slice(0, 2).map((point, idx) => (
                        <div key={idx} className="flex items-start text-left">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-gray-600">{point}</p>
                        </div>
                      ))}
                    </div>
                    
                    <motion.button
                      className={`
                        w-full ${colors.bg} ${colors.hover} text-white py-3 px-6 
                        rounded-lg font-semibold transition-all duration-300 
                        flex items-center justify-center space-x-2
                        group-hover:shadow-lg
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{persona.cta}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why 2,500+ Businesses Choose AI Chatbots
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">80%</div>
                <p className="text-gray-600">Cost Reduction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                <p className="text-gray-600">Availability</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">0.3s</div>
                <p className="text-gray-600">Response Time</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 overflow-hidden bg-blue-50 rounded-xl py-4"
        >
          <motion.div
            className="flex space-x-8 whitespace-nowrap"
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Dr. Smith just saved $3,200/month with automated patient support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">LegalTech Corp reduced support costs by 85% in 30 days</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">RetailMax now handles 500+ inquiries per day automatically</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Healthcare Plus achieved HIPAA-compliant automation</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}