import type { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'

/**
 * Client-only auth check for the /admin panel. Returns `loading: true` (and
 * `session: null`) during prerendering and until the browser has actually
 * asked Supabase -- the same "safe static default, useEffect upgrades it"
 * pattern already used by Header's scroll state and Intro's client-only
 * mount, so admin pages prerender as a neutral shell with no session data
 * baked into the static HTML.
 */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!active) return
      setSession(next)
      setLoading(false)
    })

    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  return { session, loading }
}
