'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, X, Star, Zap, Crown, Building } from 'lucide-react'

export default function PricingPage() {
  const [billingType, setBillingType] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      description: "Perfect for small businesses getting started with AI",
      monthlyPrice: 199,
      annualPrice: 159,
      features: [
        "Up to 1,000 conversations/month",
        "Basic AI training",
        "Email support",
        "Website integration",
        "Basic analytics",
        "Standard response time"
      ],
      notIncluded: [
        "Custom branding",
        "Advanced integrations",
        "Priority support",
        "Custom training"
      ],
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      icon: Star,
      description: "Ideal for growing businesses with higher volume needs",
      monthlyPrice: 499,
      annualPrice: 399,
      features: [
        "Up to 5,000 conversations/month",
        "Advanced AI training",
        "Priority email support",
        "Website + WhatsApp integration",
        "Advanced analytics & reports",
        "Custom branding",
        "Multi-language support",
        "API access"
      ],
      notIncluded: [
        "Phone support",
        "Custom integrations",
        "Dedicated account manager"
      ],
      popular: true,
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "Enterprise",
      icon: Crown,
      description: "For large organizations with complex requirements",
      monthlyPrice: 1299,
      annualPrice: 999,
      features: [
        "Unlimited conversations",
        "Custom AI training",
        "24/7 phone + email support",
        "All platform integrations",
        "Real-time analytics dashboard",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Advanced security features"
      ],
      notIncluded: [],
      popular: false,
      color: "from-orange-500 to-red-500"
    }
  ]

  const addOns = [
    {
      name: "Additional Conversations",
      price: "$0.10 per conversation",
      description: "Scale beyond your plan limits"
    },
    {
      name: "Custom Integration",
      price: "$2,000 one-time",
      description: "Connect with your specific systems"
    },
    {
      name: "Advanced Training",
      price: "$500/month",
      description: "Enhanced AI model customization"
    },
    {
      name: "Priority Support",
      price: "$200/month",
      description: "24/7 dedicated support channel"
    }
  ]

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle, and we'll prorate any differences."
    },
    {
      question: "What happens if I exceed my conversation limit?",
      answer: "Your chatbot will continue to work. You'll be charged $0.10 per additional conversation, or you can upgrade to a higher plan."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees for Starter and Professional plans. Enterprise plans include complimentary setup and onboarding."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial with full access to Professional plan features. No credit card required."
    },
    {
      question: "What's included in the setup process?",
      answer: "We handle AI training, integration setup, testing, and launch. Professional plans include 2 hours of setup, Enterprise includes unlimited setup support."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">AI Chatbot Solutions</Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/interactive-demo" className="text-gray-600 hover:text-gray-900 transition-colors">Interactive Demo</Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 transition-colors">Personalized Demo</Link>
              <Link href="/industries" className="text-gray-600 hover:text-gray-900 transition-colors">Industries</Link>
              <Link href="/pricing" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/demo-booking" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Simple, Transparent
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Pricing
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Choose the perfect plan for your business. All plans include 24-hour setup, training, and launch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-white bg-opacity-20 rounded-xl p-1">
                <div className="flex">
                  <button
                    onClick={() => setBillingType('monthly')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      billingType === 'monthly'
                        ? 'bg-white text-blue-600'
                        : 'text-white hover:text-blue-200'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingType('annual')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      billingType === 'annual'
                        ? 'bg-white text-blue-600'
                        : 'text-white hover:text-blue-200'
                    }`}
                  >
                    Annual <span className="text-green-300 text-sm">(Save 20%)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                  <div className="flex items-center mb-4">
                    <plan.icon className="w-8 h-8 mr-3" />
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-4">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">
                      ${billingType === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    <span className="text-sm opacity-75">/month</span>
                  </div>
                  {billingType === 'annual' && (
                    <p className="text-sm opacity-75 mt-1">
                      Billed annually (${plan.annualPrice * 12})
                    </p>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.notIncluded.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Not included:</h4>
                      <ul className="space-y-3">
                        {plan.notIncluded.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                    Get Started
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-3">
                    14-day free trial • No setup fees
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Optional <span className="text-blue-600">Add-ons</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your chatbot with additional features and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <h3 className="font-bold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{addon.price}</p>
                <p className="text-sm text-gray-600">{addon.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Teaser */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Most businesses see a 675% return on investment within the first year
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { number: "80%", label: "Cost Reduction" },
                { number: "675%", label: "Average ROI" },
                { number: "24hrs", label: "Payback Period" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/demo"
              className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Calculate Your Savings
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Start your 14-day free trial today. No credit card required, no setup fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/demo-booking"
                className="bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:bg-blue-800 border border-blue-500 transition-colors inline-flex items-center justify-center"
              >
                Schedule Demo Call
              </Link>
            </div>
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
