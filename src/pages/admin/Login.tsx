import { useState, type FormEvent } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Seo from '../../components/Seo'
import { supabase } from '../../lib/supabase'
import { useSession } from '../../lib/useSession'
import { Button, Card, Heading, Input } from '../../ui'

export default function AdminLogin() {
  const { session, loading } = useSession()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  if (!loading && session) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const data = new FormData(event.currentTarget)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(data.get('email') ?? ''),
      password: String(data.get('password') ?? ''),
    })

    if (signInError) {
      setError(signInError.message)
      setSubmitting(false)
    }
    // On success, useSession's onAuthStateChange listener updates `session`
    // and the redirect above takes it from there.
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-(--color-canvas) px-4 text-(--color-text)">
      <Seo title="Admin login" path="/admin/login" noIndex />
      <Card tone="raised" className="w-full max-w-sm p-8">
        <Heading level={1} size="md" className="mb-6">
          Admin
        </Heading>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={submitting}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={submitting}
          />
          {error && (
            <p role="alert" className="text-xs text-(--color-danger)">
              {error}
            </p>
          )}
          <Button type="submit" className="mt-2 w-full" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
