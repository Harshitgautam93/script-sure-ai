import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  name?: string
  created_at: string
}

export interface GradingResult {
  id: string
  user_id: string
  image_url: string
  score: number
  feedback: string
  created_at: string
}

export interface ModelInsight {
  id: string
  title: string
  description: string
  accuracy: number
  created_at: string
} 