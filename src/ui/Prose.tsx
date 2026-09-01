import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/**
 * Long-form copy. Styles descendants directly so client-supplied HTML or
 * Markdown renders correctly without per-element classes.
 */
export default function Prose({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-(--container-prose) text-(--color-text-muted)',
        '[&_p]:my-4 [&_p]:leading-relaxed',
        '[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-(--color-text)',
        '[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-(--color-text)',
        '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1.5',
        '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6',
        '[&_strong]:font-semibold [&_strong]:text-(--color-text)',
        '[&_a]:text-(--color-link) [&_a]:underline [&_a]:underline-offset-4',
        '[&_blockquote]:border-l-2 [&_blockquote]:border-(--color-accent) [&_blockquote]:pl-5 [&_blockquote]:italic',
        '[&_hr]:my-10 [&_hr]:border-(--color-border-subtle)',
        className,
      )}
    >
      {children}
    </div>
  )
}
