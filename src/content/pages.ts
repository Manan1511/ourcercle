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

export interface PageContent {
  meta: PageMeta
  hero: {
    eyebrow?: string
    heading: string
    body: string
    cta?: { label: string; href: string }
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
    body: 'We create thoughtfully curated experiences that bring together people, perspectives and stories, from intimate Chef’s Tables to art, beauty and culture. Every Cercle is designed to put you in a room of people you may never have met otherwise.',
    cta: { label: 'Request an invite', href: '/invite' },
  },
}
