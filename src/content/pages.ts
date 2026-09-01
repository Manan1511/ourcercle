/**
 * Per-page copy for pages that don't yet have their own designed
 * implementation. Journal lives in journal.ts.
 *
 * DRAFT: client must approve all wording.
 */

export interface PageMeta {
  title: string
  description: string
  /** Use `title` verbatim rather than appending the brand name. */
  absoluteTitle?: boolean
}

export interface Section {
  heading: string
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
  sections: Section[]
}

export const home: PageContent = {
  meta: {
    // Home owns its whole title -- appending the brand would repeat it.
    title: 'OurCercle — curated experiences, real human connection',
    absoluteTitle: true,
    description:
      'A social experiences community built around real human connection. Thoughtfully curated gatherings that bring together people, perspectives and stories.',
  },
  hero: {
    eyebrow: 'A social experiences community',
    heading: 'Step outside your usual circle.',
    body: 'We create thoughtfully curated experiences that bring together people, perspectives and stories — from intimate Chef’s Tables to art, beauty and culture. Every Cercle is designed to put you in a room of people you may never have met otherwise.',
    cta: { label: 'Request an invite', href: '/invite' },
  },
  sections: [
    {
      heading: 'Meaningful experiences',
      body: 'Every gathering is designed around a room, a table and a reason to be there.',
    },
    {
      heading: 'Meaningful conversations',
      body: 'Small enough that nobody is a bystander, considered enough that nobody is networking.',
    },
  ],
}

/** Routes designed but not yet implemented. Rendered noindex until they are. */
export const upcoming: Record<string, PageContent> = {
  cercles: {
    meta: {
      title: 'The Cercles',
      description: 'The formats we gather around.',
    },
    hero: {
      eyebrow: 'The Cercles',
      heading: 'The formats we gather around.',
      body: 'This page is being built. In the meantime, request an invite and we will be in touch about the next gathering.',
      cta: { label: 'Request an invite', href: '/invite' },
    },
    sections: [],
  },
  story: {
    meta: {
      title: 'Our story',
      description: 'Why OurCercle exists.',
    },
    hero: {
      eyebrow: 'Our story',
      heading: 'Why we started setting the table.',
      body: 'This page is being built. In the meantime, request an invite and we will be in touch about the next gathering.',
      cta: { label: 'Request an invite', href: '/invite' },
    },
    sections: [],
  },
  invite: {
    meta: {
      title: 'Request an invite',
      description: 'Request an invite to an upcoming Cercle.',
    },
    hero: {
      eyebrow: 'Request an invite',
      heading: 'Tell us a little about you.',
      body: 'The invite form is being built. Until it lands, write to hello@ourcercle.com and we will take it from there.',
    },
    sections: [],
  },
}
