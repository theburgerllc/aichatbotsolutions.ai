'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Building, User, ArrowRight, CheckCircle } from 'lucide-react'

interface LeadCaptureProps {
  onSubmit?: (data: FormData) => void
  title?: string
  subtitle?: string
  ctaText?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  industry: string
  monthlyCustomers: string
  currentSolution: string
  mainChallenge: string
}

export default function LeadCapture({ 
  onSubmit, 
  title = "Get Your Custom AI Chatbot Quote",
  subtitle = "See exactly how much you could save with a personalized solution",
  ctaText = "Get My Custom Quote"
}: LeadCaptureProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    monthlyCustomers: '',
    currentSolution: '',
    mainChallenge: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 3

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    if (onSubmit) {
      onSubmit(formData)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.company
      case 2:
        return formData.industry && formData.monthlyCustomers
      case 3:
        return formData.currentSolution && formData.mainChallenge
      default:
        return false
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-large p-8 max-w-2xl mx-auto text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your interest! Our team will analyze your requirements and send you a 
          personalized quote within 2 hours.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
          <div className="space-y-2 text-left">
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
              Our team reviews your requirements (15 minutes)
            </div>
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
              We prepare your custom quote and ROI analysis (1-2 hours)
            </div>
            <div className="flex items-center text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
              You receive detailed pricing and implementation plan
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Questions? Email us at hello@aichatbotsolutions.ai or call (555) 123-4567
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-large p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company Inc."
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Business Information */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select your industry</option>
                <option value="healthcare">Healthcare</option>
                <option value="legal">Legal Services</option>
                <option value="retail">Retail/E-commerce</option>
                <option value="real-estate">Real Estate</option>
                <option value="finance">Financial Services</option>
                <option value="education">Education</option>
                <option value="saas">SaaS/Technology</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Customer Interactions *
              </label>
              <select
                value={formData.monthlyCustomers}
                onChange={(e) => handleInputChange('monthlyCustomers', e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select range</option>
                <option value="100-500">100-500 per month</option>
                <option value="500-1000">500-1,000 per month</option>
                <option value="1000-2500">1,000-2,500 per month</option>
                <option value="2500-5000">2,500-5,000 per month</option>
                <option value="5000+">5,000+ per month</option>
              </select>
            </div>
          </motion.div>
        )}

        {/* Step 3: Current Situation */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Situation</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Customer Service Solution *
              </label>
              <select
                value={formData.currentSolution}
                onChange={(e) => handleInputChange('currentSolution', e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select current solution</option>
                <option value="phone-only">Phone support only</option>
                <option value="email-phone">Email and phone</option>
                <option value="basic-chat">Basic live chat</option>
                <option value="help-desk">Help desk software</option>
                <option value="other-chatbot">Other chatbot solution</option>
                <option value="none">No formal system</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Challenge You Want to Solve *
              </label>
              <textarea
                value={formData.mainChallenge}
                onChange={(e) => handleInputChange('mainChallenge', e.target.value)}
                rows={4}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Missing leads after hours, too many repetitive questions, slow response times..."
                required
              />
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            disabled={currentStep === 1}
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <motion.button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                isStepValid()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={isStepValid() ? { scale: 1.05 } : {}}
              whileTap={isStepValid() ? { scale: 0.95 } : {}}
            >
              Next Step
              <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={!isStepValid() || isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center ${
                isStepValid() && !isSubmitting
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={isStepValid() && !isSubmitting ? { scale: 1.05 } : {}}
              whileTap={isStepValid() && !isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? 'Submitting...' : ctaText}
              {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
            </motion.button>
          )}
        </div>
      </form>
    </div>
  )
}