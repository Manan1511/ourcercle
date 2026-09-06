import Seo from '../components/Seo'
import {
  founder,
  lede,
  paragraphs,
  principles,
  principlesMeta,
  storyCta,
  storyMeta,
} from '../content/story'
import { site } from '../content/site'
import { Button, Container, Eyebrow, Heading, ImageSlot, Section } from '../ui'

export default function Story() {
  return (
    <>
      <Seo
        title={storyMeta.title}
        description={storyMeta.description}
        path="/story"
      />

      <Section
        tone="canvas"
        size="lg"
        style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
      >
        <Container>
          <div data-reveal className="flex flex-col gap-5">
            <Eyebrow>{storyMeta.eyebrow}</Eyebrow>
            <Heading level={1} size="display">
              {storyMeta.heading}
            </Heading>
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container width="prose">
          <div data-reveal className="flex flex-col gap-6">
            <p className="font-(family-name:--font-display) text-2xl leading-snug sm:text-3xl">
              {lede}
            </p>
            {paragraphs.map((p) => (
              <p key={p} className="text-[1.0625rem] leading-relaxed text-(--color-text-muted)">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas">
        <Container>
          <div data-reveal className="flex max-w-2xl flex-col gap-4">
            <Eyebrow>{principlesMeta.eyebrow}</Eyebrow>
            <Heading level={2} size="xl">
              {principlesMeta.heading}
            </Heading>
          </div>

          <ul className="mt-14 grid list-none grid-cols-[repeat(auto-fit,minmax(16.25rem,1fr))] gap-10">
            {principles.map((principle) => (
              <li
                key={principle.title}
                data-reveal
                className="flex flex-col gap-3 border-t border-(--color-border) pt-5"
              >
                <Heading level={3} size="lg">
                  {principle.title}
                </Heading>
                <p className="text-[0.9375rem] leading-relaxed text-(--color-text-muted)">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Cream ground: Section supplies the on-alt text roles for the
          attribution line below. */}
      <Section tone="alt">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="w-full max-w-105">
            <ImageSlot
              ratio={founder.imageRatio}
              src={founder.image}
              alt={founder.imageAlt}
              label={founder.imageLabel}
              tone="cream"
            />
          </div>
          <div data-reveal className="flex flex-col gap-5">
            <p className="font-(family-name:--font-display) text-2xl leading-snug text-balance sm:text-3xl">
              {founder.quote}
            </p>
            {/* Explicitly unattributed in the source design -- do not invent
                a founder name here; ship the placeholder verbatim. */}
            <p className="text-[0.9375rem] text-(--color-text-subtle)">
              {founder.attribution}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container width="prose">
          <div data-reveal className="flex flex-col items-center gap-7 text-center">
            <Heading level={2} size="xl">
              {storyCta.heading}
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
