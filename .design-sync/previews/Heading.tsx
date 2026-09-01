import { Heading } from 'ourcercle'

export const Scale = () => (
  <div className="flex flex-col gap-5 p-6">
    <Heading level={1} size="display">
      A quieter kind of luxury
    </Heading>
    <Heading level={2} size="xl">
      Made slowly, in small numbers
    </Heading>
    <Heading level={2} size="lg">
      Our approach
    </Heading>
    <Heading level={3} size="md">
      Materials and sourcing
    </Heading>
    <Heading level={4} size="sm">
      Care instructions
    </Heading>
  </div>
)

export const DisplayHero = () => (
  <div className="p-6">
    <Heading level={1} size="display">
      Cercle
    </Heading>
  </div>
)
