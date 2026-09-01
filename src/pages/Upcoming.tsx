import PageShell from '../components/PageShell'
import { upcoming } from '../content/pages'

/**
 * Placeholder for a route that is designed but not yet implemented.
 *
 * These exist so the navigation designed into the header and footer isn't
 * broken while pages land one at a time. They render `noindex` -- a thin page
 * in the search index is worse than no page at all.
 */
export default function Upcoming({
  page,
  path,
}: {
  page: keyof typeof upcoming
  path: string
}) {
  return <PageShell content={upcoming[page]} path={path} noIndex />
}
