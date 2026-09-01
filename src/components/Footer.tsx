import { site } from '../content/site'
import { Container, Logo } from '../ui'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-(--color-border-subtle) bg-(--color-surface)">
      <Container className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Logo className="h-6 w-6 text-(--color-text-muted)" />
          <span className="font-(family-name:--font-display) text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">
            {site.name}
          </span>
        </div>
        <p className="text-sm text-(--color-text-subtle)">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        {/* TODO: add legal links (privacy, terms) once the client provides them. */}
      </Container>
    </footer>
  )
}
