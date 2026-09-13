import type { ReactNode } from 'react'
import { Navigate, NavLink, useLocation } from 'react-router-dom'
import Seo from '../Seo'
import { Button, Container, Logo } from '../../ui'
import { supabase } from '../../lib/supabase'
import { useSession } from '../../lib/useSession'

const NAV = [
  { to: '/admin/invites', label: 'Invite requests' },
  { to: '/admin/journal', label: 'Journal' },
  { to: '/admin/cercles', label: 'Cercles' },
]

/**
 * Shell for every authenticated /admin page: session gate, a minimal nav,
 * logout. Not styled to the public site's standard -- this is an internal
 * tool, not a page a visitor or a crawler is meant to see (hence `noIndex`
 * on every admin route).
 *
 * Takes `children` rather than rendering an `<Outlet>` -- every /admin/*
 * page is its own literal top-level route entry in routes.tsx rather than a
 * nested child of a shared layout route, because vite-react-ssg 0.9.2's
 * static-path resolver loses the accumulated path prefix when it walks
 * through a pathless layout route (confirmed: journal/cercles silently
 * failed to prerender, and invites landed at the wrong URL, until routes.tsx
 * was flattened). Each page wraps itself in `<AdminLayout>` instead.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  const { session, loading } = useSession()
  const location = useLocation()

  if (loading) {
    return (
      <>
        <Seo title="Admin" path={location.pathname} noIndex />
        <div className="flex min-h-dvh items-center justify-center bg-(--color-canvas) text-(--color-text-subtle)">
          Loading…
        </div>
      </>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return (
    <div className="flex min-h-dvh flex-col bg-(--color-canvas) text-(--color-text)">
      <Seo title="Admin" path={location.pathname} noIndex />
      <header className="border-b border-(--color-border-subtle)">
        <Container className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Logo className="h-6 w-auto" decorative />
            <nav aria-label="Admin" className="flex items-center gap-5">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm transition-colors duration-(--duration-base) hover:text-(--color-text) ${
                      isActive
                        ? 'font-semibold text-(--color-text)'
                        : 'text-(--color-text-muted)'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-(--color-text-subtle)">
              {session.user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => supabase.auth.signOut()}
            >
              Log out
            </Button>
          </div>
        </Container>
      </header>
      <main className="flex-1">
        <Container className="py-10">{children}</Container>
      </main>
    </div>
  )
}
