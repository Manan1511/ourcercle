import { Badge } from 'ourcercle'

export const Tones = () => (
  <div className="flex flex-wrap items-center gap-3 p-6">
    <Badge>New season</Badge>
    <Badge tone="accent">Limited</Badge>
    <Badge tone="success">In stock</Badge>
    <Badge tone="warning">Low stock</Badge>
    <Badge tone="danger">Sold out</Badge>
  </div>
)

export const InContext = () => (
  <div className="flex items-center gap-3 p-6">
    <span className="text-lg font-medium">Atelier Collection</span>
    <Badge tone="accent">Limited</Badge>
  </div>
)
