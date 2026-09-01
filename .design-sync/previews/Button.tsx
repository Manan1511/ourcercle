import { Button } from 'ourcercle'

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3 p-6">
    <Button variant="primary">Book a consultation</Button>
    <Button variant="accent">View collection</Button>
    <Button variant="outline">Our story</Button>
    <Button variant="ghost">Learn more</Button>
  </div>
)

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
)

export const AsLink = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button to="/contact">Internal route</Button>
    <Button href="https://example.com" variant="outline">
      External link
    </Button>
  </div>
)

export const Disabled = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button disabled>Unavailable</Button>
    <Button variant="accent" disabled>
      Sold out
    </Button>
  </div>
)
