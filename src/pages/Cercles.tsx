import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import {
  cerclesMeta,
  eveningTimeline,
  formats,
  upcomingEvents,
} from '../content/cercles'
import { site } from '../content/site'
import {
  Badge,
  Button,
  Card,
  Container,
  Eyebrow,
  Heading,
  ImageSlot,
  Section,
} from '../ui'

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
        style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
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

      {/* Each format alternates image side and ground, echoing the design:
          surface (bordered) / canvas / surface (bordered) / canvas. */}
      {formats.map((format, i) => {
        const imageFirst = i % 2 === 0
        const image = (
          <ImageSlot
            key="image"
            ratio="3 / 2"
            src={format.detailImage}
            alt={format.detailImageAlt}
            label={format.detailImageLabel}
          />
        )
        const copy = (
          <div key="copy" className="flex flex-col items-start gap-4.5">
            <Eyebrow>{format.number}</Eyebrow>
            <Heading level={2} size="xl">
              {format.name}
            </Heading>
            <p className="text-lg leading-relaxed text-(--color-text-muted)">
              {format.description}
            </p>
            <p className="text-[0.9375rem] text-(--color-text-subtle)">{format.meta}</p>
          </div>
        )

        return (
          <Section
            key={format.slug}
            id={format.slug}
            tone={i % 2 === 0 ? 'surface' : 'canvas'}
            bordered={i % 2 === 0}
          >
            <Container
              data-reveal
              className="grid items-center gap-14 lg:grid-cols-2"
            >
              {imageFirst ? [image, copy] : [copy, image]}
            </Container>
          </Section>
        )
      })}

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

      <Section tone="canvas">
        <Container>
          <div
            data-reveal
            className="flex flex-wrap items-end justify-between gap-6"
          >
            <div className="flex flex-col gap-4">
              <Eyebrow>{cerclesMeta.upcoming.eyebrow}</Eyebrow>
              <Heading level={2} size="xl">
                {cerclesMeta.upcoming.heading}
              </Heading>
            </div>
            {/* Remove once the calendar below reflects real, bookable dates. */}
            <Badge>{cerclesMeta.upcoming.badge}</Badge>
          </div>

          <ul className="mt-12 grid list-none grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] gap-7">
            {upcomingEvents.map((event, i) => (
              <li
                key={event.slug}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <Card tone="cream" className="flex h-full flex-col gap-3.5">
                  <p className="text-[0.8125rem] tracking-[0.14em] uppercase text-(--color-text-subtle)">
                    {event.kicker}
                  </p>
                  <Heading level={3} size="md">
                    {event.title}
                  </Heading>
                  <p className="text-[0.9375rem] leading-relaxed text-(--color-text-muted)">
                    {event.blurb}
                  </p>
                  {/* A lighter link, not the page's Button -- these cards sit
                      one level below the closing CTA in the design's hierarchy. */}
                  <Link
                    to={site.cta.href}
                    className="group mt-auto inline-flex items-center gap-1 text-sm text-(--color-link) transition-colors duration-(--duration-base) hover:text-(--color-on-primary)"
                  >
                    Request a seat
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-(--duration-base) ease-(--ease-out-soft) group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </Card>
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
