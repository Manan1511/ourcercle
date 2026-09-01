import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/** Centred content column. One place to change the site's max width. */
export default function Container({
  children,
  width = 'content',
  className,
}: {
  children: ReactNode
  width?: 'content' | 'prose'
  className?: string
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6',
        width === 'content' ? 'max-w-(--container-content)' : 'max-w-(--container-prose)',
        className,
      )}
    >
      {children}
    </div>
  )
}
