import type { CSSProperties, ReactNode } from 'react'
import Intro from '../components/Intro'
import Seo from '../components/Seo'
import { heroImage, pastEvents } from '../content/cercles'
import { home } from '../content/pages'
import { site } from '../content/site'
import { Button, Container, Eyebrow, Heading, ImageSlot, Section } from '../ui'

/**
 * One icon per "why join" reason, in the order they're defined in
 * content/pages.ts. Kept here rather than in the content file since these
 * are presentation, not copy -- simple line marks in the same thin-stroke,
 * currentColor style as Logo, so they inherit whatever text colour the
 * ground gives them.
 */
const WHY_JOIN_ICONS: ReactNode[] = [
  // Meet outside your circle -- two overlapping circles.
  <svg key="circles" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="11" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  // Conversation, not networking -- a speech bubble.
  <svg key="bubble" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path
      d="M5 8.5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-8.5L7 22v-3.5H8a3 3 0 0 1-3-3v-7Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>,
  // Small by design -- a small round table, seats marked around it.
  <svg key="table" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" />
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="14" y1="1.5" x2="14" y2="4.5" />
      <line x1="25" y1="7.75" x2="22.4" y2="9.25" />
      <line x1="25" y1="20.25" x2="22.4" y2="18.75" />
      <line x1="3" y1="7.75" x2="5.6" y2="9.25" />
      <line x1="3" y1="20.25" x2="5.6" y2="18.75" />
    </g>
  </svg>,
]

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
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {home.hero.cta && (
                <Button to={home.hero.cta.href} size="lg">
                  {home.hero.cta.label}
                </Button>
              )}
              <Button to="/cercles" variant="outline" size="lg">
                See what&rsquo;s coming up
              </Button>
            </div>
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
                className="flex flex-col gap-4 border-t border-(--color-border) pt-5"
              >
                <div className="h-7 w-7 text-(--color-accent)">{WHY_JOIN_ICONS[i]}</div>
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
        </Container>

        {/* A full image+copy block per past event, not a small card --
            with only one so far, a card in a grid just left a lot of the
            row empty. This fills the space properly and scales the same
            way as it grows into a real list. */}
        {pastEvents.map((event, i) => (
          <Container key={event.slug} className="mt-12">
            <div
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              className="grid items-center gap-14 lg:grid-cols-2"
            >
              <ImageSlot
                ratio="3 / 2"
                src={event.image}
                alt={event.imageAlt}
                label={event.imageLabel}
              />
              <div className="flex flex-col items-start gap-4">
                {event.kicker && <Eyebrow>{event.kicker}</Eyebrow>}
                <Heading level={3} size="xl">
                  {event.name}
                </Heading>
                <p className="text-lg leading-relaxed text-(--color-text-muted)">
                  {event.blurb}
                </p>
                <Button to={`/cercles/${event.slug}`} className="mt-1">
                  More about this Cercle
                </Button>
              </div>
            </div>
          </Container>
        ))}
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
