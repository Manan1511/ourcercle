import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { CREAM_TEXT_VARS } from './Section'

export type CardTone = 'surface' | 'raised' | 'cream'

/**
 * On a dark ground, blur-only shadows read as mud. Separation comes from a
 * lifted background plus a hairline border; the shadow only adds depth.
 *
 * `cream` is a highlighted surface -- the same primary/on-primary pairing as
 * a filled button, used for something that should read as a standout object
 * (an event card, say) rather than a section of the page. It reuses the
 * cream ground's descendant-text rebinding so composed content (body copy, a
 * link) stays legible without the caller special-casing it, and its border
 * is a soft wine line rather than the dark-ground border tokens, which would
 * read as too heavy against cream.
 */
export default function Card({
  children,
  tone = 'raised',
  interactive = false,
  className,
}: {
  children: ReactNode
  tone?: CardTone
  interactive?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-(--radius-card) p-6 shadow-(--shadow-card)',
        tone === 'cream'
          ? `border border-(--color-on-primary)/15 bg-(--color-primary) text-(--color-on-primary) ${CREAM_TEXT_VARS}`
          : 'border border-(--color-border-subtle)',
        tone === 'raised' && 'bg-(--color-surface-raised)',
        tone === 'surface' && 'bg-(--color-surface)',
        interactive &&
          cn(
            // The lift is the primary cue; border/shadow just reinforce it.
            'transition-[border-color,transform,box-shadow] duration-(--duration-base) ease-(--ease-out-soft) hover:-translate-y-1 hover:shadow-(--shadow-raised)',
            tone === 'cream'
              ? 'hover:border-(--color-on-primary)/35'
              : 'hover:border-(--color-border-strong)',
          ),
        className,
      )}
    >
      {children}
    </div>
  )
}
