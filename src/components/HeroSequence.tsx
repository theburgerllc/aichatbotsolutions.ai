'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackInteraction } from '@/lib/utils'

interface HeroSequenceProps {
  onComplete?: () => void
  className?: string
}

interface SequenceStage {
  id: number
  title: string
  subtitle: string
  visual: React.ReactNode
  duration: number
  bgColor: string
}

export default function HeroSequence({ onComplete, className = '' }: HeroSequenceProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const stages: SequenceStage[] = useMemo(() => [
    {
      id: 0,
      title: "Your Current Reality",
      subtitle: "Overwhelmed. Expensive. Inefficient.",
      visual: (
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {[
            { icon: "📞", text: "Phone calls", color: "bg-red-100 text-red-600" },
            { icon: "😤", text: "Long waits", color: "bg-red-100 text-red-600" },
            { icon: "💸", text: "High costs", color: "bg-red-100 text-red-600" },
            { icon: "🌙", text: "No night support", color: "bg-red-100 text-red-600" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`p-4 rounded-lg ${item.color} text-center`}
              initial={{ opacity: 0, rotate: Math.random() * 20 - 10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: i * 0.2, type: "spring" }}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-sm font-medium">{item.text}</div>
            </motion.div>
          ))}
        </div>
      ),
      duration: 2000,
      bgColor: "from-red-900 via-red-800 to-red-700"
    },
    {
      id: 1,
      title: "AI Transformation",
      subtitle: "Watch AI take over and organize everything",
      visual: (
        <div className="relative max-w-md mx-auto h-64">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="text-center text-white">
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🤖
              </motion.div>
              <div className="text-xl font-bold">AI ACTIVATED</div>
            </div>
          </motion.div>
          
          {/* Floating AI features */}
          {[
            { text: "24/7 Support", position: "top-2 left-2" },
            { text: "Instant Replies", position: "top-2 right-2" },
            { text: "80% Automation", position: "bottom-2 left-2" },
            { text: "Smart Routing", position: "bottom-2 right-2" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className={`absolute ${feature.position} bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.2 }}
            >
              {feature.text}
            </motion.div>
          ))}
        </div>
      ),
      duration: 3000,
      bgColor: "from-blue-900 via-blue-800 to-purple-900"
    },
    {
      id: 2,
      title: "Your Results",
      subtitle: "The transformation is complete",
      visual: (
        <div className="text-center max-w-lg mx-auto">
          <motion.div
            className="grid grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {[
              { value: "$3,200", label: "Saved/Month", icon: "💰" },
              { value: "675%", label: "ROI Increase", icon: "📈" },
              { value: "24/7", label: "Support", icon: "🌟" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-green-50 border-2 border-green-200 rounded-xl p-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                <div className="text-sm text-green-700">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-20"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ width: "50%" }}
            />
            <div className="relative z-10">
              <div className="text-3xl font-bold mb-2">🎉 SUCCESS!</div>
              <div className="text-lg">Ready to start saving?</div>
            </div>
          </motion.div>
        </div>
      ),
      duration: 3000,
      bgColor: "from-green-900 via-emerald-800 to-green-700"
    }
  ], [])

  useEffect(() => {
    if (!isPlaying) return

    const currentStageDuration = stages[currentStage].duration
    const timer = setTimeout(() => {
      if (currentStage < stages.length - 1) {
        setCurrentStage(prev => prev + 1)
        trackInteraction('hero_sequence_stage_viewed', {
          stage: currentStage + 1,
          stageName: stages[currentStage + 1]?.title
        })
      } else {
        setIsPlaying(false)
        onComplete?.()
        trackInteraction('hero_sequence_completed')
      }
    }, currentStageDuration)

    return () => clearTimeout(timer)
  }, [currentStage, isPlaying, onComplete, stages])

  useEffect(() => {
    trackInteraction('hero_sequence_started')
  }, [])

  const handleSkip = () => {
    setIsPlaying(false)
    setCurrentStage(stages.length - 1)
    trackInteraction('hero_sequence_skipped', { atStage: currentStage })
    onComplete?.()
  }

  const handleReplay = () => {
    setCurrentStage(0)
    setIsPlaying(true)
    trackInteraction('hero_sequence_replayed')
  }

  const stage = stages[currentStage]
  const progress = ((currentStage + 1) / stages.length) * 100

  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Dynamic Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stage.bgColor} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 bg-black bg-opacity-20 rounded-full h-2 z-20">
        <motion.div
          className="h-full bg-white rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Controls */}
      <div className="absolute top-8 right-8 flex space-x-4 z-20">
        {isPlaying ? (
          <button
            onClick={handleSkip}
            className="bg-black bg-opacity-30 text-white px-4 py-2 rounded-lg hover:bg-opacity-50 transition-all text-sm"
          >
            Skip →
          </button>
        ) : (
          <button
            onClick={handleReplay}
            className="bg-black bg-opacity-30 text-white px-4 py-2 rounded-lg hover:bg-opacity-50 transition-all text-sm"
          >
            ↻ Replay
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {stage.title}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {stage.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {stage.visual}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Stage Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {stages.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index <= currentStage ? 'bg-white' : 'bg-white bg-opacity-30'
              }`}
              onClick={() => {
                setCurrentStage(index)
                setIsPlaying(false)
                trackInteraction('hero_sequence_stage_clicked', { targetStage: index })
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}