'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Gift, Star, Mail, Phone, User, Building, Briefcase } from 'lucide-react'
import { trackConversion } from '@/lib/conversionTracking'

interface FormData {
  name: string
  email: string
  company: string
  industry: string
  phone: string
  role: string
}

interface SmartProgressFormProps {
  onSubmit?: (data: FormData) => void
  variant?: 'compact' | 'full'
  className?: string
}

interface FieldConfig {
  key: keyof FormData
  label: string
  type: string
  placeholder: string
  icon: React.ComponentType<{ className?: string }>
  points: number
  required: boolean
  options?: string[]
}

export default function SmartProgressForm({
  onSubmit,
  variant = 'full',
  className = ''
}: SmartProgressFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    industry: '',
    phone: '',
    role: ''
  })

  const [completionScore, setCompletionScore] = useState(0)
  const [showIncentive, setShowIncentive] = useState(false)
  const [currentField, setCurrentField] = useState(0)
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fields: FieldConfig[] = [
    {
      key: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Smith',
      icon: User,
      points: 15,
      required: true
    },
    {
      key: 'email',
      label: 'Work Email',
      type: 'email',
      placeholder: 'john@company.com',
      icon: Mail,
      points: 25,
      required: true
    },
    {
      key: 'company',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Your Company Inc.',
      icon: Building,
      points: 20,
      required: true
    },
    {
      key: 'industry',
      label: 'Industry',
      type: 'select',
      placeholder: 'Select your industry',
      icon: Briefcase,
      points: 15,
      required: true,
      options: ['Healthcare', 'Legal', 'Retail', 'Real Estate', 'Technology', 'Manufacturing', 'Finance', 'Education', 'Other']
    },
    {
      key: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      icon: Phone,
      points: 10,
      required: false
    },
    {
      key: 'role',
      label: 'Your Role',
      type: 'select',
      placeholder: 'Select your role',
      icon: User,
      points: 15,
      required: false,
      options: ['CEO/Founder', 'CFO', 'COO', 'CTO', 'Marketing Director', 'Operations Manager', 'IT Manager', 'Customer Service Manager', 'Other']
    }
  ]

  const maxScore = fields.reduce((sum, field) => sum + field.points, 0)

  const handleFieldChange = (key: keyof FormData, value: string) => {
    const prevValue = formData[key]
    setFormData(prev => ({ ...prev, [key]: value }))

    // Track field completion
    if (value && !prevValue) {
      const field = fields.find(f => f.key === key)
      if (field) {
        const newCompletedFields = new Set(completedFields)
        newCompletedFields.add(key)
        setCompletedFields(newCompletedFields)

        const newScore = completionScore + field.points
        setCompletionScore(newScore)

        trackConversion('form_field_complete', 1, {
          field: key,
          value: value.length,
          completionScore: newScore,
          completionPercentage: (newScore / maxScore) * 100
        })

        // Show incentive at 50% completion
        if (newScore >= maxScore * 0.5 && !showIncentive) {
          setShowIncentive(true)
          trackConversion('form_incentive_triggered', 1, {
            completionScore: newScore,
            completionPercentage: (newScore / maxScore) * 100
          })
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    trackConversion('form_submit_attempted', 1, {
      formData: Object.keys(formData).reduce((acc, key) => {
        acc[key] = formData[key as keyof FormData] ? 'filled' : 'empty'
        return acc
      }, {} as Record<string, string>),
      completionScore,
      completionPercentage: (completionScore / maxScore) * 100
    })

    try {
      await onSubmit?.(formData)
      trackConversion('form_submit_success', 1, { completionScore })
    } catch (error) {
      trackConversion('form_submit_error', 1, { error: String(error) })
    } finally {
      setIsSubmitting(false)
    }
  }

  const completionPercentage = (completionScore / maxScore) * 100
  const isComplete = fields.filter(f => f.required).every(f => formData[f.key])

  useEffect(() => {
    trackConversion('form_start', 1, { variant })
  }, [variant])

  if (variant === 'compact') {
    return (
      <motion.form
        onSubmit={handleSubmit}
        className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Work Email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!isComplete || isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isSubmitting ? 'Getting Your Demo...' : 'Get Free Demo'}
        </button>
      </motion.form>
    )
  }

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Progress gamification */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span className="font-medium">Progress to Free Demo</span>
          <span className="font-bold text-blue-600">{Math.round(completionPercentage)}%</span>
        </div>

        <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full relative"
            style={{ width: `${Math.min(completionPercentage, 100)}%` }}
            animate={{ width: `${Math.min(completionPercentage, 100)}%` }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-30"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ width: "30%" }}
            />
          </motion.div>

          {/* Progress milestones */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            {[25, 50, 75, 100].map((milestone) => (
              <motion.div
                key={milestone}
                className={`w-2 h-2 rounded-full ${
                  completionPercentage >= milestone
                    ? 'bg-white shadow-md'
                    : 'bg-gray-400'
                }`}
                animate={{
                  scale: completionPercentage >= milestone ? [1, 1.2, 1] : 1,
                  backgroundColor: completionPercentage >= milestone ? '#ffffff' : '#9ca3af'
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Start</span>
          <span>50%</span>
          <span>Demo Ready!</span>
        </div>
      </div>

      {/* Dynamic incentive */}
      <AnimatePresence>
        {showIncentive && (
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -20 }}
            className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100 to-transparent opacity-50"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ width: "50%" }}
            />

            <div className="flex items-center relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gift className="w-8 h-8 text-yellow-600 mr-4" />
              </motion.div>
              <div>
                <h4 className="font-bold text-yellow-800 text-lg mb-1">🎁 Almost there!</h4>
                <p className="text-yellow-700">Complete this form and get a <strong>FREE custom ROI report</strong> (valued at $500)</p>
                <div className="flex items-center mt-2 space-x-4 text-sm text-yellow-600">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1" /> Personalized savings calculation
                  </span>
                  <span className="flex items-center">
                    <Check className="w-4 h-4 mr-1" /> Industry benchmarks
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form fields */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {fields.map((field, index) => {
            const isCompleted = completedFields.has(field.key)
            const IconComponent = field.icon

            return (
              <motion.div
                key={field.key}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                  <span className="text-blue-600 ml-2 text-xs">
                    +{field.points} pts
                  </span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconComponent className={`w-5 h-5 ${
                      isCompleted ? 'text-green-500' : 'text-gray-400'
                    }`} />
                  </div>

                  {field.type === 'select' ? (
                    <select
                      value={formData[field.key]}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        isCompleted
                          ? 'border-green-500 focus:ring-green-500 bg-green-50'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      required={field.required}
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        isCompleted
                          ? 'border-green-500 focus:ring-green-500 bg-green-50'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      required={field.required}
                    />
                  )}

                  {isCompleted && (
                    <motion.div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Check className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={!isComplete || isSubmitting}
          className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
            isComplete
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={isComplete ? { scale: 1.02 } : {}}
          whileTap={isComplete ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Setting Up Your Demo...
            </div>
          ) : (
            `🎯 Get My Free Demo${completionPercentage >= 75 ? ' + ROI Report' : ''}`
          )}
        </motion.button>

        {/* Trust indicators */}
        <motion.div
          className="flex items-center justify-center space-x-6 text-sm text-gray-600 pt-4 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-1" />
            No spam, ever
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-1" />
            Instant access
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-1" />
            Setup in 24 hours
          </div>
        </motion.div>
      </form>
    </motion.div>
  )
}
