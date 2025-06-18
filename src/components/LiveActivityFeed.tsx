'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackInteraction } from '@/lib/utils'

interface Activity {
  user: string
  action: string
  time: string
  industry: string
  icon: string
}

const activities: Activity[] = [
  { user: "Dr. Smith", action: "saved $3,200/month", time: "2 minutes ago", industry: "healthcare", icon: "🏥" },
  { user: "Johnson Law", action: "increased leads by 300%", time: "5 minutes ago", industry: "legal", icon: "⚖️" },
  { user: "TechMart", action: "automated 85% of support", time: "8 minutes ago", industry: "retail", icon: "🛍️" },
  { user: "Wellness Clinic", action: "reduced wait times by 70%", time: "12 minutes ago", industry: "healthcare", icon: "🏥" },
  { user: "AutoRepair Pro", action: "saved $1,800/month", time: "15 minutes ago", industry: "automotive", icon: "🔧" },
  { user: "City Real Estate", action: "captured 45% more leads", time: "18 minutes ago", industry: "real estate", icon: "🏠" },
  { user: "Elite Fitness", action: "automated membership queries", time: "22 minutes ago", industry: "fitness", icon: "💪" },
  { user: "Fresh Dental", action: "improved patient satisfaction 95%", time: "25 minutes ago", industry: "healthcare", icon: "🦷" },
  { user: "Metro Insurance", action: "saved $2,400/month", time: "28 minutes ago", industry: "insurance", icon: "🛡️" },
  { user: "Peak Consulting", action: "increased conversion by 280%", time: "31 minutes ago", industry: "consulting", icon: "📊" },
  { user: "Golden Spa", action: "automated 90% of bookings", time: "34 minutes ago", industry: "beauty", icon: "💆" },
  { user: "Tech Solutions Inc", action: "reduced support costs 75%", time: "37 minutes ago", industry: "technology", icon: "💻" },
  { user: "Green Landscaping", action: "captured 60% more quotes", time: "40 minutes ago", industry: "landscaping", icon: "🌱" },
  { user: "Urban Pharmacy", action: "improved response time 85%", time: "43 minutes ago", industry: "healthcare", icon: "💊" },
  { user: "Elite Properties", action: "saved $3,800/month", time: "46 minutes ago", industry: "real estate", icon: "🏢" },
  { user: "Ocean Restaurant", action: "automated 80% of reservations", time: "49 minutes ago", industry: "restaurant", icon: "🍽️" },
  { user: "Summit Legal", action: "increased client intake 250%", time: "52 minutes ago", industry: "legal", icon: "📋" },
  { user: "Bright Academy", action: "improved enrollment process", time: "55 minutes ago", industry: "education", icon: "🎓" },
  { user: "Peak Performance", action: "saved $2,100/month", time: "58 minutes ago", industry: "fitness", icon: "🏋️" },
  { user: "Diamond Jewelry", action: "increased sales inquiries 320%", time: "1 hour ago", industry: "retail", icon: "💎" }
]

interface LiveActivityFeedProps {
  className?: string
}

export default function LiveActivityFeed({ className = '' }: LiveActivityFeedProps) {
  const [currentActivity, setCurrentActivity] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % activities.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    if (!hasInteracted) {
      trackInteraction('live_activity_feed_clicked', {
        activity: activities[currentActivity],
        position: 'top_right'
      })
      setHasInteracted(true)
    }
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    trackInteraction('live_activity_feed_closed')
  }

  if (!isVisible) return null

  const activity = activities[currentActivity]

  return (
    <AnimatePresence>
      <motion.div 
        key={currentActivity}
        className={`fixed top-20 right-4 bg-white border border-green-200 shadow-lg rounded-lg p-4 z-50 max-w-sm cursor-pointer hover:shadow-xl transition-shadow ${className}`}
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
      >
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm font-bold w-5 h-5 flex items-center justify-center"
          aria-label="Close notification"
        >
          ×
        </button>
        
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-2"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-lg">{activity.icon}</span>
              <span className="font-semibold text-gray-900 text-sm truncate">
                {activity.user}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-1">
              {activity.action}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {activity.time}
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {activity.industry}
              </span>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
          whileHover={{ x: 2 }}
        >
          See how →
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}