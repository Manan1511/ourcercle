import type { CSSProperties } from 'react'
import Intro from '../components/Intro'
import Seo from '../components/Seo'
import { formats, heroImage } from '../content/cercles'
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

      <Section tone="canvas" size="lg">
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
          {/* Portrait hero photograph, still outstanding. */}
          <div data-reveal style={{ '--reveal-delay': '120ms' } as CSSProperties}>
            <ImageSlot ratio={heroImage.ratio} label={heroImage.label} />
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container>
          <Eyebrow>The Cercles</Eyebrow>
          <Heading level={2} size="xl" className="mt-3 max-w-2xl">
            Four ways into a room.
          </Heading>
          <p className="mt-4 max-w-2xl text-(--color-text-muted)">
            Every Cercle is small on purpose. The format changes; the intent doesn’t.
          </p>

          <ul className="mt-12 grid list-none grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-6">
            {formats.map((format, i) => (
              <li
                key={format.slug}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <Card
                  tone="raised"
                  interactive
                  className="flex h-full flex-col gap-4 overflow-hidden p-0 transition-transform duration-(--duration-base) ease-(--ease-out-soft) hover:-translate-y-1"
                >
                  <ImageSlot
                    ratio="3 / 2"
                    src={format.image}
                    alt={format.imageAlt}
                    label={format.imageLabel}
                    className="rounded-none"
                  />
                  <div className="flex flex-col gap-2 p-6 pt-0">
                    <Heading level={3} size="md">
                      {format.name}
                    </Heading>
                    <p className="text-sm leading-relaxed text-(--color-text-muted)">
                      {format.blurb}
                    </p>
                    <p className="mt-1 text-xs tracking-[0.14em] uppercase text-(--color-text-subtle)">
                      {format.seats}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>

          <div data-reveal>
            <Button to="/cercles" variant="outline" className="mt-10">
              All the Cercles
            </Button>
          </div>
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
