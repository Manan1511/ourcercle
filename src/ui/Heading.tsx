import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type Level = 1 | 2 | 3 | 4
type Size = 'display' | 'xl' | 'lg' | 'md' | 'sm'

// Instrument Serif ships a single weight (400) and no bold cut, so hierarchy
// comes from size and spacing rather than weight. Asking for a heavier weight
// here would smear the letterforms (font-synthesis is disabled in ds.css).
const sizes: Record<Size, string> = {
  display: 'text-4xl sm:text-5xl lg:text-(length:--text-display) font-normal',
  xl: 'text-3xl sm:text-4xl font-normal',
  lg: 'text-2xl sm:text-3xl font-normal',
  md: 'text-xl font-normal',
  sm: 'text-lg font-normal',
}

/**
 * Heading level and visual size are independent -- the document outline should
 * follow the content structure, not the type scale.
 */
export default function Heading({
  level = 2,
  size,
  children,
  className,
  id,
}: {
  level?: Level
  size?: Size
  children: ReactNode
  className?: string
  id?: string
}) {
  const Tag = `h${level}` as const
  const resolved: Size =
    size ?? (['display', 'xl', 'lg', 'md'] as const)[level - 1] ?? 'md'

  return (
    <Tag
      id={id}
      className={cn('font-(family-name:--font-display)', sizes[resolved], className)}
    >
      {children}
    </Tag>
  )
}
