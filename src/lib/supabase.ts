import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase.types'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error(
    'Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY -- copy .env.example to .env.local and fill them in.',
  )
}

/**
 * Browser client, used by both the public Invite form (anon, insert-only)
 * and the /admin panel (same anon key, but authenticated via Supabase Auth --
 * RLS is what actually separates the two, not a different key).
 */
export const supabase = createClient<Database>(url, anonKey)
