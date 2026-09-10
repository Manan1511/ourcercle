import type { ComponentPropsWithoutRef } from 'react'
import { useId } from 'react'
import { cn } from '../lib/cn'

const field =
  'w-full appearance-none rounded-(--radius-control) border bg-(--color-canvas) px-3.5 py-2.5 pr-9 text-sm ' +
  'text-(--color-text) ' +
  'transition-colors duration-(--duration-base) ease-(--ease-out-soft) ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

export interface SelectOption {
  value: string
  label: string
}

type Props = Omit<ComponentPropsWithoutRef<'select'>, 'id'> & {
  label: string
  options: SelectOption[]
  /** Validation message. Also flips the field to its error styling. */
  error?: string
  hint?: string
  /** Render the label for screen readers only. */
  hideLabel?: boolean
}

/**
 * Native <select>, styled to match `Input` (same padding, border and focus
 * behaviour) with a real <label> and error/hint wired through
 * aria-describedby so assistive tech announces it. The browser's own arrow
 * is hidden (`appearance-none`) in favour of a themed chevron, since the
 * native one can't be recoloured to match the dark field.
 */
export default function Select({
  label,
  options,
  error,
  hint,
  hideLabel = false,
  className,
  ...props
}: Props) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ')

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn('text-sm font-medium text-(--color-text)', hideLabel && 'sr-only')}
      >
        {label}
        {props.required && (
          <span className="ml-0.5 text-(--color-danger)" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            field,
            error
              ? 'border-(--color-danger)'
              : 'border-(--color-border) hover:border-(--color-border-strong)',
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-(--color-text-subtle)"
        >
          <path
            d="M5.5 7.5 10 12l4.5-4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {hint && !error && (
        <p id={hintId} className="text-xs text-(--color-text-subtle)">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-(--color-danger)">
          {error}
        </p>
      )}
    </div>
  )
}
