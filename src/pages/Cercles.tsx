import type { CSSProperties } from 'react'
import Seo from '../components/Seo'
import { cerclesMeta, eveningTimeline, upcomingEvents } from '../content/cercles'
import { site } from '../content/site'
import { Button, Container, Eyebrow, Heading, ImageSlot, Section } from '../ui'

export default function Cercles() {
  return (
    <>
      <Seo
        title={cerclesMeta.title}
        description={cerclesMeta.description}
        path="/cercles"
      />

      <Section
        tone="canvas"
        size="lg"
        style={{ paddingTop: '3rem', paddingBottom: 'var(--spacing-section)' }}
      >
        <Container>
          <div data-reveal className="flex flex-col gap-5">
            <Eyebrow>{cerclesMeta.eyebrow}</Eyebrow>
            <Heading level={1} size="display">
              {cerclesMeta.heading}
            </Heading>
            <p className="max-w-2xl text-lg leading-relaxed text-(--color-text-muted)">
              {cerclesMeta.intro}
            </p>
          </div>
        </Container>
      </Section>

      {/* Each event alternates image side and ground -- there's no fixed
          format to key these off, just whatever's actually upcoming. */}
      {upcomingEvents.length === 0 ? (
        <Section tone="surface" bordered>
          <Container data-reveal>
            <p className="text-(--color-text-muted)">
              Nothing on the calendar right now -- check back soon, or request an invite
              and we'll let you know as soon as something's confirmed.
            </p>
          </Container>
        </Section>
      ) : (
        upcomingEvents.map((event, i) => {
          const imageFirst = i % 2 === 0
          const image = (
            <ImageSlot
              key="image"
              ratio="3 / 2"
              src={event.detailImage ?? event.image}
              alt={event.detailImageAlt ?? event.imageAlt}
              label={event.detailImageLabel || event.imageLabel}
            />
          )
          const copy = (
            <div key="copy" className="flex flex-col items-start gap-4.5">
              {event.kicker && <Eyebrow>{event.kicker}</Eyebrow>}
              <Heading level={2} size="xl">
                {event.name}
              </Heading>
              <p className="text-lg leading-relaxed text-(--color-text-muted)">
                {event.description ?? event.blurb}
              </p>
              {event.meta && (
                <p className="text-[0.9375rem] text-(--color-text-subtle)">
                  {event.meta}
                </p>
              )}
              <Button to={site.cta.href} className="mt-2">
                Request a seat
              </Button>
            </div>
          )

          return (
            <Section
              key={event.slug}
              id={event.slug}
              tone={i % 2 === 0 ? 'surface' : 'canvas'}
              bordered={i % 2 === 0}
            >
              <Container data-reveal className="grid items-center gap-14 lg:grid-cols-2">
                {imageFirst ? [image, copy] : [copy, image]}
              </Container>
            </Section>
          )
        })
      )}

      {/* Cream ground: Section supplies the on-alt text roles for the eyebrow,
          the timeline body copy and the dividers below. */}
      <Section tone="alt">
        <Container>
          <div data-reveal className="flex max-w-2xl flex-col gap-4">
            <Eyebrow>{cerclesMeta.evening.eyebrow}</Eyebrow>
            <Heading level={2} size="xl">
              {cerclesMeta.evening.heading}
            </Heading>
          </div>

          <ul className="mt-14 grid list-none grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))] gap-10">
            {eveningTimeline.map((beat, i) => (
              <li
                key={beat.time}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                className="flex flex-col gap-3 border-t border-(--color-on-primary)/25 pt-5"
              >
                <span className="font-(family-name:--font-display) text-xl text-(--color-text-subtle)">
                  {beat.time}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-(--color-text-muted)">
                  {beat.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="raised">
        <Container width="prose">
          <div data-reveal className="flex flex-col items-center gap-7 text-center">
            <Heading level={2} size="xl">
              {cerclesMeta.cta.heading}
            </Heading>
            <Button to={site.cta.href} size="lg">
              {site.cta.label}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
