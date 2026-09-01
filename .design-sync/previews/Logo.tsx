import { Logo } from 'ourcercle'

export const Sizes = () => (
  <div className="flex items-end gap-6 p-6">
    <Logo className="h-6 w-6" />
    <Logo className="h-10 w-10" />
    <Logo className="h-16 w-16" />
  </div>
)

export const WithWordmark = () => (
  <div className="flex items-center gap-3 p-6">
    <Logo className="h-8 w-8" />
    <span className="font-(family-name:--font-display) text-sm font-semibold uppercase tracking-[0.2em]">
      Cercle
    </span>
  </div>
)

export const Muted = () => (
  <div className="p-6">
    <Logo className="h-10 w-10 text-(--color-text-muted)" />
  </div>
)
