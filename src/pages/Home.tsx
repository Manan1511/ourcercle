import type { CSSProperties } from 'react'
import Intro from '../components/Intro'
import Seo from '../components/Seo'
import { heroImage, pastEvents } from '../content/cercles'
import { home } from '../content/pages'
import { site } from '../content/site'
import { Button, Card, Container, Eyebrow, Heading, ImageSlot, Section } from '../ui'

export default function Home() {
  return (
    <>
      {/* Homepage only, and only on a real page load: someone arriving on
          /journal from search reads immediately, and navigating back here
          mid-session doesn't replay it. */}
      <Intro />

      <Seo
        title={home.meta.title}
        description={home.meta.description}
        absoluteTitle={home.meta.absoluteTitle}
        path="/"
      />

      <Section tone="canvas" size="lg" style={{ paddingTop: '3rem' }}>
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal>
            <Eyebrow className="mb-4">{home.hero.eyebrow}</Eyebrow>
            <Heading level={1} size="display">
              {home.hero.heading}
            </Heading>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-text-muted)">
              {home.hero.body}
            </p>
            {home.hero.cta && (
              <Button to={home.hero.cta.href} size="lg" className="mt-9">
                {home.hero.cta.label}
              </Button>
            )}
          </div>
          <div data-reveal style={{ '--reveal-delay': '120ms' } as CSSProperties}>
            <ImageSlot
              ratio={heroImage.ratio}
              label={heroImage.label}
              src={heroImage.src}
              alt={heroImage.alt}
            />
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <div data-reveal className="flex flex-col gap-4">
            <Eyebrow>{home.whyJoin.eyebrow}</Eyebrow>
            <Heading level={2} size="xl" className="max-w-2xl">
              {home.whyJoin.heading}
            </Heading>
            <p className="max-w-2xl text-(--color-text-muted)">{home.whyJoin.intro}</p>
          </div>

          <ul className="mt-14 grid list-none grid-cols-[repeat(auto-fit,minmax(16.25rem,1fr))] gap-10">
            {home.whyJoin.reasons.map((reason, i) => (
              <li
                key={reason.title}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                className="flex flex-col gap-3 border-t border-(--color-border) pt-5"
              >
                <Heading level={3} size="lg">
                  {reason.title}
                </Heading>
                <p className="text-[0.9375rem] leading-relaxed text-(--color-text-muted)">
                  {reason.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* There's no fixed catalogue of formats -- each Cercle is its own
          event. This is a record of the ones that have actually happened,
          not a menu of options; currently just Palette to Plate, with room
          to grow into a real list. */}
      <Section tone="canvas" bordered>
        <Container>
          <Eyebrow>{home.pastEvents.eyebrow}</Eyebrow>
          <Heading level={2} size="xl" className="mt-3 max-w-2xl">
            {home.pastEvents.heading}
          </Heading>
          <p className="mt-4 max-w-2xl text-(--color-text-muted)">
            {home.pastEvents.intro}
          </p>

          <ul className="mt-12 grid list-none grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-6">
            {pastEvents.map((event, i) => (
              <li
                key={event.slug}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <Card
                  tone="raised"
                  interactive
                  className="flex h-full flex-col gap-4 overflow-hidden p-0"
                >
                  <ImageSlot
                    ratio="3 / 2"
                    src={event.image}
                    alt={event.imageAlt}
                    label={event.imageLabel}
                    className="rounded-none"
                  />
                  <div className="flex flex-col gap-2 p-6 pt-0">
                    {event.kicker && (
                      <p className="text-xs tracking-[0.14em] text-(--color-text-subtle) uppercase">
                        {event.kicker}
                      </p>
                    )}
                    <Heading level={3} size="md">
                      {event.name}
                    </Heading>
                    <p className="text-sm leading-relaxed text-(--color-text-muted)">
                      {event.blurb}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="alt">
        <Container width="prose">
          <div data-reveal className="flex flex-col items-center gap-7 text-center">
            <Heading level={2} size="xl">
              There is a seat at the next one.
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
