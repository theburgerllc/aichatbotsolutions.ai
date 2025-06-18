'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Zap } from 'lucide-react'
import { trackInteraction } from '@/lib/utils'

interface UrgencyTimerProps {
  variant?: 'compact' | 'full' | 'banner'
  initialTime?: number // in seconds
  spotsLeft?: number
  className?: string
}

export default function UrgencyTimer({
  variant = 'full',
  initialTime = 3600, // 1 hour default
  spotsLeft = Math.floor(Math.random() * 30) + 20, // 20-50 spots
  className = ''
}: UrgencyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [currentSpots, setCurrentSpots] = useState(spotsLeft)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          // Reset timer when it reaches 0
          return initialTime
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [initialTime])

  // Randomly decrease spots occasionally
  useEffect(() => {
    const spotTimer = setInterval(() => {
      if (Math.random() < 0.1 && currentSpots > 10) { // 10% chance every interval
        setCurrentSpots(prev => prev - 1)
        trackInteraction('urgency_spots_decreased', { newCount: currentSpots - 1 })
      }
    }, 45000) // Check every 45 seconds

    return () => clearInterval(spotTimer)
  }, [currentSpots])

  const handleClick = () => {
    if (!hasInteracted) {
      trackInteraction('urgency_timer_clicked', {
        variant,
        timeLeft,
        spotsLeft: currentSpots
      })
      setHasInteracted(true)
    }
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const hours = Math.floor(minutes / 60)
  const displayMinutes = minutes % 60

  const formatTime = () => {
    if (hours > 0) {
      return `${hours}h ${displayMinutes}m ${seconds}s`
    }
    return `${displayMinutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getUrgencyColor = () => {
    if (timeLeft < 600) return 'from-red-500 to-red-600' // Last 10 minutes - red
    if (timeLeft < 1800) return 'from-orange-500 to-red-500' // Last 30 minutes - orange to red
    return 'from-red-600 to-red-700' // Default red
  }

  if (variant === 'compact') {
    return (
      <motion.div
        className={`inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2 ${className}`}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        animate={{
          boxShadow: timeLeft < 300 ? [
            '0 0 0 0 rgba(239, 68, 68, 0.4)',
            '0 0 0 10px rgba(239, 68, 68, 0)',
            '0 0 0 0 rgba(239, 68, 68, 0)'
          ] : undefined
        }}
        transition={{
          boxShadow: { repeat: Infinity, duration: 2 }
        }}
      >
        <Clock className="w-4 h-4 text-red-600" />
        <span className="text-sm font-semibold text-red-800">
          {formatTime()} left
        </span>
      </motion.div>
    )
  }

  if (variant === 'banner') {
    return (
      <motion.div
        className={`w-full bg-gradient-to-r ${getUrgencyColor()} text-white py-3 px-4 ${className}`}
        onClick={handleClick}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center space-x-6 text-center">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Limited Time Offer</span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span className="font-mono text-lg font-bold">
              {formatTime()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span className="font-semibold">
              Only {currentSpots} spots left
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  // Full variant (default)
  return (
    <motion.div
      className={`bg-gradient-to-br ${getUrgencyColor()} rounded-2xl p-6 text-white text-center shadow-xl ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      animate={timeLeft < 300 ? {
        scale: [1, 1.02, 1],
        boxShadow: [
          '0 10px 30px rgba(0,0,0,0.2)',
          '0 20px 40px rgba(239, 68, 68, 0.3)',
          '0 10px 30px rgba(0,0,0,0.2)'
        ]
      } : {}}
      transition={{
        scale: { repeat: Infinity, duration: 1.5 },
        boxShadow: { repeat: Infinity, duration: 1.5 }
      }}
    >
      <div className="flex items-center justify-center mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Clock className="w-8 h-8 mr-3" />
        </motion.div>
        <span className="text-xl font-bold">Limited Beta Access</span>
      </div>

      <div className="mb-4">
        <div className="text-4xl font-mono font-bold mb-2">
          {formatTime()}
        </div>
        <div className="text-lg opacity-90">
          Expires in
        </div>
      </div>

      <motion.div
        className="bg-white bg-opacity-20 rounded-lg p-4 mb-4"
        animate={currentSpots < 25 ? { backgroundColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)'] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center justify-center space-x-2">
          <Users className="w-5 h-5" />
          <span className="font-semibold text-lg">
            Only <motion.span
              key={currentSpots}
              initial={{ scale: 1.2, color: '#fbbf24' }}
              animate={{ scale: 1, color: '#ffffff' }}
              className="font-bold"
            >
              {currentSpots}
            </motion.span> spots remaining
          </span>
        </div>
        <div className="text-sm opacity-75 mt-1">
          this week
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-2 text-xs opacity-75">
        <div>✓ No credit card</div>
        <div>✓ 30-day trial</div>
        <div>✓ Setup in 24h</div>
      </div>

      {timeLeft < 600 && (
        <motion.div
          className="mt-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg font-bold text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🚨 HURRY! Less than 10 minutes left!
        </motion.div>
      )}
    </motion.div>
  )
}
