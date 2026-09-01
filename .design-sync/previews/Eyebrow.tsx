import { Eyebrow, Heading } from 'ourcercle'

export const Default = () => (
  <div className="p-6">
    <Eyebrow>Est. 2024</Eyebrow>
  </div>
)

export const AboveHeading = () => (
  <div className="p-6">
    <Eyebrow className="mb-4">The collection</Eyebrow>
    <Heading level={2} size="xl">
      Pieces made to be kept
    </Heading>
  </div>
)
