import Seo from '../components/Seo'
import {
  inviteForm,
  inviteMeta,
  nextSteps,
  nextStepsMeta,
  reassurance,
} from '../content/invite'
import { site } from '../content/site'
import { Button, Card, Container, Eyebrow, Heading, Input, Section, Textarea } from '../ui'

export default function Invite() {
  return (
    <>
      <Seo
        title={inviteMeta.title}
        description={inviteMeta.description}
        path="/invite"
      />

      <Section tone="canvas" size="lg" className="pb-(--spacing-section)">
        <Container>
          <div data-reveal className="flex flex-col gap-5">
            <Eyebrow>{inviteMeta.eyebrow}</Eyebrow>
            <Heading level={1} size="display">
              {inviteMeta.heading} <em className="italic">{inviteMeta.headingEmphasis}</em>
            </Heading>
            <p className="max-w-2xl text-lg leading-relaxed text-(--color-text-muted)">
              {inviteMeta.intro}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container className="grid items-start gap-16 lg:grid-cols-[minmax(0,34rem)_minmax(0,26rem)]">
          {/*
            No submission backend yet -- the button is deliberately
            type="button", not a real form action. Netlify Forms wiring is
            tracked in the README's pre-launch checklist; don't fake a
            success state ahead of that.
          */}
          <Card
            tone="raised"
            data-reveal
            className="flex w-full flex-col gap-5.5 p-9"
          >
            <Input label={inviteForm.nameLabel} name="name" autoComplete="name" />
            <Input
              label={inviteForm.emailLabel}
              name="email"
              type="email"
              autoComplete="email"
              hint={inviteForm.emailHint}
            />
            <Input label={inviteForm.cityLabel} name="city" autoComplete="address-level2" />
            <Textarea
              label={inviteForm.aboutLabel}
              name="about"
              rows={5}
              placeholder={inviteForm.aboutPlaceholder}
            />
            <Button type="button" size="lg" className="w-full">
              {inviteForm.submitLabel}
            </Button>
            <p className="text-xs leading-relaxed text-(--color-text-subtle)">
              {inviteForm.disclaimer}
            </p>
          </Card>

          <aside aria-label="What happens next" data-reveal className="flex flex-col gap-7">
            <Heading level={2} size="lg">
              {nextStepsMeta.heading}
            </Heading>
            <ol className="flex list-none flex-col gap-6 p-0">
              {nextSteps.map((step) => (
                <li
                  key={step.number}
                  className="flex flex-col gap-2 border-t border-(--color-border) pt-4"
                >
                  <span className="font-(family-name:--font-display) text-lg text-(--color-text-subtle)">
                    {step.number}
                  </span>
                  <p className="text-[0.9375rem] leading-relaxed text-(--color-text-muted)">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
            <p className="text-[0.9375rem] leading-relaxed text-(--color-text-subtle)">
              Questions first? Write to{' '}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-(--color-link) transition-colors duration-(--duration-base) hover:text-(--color-text)"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </aside>
        </Container>
      </Section>

      {/* Cream ground: Section supplies the on-alt text roles. */}
      <Section tone="alt">
        <Container width="prose">
          <div data-reveal className="flex flex-col items-center gap-5 text-center">
            <Heading level={2} size="lg">
              {reassurance.heading}
            </Heading>
            <p className="text-lg leading-relaxed text-(--color-text-muted)">
              {reassurance.body}
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
