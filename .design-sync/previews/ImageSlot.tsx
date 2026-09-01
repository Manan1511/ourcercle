import { ImageSlot, Heading } from 'ourcercle'

// A tiny inline photo stands in for real photography, so the filled state can
// be shown without shipping an asset into the design system bundle.
const SAMPLE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%238C3A51'/%3E%3Cstop offset='1' stop-color='%23471224'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='200' fill='url(%23g)'/%3E%3Ccircle cx='210' cy='60' r='34' fill='%23F7EEC7' opacity='.85'/%3E%3C/svg%3E"

export const Empty = () => (
  <div className="p-6">
    <ImageSlot ratio="3 / 2" label="Dispatch photo — table detail (3:2)" />
  </div>
)

export const Ratios = () => (
  <div className="grid grid-cols-3 gap-5 p-6">
    <ImageSlot ratio="3 / 2" label="Landscape 3:2" />
    <ImageSlot ratio="4 / 5" label="Portrait 4:5" />
    <ImageSlot ratio="1 / 1" label="Square 1:1" />
  </div>
)

export const Filled = () => (
  <div className="p-6">
    <ImageSlot ratio="3 / 2" src={SAMPLE} alt="Guests seated around a candlelit table" />
  </div>
)

export const InAGrid = () => (
  <div className="grid grid-cols-3 gap-6 p-6">
    {[
      'The dish nobody could name',
      'Fourteen strangers, one question',
      'Bad pottery, good company',
    ].map((title, i) => (
      <article key={title} className="flex flex-col gap-3">
        <ImageSlot
          ratio="3 / 2"
          src={i === 0 ? SAMPLE : undefined}
          label="Dispatch photo (3:2)"
          alt={i === 0 ? 'A plated course' : undefined}
        />
        <Heading level={3} size="sm">
          {title}
        </Heading>
      </article>
    ))}
  </div>
)
