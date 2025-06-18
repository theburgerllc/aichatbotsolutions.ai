'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Building2, Heart, Scale, ShoppingCart, Wrench, GraduationCap } from 'lucide-react'

export default function IndustriesPage() {
  const industries = [
    {
      icon: Heart,
      title: "Healthcare",
      description: "HIPAA-compliant AI chatbots for patient support, appointment scheduling, and medical information management.",
      features: [
        "HIPAA compliant & secure",
        "Appointment scheduling",
        "Patient pre-screening",
        "Prescription refill requests",
        "Insurance verification",
        "24/7 patient support"
      ],
      benefits: "Reduce administrative workload by 70% while improving patient satisfaction",
      caseStudy: "MedCenter Group reduced call volume by 60% and improved patient satisfaction scores by 35%",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Scale,
      title: "Legal Services",
      description: "Streamline client intake, case management, and consultation scheduling with intelligent legal assistants.",
      features: [
        "Client intake automation",
        "Consultation scheduling",
        "Case status updates",
        "Document collection",
        "Billing inquiries",
        "Legal resource library"
      ],
      benefits: "Increase client intake efficiency by 80% and reduce initial consultation prep time",
      caseStudy: "Johnson Law Firm increased client inquiries by 45% while reducing response time to under 2 minutes",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce & Retail",
      description: "Boost sales and customer satisfaction with AI-powered shopping assistants and support agents.",
      features: [
        "Product recommendations",
        "Order tracking & returns",
        "Inventory inquiries",
        "Customer support",
        "Abandoned cart recovery",
        "Multi-language support"
      ],
      benefits: "Increase conversion rates by 25% and reduce customer service costs by 60%",
      caseStudy: "TechStore Online saw 40% increase in sales and 50% reduction in support tickets",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Building2,
      title: "Real Estate",
      description: "Capture and qualify leads 24/7 with AI that handles property inquiries and appointment scheduling.",
      features: [
        "Lead qualification",
        "Property information",
        "Viewing appointments",
        "Mortgage calculator",
        "Market updates",
        "Agent matching"
      ],
      benefits: "Generate 3x more qualified leads and convert 40% more prospects to clients",
      caseStudy: "Premium Realty increased lead conversion by 55% and scheduled 200% more property viewings",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Wrench,
      title: "Home Services",
      description: "Streamline service booking, customer communication, and support for contractors and service providers.",
      features: [
        "Service booking",
        "Emergency dispatch",
        "Customer updates",
        "Quote requests",
        "Technician scheduling",
        "Follow-up surveys"
      ],
      benefits: "Book 50% more appointments and reduce no-shows by 30%",
      caseStudy: "QuickFix Services doubled their booking rate and improved customer satisfaction by 40%",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Support students, parents, and staff with intelligent assistants for admissions, support, and information.",
      features: [
        "Student admissions",
        "Course information",
        "Financial aid support",
        "Campus navigation",
        "Academic calendar",
        "24/7 student support"
      ],
      benefits: "Reduce administrative inquiries by 65% and improve student satisfaction",
      caseStudy: "State University reduced support calls by 70% during enrollment periods",
      color: "from-teal-500 to-blue-500"
    }
  ]

  const stats = [
    { number: "2,500+", label: "Businesses Served", icon: "🏢" },
    { number: "98%", label: "Customer Satisfaction", icon: "⭐" },
    { number: "675%", label: "Average ROI", icon: "📈" },
    { number: "24hrs", label: "Deployment Time", icon: "⚡" }
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
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/interactive-demo" className="text-gray-600 hover:text-gray-900 transition-colors">Interactive Demo</Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 transition-colors">Personalized Demo</Link>
              <Link href="/industries" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">Industries</Link>
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
              AI Solutions for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Every Industry
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Discover how businesses across different industries are transforming their customer service with AI-powered chatbots
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
                Get Industry Demo
              </Link>
              <Link
                href="/demo-booking"
                className="bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:bg-blue-800 border border-blue-500 transition-colors shadow-lg"
              >
                Book Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tailored Solutions for <span className="text-blue-600">Your Industry</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI chatbots are customized for the unique needs and compliance requirements of each industry
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${industry.color} p-6`}>
                  <div className="flex items-center text-white">
                    <industry.icon className="w-8 h-8 mr-4" />
                    <h3 className="text-2xl font-bold">{industry.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6">{industry.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {industry.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Business Impact:</h4>
                    <p className="text-blue-800 text-sm">{industry.benefits}</p>
                  </div>

                  <div className="mb-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Success Story:</h4>
                    <p className="text-green-800 text-sm">{industry.caseStudy}</p>
                  </div>

                  <Link
                    href="/demo"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
                  >
                    Try {industry.title} Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
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
              Proven Results Across All Industries
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our industry-specific AI solutions deliver consistent results regardless of your business type
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Get a personalized demo tailored to your specific industry and see how AI can revolutionize your customer service
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Get Industry-Specific Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/demo-booking"
                className="bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:bg-blue-800 border border-blue-500 transition-colors inline-flex items-center justify-center"
              >
                Schedule Consultation
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
