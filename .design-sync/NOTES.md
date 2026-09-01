# design-sync notes — Cercle

Repo-specific gotchas for future syncs. Read this before re-running.

## This repo is an app, not a library

`ourcercle` is a marketing site; `src/ui/` is the design system inside it.
`dist/` is the **built site** and is NOT the sync entry. The sync consumes a
separate library build:

- `npm run build:ds` → `dist-ds/` (config `buildCmd`), via `vite.config.ds.ts`
- Entry for the converter: `--entry ./dist-ds/index.js`
- Declarations come from `tsconfig.ds.json` (the app tsconfig sets `noEmit`
  and `allowImportingTsExtensions`, both of which break `vite-plugin-dts`).
- `src/ui/lib-entry.ts` exists only for this build — it pulls in `ds.css` so the
  library emits a compiled stylesheet next to the JS.

## The stylesheet is split on purpose

- `src/styles/ds.css` — **library**: tokens, semantic roles, component base.
  Deliberately does NOT paint `html`/`body`.
- `src/styles/index.css` — **site**: imports `ds.css`, then adds the global page
  ground and `color-scheme: dark`.

This split was made during the first sync. Before it, the library sheet painted
`html` dark, which leaked a forced dark page background into every preview (and
would have leaked into every design built with the DS). **Do not move the page
paint back into `ds.css`.**

## Dark ground + router come from `DesignSystemProvider`

`Button` renders a react-router `Link` when given `to`, so it throws outside a
Router. `DesignSystemProvider` supplies both the Router and the dark canvas, and
is wired as `cfg.provider`. It is excluded from the component list via
`componentSrcMap: {"DesignSystemProvider": null}` — it still ships in the
bundle, it just doesn't get a card of its own.

## Tailwind tree-shakes unused theme vars

Only tokens actually referenced by components survive into `_ds_bundle.css`.
`--color-text-inverse`, `--duration-fast`, `--duration-slow` and
`--shadow-raised` are defined in source but **absent from the shipped CSS**.
There is no `tokens/` directory, and only the used ramp steps ship (e.g. wine
300/500/600/900). `conventions.md` therefore documents **semantic role tokens
only** — re-validate that claim after any token change.

## Card presentation

`cardMode: "column"` is set for Badge, Button, Container, Heading, Input and
Logo. Without it their stories render wider than a grid cell and get cropped
(`[GRID_OVERFLOW]`). Previews carry interior padding (`p-6`) on their root
element so content isn't flush against the provider's dark ground; `Section` is
deliberately unpadded because its stories are full-bleed grounds.

## Known render warns

None outstanding. The final validate run exits 0 with zero warnings.

## Environment

- npm blocks install scripts by default here: after `npm i esbuild` in
  `.ds-sync/`, run `npm approve-scripts esbuild` or esbuild's binary is missing.
- Playwright/chromium installed to `%LOCALAPPDATA%\ms-playwright` (chromium-1234).

## Re-sync risks

- **Upload never happened on the first run.** `DesignSync` had no design-system
  authorization in that session (non-interactive, so `/design-login` was
  unavailable), so there is no `projectId` in the config and **no remote anchor
  exists**. The next sync is a first-time import: expect full verification and a
  new project. Grades in `.design-sync/.cache/` are gitignored and will not
  carry across machines.
- **Preview copy is invented brand voice**, not client-approved. It reads as
  real product copy ("The Atelier Coat", "A quieter kind of luxury"). If the
  client's actual positioning differs, the previews should be re-authored — the
  design agent imitates this copy.
- **The logo is a placeholder** traced from the loading animation. When the real
  vector lands, `src/ui/Logo.tsx` changes and Logo's grades should be recaptured.
- **Fonts come from `node_modules`** via `extraFonts` (@fontsource Inter +
  Fraunces). A dependency bump changes the harvested files.
- **React Router is pinned to v6** by `vite-react-ssg`; a future upgrade changes
  what `Button`'s `to` branch bundles.
