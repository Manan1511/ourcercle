/**
 * Site-wide content and configuration.
 *
 * All user-facing copy lives in this directory rather than inline in JSX. That
 * keeps the client's wording in one reviewable place, and means a CMS can be
 * dropped in later by swapping the data source without touching components.
 */

export interface NavLink {
  label: string
  href: string
}

export interface SiteConfig {
  /** Brand name, used in <title> suffixes and aria labels. */
  name: string
  /** Fallback <title> for pages that don't set their own. */
  defaultTitle: string
  /** Fallback meta description. */
  defaultDescription: string
  /** Absolute production origin. Required for canonical URLs and OG tags. */
  url: string
  /** Path to the default social share image, relative to /public. */
  ogImage: string
  /** One-line positioning, used in the footer. */
  tagline: string
  nav: NavLink[]
  /** The single conversion path -- there is no open signup. */
  cta: NavLink
  contact: {
    /* TODO: client to confirm -- placeholder address. */
    email: string
    /* TODO: client to confirm -- placeholder handle. */
    instagram: string
  }
}

export const site: SiteConfig = {
  name: 'OurCercle',
  defaultTitle: 'OurCercle — curated experiences, real human connection',
  defaultDescription:
    'OurCercle is a social experiences community built around real human connection — thoughtfully curated gatherings that bring together people, perspectives and stories.',
  // TODO: set to the real domain before launch. Wrong value here means broken
  // canonical URLs and social previews that point at the wrong site.
  url: 'https://example.com',
  ogImage: '/og-default.png',
  tagline: 'Thoughtfully curated experiences for real human connection.',
  nav: [
    { label: 'The Cercles', href: '/cercles' },
    { label: 'Journal', href: '/journal' },
    { label: 'Our story', href: '/story' },
  ],
  cta: { label: 'Request an invite', href: '/invite' },
  contact: {
    email: 'hello@ourcercle.com',
    instagram: 'https://instagram.com/ourcercle',
  },
}
