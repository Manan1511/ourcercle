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
const tones: Record<SectionTone, string> = {
  canvas: 'bg-(--color-canvas)',
  surface: 'bg-(--color-surface)',
  raised: 'bg-(--color-surface-raised)',
  alt: 'bg-(--color-surface-alt) text-(--color-text-on-alt)',
  'alt-raised': 'bg-(--color-surface-alt-raised) text-(--color-text-on-alt)',
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
