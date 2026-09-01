import { Head } from 'vite-react-ssg'
import { site } from '../content/site'

interface SeoProps {
  /** Page title. Rendered as "Title -- Brand" unless `absoluteTitle` is set. */
  title?: string
  description?: string
  /** Path of the current page, e.g. "/about". Used for the canonical URL. */
  path: string
  /** Social share image path, relative to /public. */
  image?: string
  /** Use `title` verbatim, without appending the brand name. */
  absoluteTitle?: boolean
  /** Ask crawlers not to index this page (404s, thank-you pages). */
  noIndex?: boolean
}

/**
 * Per-page document head. Because the site is prerendered, whatever this
 * renders is baked into the static HTML -- so crawlers and social scrapers
 * see it without executing any JavaScript.
 */
export default function Seo({
  title,
  description = site.defaultDescription,
  path,
  image = site.ogImage,
  absoluteTitle = false,
  noIndex = false,
}: SeoProps) {
  const fullTitle = !title
    ? site.defaultTitle
    : absoluteTitle
      ? title
      : `${title} — ${site.name}`

  const canonical = new URL(path, site.url).toString()
  const imageUrl = new URL(image, site.url).toString()

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  )
}
