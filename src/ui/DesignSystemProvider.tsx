import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

/**
 * Root wrapper for the design system.
 *
 * Supplies the two things every Cercle component assumes about its host:
 *
 * 1. **A router context.** `Button` (and anything given a `to` prop) renders a
 *    react-router `Link`, which throws without one. Apps that already have
 *    their own router don't need this -- their `BrowserRouter` satisfies it.
 * 2. **The dark ground.** The palette is dark-only: cream text on wine
 *    surfaces. Dropped onto a white page the components are unreadable, so
 *    this paints the canvas and sets the default text colour.
 *
 * Use it anywhere the components render standalone -- previews, tests,
 * isolated screens -- or set the same two properties on your own app shell.
 */
export default function DesignSystemProvider({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <MemoryRouter>
      <div className={`bg-(--color-canvas) text-(--color-text) ${className}`}>
        {children}
      </div>
    </MemoryRouter>
  )
}
