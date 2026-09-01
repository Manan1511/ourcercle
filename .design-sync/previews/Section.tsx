import { Button, Container, Eyebrow, Heading, Section } from 'ourcercle'

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

// The cream ground is a LIGHT surface in a dark system. This story exists to
// prove composed content stays legible on it -- muted and subtle text roles are
// rebound by Section, and buttons must be `accent` (a primary button would be
// cream on cream).
export const CreamGround = () => (
  <div>
    <Section tone="alt" size="sm">
      <Container>
        <Eyebrow>Closing</Eyebrow>
        <Heading level={2} size="lg" className="mt-3">
          The next dispatch could be about your table.
        </Heading>
        <p className="mt-3 text-(--color-text-muted)">
          Muted body copy on the cream ground, rebound to wine so it stays readable.
        </p>
        <Button variant="accent" className="mt-6">
          Request an invite
        </Button>
      </Container>
    </Section>
    <Section tone="alt-raised" size="sm">
      <Container>
        <Eyebrow>Raised cream</Eyebrow>
        <Heading level={2} size="md" className="mt-3">
          The warmer of the two cream grounds
        </Heading>
      </Container>
    </Section>
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
          Cream ground, hairline above
        </Heading>
        <p className="mt-2 text-(--color-text-muted)">
          Cream is the alternate ground that gives long pages rhythm.
        </p>
      </Container>
    </Section>
  </div>
)
