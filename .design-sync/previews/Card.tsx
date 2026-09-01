import { Badge, Button, Card, Heading } from 'ourcercle'

export const Tones = () => (
  <div className="grid gap-5 p-6 sm:grid-cols-2">
    <Card tone="raised">
      <Heading level={3} size="md">
        Raised
      </Heading>
      <p className="mt-2 text-(--color-text-muted)">
        Sits on the crimson ground. The default for content that should lift off the page.
      </p>
    </Card>
    <Card tone="surface">
      <Heading level={3} size="md">
        Surface
      </Heading>
      <p className="mt-2 text-(--color-text-muted)">
        The quieter plum ground, for cards that sit inside an already-raised section.
      </p>
    </Card>
  </div>
)

export const Interactive = () => (
  <Card interactive className="m-6">
    <Badge tone="accent">Limited</Badge>
    <Heading level={3} size="md" className="mt-4">
      The Atelier Coat
    </Heading>
    <p className="mt-2 text-(--color-text-muted)">
      Cut from undyed wool and finished by hand. Forty made this season.
    </p>
    <Button variant="outline" size="sm" className="mt-5">
      View details
    </Button>
  </Card>
)
