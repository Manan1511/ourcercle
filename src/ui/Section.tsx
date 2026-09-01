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
 * Inside a cream ground, rebind the text roles rather than only setting a
 * colour. Components style themselves with --color-text-muted / -subtle /
 * -link; left alone those are pale lilacs that vanish on cream. Rebinding
 * means any composed content adapts without knowing it is on a light ground.
 */
const ON_ALT = [
  'text-(--color-text-on-alt)',
  '[--color-text-muted:var(--color-text-on-alt-muted)]',
  '[--color-text-subtle:var(--color-text-on-alt-subtle)]',
  '[--color-link:var(--color-text-on-alt)]',
].join(' ')

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
  size = 'md',
  bordered = false,
  className,
  id,
}: {
  children: ReactNode
  tone?: SectionTone
  size?: 'sm' | 'md' | 'lg'
  bordered?: boolean
  className?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        tones[tone],
        size === 'sm' && 'py-16',
        size === 'md' && 'py-(--spacing-section)',
        size === 'lg' && 'py-(--spacing-section-lg)',
        bordered && 'border-t border-(--color-border-subtle)',
        className,
      )}
    >
      {children}
    </section>
  )
}
