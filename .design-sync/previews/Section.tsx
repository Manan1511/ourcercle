import { Container, Eyebrow, Heading, Section } from 'ourcercle'

export const Tones = () => (
  <div>
    {(['canvas', 'surface', 'raised', 'alt', 'alt-raised'] as const).map((tone) => (
      <Section key={tone} tone={tone} size="sm">
        <Container>
          <Eyebrow>{tone}</Eyebrow>
          <Heading level={2} size="md" className="mt-2">
            Section ground
          </Heading>
        </Container>
      </Section>
    ))}
  </div>
)

export const Bordered = () => (
  <div>
    <Section tone="canvas" size="sm">
      <Container>
        <Heading level={2} size="md">
          Wine ground
        </Heading>
      </Container>
    </Section>
    <Section tone="alt" size="sm" bordered>
      <Container>
        <Heading level={2} size="md">
          Teal ground, hairline above
        </Heading>
        <p className="mt-2 text-(--color-text-muted)">
          Teal is the alternate ground that gives long pages rhythm.
        </p>
      </Container>
    </Section>
  </div>
)
