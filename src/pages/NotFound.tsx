import Seo from '../components/Seo'
import { Button, Container, Eyebrow, Heading, Section } from '../ui'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noIndex />
      <Section tone="canvas" size="lg">
        <Container>
          <Eyebrow>404</Eyebrow>
          <Heading level={1} size="xl" className="mt-4">
            Page not found
          </Heading>
          <p className="mt-4 text-(--color-text-muted)">
            That page doesn&rsquo;t exist or has moved.
          </p>
          <Button to="/" variant="outline" className="mt-8">
            Back to home
          </Button>
        </Container>
      </Section>
    </>
  )
}
