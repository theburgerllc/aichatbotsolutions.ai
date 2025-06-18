'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, DollarSign, Zap, Target } from 'lucide-react'
import { formatCurrency, trackInteraction } from '@/lib/utils'

interface ROIRevealSequenceProps {
  currentCost: number
  aiCost: number
  savings: number
  onComplete?: () => void
  className?: string
}

// Confetti component
const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null
  
  const confettiPieces = Array.from({ length: 50 }, (_, i) => i)
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{
            x: Math.random() * 400,
            y: -10,
            scale: Math.random() * 0.5 + 0.5,
            rotate: 0
          }}
          animate={{
            y: 500,
            rotate: 360,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: "linear",
            delay: Math.random() * 0.5
          }}
          style={{
            backgroundColor: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  )
}

export default function ROIRevealSequence({ 
  currentCost, 
  aiCost, 
  savings, 
  onComplete,
  className = '' 
}: ROIRevealSequenceProps) {
  const [revealStage, setRevealStage] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  
  useEffect(() => {
    const sequence = [
      { delay: 0, stage: 1 },      // Show current costs (dramatic red)
      { delay: 1500, stage: 2 },   // Show AI costs (small blue)  
      { delay: 3000, stage: 3 },   // REVEAL savings (massive green with confetti)
    ]
    
    sequence.forEach(({ delay, stage }) => {
      setTimeout(() => {
        setRevealStage(stage)
        trackInteraction('roi_reveal_stage_shown', { stage })
        
        if (stage === 3) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3000)
          onComplete?.()
        }
      }, delay)
    })
  }, [currentCost, aiCost, savings, onComplete])

  const handleCTAClick = () => {
    trackInteraction('roi_reveal_cta_clicked', { 
      savings, 
      currentCost, 
      aiCost 
    })
  }

  return (
    <div className={`relative space-y-6 ${className}`}>
      {/* Stage 1: Current Costs (Dramatic Red) */}
      <AnimatePresence>
        {revealStage >= 1 && (
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-gradient-to-br from-red-500 to-red-600 border-4 border-red-400 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-red-600"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ opacity: 0.3 }}
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center mb-4"
              >
                <DollarSign className="w-8 h-8 mr-2" />
                <h4 className="text-2xl font-bold">Your Current Burden</h4>
              </motion.div>
              
              <motion.div 
                className="text-6xl font-bold mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              >
                {formatCurrency(currentCost)}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-xl opacity-90"
              >
                <div className="font-semibold mb-2">Every Single Month</div>
                <div className="text-lg">💸 Burning money on manual support</div>
                <div className="text-lg">😤 Customers waiting in frustration</div>
                <div className="text-lg">🌙 Zero support after hours</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: AI Costs (Small Blue) */}
      <AnimatePresence>
        {revealStage >= 2 && (
          <motion.div 
            initial={{ scale: 0, x: -100 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-400 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 mr-2" />
                <h4 className="text-lg font-bold">AI Solution Cost</h4>
              </div>
              <div className="text-4xl font-bold mb-2">{formatCurrency(aiCost)}</div>
              <div className="text-sm opacity-80">per month</div>
              <div className="text-sm mt-2 opacity-90">
                🤖 24/7 automated support
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3: SAVINGS REVEAL (Massive Green with Confetti) */}
      <AnimatePresence>
        {revealStage >= 3 && (
          <motion.div 
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
            className="bg-gradient-to-br from-green-500 via-emerald-600 to-green-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl"
          >
            <Confetti active={showConfetti} />
            
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ width: "50%" }}
            />
            
            <div className="text-center relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex items-center justify-center mb-6"
              >
                <TrendingUp className="w-12 h-12 mr-3" />
                <h3 className="text-4xl font-bold">🎉 YOU SAVE</h3>
              </motion.div>
              
              <motion.div
                className="text-8xl md:text-9xl font-bold mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
              >
                {formatCurrency(savings)}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-2xl font-bold mb-4"
              >
                Every Single Month!
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="text-xl opacity-90 mb-8"
              >
                <div className="mb-2">That's <span className="font-bold text-yellow-300">{formatCurrency(savings * 12)}</span> per year!</div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl">⚡</div>
                    <div className="text-sm">Instant Setup</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl">🤖</div>
                    <div className="text-sm">80% Automation</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl">📈</div>
                    <div className="text-sm">675% ROI</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.button
                className="w-full bg-white text-green-600 py-6 px-10 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCTAClick}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 flex items-center justify-center">
                  <Target className="w-6 h-6 mr-3" />
                  START SAVING {formatCurrency(savings)}/MONTH NOW →
                </div>
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6 text-sm opacity-75 flex items-center justify-center space-x-4"
              >
                <span>✓ No credit card required</span>
                <span>✓ 30-day free trial</span>
                <span>✓ Cancel anytime</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}