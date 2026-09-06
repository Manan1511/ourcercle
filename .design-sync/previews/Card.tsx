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
    <Badge tone="accent">8 seats left</Badge>
    <Heading level={3} size="md" className="mt-4">
      The Chef’s Table
    </Heading>
    <p className="mt-2 text-(--color-text-muted)">
      A dozen strangers around one table, a chef cooking within arm’s reach.
    </p>
    <Button variant="outline" size="sm" className="mt-5">
      View details
    </Button>
  </Card>
)

// `cream` is a highlighted surface, not a section ground -- shown here the way
// it is actually used, as a standout object (an event listing) on a dark page,
// not as a full-bleed background.
export const Cream = () => (
  <div className="flex flex-col gap-5 p-6 sm:flex-row">
    <Card tone="cream" className="flex-1">
      <p className="text-xs tracking-[0.14em] uppercase text-(--color-text-subtle)">
        Chef’s Table · October
      </p>
      <Heading level={3} size="md" className="mt-3">
        Chef’s Table No. 1
      </Heading>
      <p className="mt-2 text-(--color-text-muted)">
        Twelve seats, a five-course tasting, and a chef who’ll tell you where
        every dish began.
      </p>
    </Card>
    <Card tone="cream" interactive className="flex-1">
      <Heading level={3} size="md">
        Interactive
      </Heading>
      <p className="mt-2 text-(--color-text-muted)">
        The border warms slightly on hover, matching the dark-tone cards'
        behaviour rather than inventing a new one.
      </p>
    </Card>
  </div>
)
