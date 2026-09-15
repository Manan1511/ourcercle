/**
 * Homepage copy. Home is the only page still using this generic shape --
 * Journal, Cercles, Story and Invite each have their own typed content file
 * now that all five routes are implemented.
 *
 * DRAFT: client must approve all wording.
 */

export interface PageMeta {
  title: string
  description: string
  /** Use `title` verbatim rather than appending the brand name. */
  absoluteTitle?: boolean
}

export interface WhyJoinReason {
  title: string
  body: string
}

export interface PageContent {
  meta: PageMeta
  hero: {
    eyebrow?: string
    heading: string
    body: string
    cta?: { label: string; href: string }
  }
  whyJoin: {
    eyebrow: string
    heading: string
    intro: string
    reasons: WhyJoinReason[]
  }
  pastEvents: {
    eyebrow: string
    heading: string
    intro: string
  }
}

export const home: PageContent = {
  meta: {
    // Home owns its whole title -- appending the brand would repeat it.
    title: 'OurCercle · curated experiences, real human connection',
    absoluteTitle: true,
    description:
      'A social experiences community built around real human connection. Thoughtfully curated gatherings that bring together people, perspectives and stories.',
  },
  hero: {
    eyebrow: 'A social experiences community',
    heading: 'Step outside your usual circle.',
    body: 'We create thoughtfully curated experiences that bring together people, perspectives and stories. Every Cercle is its own evening, not a repeating format, designed to put you in a room of people you may never have met otherwise.',
    cta: { label: 'Request an invite', href: '/invite' },
  },
  whyJoin: {
    eyebrow: 'Why join',
    heading: 'Why people come to a Cercle.',
    intro:
      'Not a club, not a networking mixer -- a room composed by hand, once, for one evening.',
    reasons: [
      {
        title: 'Meet outside your circle',
        body: 'Every guest list is built across industries and worlds on purpose, not filled with people you already know.',
      },
      {
        title: 'Conversation, not networking',
        body: 'No pitches, no lanyards, no “what do you do?” as an opener. Just a table and people who actually showed up to talk.',
      },
      {
        title: 'Small by design',
        body: 'Every Cercle is capped small enough that everyone is actually in the conversation, not just in the room.',
      },
    ],
  },
  pastEvents: {
    eyebrow: 'So far',
    heading: 'What’s happened so far.',
    intro: 'Every Cercle is its own evening. Here’s the one that’s actually happened.',
  },
}
