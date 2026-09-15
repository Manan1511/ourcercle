/**
 * Cercle events.
 *
 * There are no fixed, recurring "formats" -- every Cercle is a one-off event
 * with its own name. `events` is sourced from Supabase's `cercle_events`
 * table (see the admin panel at /admin/cercles), fetched at build time by
 * scripts/fetch-content.mjs into src/content/generated/cercle-events.ts --
 * edit content there (via the admin panel), not here.
 *
 * `blurb` is the short card version; `description` is the longer paragraph
 * used on the /cercles ("Upcoming Cercles") detail sections -- only past
 * events reliably have one, since an upcoming event may be announced before
 * there's much more to say than its name. `imageLabel` / `detailImageLabel`
 * are the photography briefs shown in the empty slots at each size.
 */
import { events as generatedEvents } from './generated/cercle-events'

export interface CercleEvent {
  slug: string
  name: string
  status: 'past' | 'upcoming'
  /** e.g. "Chef Prabhraj Singh · First Gathering". Shown as the card kicker. */
  kicker?: string
  blurb: string
  description?: string
  /** Extra detail line, e.g. host or format notes. */
  meta?: string
  imageLabel: string
  detailImageLabel: string
  /** Path under /public, or a Supabase Storage URL, once the photographs land. */
  image?: string
  imageAlt?: string
  detailImage?: string
  detailImageAlt?: string
}

// The generated module's `status` field is a plain string (JSON has no
// literal-union concept); the DB's check constraint guarantees it's only
// ever 'past' or 'upcoming', so this cast is safe.
export const events: CercleEvent[] = generatedEvents as CercleEvent[]

export const pastEvents = events.filter((event) => event.status === 'past')
export const upcomingEvents = events.filter((event) => event.status === 'upcoming')

/** Photography brief for the homepage hero. */
export const heroImage = {
  label: 'Candlelit table mid-conversation (4:5)',
  ratio: '4 / 5',
  src: 'https://arudurkjypzknupueyyf.supabase.co/storage/v1/object/public/content-images/home-hero.jpg',
  alt: 'Guests raising a toast around a candlelit Cercle dinner table',
}

/** Copy for /cercles, now "Upcoming Cercles" -- what's coming up, not a
 *  catalogue of fixed formats. */
export const cerclesMeta = {
  title: 'Upcoming Cercles',
  description:
    'What OurCercle has coming up -- each gathering is its own event, not a repeating format.',
  eyebrow: 'Upcoming Cercles',
  heading: "What's next.",
  intro:
    'Every Cercle is its own evening, built around whoever is hosting and whatever the room calls for -- not a repeating format. Here is what is coming up.',
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
    heading: 'Come as you are. We’ll handle the rest.',
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
