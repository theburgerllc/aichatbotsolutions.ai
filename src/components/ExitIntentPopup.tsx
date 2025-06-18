'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, CheckCircle, Star } from 'lucide-react'
import { trackInteraction } from '@/lib/utils'

interface ExitIntentPopupProps {
  className?: string
}

export default function ExitIntentPopup({ className = '' }: ExitIntentPopupProps) {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [spotsLeft] = useState(Math.floor(Math.random() * 20) + 30) // 30-50 spots

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !showPopup) {
        setShowPopup(true)
        setHasShown(true)
        trackInteraction('exit_intent_triggered', {
          timeOnPage: Date.now() - (window.performance?.timing?.navigationStart || 0),
          spotsLeft
        })
      }
    }

    const handleBeforeUnload = () => {
      if (!hasShown && !showPopup) {
        setShowPopup(true)
        setHasShown(true)
        trackInteraction('exit_intent_triggered', { trigger: 'beforeunload' })
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasShown, showPopup, spotsLeft])

  useEffect(() => {
    if (showPopup) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev > 0 ? prev - 1 : 0)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showPopup])

  const handleClose = () => {
    setShowPopup(false)
    trackInteraction('exit_intent_popup_closed')
  }

  const handleClaimOffer = () => {
    trackInteraction('exit_intent_offer_claimed', { spotsLeft, timeLeft })
    // Redirect to demo booking or lead capture
    window.location.href = '/demo-booking'
  }

  const handleMaybeLater = () => {
    setShowPopup(false)
    trackInteraction('exit_intent_maybe_later')
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  if (!showPopup) return null

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-3xl">🚨</span>
            </motion.div>

            <motion.h3
              className="text-2xl font-bold text-red-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Wait! Don't Miss Out
            </motion.h3>

            <motion.p
              className="text-gray-700 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Get a <strong className="text-green-600">FREE 30-day trial</strong> + custom setup
              <br />
              <span className="text-sm text-gray-500">(valued at $2,000)</span>
            </motion.p>

            <motion.div
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <p className="text-sm font-semibold text-orange-800">⚡ Limited Time Offer</p>
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <p className="text-sm text-yellow-700">
                Only <strong>{spotsLeft} spots</strong> left this month
              </p>
            </motion.div>

            <div className="space-y-3 mb-6">
              {[
                'No credit card required',
                'Cancel anytime',
                'Setup in 24 hours',
                'Save $2,000+ per month'
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center justify-center space-x-2 text-sm text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg mb-3"
              onClick={handleClaimOffer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🎁 Claim My Free Trial Now
            </motion.button>

            <motion.button
              className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
              onClick={handleMaybeLater}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Maybe later
            </motion.button>

            <motion.div
              className="flex items-center justify-center space-x-1 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-gray-600 ml-2">Trusted by 2,500+ businesses</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
