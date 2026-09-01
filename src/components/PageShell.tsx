import type { PageContent } from '../content/pages'
import { Button, Container, Eyebrow, Heading, Section } from '../ui'
import Seo from './Seo'

/**
 * Generic page rendering. Placeholder layout so routes are navigable before
 * the design lands -- expect to replace this with real per-page components
 * once the Claude Design output arrives.
 */
export default function PageShell({
  content,
  path,
  noIndex = false,
}: {
  content: PageContent
  path: string
  /** Keep unfinished pages out of the search index. */
  noIndex?: boolean
}) {
  return (
    <>
      <Seo
        title={content.meta.title}
        description={content.meta.description}
        absoluteTitle={content.meta.absoluteTitle}
        noIndex={noIndex}
        path={path}
      />

      <Section tone="canvas" size="lg">
        <Container>
          {content.hero.eyebrow && (
            <Eyebrow className="mb-4">{content.hero.eyebrow}</Eyebrow>
          )}
          <Heading level={1} size="display">
            {content.hero.heading}
          </Heading>
          <p className="mt-6 max-w-2xl text-lg text-(--color-text-muted)">
            {content.hero.body}
          </p>
          {content.hero.cta && (
            <Button to={content.hero.cta.href} size="lg" className="mt-9">
              {content.hero.cta.label}
            </Button>
          )}
        </Container>
      </Section>

      {content.sections.length > 0 && (
        <Section tone="surface" bordered>
          <Container className="grid gap-10 sm:grid-cols-2">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <Heading level={2} size="md">
                  {section.heading}
                </Heading>
                <p className="mt-2.5 text-(--color-text-muted)">{section.body}</p>
              </div>
            ))}
          </Container>
        </Section>
      )}
    </>
  )
}
