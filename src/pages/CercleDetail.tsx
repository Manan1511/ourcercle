import type { CSSProperties } from 'react'
import { useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import { events } from '../content/cercles'
import { site } from '../content/site'
import { Button, Container, Eyebrow, Heading, ImageSlot, Section } from '../ui'
import NotFound from './NotFound'

/**
 * One page per Cercle, past or upcoming -- there's no fixed catalogue of
 * formats to route by, so this looks the event up by slug out of the same
 * `events` list every other page reads from. Every slug that exists in
 * content is enumerated at build time (see `includedRoutes` in
 * vite.config.ts), so this always renders as real prerendered HTML, never a
 * client-side lookup.
 */
export default function CercleDetail() {
  const { slug } = useParams()
  const event = events.find((e) => e.slug === slug)

  if (!event) return <NotFound />

  const isPast = event.status === 'past'

  return (
    <>
      <Seo
        title={event.name}
        description={event.description ?? event.blurb}
        path={`/cercles/${event.slug}`}
        image={event.detailImage ?? event.image}
      />

      <Section tone="canvas" size="lg" style={{ paddingTop: '3rem' }}>
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="flex flex-col items-start gap-4">
            <Eyebrow>{isPast ? 'Past Cercle' : 'Upcoming Cercle'}</Eyebrow>
            {event.kicker && <p className="text-(--color-text-subtle)">{event.kicker}</p>}
            <Heading level={1} size="display">
              {event.name}
            </Heading>
            <p className="text-lg leading-relaxed text-(--color-text-muted)">
              {event.description ?? event.blurb}
            </p>
            {event.meta && (
              <p className="text-[0.9375rem] text-(--color-text-subtle)">{event.meta}</p>
            )}
            {!isPast && (
              <Button to={site.cta.href} size="lg" className="mt-2">
                Request a seat
              </Button>
            )}
          </div>
          <div data-reveal style={{ '--reveal-delay': '120ms' } as CSSProperties}>
            <ImageSlot
              ratio="4 / 5"
              src={event.detailImage ?? event.image}
              alt={event.detailImageAlt ?? event.imageAlt}
              label={event.detailImageLabel || event.imageLabel}
            />
          </div>
        </Container>
      </Section>

      <Section tone="alt">
        <Container width="prose">
          <div data-reveal className="flex flex-col items-center gap-7 text-center">
            <Heading level={2} size="xl">
              {isPast
                ? 'There is a seat at the next one.'
                : 'Come as you are. We’ll handle the rest.'}
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
