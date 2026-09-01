/**
 * The Cercle formats.
 *
 * DRAFT: the four format names are invented and must be confirmed by the
 * client, as must the capacity ranges. Used on the homepage now; /cercles will
 * reuse the same data when that page is built.
 *
 * `imageLabel` is the photography brief shown in the empty slot, so the shot
 * list is legible from the site itself while the assets are outstanding.
 */

export interface CercleFormat {
  slug: string
  name: string
  blurb: string
  /** Placeholder range -- client to confirm. */
  seats: string
  imageLabel: string
  /** Path under /public once the photograph lands. */
  image?: string
  imageAlt?: string
}

export const formats: CercleFormat[] = [
  {
    slug: 'chefs-table',
    name: 'The Chef’s Table',
    blurb:
      'One long table, one kitchen cooking in front of you, and a menu built for the conversation rather than the photograph.',
    seats: '8–12 seats',
    imageLabel: 'Chef plating at the pass (3:2)',
  },
  {
    slug: 'salon',
    name: 'The Salon',
    blurb:
      'An evening built around a single question, with a room chosen so that nobody can hide at the edge of it.',
    seats: '12–16 seats',
    imageLabel: 'Salon corner, low lamplight (3:2)',
  },
  {
    slug: 'studio',
    name: 'The Studio',
    blurb:
      'Hands busy, guard down. Making something badly together turns out to be an unusually good introduction.',
    seats: '8–10 seats',
    imageLabel: 'Hands working at a studio bench (3:2)',
  },
  {
    slug: 'ritual',
    name: 'The Ritual',
    blurb:
      'Slower and quieter — tea, scent, sound. An hour that asks nothing of you except that you arrive.',
    seats: '6–10 seats',
    imageLabel: 'Tea and ceramics still life (3:2)',
  },
]

/** Photography brief for the homepage hero. */
export const heroImage = {
  label: 'Candlelit table mid-conversation (4:5)',
  ratio: '4 / 5',
}
