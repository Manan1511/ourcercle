import { cn } from '../lib/cn'

/**
 * Placeholder mark, traced from the client's loading animation: a ring broken
 * at the upper right, with "CERCLE" set around the arc.
 *
 * TODO: replace with the supplied vector logo when the asset pack arrives.
 * This exists so layout and spacing can be built against the real proportions
 * rather than a wordmark that will shift everything when swapped.
 */
export default function Logo({
  className,
  title = 'Cercle',
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      className={cn('h-8 w-8 text-(--color-primary)', className)}
    >
      {/* Ring with a gap at roughly 1-2 o'clock, matching the animation. */}
      <path
        d="M 34.5 8.6 A 18 18 0 1 0 40.6 18.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="butt"
      />
    </svg>
  )
}
