import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/** Small label above a heading. Echoes the logo's spaced uppercase lettering. */
export default function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-subtle)',
        className,
      )}
    >
      {children}
    </p>
  )
}
