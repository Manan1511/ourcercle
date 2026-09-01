import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { Container, Logo } from '../ui'

const linkClass =
  'text-sm text-(--color-text-muted) transition-colors duration-(--duration-base) hover:text-(--color-text)'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-(--color-border-subtle) bg-(--color-surface)">
      <Container className="flex flex-wrap justify-between gap-12 pt-14">
        <div className="flex max-w-70 flex-col gap-4">
          <Logo className="h-7 w-auto" decorative />
          <p className="text-sm leading-relaxed text-(--color-text-muted)">
            {site.tagline}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2.5">
          {[...site.nav, site.cta].map((link) => (
            <Link key={link.href} to={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5">
          <a href={`mailto:${site.contact.email}`} className={linkClass}>
            {site.contact.email}
          </a>
          <a href={site.contact.instagram} className={linkClass} rel="me noopener">
            Instagram
          </a>
        </div>
      </Container>

      <Container className="pt-10 pb-8">
        <p className="text-xs text-(--color-text-subtle)">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
      {/* TODO: add legal links (privacy, terms) once the client provides them. */}
    </footer>
  )
}
