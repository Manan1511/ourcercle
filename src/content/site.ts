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
  /** Brand name, used in the header and in <title> suffixes. */
  name: string
  /** Fallback <title> for pages that don't set their own. */
  defaultTitle: string
  /** Fallback meta description. */
  defaultDescription: string
  /** Absolute production origin. Required for canonical URLs and OG tags. */
  url: string
  /** Path to the default social share image, relative to /public. */
  ogImage: string
  nav: NavLink[]
}

export const site: SiteConfig = {
  name: 'Cercle',
  defaultTitle: 'Cercle',
  defaultDescription:
    'Placeholder description. Replace with the client-approved copy before launch -- this is what shows up under the link in Google results.',
  // TODO: set to the real domain before launch. Wrong value here means broken
  // canonical URLs and social previews that point at the wrong site.
  url: 'https://example.com',
  ogImage: '/og-default.png',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
}
