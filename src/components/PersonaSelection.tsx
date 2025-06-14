'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Scale, ShoppingBag, Building2 } from 'lucide-react'

interface Persona {
  id: string
  name: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
  bgColor: string
  benefits: string[]
}

interface PersonaSelectionProps {
  onPersonaSelect: (persona: string) => void
}

const personas: Persona[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: <Heart className="w-8 h-8" />,
    title: 'Medical Practice',
    description: 'Appointment scheduling, patient inquiries, and medical information',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    benefits: [
      'Reduce no-shows by 40%',
      'Automate appointment booking',
      'Handle patient inquiries 24/7',
      'HIPAA compliant conversations'
    ]
  },
  {
    id: 'legal',
    name: 'Legal',
    icon: <Scale className="w-8 h-8" />,
    title: 'Law Firm',
    description: 'Client intake, consultation scheduling, and legal information',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    benefits: [
      'Qualify leads automatically',
      'Schedule consultations',
      'Collect case information',
      '300% increase in lead capture'
    ]
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: <ShoppingBag className="w-8 h-8" />,
    title: 'E-commerce Store',
    description: 'Product support, order tracking, and customer service',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    benefits: [
      'Reduce cart abandonment',
      'Handle product questions',
      'Process returns & exchanges',
      'Increase sales by 25%'
    ]
  },
  {
    id: 'business',
    name: 'Small Business',
    icon: <Building2 className="w-8 h-8" />,
    title: 'General Business',
    description: 'Lead generation, customer support, and business inquiries',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    benefits: [
      'Capture leads 24/7',
      'Qualify prospects',
      'Schedule meetings',
      'Improve customer satisfaction'
    ]
  }
]

export default function PersonaSelection({ onPersonaSelect }: PersonaSelectionProps) {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)

  const handlePersonaClick = (personaId: string) => {
    setSelectedPersona(personaId)
    setTimeout(() => {
      onPersonaSelect(personaId)
    }, 500)
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Industry
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how our AI chatbot works specifically for your industry. Each demo is tailored with real-world scenarios and conversation flows.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedPersona === persona.id 
                ? 'scale-105 ring-4 ring-blue-500 ring-opacity-50' 
                : 'hover:scale-102'
            }`}
            onClick={() => handlePersonaClick(persona.id)}
          >
            <div className={`p-6 rounded-2xl border-2 ${persona.bgColor} h-full flex flex-col`}>
              {/* Icon and Title */}
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 ${persona.color}`}>
                  {persona.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {persona.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {persona.description}
                </p>
              </div>

              {/* Benefits */}
              <div className="flex-1">
                <ul className="space-y-2">
                  {persona.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Try Demo Button */}
              <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-colors ${
                  selectedPersona === persona.id
                    ? 'bg-blue-600'
                    : persona.color.replace('text-', 'bg-').replace('-600', '-500 hover:bg-') + persona.color.replace('text-', '').replace('-600', '-600')
                }`}>
                  {selectedPersona === persona.id ? 'Loading Demo...' : 'Try Demo'}
                </button>
              </motion.div>

              {/* Loading Animation */}
              {selectedPersona === persona.id && (
                <motion.div
                  className="absolute inset-0 bg-white bg-opacity-90 rounded-2xl flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-blue-600 font-medium">Loading your demo...</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-600 mb-4">
          Not sure which industry fits? Try our general business demo first.
        </p>
        <motion.button
          onClick={() => handlePersonaClick('business')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start with General Business Demo
        </motion.button>
      </motion.div>
    </div>
  )
}