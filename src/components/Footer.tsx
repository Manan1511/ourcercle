import { site } from '../content/site'
import { Container, Logo } from '../ui'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-(--color-border-subtle) bg-(--color-surface)">
      <Container className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <Logo className="h-7 w-auto text-(--color-text-muted)" title={site.name} />
        <p className="text-sm text-(--color-text-subtle)">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        {/* TODO: add legal links (privacy, terms) once the client provides them. */}
      </Container>
    </footer>
  )
}
