import { Badge, Heading } from 'ourcercle'

export const Tones = () => (
  <div className="flex flex-wrap items-center gap-3 p-6">
    <Badge>Draft entries, illustrative</Badge>
    <Badge tone="accent">8 seats left</Badge>
    <Badge tone="success">Confirmed</Badge>
    <Badge tone="warning">Waitlist only</Badge>
    <Badge tone="danger">Fully booked</Badge>
  </div>
)

export const InContext = () => (
  <div className="flex items-center gap-3 p-6">
    <Heading level={3} size="md">
      Chef’s Table No. 1
    </Heading>
    <Badge tone="accent">8 seats left</Badge>
  </div>
)
