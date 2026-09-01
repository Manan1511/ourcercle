import type { ComponentPropsWithoutRef } from 'react'
import { useId } from 'react'
import { cn } from '../lib/cn'

const field =
  'w-full rounded-(--radius-control) border bg-(--color-canvas) px-3.5 py-2.5 text-sm ' +
  'text-(--color-text) placeholder:text-(--color-text-subtle) ' +
  'transition-colors duration-(--duration-base) ease-(--ease-out-soft) ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'id'> & {
  label: string
  /** Validation message. Also flips the field to its error styling. */
  error?: string
  hint?: string
  /** Render the label for screen readers only. */
  hideLabel?: boolean
}

/**
 * Text input with a real <label>, and error/hint text wired through
 * aria-describedby so assistive tech announces it.
 */
export default function Input({
  label,
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

      <input
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
      />

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
