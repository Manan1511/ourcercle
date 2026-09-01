import { useEffect } from 'react'

/**
 * Reveals elements marked `data-reveal` as they enter the viewport.
 *
 * Progressive enhancement by construction: the hiding rule is scoped to a
 * `reveal-ready` class that only JavaScript adds. Without JS -- and for the
 * crawler reading the prerendered HTML -- nothing is ever hidden, so this can
 * never cost us content or indexing.
 *
 * Elements are unobserved once shown; this animates things in, it does not
 * animate them back out on scroll-up, which reads as fidgety.
 *
 * Stagger a group by setting `--reveal-delay` per item.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    // Motion-sensitive visitors get the page with nothing hidden at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    root.classList.add('reveal-ready')

    const targets = document.querySelectorAll<HTMLElement>(
      '[data-reveal]:not(.is-visible)',
    )
    if (!targets.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      },
      // Start slightly before the element is fully on screen, so the motion
      // finishes about when it reaches a comfortable reading position.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}
