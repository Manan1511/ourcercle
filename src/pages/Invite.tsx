import { useState, type FormEvent } from 'react'
import Seo from '../components/Seo'
import { upcomingEvents } from '../content/cercles'
import {
  inviteForm,
  inviteMeta,
  nextSteps,
  nextStepsMeta,
  reassurance,
} from '../content/invite'
import { site } from '../content/site'
import { supabase } from '../lib/supabase'
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Heading,
  Input,
  Section,
  Select,
  Textarea,
} from '../ui'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Invite() {
  // With one event on the calendar there's nothing to actually choose, so it
  // selects itself; once there's more than one, the visitor picks (or leaves
  // it open with the "no preference" option below).
  const eventOptions =
    upcomingEvents.length === 1
      ? upcomingEvents.map((event) => ({ value: event.slug, label: event.name }))
      : [
          { value: '', label: inviteForm.eventNoPreferenceLabel },
          ...upcomingEvents.map((event) => ({ value: event.slug, label: event.name })),
        ]

  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setStatus('submitting')

    const { error } = await supabase.from('invite_requests').insert({
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      city: String(data.get('city') ?? '').trim() || null,
      event_slug: String(data.get('event') ?? '').trim() || null,
      about: String(data.get('about') ?? '').trim() || null,
    })

    setStatus(error ? 'error' : 'success')
  }

  return (
    <>
      <Seo title={inviteMeta.title} description={inviteMeta.description} path="/invite" />

      <Section
        tone="canvas"
        size="lg"
        style={{ paddingTop: '3rem', paddingBottom: 'var(--spacing-section)' }}
      >
        <Container>
          <div data-reveal className="flex flex-col gap-5">
            <Eyebrow>{inviteMeta.eyebrow}</Eyebrow>
            <Heading level={1} size="display">
              {inviteMeta.heading}{' '}
              <em className="italic">{inviteMeta.headingEmphasis}</em>
            </Heading>
            <p className="max-w-2xl text-lg leading-relaxed text-(--color-text-muted)">
              {inviteMeta.intro}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="surface" bordered>
        <Container className="grid items-start gap-16 lg:grid-cols-[minmax(0,34rem)_minmax(0,26rem)]">
          <Card tone="cream" data-reveal className="w-full p-0">
            {status === 'success' ? (
              <div className="flex flex-col gap-3 p-9 text-center">
                <Heading level={2} size="md">
                  {inviteForm.successHeading}
                </Heading>
                <p className="text-[0.9375rem] leading-relaxed text-(--color-text-muted)">
                  {inviteForm.successBody}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-9">
                <Input
                  label={inviteForm.nameLabel}
                  name="name"
                  autoComplete="name"
                  required
                  disabled={status === 'submitting'}
                />
                <Input
                  label={inviteForm.emailLabel}
                  name="email"
                  type="email"
                  autoComplete="email"
                  hint={inviteForm.emailHint}
                  required
                  disabled={status === 'submitting'}
                />
                <Input
                  label={inviteForm.cityLabel}
                  name="city"
                  autoComplete="address-level2"
                  disabled={status === 'submitting'}
                />
                <Select
                  label={inviteForm.eventLabel}
                  name="event"
                  options={eventOptions}
                  disabled={status === 'submitting'}
                />
                <Textarea
                  label={inviteForm.aboutLabel}
                  name="about"
                  rows={5}
                  placeholder={inviteForm.aboutPlaceholder}
                  disabled={status === 'submitting'}
                />
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? inviteForm.submittingLabel
                    : inviteForm.submitLabel}
                </Button>
                {status === 'error' && (
                  <p
                    role="alert"
                    className="text-xs leading-relaxed text-(--color-danger)"
                  >
                    {inviteForm.errorMessage}
                  </p>
                )}
                <p className="text-xs leading-relaxed text-(--color-text-subtle)">
                  {inviteForm.disclaimer}
                </p>
              </form>
            )}
          </Card>

          <aside
            aria-label="What happens next"
            data-reveal
            className="flex flex-col gap-7"
          >
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
