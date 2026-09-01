import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../content/site'
import { Button, Container, Logo } from '../ui'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu on navigation, otherwise it stays open over the new page.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border-subtle) bg-(--color-canvas)/88 backdrop-blur-md">
      <Container className="flex h-17 items-center justify-between gap-6">
        <Link to="/" aria-label={`${site.name}, home`} className="flex items-center">
          {/* The mark includes the "CERCLE" wordmark, so no text label. */}
          <Logo className="h-8 w-auto" decorative />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {site.nav.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm transition-colors duration-(--duration-base) hover:text-(--color-text) ${
                  isActive
                    ? 'font-semibold text-(--color-text)'
                    : 'text-(--color-text-muted)'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Button to={site.cta.href} variant="outline" size="sm">
            {site.cta.label}
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="rounded-(--radius-control) p-2 text-(--color-text) md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-(--color-border-subtle) bg-(--color-canvas) md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {site.nav.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="py-2.5 text-sm text-(--color-text-muted)"
              >
                {link.label}
              </NavLink>
            ))}
            <Button
              to={site.cta.href}
              variant="outline"
              size="sm"
              className="mt-3 self-start"
            >
              {site.cta.label}
            </Button>
          </Container>
        </nav>
      )}
    </header>
  )
}
