/**
 * Our story.
 *
 * Sourced from the client's Claude Design canvas (`Story.dc.html`), the
 * design's source of truth -- treat this as a transcription, not a separate
 * draft. The founder quote and attribution are explicitly placeholder in the
 * design itself ("name and note to be supplied"): do not attribute this
 * quote to anyone until the client provides the real name and wording.
 */

export const storyMeta = {
  title: 'Our story',
  description:
    'Why OurCercle exists: small, deliberately composed gatherings built for real conversation, not networking.',
  eyebrow: 'Our story',
  heading: 'Why we gather.',
}

/** The opening line, set larger than the paragraphs that follow it. */
export const lede =
  'It started with a simple observation: most of us live inside rooms we’ve already read.'

export const paragraphs: string[] = [
  'The same colleagues, the same group chats, the same dinner parties with the same lovely people. Cities full of strangers, and almost no honest way to meet them. The apps optimise for matching; the events optimise for networking. Nothing optimised for conversation.',
  'So we started setting tables. Small ones, eight, twelve, fourteen seats, and filling them deliberately: different worlds, different ages, different stories, one shared appetite for talking about things that matter. We called each gathering a Cercle, because that’s what it becomes by the end of the night.',
  'OurCercle isn’t a members’ club and it isn’t a networking group. It’s a practice: the belief that a well-composed room of strangers, given candlelight and a reason, will do something no algorithm can.',
]

export interface Principle {
  title: string
  body: string
}

export const principlesMeta = {
  eyebrow: 'What we believe',
  heading: 'Three principles, held firmly.',
}

export const principles: Principle[] = [
  {
    title: 'Curation over scale',
    body: 'We would rather host twelve people well than two hundred people adequately. Every room is composed by hand, every time.',
  },
  {
    title: 'Conversation over networking',
    body: 'No lanyards, no elevator pitches, no “what do you do?” as an opener. What you make of each other is yours; we just set the table.',
  },
  {
    title: 'Presence over performance',
    body: 'Phones rest, nobody documents, and no Cercle is content. What happens at the table is for the people at the table.',
  },
]

/**
 * DRAFT, explicitly unattributed in the source design: "name and note to be
 * supplied". Do not invent a founder name -- ship the placeholder attribution
 * verbatim until the client provides the real one.
 */
export const founder = {
  quote:
    '“Every good thing in my life traces back to a conversation with someone I almost didn’t meet. OurCercle exists to manufacture that almost.”',
  attribution: 'Founder, OurCercle, name and note to be supplied',
  imageLabel: 'Founder portrait, warm light (4:5)',
  imageRatio: '4 / 5',
  image: undefined as string | undefined,
  imageAlt: undefined as string | undefined,
}

export const storyCta = {
  heading: 'Come sit with people you haven’t met yet.',
}
