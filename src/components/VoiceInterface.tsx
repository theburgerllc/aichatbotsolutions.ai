'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'
import { trackInteraction } from '@/lib/utils'

interface VoiceInterfaceProps {
  onTrigger: () => void
  triggerPhrase?: string
}

export default function VoiceInterface({ 
  onTrigger, 
  triggerPhrase = "help me" 
}: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (SpeechRecognition) {
        setIsSupported(true)
        const recognition = new SpeechRecognition()
        
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'
        recognition.maxAlternatives = 1
        
        recognition.onstart = () => {
          setIsListening(true)
          setError(null)
          trackInteraction('voice_listening_started')
        }
        
        recognition.onend = () => {
          setIsListening(false)
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
        }
        
        recognition.onerror = (event) => {
          setError(event.error)
          setIsListening(false)
          trackInteraction('voice_recognition_error', { error: event.error })
        }
        
        recognition.onresult = (event) => {
          let finalTranscript = ''
          let interimTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            const confidence = event.results[i][0].confidence
            
            if (event.results[i].isFinal) {
              finalTranscript += transcript
              setConfidence(confidence)
            } else {
              interimTranscript += transcript
            }
          }
          
          const fullTranscript = finalTranscript + interimTranscript
          setTranscript(fullTranscript)
          
          // Check for trigger phrase
          if (fullTranscript.toLowerCase().includes(triggerPhrase.toLowerCase())) {
            trackInteraction('voice_trigger_detected', { 
              transcript: fullTranscript,
              confidence,
              triggerPhrase 
            })
            onTrigger()
            recognition.stop()
          }
          
          // Auto-stop after 10 seconds of continuous listening
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = setTimeout(() => {
            recognition.stop()
          }, 10000)
        }
        
        recognitionRef.current = recognition
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [onTrigger, triggerPhrase])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('')
      setError(null)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500 text-sm">
          Voice recognition not supported in this browser
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      <motion.button
        onClick={toggleListening}
        className={`
          relative p-4 rounded-full transition-all duration-300 shadow-lg
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isListening ? { 
          boxShadow: [
            '0 0 0 0 rgba(239, 68, 68, 0.7)',
            '0 0 0 10px rgba(239, 68, 68, 0)',
            '0 0 0 0 rgba(239, 68, 68, 0)'
          ]
        } : {}}
        transition={{ 
          boxShadow: { 
            repeat: isListening ? Infinity : 0, 
            duration: 2 
          }
        }}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ zIndex: -1 }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-[300px] border"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <p className="text-sm font-medium text-gray-700">
                  Listening for "{triggerPhrase}"...
                </p>
              </div>
              
              {transcript && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 p-2 bg-gray-50 rounded text-sm"
                >
                  <p className="text-gray-600">
                    <strong>Heard:</strong> {transcript}
                  </p>
                  {confidence > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Confidence: {Math.round(confidence * 100)}%
                    </p>
                  )}
                </motion.div>
              )}
              
              <div className="mt-3 flex justify-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-blue-500 rounded-full"
                      animate={{
                        height: [4, 20, 4],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 rounded-lg shadow-lg p-3 min-w-[250px]"
          >
            <p className="text-sm text-red-600 text-center">
              Voice recognition error: {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Global type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  start(): void
  stop(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message?: string
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  readonly length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}