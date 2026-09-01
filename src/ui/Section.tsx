import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export type SectionTone = 'canvas' | 'surface' | 'raised' | 'alt' | 'alt-raised'

/** Section grounds. Wine leads; teal provides the alternate rhythm. */
const tones: Record<SectionTone, string> = {
  canvas: 'bg-(--color-canvas)',
  surface: 'bg-(--color-surface)',
  raised: 'bg-(--color-surface-raised)',
  alt: 'bg-(--color-surface-alt)',
  'alt-raised': 'bg-(--color-surface-alt-raised)',
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
