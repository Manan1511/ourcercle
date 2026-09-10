/**
 * The Cercle formats.
 *
 * DRAFT: Chef's Table, the Studio and the Ritual are invented names and must
 * be confirmed by the client, as must their capacity ranges and policies
 * (dietary notice, "phones stay in pockets", etc) -- sourced from the
 * client's Claude Design canvas (`The Cercles.dc.html`), which is the
 * design's source of truth for those three. Sip & Glam is real, sourced from
 * the client's own one-pager ("Cercle Sip & Glam.pdf") -- see the note above
 * `upcomingEvents` below for what's still unconfirmed there (date, venue).
 *
 * `blurb` is the short homepage-card version; `description` is the longer
 * paragraph used on /cercles. `imageLabel` / `detailImageLabel` are the
 * photography briefs shown in the empty slots at each size, so the shot list
 * stays legible from the site itself while the assets are outstanding.
 */

export interface CercleFormat {
  slug: string
  /** "No. 1".."No. 4" -- the /cercles page numbers each format. */
  number: string
  name: string
  blurb: string
  description: string
  /** Short badge form, e.g. "8-12 seats". Shown on the homepage card. */
  seats: string
  /** Full detail line, e.g. "8-12 seats · one evening · ...". Shown on /cercles. */
  meta: string
  imageLabel: string
  detailImageLabel: string
  /** Path under /public once the photographs land. */
  image?: string
  imageAlt?: string
  detailImage?: string
  detailImageAlt?: string
}

export const formats: CercleFormat[] = [
  {
    slug: 'chefs-table',
    number: 'No. 1',
    name: 'The Chef’s Table',
    blurb:
      'One long table, one kitchen cooking in front of you, and a menu built for the conversation rather than the photograph.',
    description:
      'A dozen strangers around one table, a chef cooking within arm’s reach, and courses that arrive with their stories. The menu is a surprise; the seating is not, it’s the most deliberate thing in the room.',
    seats: '8–12 seats',
    meta: '8–12 seats · one evening · dietary needs asked for in advance',
    imageLabel: 'Chef plating at the pass (3:2)',
    detailImageLabel: 'Chef’s table, plating under low light (3:2)',
  },
  {
    slug: 'sip-and-glam',
    number: 'No. 2',
    name: 'Sip & Glam',
    blurb:
      'Cocktails, an interactive self-makeup masterclass with a guest artist, and forty of London’s most interesting people in one room.',
    description:
      'Cocktails and conversation built around a beauty masterclass: a guest artist leads the room through techniques you can actually take home, then the evening opens into drinks that run long. Bigger than our usual table by design, curated so forty strangers leave as something closer to friends.',
    seats: '35–40 guests',
    meta: '35–40 guests · one masterclass · hosted with a guest artist',
    imageLabel: 'Cocktails and makeup mirrors, low light (3:2)',
    detailImageLabel: 'Self-makeup masterclass in progress (3:2)',
  },
  {
    slug: 'studio',
    number: 'No. 3',
    name: 'The Studio',
    blurb:
      'Hands busy, guard down. Making something badly together turns out to be an unusually good introduction.',
    description:
      'Art and culture with your sleeves rolled up: a ceramicist’s wheel, a printmaker’s press, a gallery after hours. Making something imperfect next to someone you’ve just met is a faster route to friendship than small talk ever was.',
    seats: '8–12 seats',
    meta: '8–12 seats · materials provided · no experience expected',
    imageLabel: 'Hands working at a studio bench (3:2)',
    detailImageLabel: 'Studio, hands working with clay, paint or print (3:2)',
  },
  {
    slug: 'ritual',
    number: 'No. 4',
    name: 'The Ritual',
    blurb:
      'Slower and quieter: tea, scent, sound. An hour that asks nothing of you except that you arrive.',
    description:
      'Beauty, rest and small ceremonies: a tea master, a perfumer, an evening of scent and silence and slow conversation. The Cercle for weeks that have been too loud.',
    seats: '6–10 seats',
    meta: '6–10 seats · unhurried by design',
    imageLabel: 'Tea and ceramics still life (3:2)',
    detailImageLabel: 'Ritual, tea, scent, still life in warm light (3:2)',
  },
]

/** Photography brief for the homepage hero. */
export const heroImage = {
  label: 'Candlelit table mid-conversation (4:5)',
  ratio: '4 / 5',
}

/** Copy for /cercles outside of the per-format sections. */
export const cerclesMeta = {
  title: 'The Cercles',
  description:
    'The four formats OurCercle gathers around: the Chef’s Table, Sip & Glam, the Studio and the Ritual.',
  eyebrow: 'The Cercles',
  heading: 'Four rooms. One intention.',
  intro:
    'Every Cercle is curated so the room itself is the experience -- most nights eight to fourteen seats, occasionally a bigger room built the same way. The format just sets the table.',
  evening: {
    eyebrow: 'How it feels',
    heading: 'An evening, roughly.',
  },
  upcoming: {
    eyebrow: 'Upcoming',
    heading: 'On the calendar.',
    badge: 'Illustrative, programme TBC',
  },
  cta: {
    heading: 'Pick a room. We’ll pick the people.',
  },
}

export interface EveningBeat {
  time: string
  text: string
}

/** The "an evening, roughly" timeline. Illustrative, not a fixed schedule. */
export const eveningTimeline: EveningBeat[] = [
  { time: '7:00', text: 'Doors. An aperitif, a name, one good question to start on.' },
  { time: '7:45', text: 'Seated, beside someone chosen for you, not by you.' },
  { time: '9:00', text: 'The conversation you didn’t know you came for.' },
  {
    time: '10:30',
    text: 'Numbers exchanged on the pavement. That part isn’t curated.',
  },
]

export interface UpcomingEvent {
  slug: string
  /** e.g. "Chef's Table · October" -- shown as the card kicker. */
  kicker: string
  title: string
  blurb: string
}

/**
 * Upcoming gatherings. Sip & Glam is real -- sourced from the client's own
 * one-pager ("Cercle Sip & Glam.pdf"), hosted with Mehwish Almas and timed to
 * London Fashion Week -- but still lacks a confirmed date and venue (the
 * client's own draft still reads "Cercle × [Restaurant]"), so the kicker
 * stays seasonal rather than dated. Salon No. 1 remains illustrative.
 */
export const upcomingEvents: UpcomingEvent[] = [
  {
    slug: 'sip-and-glam',
    kicker: 'Sip & Glam · London Fashion Week',
    title: 'Sip & Glam, with Mehwish Almas',
    blurb:
      'Cocktails, a self-makeup masterclass with Mehwish Almas, and forty of London’s most interesting women in one room.',
  },
  {
    slug: 'salon-no-1',
    kicker: 'Salon · November',
    title: 'Salon No. 1, “What are we optimising for?”',
    blurb: 'Fourteen people, one question, and no right answer by design.',
  },
]
