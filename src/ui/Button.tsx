import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-(--radius-control) font-medium ' +
  'transition-colors duration-(--duration-base) ease-(--ease-out-soft) ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  // Cream fill, wine label -- 13.1:1. The highest-contrast pairing available.
  primary:
    'bg-(--color-primary) text-(--color-on-primary) hover:bg-(--color-primary-hover)',
  // Rose wine fill, cream label -- 6.3:1.
  accent: 'bg-(--color-accent) text-(--color-on-accent) hover:bg-(--color-accent-hover)',
  outline:
    'border border-(--color-border-strong) text-(--color-text) hover:bg-(--color-surface-raised)',
  ghost: 'text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-surface)',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps> & { to?: never; href?: never }

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> & { to: string; href?: never }

type ButtonAsAnchor = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> & { href: string; to?: never }

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

/**
 * Renders a <button>, an internal react-router <Link> (pass `to`), or a plain
 * <a> (pass `href`) while keeping one visual contract.
 */
export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('to' in rest && rest.to) {
    const { to, ...anchorRest } = rest as { to: string }
    return (
      <Link to={to} className={classes} {...anchorRest}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && rest.href) {
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<'a'>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<'button'>)}>
      {children}
    </button>
  )
}

export type { ElementType }
