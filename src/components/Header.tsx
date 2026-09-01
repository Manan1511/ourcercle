import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../content/site'
import { Button, Container, Logo } from '../ui'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu on navigation, otherwise it stays open over the new page.
  useEffect(() => setOpen(false), [pathname])

  // The header's rule appears only once the page has actually moved, so the
  // top of a page reads as one uninterrupted surface.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="site-header sticky top-0 z-50 border-b bg-(--color-canvas)/88 backdrop-blur-md"
    >
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
                `nav-link text-sm transition-colors duration-(--duration-base) hover:text-(--color-text) ${
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
          className="-mr-2 rounded-(--radius-control) p-2 text-(--color-text) md:hidden"
        >
          {/* Three lines that fold into a cross, rather than swapping one icon
              for another: the bars rotate to become the arms and the middle one
              collapses into them. */}
          <span className="menu-icon" data-open={open || undefined} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
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
