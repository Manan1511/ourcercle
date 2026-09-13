/**
 * Journal — dispatches from past Cercles.
 *
 * `entries` is sourced from Supabase's `journal_entries` table (see the
 * admin panel at /admin/journal), fetched at build time by
 * scripts/fetch-content.mjs into src/content/generated/journal.ts -- edit
 * entries there, not here. Illustrative placeholder copy (pending real
 * write-ups) is marked per-entry via `draft: true`, which renders a "Draft
 * entries" badge; that's separate from the DB's publish gate, which is what
 * controls whether an entry ships in the build at all. Entries have no
 * detail route yet; `Full dispatch coming soon` is rendered as disabled text
 * rather than a dead link.
 */
import { entries as generatedEntries } from './generated/journal'

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
    'Dispatches from past Cercles. Notes on rooms, menus, questions and the occasional friendship we can take no credit for.',
  eyebrow: 'Journal',
  badge: 'Draft entries, illustrative',
  heading: 'Dispatches from the table.',
  intro:
    'What happens inside a Cercle stays with its guests, but the textures travel. Notes on rooms, menus, questions and the occasional friendship we can take no credit for.',
  cta: {
    heading: 'The next dispatch could be about your table.',
  },
}

export const entries: JournalEntry[] = generatedEntries
