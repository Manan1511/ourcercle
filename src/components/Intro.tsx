import { useEffect, useRef, useState } from 'react'
import { LOGO_RING_PATH, LOGO_TEXT_PATH, LOGO_VIEWBOX } from '../ui/logo-paths'

/**
 * The brand loading sequence, rebuilt from the client's animation.
 *
 * The supplied MP4 is 19.9MB and 10s -- roughly 110x the site's entire JS and
 * CSS payload, which would wreck first paint and Largest Contentful Paint on
 * the very pages that need to rank. This reproduces its four beats from the
 * logo's own vector paths in a few KB, at any resolution, in either
 * orientation:
 *
 *   1. the mark scales up and resolves
 *   2. it recedes and the ring dissolves, leaving the wordmark
 *   3. the ring rebuilds into the final lockup
 *   4. a brief hold, then the curtain lifts
 *
 * Compressed from 10s to 3s (the original's last 2.6s is a static hold).
 *
 * It renders only after mount, so the prerendered HTML a crawler receives is
 * the real page -- the intro never becomes the Largest Contentful Paint
 * element, and the content is present even if this never runs.
 */

const TOTAL_MS = 3000
/** Time for the curtain to fade once the sequence finishes. */
const EXIT_MS = 520

export default function Intro({ onDone }: { onDone?: () => void }) {
  // Never render during prerender: the static HTML must be the real page.
  const [mounted, setMounted] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)
  const skipRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // Motion-sensitive visitors get the site, not a wall.
      setGone(true)
      onDone?.()
      return
    }
    setMounted(true)
  }, [onDone])

  useEffect(() => {
    if (!mounted || gone) return

    const finish = () => {
      setLeaving(true)
      window.setTimeout(() => {
        setGone(true)
        onDone?.()
      }, EXIT_MS)
    }

    const timer = window.setTimeout(finish, TOTAL_MS)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.clearTimeout(timer)
        finish()
      }
    }

    // Hold scroll while the curtain is up. Restoring unconditionally rather
    // than to a captured previous value: if this ever runs while overflow is
    // already 'hidden' (a fast remount, StrictMode's double-invoke), capturing
    // would restore 'hidden' forever and wedge the page unscrollable.
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    skipRef.current?.focus()

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mounted, gone, onDone])

  if (!mounted || gone) return null

  return (
    <div
      // Deliberately NOT aria-hidden: the Skip button inside it takes focus,
      // and hiding a focused element from assistive tech is invalid (the
      // browser blocks it). The decorative parts are hidden individually.
      data-leaving={leaving || undefined}
      className="intro fixed inset-0 z-100 grid place-items-center bg-(--color-canvas)"
    >
      {/* The spotlight from the original: warm wine, low and to the left. */}
      <div
        aria-hidden="true"
        className="intro-glow pointer-events-none absolute inset-0"
      />

      <svg
        aria-hidden="true"
        viewBox={LOGO_VIEWBOX}
        className="intro-mark relative w-[42vmin] text-(--color-primary)"
      >
        <g className="intro-scale">
          <path
            className="intro-ring"
            fill="currentColor"
            fillRule="evenodd"
            d={LOGO_RING_PATH}
          />
          <path
            className="intro-text"
            fill="currentColor"
            fillRule="evenodd"
            d={LOGO_TEXT_PATH}
          />
        </g>
      </svg>

      {/* Accessibility escape hatch. Keyboard users also get Escape. */}
      <button
        ref={skipRef}
        type="button"
        aria-label="Skip the intro animation"
        onClick={() => {
          setLeaving(true)
          window.setTimeout(() => {
            setGone(true)
            onDone?.()
          }, EXIT_MS)
        }}
        className="absolute bottom-8 right-8 rounded-(--radius-control) px-3 py-2 text-xs tracking-[0.14em] uppercase text-(--color-text-subtle) transition-colors hover:text-(--color-text)"
      >
        Skip
      </button>
    </div>
  )
}
