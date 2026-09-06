import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export type SectionTone = 'canvas' | 'surface' | 'raised' | 'alt' | 'alt-raised'

/**
 * Section grounds. Wine leads; cream is the alternate rhythm.
 *
 * The alt grounds are LIGHT surfaces inside an otherwise dark system, so they
 * also set the text colour. Without that, content inherits cream body text and
 * renders invisible on cream. Anything nested that sets its own colour should
 * use the --color-text-on-alt* roles.
 */
/**
 * Rebind the text roles rather than only setting a colour. Components style
 * themselves with --color-text-muted / -subtle / -link; left alone those are
 * pale lilacs that vanish on a cream ground. Rebinding means any composed
 * content adapts without knowing it sits on a light surface.
 *
 * Exported so anything painted cream outside of `Section` itself -- a `Card`,
 * a one-off panel -- can opt into the same descendant behaviour rather than
 * re-deriving it.
 */
export const CREAM_TEXT_VARS = [
  '[--color-text-muted:var(--color-text-on-alt-muted)]',
  '[--color-text-subtle:var(--color-text-on-alt-subtle)]',
  '[--color-link:var(--color-text-on-alt)]',
].join(' ')

const ON_ALT = `text-(--color-text-on-alt) ${CREAM_TEXT_VARS}`

const tones: Record<SectionTone, string> = {
  canvas: 'bg-(--color-canvas)',
  surface: 'bg-(--color-surface)',
  raised: 'bg-(--color-surface-raised)',
  alt: `bg-(--color-surface-alt) ${ON_ALT}`,
  'alt-raised': `bg-(--color-surface-alt-raised) ${ON_ALT}`,
}

export default function Section({
  children,
  tone = 'canvas',
  size,
  bordered = false,
  className,
  id,
}: {
  children: ReactNode
  tone?: SectionTone
  /** Defaults to `lg` on the cream tones, `md` everywhere else -- see below. */
  size?: 'sm' | 'md' | 'lg'
  bordered?: boolean
  className?: string
  id?: string
}) {
  // Cream is the page's rhythm break, not just another stripe -- it reads as
  // a considered pause rather than a beat of the same length as everything
  // else only if it actually takes more room. Callers can still override.
  const effectiveSize = size ?? (tone === 'alt' || tone === 'alt-raised' ? 'lg' : 'md')

  return (
    <section
      id={id}
      className={cn(
        tones[tone],
        effectiveSize === 'sm' && 'py-16',
        effectiveSize === 'md' && 'py-(--spacing-section)',
        // The full lg amount is tuned for desktop's wider, shorter viewport --
        // on a phone it turns a bare CTA section into mostly empty space, so
        // phones get the md amount and only step up to lg from md: (768px) up.
        effectiveSize === 'lg' && 'py-(--spacing-section) md:py-(--spacing-section-lg)',
        bordered && 'border-t border-(--color-border-subtle)',
        className,
      )}
    >
      {children}
    </section>
  )
}
