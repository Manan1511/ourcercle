/**
 * The Cercle formats.
 *
 * `formats` and `upcomingEvents` are sourced from Supabase (`cercle_formats`
 * and `upcoming_events` -- see the admin panel at /admin/cercles), fetched at
 * build time by scripts/fetch-content.mjs into
 * src/content/generated/cercle-formats.ts and upcoming-events.ts -- edit
 * content there (via the admin panel), not here.
 *
 * `blurb` is the short homepage-card version; `description` is the longer
 * paragraph used on /cercles. `imageLabel` / `detailImageLabel` are the
 * photography briefs shown in the empty slots at each size, so the shot list
 * stays legible from the site itself while the assets are outstanding.
 */
import { formats as generatedFormats } from './generated/cercle-formats'
import { upcomingEvents as generatedUpcomingEvents } from './generated/upcoming-events'

export interface CercleFormat {
  slug: string
  /** "No. 1".."No. 4" -- the /cercles page numbers each format. */
  number: string
  name: string
  blurb: string
  description: string
  /**
   * Short capacity badge, e.g. "8-12 seats", on the homepage card. Only
   * Sip & Glam London shows one -- the others deliberately omit capacity, so
   * this is optional and the card leaves the line out when absent.
   */
  seats?: string
  /** Full detail line, e.g. "one evening · dietary needs asked for in advance". Shown on /cercles. */
  meta: string
  imageLabel: string
  detailImageLabel: string
  /** Path under /public once the photographs land. */
  image?: string
  imageAlt?: string
  detailImage?: string
  detailImageAlt?: string
}

export const formats: CercleFormat[] = generatedFormats

/** Photography brief for the homepage hero. */
export const heroImage = {
  label: 'Candlelit table mid-conversation (4:5)',
  ratio: '4 / 5',
}

/** Copy for /cercles outside of the per-format sections. */
export const cerclesMeta = {
  title: 'The Cercles',
  description:
    'The four formats OurCercle gathers around: the Chef’s Table, Sip & Glam London, the Tipsy Table and Indian Apéritivo.',
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

export const upcomingEvents: UpcomingEvent[] = generatedUpcomingEvents
