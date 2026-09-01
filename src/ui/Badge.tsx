import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

const tones: Record<BadgeTone, string> = {
  neutral: 'border-(--color-border) text-(--color-text-muted)',
  accent: 'border-(--color-accent) text-(--color-wine-300)',
  success: 'border-(--color-success)/40 text-(--color-success)',
  warning: 'border-(--color-warning)/40 text-(--color-warning)',
  danger: 'border-(--color-danger)/40 text-(--color-danger)',
}

export default function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
