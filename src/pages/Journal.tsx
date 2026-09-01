import type { CSSProperties } from 'react'
import Seo from '../components/Seo'
import { entries, journalMeta } from '../content/journal'
import { site } from '../content/site'
import { Badge, Button, Container, Eyebrow, Heading, ImageSlot, Section } from '../ui'

export default function Journal() {
  return (
    <>
      <Seo
        title={journalMeta.title}
        description={journalMeta.description}
        path="/journal"
      />

      <Section tone="canvas" size="lg" className="pb-(--spacing-section)">
        <Container>
          <div data-reveal className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow>{journalMeta.eyebrow}</Eyebrow>
              {/* Remove once the entries below are real write-ups. */}
              <Badge>{journalMeta.badge}</Badge>
            </div>
            <Heading level={1} size="display">
              {journalMeta.heading}
            </Heading>
            <p className="max-w-2xl text-lg leading-relaxed text-(--color-text-muted)">
              {journalMeta.intro}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] gap-8">
            {entries.map((entry, i) => (
              <li
                key={entry.slug}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <article className="flex flex-col gap-4">
                  <ImageSlot
                    ratio="3 / 2"
                    src={entry.image}
                    alt={entry.imageAlt}
                    label={entry.imageLabel}
                  />
                  <p className="text-[0.8125rem] tracking-[0.14em] uppercase text-(--color-text-subtle)">
                    {entry.format}
                    {entry.draft && ' · Draft'}
                  </p>
                  <Heading level={2} size="md" className="text-[1.6rem] leading-tight">
                    {entry.title}
                  </Heading>
                  <p className="text-[0.9375rem] leading-relaxed text-(--color-text-muted)">
                    {entry.excerpt}
                  </p>
                  {/* No detail route exists yet, so this is deliberately text
                      rather than a link -- a dead <a> would be worse. */}
                  <p className="text-sm text-(--color-text-subtle)">
                    Full dispatch coming soon
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Cream ground: Section supplies the on-alt text roles, and the button
          must be `accent` -- a `primary` button would be cream on cream. */}
      <Section tone="alt">
        <Container width="prose">
          <div data-reveal className="flex flex-col items-center gap-7 text-center">
            <Heading level={2} size="xl">
              {journalMeta.cta.heading}
            </Heading>
            <Button to={site.cta.href} variant="accent" size="lg">
              {site.cta.label}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
