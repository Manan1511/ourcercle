/**
 * Build entry for the distributable design system (`npm run build:ds`).
 *
 * Pulls in the stylesheet so the library build emits a compiled CSS file
 * alongside the JS -- consumers (and the Claude Design bundle) need the
 * tokens and component styles, not just the components.
 */
import '../styles/ds.css'

export * from './index'
