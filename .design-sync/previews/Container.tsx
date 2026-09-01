import { Container, Heading } from 'ourcercle'

export const Widths = () => (
  <div className="flex flex-col gap-4 p-6">
    <Container className="border border-dashed border-(--color-border) py-5">
      <Heading level={3} size="sm">
        width="content" — 72rem, the default page column
      </Heading>
    </Container>
    <Container
      width="prose"
      className="border border-dashed border-(--color-border) py-5"
    >
      <Heading level={3} size="sm">
        width="prose" — 44rem, for long-form reading
      </Heading>
    </Container>
  </div>
)
