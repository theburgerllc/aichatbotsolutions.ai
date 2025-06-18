'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, MessageCircle, Clock, Shield, BarChart3, Zap, Brain, Globe, Headphones } from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Technology",
      description: "Powered by cutting-edge natural language processing and machine learning algorithms for human-like conversations.",
      benefits: [
        "98% accuracy in intent recognition",
        "Context-aware responses",
        "Multi-language support",
        "Continuous learning capabilities"
      ]
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Your AI chatbot never sleeps, providing instant responses to customer inquiries around the clock.",
      benefits: [
        "Instant response times",
        "No wait times for customers",
        "Global timezone support",
        "Holiday and weekend coverage"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance with major industry standards.",
      benefits: [
        "HIPAA compliance for healthcare",
        "SOC 2 Type II certified",
        "End-to-end encryption",
        "Regular security audits"
      ]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive insights into customer interactions, satisfaction rates, and business performance.",
      benefits: [
        "Real-time conversation analytics",
        "Customer satisfaction tracking",
        "Performance optimization insights",
        "Custom reporting dashboards"
      ]
    },
    {
      icon: Zap,
      title: "Quick Integration",
      description: "Seamlessly integrate with your existing systems and platforms with minimal technical setup.",
      benefits: [
        "24-hour deployment",
        "Pre-built integrations",
        "Custom API connections",
        "No coding required"
      ]
    },
    {
      icon: Globe,
      title: "Multi-Channel Support",
      description: "Deploy across all your customer touchpoints for a consistent experience everywhere.",
      benefits: [
        "Website chat widget",
        "WhatsApp Business integration",
        "Facebook Messenger",
        "SMS and phone support"
      ]
    }
  ]

  const integrations = [
    { name: "Salesforce", logo: "🔗" },
    { name: "HubSpot", logo: "🔗" },
    { name: "Zendesk", logo: "🔗" },
    { name: "Slack", logo: "🔗" },
    { name: "Microsoft Teams", logo: "🔗" },
    { name: "WhatsApp", logo: "📱" },
    { name: "Facebook", logo: "📘" },
    { name: "Shopify", logo: "🛒" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">AI Chatbot Solutions</Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/features" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">Features</Link>
              <Link href="/interactive-demo" className="text-gray-600 hover:text-gray-900 transition-colors">Interactive Demo</Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 transition-colors">Personalized Demo</Link>
              <Link href="/industries" className="text-gray-600 hover:text-gray-900 transition-colors">Industries</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
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
              Powerful AI Features That
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Transform Customer Service
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Discover the advanced capabilities that make our AI chatbots the smartest choice for your business
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/demo"
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Try Features Now
              </Link>
              <Link
                href="/demo-booking"
                className="bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:bg-blue-800 border border-blue-500 transition-colors shadow-lg"
              >
                Book Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for <span className="text-blue-600">Exceptional Customer Service</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive feature set ensures your customers receive the best possible experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Proven Results Across Industries
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our features deliver measurable impact for businesses worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "675%", label: "Average ROI", icon: "📈" },
              { number: "80%", label: "Cost Reduction", icon: "💰" },
              { number: "98%", label: "Customer Satisfaction", icon: "⭐" },
              { number: "24hrs", label: "Deployment Time", icon: "⚡" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seamless <span className="text-blue-600">Integrations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with your existing tools and platforms in minutes, not months
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{integration.logo}</div>
                <h3 className="font-semibold text-gray-900">{integration.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              See how our AI features can transform your customer service in just 15 minutes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Try Interactive Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/demo-booking"
                className="bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:bg-blue-800 border border-blue-500 transition-colors inline-flex items-center justify-center"
              >
                Book Personal Demo
                <Headphones className="w-5 h-5 ml-2" />
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
