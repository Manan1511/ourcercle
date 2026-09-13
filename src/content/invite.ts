/**
 * Request an invite.
 *
 * Sourced from the client's Claude Design canvas (`Invite.dc.html`), the
 * design's source of truth. That file is an editable Claude Design
 * component with three variant props (copyTone: warm|spare, formLayout:
 * side-by-side|centered, showReassurance) -- this transcribes its DEFAULTS
 * (warm, side-by-side, reassurance shown), which is what a first-time
 * visitor would actually see.
 *
 * The form submits to Supabase (see src/lib/supabase.ts and the
 * `invite_requests` table) -- an earlier draft of this comment pointed at
 * Netlify Forms; that plan was superseded once the admin panel needed a real
 * database anyway.
 */

export const inviteMeta = {
  title: 'Request an invite',
  description:
    'Request an invite to an upcoming Cercle. Tell us who you are and what you’re curious about; every room is composed by hand.',
  eyebrow: 'Request an invite',
  heading: 'There’s a seat with your name on it.',
  headingEmphasis: 'Almost.',
  intro:
    'Tell us a little about yourself, not your CV, just your curiosities. We read every request ourselves and compose each Cercle by hand, so a reply can take a week or two.',
}

export const inviteForm = {
  nameLabel: 'Full name',
  emailLabel: 'Email',
  emailHint: 'We only use this to reply, no newsletters unless you ask.',
  cityLabel: 'City',
  eventLabel: 'Which Cercle?',
  eventNoPreferenceLabel: 'No preference — whichever fits',
  aboutLabel: 'What draws you here?',
  aboutPlaceholder: 'A curiosity, a story, the kind of table you’d love to sit at…',
  submitLabel: 'Send my request',
  submittingLabel: 'Sending…',
  successHeading: 'Request sent.',
  successBody:
    'We read every one ourselves. If a room needs exactly you, you’ll hear from us.',
  errorMessage: 'Something went wrong sending that. Please try again in a moment.',
  disclaimer:
    'By requesting an invite you agree to hear from us about your request. Nothing else, ever.',
}

export interface NextStep {
  number: string
  body: string
}

export const nextStepsMeta = {
  heading: 'What happens next',
}

export const nextSteps: NextStep[] = [
  {
    number: '01',
    body: 'We read your request, a person, not a filter.',
  },
  {
    number: '02',
    body: 'When a room needs exactly you, an invitation arrives with the date, the place and the format. Nothing more.',
  },
  {
    number: '03',
    body: 'You take your seat. The rest of the table is our problem, happily.',
  },
]

export const reassurance = {
  heading: 'Invitation-only, not exclusive.',
  body: 'We curate rooms, not people. There’s no vetting for status and no membership fee, just an honest attempt to seat you where the conversation will be best.',
}
