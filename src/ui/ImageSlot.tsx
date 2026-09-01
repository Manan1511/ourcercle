import { cn } from '../lib/cn'

/**
 * Reserved space for photography that hasn't arrived yet.
 *
 * Renders the image when `src` is supplied, and a labelled placeholder when it
 * isn't. Either way the box holds its aspect ratio, so dropping real
 * photography in later is a swap rather than a re-layout.
 *
 * `ratio` is a CSS aspect-ratio string ("3 / 2", "4 / 5").
 */
export default function ImageSlot({
  src,
  alt,
  ratio = '3 / 2',
  label,
  className,
  loading = 'lazy',
}: {
  src?: string
  /** Required whenever `src` is set. Ignored for the empty placeholder. */
  alt?: string
  ratio?: string
  /** Shown inside the empty placeholder -- describe the photo that belongs here. */
  label?: string
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  const shared = 'w-full overflow-hidden rounded-xl'

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        loading={loading}
        style={{ aspectRatio: ratio }}
        className={cn(shared, 'object-cover', className)}
      />
    )
  }

  return (
    <div
      style={{ aspectRatio: ratio }}
      // Decorative until real photography lands: announcing "image missing" to
      // screen readers would be noise, and the surrounding copy carries meaning.
      role="presentation"
      className={cn(
        shared,
        'flex items-center justify-center border border-dashed',
        'border-(--color-border-strong) bg-(--color-surface-raised)/40',
        className,
      )}
    >
      {label && (
        <span className="px-4 text-center text-xs tracking-wide text-(--color-text-subtle)">
          {label}
        </span>
      )}
    </div>
  )
}
