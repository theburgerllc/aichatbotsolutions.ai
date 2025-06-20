'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface FloatingBubbleProps {
  position: [number, number, number]
  text: string
  delay: number
}

function FloatingBubble({ position, text, delay }: FloatingBubbleProps) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.5
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime + delay) * 0.1
      mesh.current.rotation.y = Math.cos(state.clock.elapsedTime + delay) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group position={position}>
        <mesh
          ref={mesh}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.1 : 1}
        >
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial
            color={hovered ? '#60a5fa' : '#3b82f6'}
            transparent
            opacity={0.8}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
        <Text
          position={[0, 0, 0.7]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
          font="/fonts/inter-medium.woff2"
        >
          {text}
        </Text>
      </group>
    </Float>
  )
}

function ChatbotCharacter() {
  const groupRef = useRef<THREE.Group>(null!)
  const [speaking, setSpeaking] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeaking(prev => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main body */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.6, 1.5, 8]} />
        <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.2} roughness={0.3} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.2, 1.3, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 1.3, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>

      {/* Mouth indicator */}
      <mesh position={[0, 1.1, 0.45]} scale={speaking ? [1.2, 0.8, 1] : [1, 1, 1]}>
        <ringGeometry args={[0.05, 0.1, 8]} />
        <meshStandardMaterial color="#93c5fd" emissive="#3b82f6" emissiveIntensity={speaking ? 0.8 : 0.3} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.9, 0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      <mesh position={[0.9, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
    </group>
  )
}

function Particles({ isMobile = false }: { isMobile?: boolean }) {
  const particlesRef = useRef<THREE.Points>(null!)
  const particleCount = isMobile ? 50 : 100 // Reduce particles on mobile

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    colors[i * 3] = Math.random() * 0.5 + 0.5
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5
    colors[i * 3 + 2] = 1
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} />
    </points>
  )
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (e) {
      setWebglSupported(false)
    }
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const messages = [
    "How can I help you today?",
    "Available 24/7 for support",
    "Reduce costs by 80%",
    "Instant accurate responses",
    "Seamless integration",
    "HIPAA compliant"
  ]

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {!isMobile && webglSupported ? (
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          className="absolute inset-0"
          gl={{
            antialias: false, // Disable for better performance
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1}
          frameloop="demand" // Only render when needed
          performance={{ min: 0.5 }} // Reduce quality when needed
          onCreated={(state) => {
            // Add context loss recovery
            const canvas = state.gl.domElement
            canvas.addEventListener('webglcontextlost', (e) => {
              e.preventDefault()
              console.warn('WebGL context lost')
            })
            canvas.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored')
            })
          }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
          <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={0.8} />

          <Particles isMobile={isMobile} />

          <ChatbotCharacter />

          {messages.map((message, index) => (
            <FloatingBubble
              key={index}
              position={[
                Math.cos((index / messages.length) * Math.PI * 2) * 4,
                Math.sin((index / messages.length) * Math.PI * 2) * 3,
                Math.random() * 2 - 1
              ]}
              text={message}
              delay={index * 0.5}
            />
          ))}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 p-8 text-center">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white text-sm"
              >
                {message}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          AI Chatbots That
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Actually Work
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl"
        >
          Transform your customer service with AI that understands your business.
          <br />
          Reduce costs by 80% while providing instant, accurate support 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center"
        >
          <p className="text-blue-200 mb-4 text-lg">
            👋 Say <strong>"Help me"</strong> to begin your personalized demo
          </p>
          <div className="animate-pulse">
            <div className="w-4 h-4 bg-green-400 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-green-300">Listening...</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating action button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold">
          Skip to Demo →
        </button>
      </motion.div>
    </div>
  )
}
