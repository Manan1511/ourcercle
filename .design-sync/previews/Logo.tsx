import { Logo } from 'ourcercle'

export const Sizes = () => (
  <div className="flex items-end gap-8 p-6">
    <Logo className="h-8 w-auto" />
    <Logo className="h-14 w-auto" />
    <Logo className="h-20 w-auto" />
  </div>
)

export const Colourways = () => (
  <div className="flex flex-wrap items-center gap-8 p-6">
    <Logo className="h-14 w-auto text-(--color-primary)" />
    <Logo className="h-14 w-auto text-(--color-accent)" />
    <Logo className="h-14 w-auto text-(--color-success)" />
    <Logo className="h-14 w-auto text-(--color-text-muted)" />
  </div>
)
