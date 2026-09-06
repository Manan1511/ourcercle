import { cn } from '../lib/cn'

export type ImageSlotTone = 'dark' | 'cream'

/**
 * Reserved space for photography that hasn't arrived yet.
 *
 * Renders the image when `src` is supplied, and a labelled placeholder when it
 * isn't. Either way the box holds its aspect ratio, so dropping real
 * photography in later is a swap rather than a re-layout.
 *
 * `ratio` is a CSS aspect-ratio string ("3 / 2", "4 / 5").
 *
 * `tone` picks the placeholder's own border/fill -- unlike text, which adapts
 * automatically inside `<Section tone="alt">` via its rebound custom
 * properties, a background/border pair has no single value that reads
 * correctly on both grounds. Pass `tone="cream"` explicitly when the slot
 * sits on a cream ground; the default assumes dark.
 */
const placeholderTones: Record<ImageSlotTone, string> = {
  dark: 'border-(--color-border-strong) bg-(--color-surface-raised)/40 text-(--color-text-subtle)',
  cream: 'border-(--color-on-primary)/30 bg-(--color-on-primary)/8 text-(--color-on-primary)/70',
}

export default function ImageSlot({
  src,
  alt,
  ratio = '3 / 2',
  label,
  tone = 'dark',
  className,
  loading = 'lazy',
}: {
  src?: string
  /** Required whenever `src` is set. Ignored for the empty placeholder. */
  alt?: string
  ratio?: string
  /** Shown inside the empty placeholder -- describe the photo that belongs here. */
  label?: string
  /** Ground the placeholder sits on. Defaults to dark. */
  tone?: ImageSlotTone
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
        placeholderTones[tone],
        className,
      )}
    >
      {label && (
        <span className="px-4 text-center text-xs tracking-wide">{label}</span>
      )}
    </div>
  )
}
