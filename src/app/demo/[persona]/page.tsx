import { personaData } from '@/data/personas'
import { notFound } from 'next/navigation'
import PersonaDemoClient from './client'

// Generate static params for all available personas
export async function generateStaticParams() {
  const personas = Object.keys(personaData)
  return personas.map((persona) => ({
    persona: persona
  }))
}

interface PersonaDemoPageProps {
  params: Promise<{ persona: string }>
}

export default async function PersonaDemoPage({ params }: PersonaDemoPageProps) {
  const { persona } = await params
  
  // Validate persona exists
  if (!persona || !personaData[persona]) {
    notFound()
  }

  return <PersonaDemoClient persona={persona} />
}