import { cn } from '../lib/cn'
import { LOGO_RING_PATH, LOGO_TEXT_PATH, LOGO_VIEWBOX } from './logo-paths'

/**
 * The Cercle mark: a ring broken at the upper right with "CERCLE" set around
 * the arc.
 *
 * Vector-traced from the client's supplied artwork, so the geometry is the real
 * logo rather than an approximation. It paints with `currentColor`, which is how
 * the brand's colourways are reproduced -- set the colour on the element (or
 * inherit it) instead of shipping one file per colour:
 *
 *   <Logo className="text-(--color-primary)" />   // candlelight
 *   <Logo className="text-(--color-accent)" />    // rose wine
 *
 * The mark is very slightly taller than it is wide; the viewBox preserves the
 * supplied proportions, so constrain ONE axis (e.g. `h-8`) and let the other
 * follow rather than forcing a square.
 */
export default function Logo({
  className,
  title = 'Cercle',
  decorative = false,
}: {
  className?: string
  /** Accessible name. Ignored when `decorative` is set. */
  title?: string
  /** Hide from assistive tech -- use when adjacent text already says "Cercle". */
  decorative?: boolean
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn('h-8 w-auto text-(--color-primary)', className)}
      {...(decorative
        ? { 'aria-hidden': true as const, role: 'presentation' as const }
        : { role: 'img' as const, 'aria-label': title })}
    >
      <path fill="currentColor" fillRule="evenodd" d={LOGO_RING_PATH} />
      <path fill="currentColor" fillRule="evenodd" d={LOGO_TEXT_PATH} />
    </svg>
  )
}
