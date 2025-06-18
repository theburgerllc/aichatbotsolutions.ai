import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Database functionality will be limited.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface Lead {
  id?: string
  email: string
  name: string
  company: string
  phone?: string
  industry: string
  persona: string
  message?: string
  roi_calculation?: any
  created_at?: string
  source?: string
  status?: 'new' | 'contacted' | 'qualified' | 'converted'
}

export interface Interaction {
  id?: string
  session_id: string
  event_type: string
  event_data: any
  persona?: string
  industry?: string
  page_url: string
  user_agent?: string
  ip_address?: string
  created_at?: string
}

// Lead management functions
export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead | null> {
  if (!supabase) {
    console.warn('Supabase not configured. Lead saved to localStorage.')
    const leads = JSON.parse(localStorage.getItem('leads') || '[]')
    const newLead = { ...lead, id: Date.now().toString(), created_at: new Date().toISOString() }
    leads.push(newLead)
    localStorage.setItem('leads', JSON.stringify(leads))
    return newLead
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single()

    if (error) {
      console.error('Error saving lead:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error saving lead:', error)
    return null
  }
}

export async function getLeads(): Promise<Lead[]> {
  if (!supabase) {
    return JSON.parse(localStorage.getItem('leads') || '[]')
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching leads:', error)
    return []
  }
}

// Interaction tracking functions
export async function trackInteraction(interaction: Omit<Interaction, 'id' | 'created_at'>): Promise<boolean> {
  if (!supabase) {
    const interactions = JSON.parse(localStorage.getItem('interactions') || '[]')
    interactions.push({ ...interaction, id: Date.now().toString(), created_at: new Date().toISOString() })
    localStorage.setItem('interactions', JSON.stringify(interactions))
    return true
  }

  try {
    const { error } = await supabase
      .from('interactions')
      .insert([interaction])

    if (error) {
      console.error('Error tracking interaction:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error tracking interaction:', error)
    return false
  }
}

export async function getInteractions(sessionId?: string): Promise<Interaction[]> {
  if (!supabase) {
    const interactions = JSON.parse(localStorage.getItem('interactions') || '[]')
    return sessionId ? interactions.filter((i: Interaction) => i.session_id === sessionId) : interactions
  }

  try {
    let query = supabase
      .from('interactions')
      .select('*')
      .order('created_at', { ascending: false })

    if (sessionId) {
      query = query.eq('session_id', sessionId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching interactions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching interactions:', error)
    return []
  }
}
