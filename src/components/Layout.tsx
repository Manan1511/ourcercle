import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { useReveal } from '../lib/useReveal'
import Header from './Header'
import Footer from './Footer'

/** Shared page chrome. Wraps every route. */
export default function Layout() {
  const { pathname } = useLocation()
  // Re-scan on navigation so a new page's elements are picked up.
  useReveal(pathname)

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-(--color-primary) focus:text-(--color-on-primary) focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
