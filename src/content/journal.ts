/**
 * Journal — dispatches from past Cercles.
 *
 * DRAFT: every entry below is illustrative copy pending real write-ups, which
 * is why each carries `draft: true` and the index renders a "Draft entries"
 * badge. Entries have no detail route yet; `Full dispatch coming soon` is
 * rendered as disabled text rather than a dead link.
 */

export interface JournalEntry {
  slug: string
  /** Which Cercle format this came from -- shown as the kicker. */
  format: string
  title: string
  excerpt: string
  /** Photography brief for the empty image slot. */
  imageLabel: string
  /** Path under /public once the photo lands. */
  image?: string
  imageAlt?: string
  draft: boolean
}

export const journalMeta = {
  title: 'Journal',
  description:
    'Dispatches from past Cercles — notes on rooms, menus, questions and the occasional friendship we can take no credit for.',
  eyebrow: 'Journal',
  badge: 'Draft entries, illustrative',
  heading: 'Dispatches from the table.',
  intro:
    'What happens inside a Cercle stays with its guests, but the textures travel. Notes on rooms, menus, questions and the occasional friendship we can take no credit for.',
  cta: {
    heading: 'The next dispatch could be about your table.',
  },
}

export const entries: JournalEntry[] = [
  {
    slug: 'the-dish-nobody-could-name',
    format: "Chef's Table",
    title: 'The dish nobody could name',
    excerpt:
      'On the fourth course, the table stopped talking for the first time all night, and then didn’t stop talking about it.',
    imageLabel: 'Dispatch photo — table detail (3:2)',
    draft: true,
  },
  {
    slug: 'fourteen-strangers-one-question',
    format: 'Salon',
    title: 'Fourteen strangers, one question',
    excerpt:
      'We asked what people would unlearn if they could. A retired judge and a 24-year-old animator gave the same answer.',
    imageLabel: 'Dispatch photo — salon corner (3:2)',
    draft: true,
  },
  {
    slug: 'bad-pottery-good-company',
    format: 'Studio',
    title: 'Bad pottery, good company',
    excerpt:
      'Nobody made anything worth keeping, which is exactly why everyone kept theirs.',
    imageLabel: 'Dispatch photo — studio hands (3:2)',
    draft: true,
  },
]
