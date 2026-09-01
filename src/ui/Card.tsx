import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/**
 * On a dark ground, blur-only shadows read as mud. Separation comes from a
 * lifted background plus a hairline border; the shadow only adds depth.
 */
export default function Card({
  children,
  tone = 'raised',
  interactive = false,
  className,
}: {
  children: ReactNode
  tone?: 'surface' | 'raised'
  interactive?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-(--radius-card) border border-(--color-border-subtle) p-6 shadow-(--shadow-card)',
        tone === 'raised' ? 'bg-(--color-surface-raised)' : 'bg-(--color-surface)',
        interactive &&
          'transition-colors duration-(--duration-base) ease-(--ease-out-soft) hover:border-(--color-border-strong)',
        className,
      )}
    >
      {children}
    </div>
  )
}
