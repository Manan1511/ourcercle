import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type Level = 1 | 2 | 3 | 4
type Size = 'display' | 'xl' | 'lg' | 'md' | 'sm'

// Fraunces is expressive by design -- it doesn't need bold weight to carry a
// heading the way a grotesque sans would, so the scale stays at 500-600.
const sizes: Record<Size, string> = {
  display: 'text-4xl sm:text-5xl lg:text-(length:--text-display) font-medium',
  xl: 'text-3xl sm:text-4xl font-medium',
  lg: 'text-2xl sm:text-3xl font-medium',
  md: 'text-xl font-semibold',
  sm: 'text-base font-semibold',
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
