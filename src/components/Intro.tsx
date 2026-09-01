import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LOGO_TEXT_PATH } from '../ui/logo-paths'

/**
 * The brand loading sequence, rebuilt from the client's animation.
 *
 * The supplied MP4 is 19.9MB and 10s -- roughly 110x the site's entire JS and
 * CSS payload -- so gating the homepage behind it would wreck first paint and
 * Largest Contentful Paint on the pages that need to rank. This reproduces it
 * in a few KB from the logo's own geometry.
 *
 * MEASURED FROM THE SOURCE FILE, not eyeballed. The mark never moves or
 * scales: its centre and radius are constant across all 300 frames. The only
 * thing that animates is the arc's sweep, plus the wordmark underneath:
 *
 *   1. the arc is anchored at 36 degrees and draws CLOCKWISE to a closed ring
 *      (0.5s->123deg, 0.8s->252deg, 1.2s->321deg, 2.2s->360deg)
 *   2. it unwinds from that same anchor, uncovering the "CERCLE" lettering
 *      that sits beneath it in the same band, until only the wordmark is left
 *   3. it redraws from the OPPOSITE end (231deg, growing anticlockwise) into
 *      the final 198-degree lockup
 *   4. hold
 *
 * Compressed from 10s to 3s; the original's last 2.6s is a static hold.
 *
 * Rendered through a portal so the page can be hidden behind it, and only
 * after mount so the prerendered HTML a crawler receives is the real page.
 */

/**
 * Ring geometry in the logo's 1000-unit viewBox.
 *
 * Sampled from the rendered vector paths themselves (20k points along each),
 * not from a rasterised approximation -- earlier raster estimates put the
 * centre and the band several units out, which left letter tips protruding
 * from the ring that is supposed to be covering them.
 *
 * About the fitted centre: the ring spans radius 313.6..507.7 and the wordmark
 * spans 317.6..514.0. The strip is sized to the TYPE, not to the logo's own
 * ring, with a hairline margin so anti-aliasing cannot leave a sliver showing.
 */
const CX = 499.78
const CY = 512.49
/** Centre of the wordmark's radial band: (317.6 + 514.0) / 2. */
const RADIUS = 415.8
/** Wordmark height 196.4, plus ~1 unit of margin each side. */
const STROKE = 198.4

/**
 * The intro needs its own viewBox, wider than the Logo's.
 *
 * Logo renders filled paths that sit exactly inside `0 0 1000 1011.25` (that
 * box IS their bounding box). The intro instead STROKES a circle, and half the
 * stroke sits outside the path -- the outer edge reaches radius 515, i.e.
 * x = -15.2 and y = 1027.5. In the Logo's box SVG clips that flat, which reads
 * as the ring being sliced off at the sides.
 *
 * This box is square and centred on the mark, so the rotation origin is simply
 * 50% 50% and cannot drift out of sync with the geometry.
 */
const HALF = 520
const VIEWBOX = `${CX - HALF} ${CY - HALF} ${HALF * 2} ${HALF * 2}`

const TOTAL_MS = 3000
const EXIT_MS = 520

/** Matches the failsafe in index.html that un-hides the page. */
const clearPending = () => document.documentElement.removeAttribute('data-intro')

export default function Intro() {
  const [mounted, setMounted] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)
  const skipRef = useRef<HTMLButtonElement>(null)

  const dismiss = useCallback(() => {
    setLeaving(true)
    clearPending()
    window.setTimeout(() => setGone(true), EXIT_MS)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Motion-sensitive visitors get the site, not a wall.
      clearPending()
      setGone(true)
      return
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || gone) return
    const timer = window.setTimeout(dismiss, TOTAL_MS)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss()

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    skipRef.current?.focus()

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      // Restore unconditionally: capturing a previous value would wedge the
      // page unscrollable if this ever re-ran while already locked.
      document.body.style.overflow = ''
    }
  }, [mounted, gone, dismiss])

  // Belt and braces -- if this unmounts for any reason, un-hide the page.
  useEffect(() => clearPending, [])

  if (!mounted || gone) return null

  return createPortal(
    <div
      // Deliberately NOT aria-hidden: the Skip button inside takes focus, and
      // hiding a focused element from assistive tech is invalid.
      data-leaving={leaving || undefined}
      className="intro fixed inset-0 z-100 grid place-items-center bg-(--color-canvas)"
    >
      <div
        aria-hidden="true"
        className="intro-glow pointer-events-none absolute inset-0"
      />

      <svg
        aria-hidden="true"
        viewBox={VIEWBOX}
        className="relative w-[42vmin] text-(--color-primary)"
      >
        {/* The wordmark sits beneath the arc in the same band; the unwinding
            arc is what uncovers it, exactly as in the source. */}
        <path
          className="intro-text"
          fill="currentColor"
          fillRule="evenodd"
          d={LOGO_TEXT_PATH}
        />
        {/* pathLength=360 lets the dash array be written directly in degrees. */}
        <circle
          className="intro-arc"
          cx={CX}
          cy={CY}
          r={RADIUS}
          pathLength={360}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
        />
      </svg>

      <button
        ref={skipRef}
        type="button"
        aria-label="Skip the intro animation"
        onClick={dismiss}
        className="absolute right-8 bottom-8 rounded-(--radius-control) px-3 py-2 text-xs tracking-[0.14em] uppercase text-(--color-text-subtle) transition-colors hover:text-(--color-text)"
      >
        Skip
      </button>
    </div>,
    document.body,
  )
}
