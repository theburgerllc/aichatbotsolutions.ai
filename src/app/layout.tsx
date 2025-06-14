import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://aichatbotsolutions.tech'),
  title: 'AI Chatbot Solutions - 24/7 Customer Support Automation',
  description: 'Transform your customer service with AI-powered chatbots. Reduce costs by 80% while providing instant, accurate support for healthcare, legal, and retail businesses.',
  keywords: 'AI chatbot, customer support automation, healthcare chatbot, legal chatbot, retail chatbot, customer service AI',
  authors: [{ name: 'AI Chatbot Solutions', url: 'https://aichatbotsolutions.tech' }],
  openGraph: {
    title: 'AI Chatbot Solutions - 24/7 Customer Support Automation',
    description: 'Transform your customer service with AI-powered chatbots. Reduce costs by 80% while providing instant, accurate support.',
    url: 'https://aichatbotsolutions.tech',
    siteName: 'AI Chatbot Solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Chatbot Solutions - Automate Customer Support',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chatbot Solutions - 24/7 Customer Support Automation',
    description: 'Transform your customer service with AI-powered chatbots. Reduce costs by 80% while providing instant, accurate support.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://aichatbotsolutions.tech" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI Chatbots" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}