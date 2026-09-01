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

## Brand assets

Source kit: `C:\Users\manan\Downloads\Personal\ourcercle` (fonts, palettes, logo
artboards). Not in the repo -- keep a copy if that folder may move.

- **Fonts** are the client's own, self-hosted: Manrope (variable, 200-800) for
  body/UI and Instrument Serif for display. Converted TTF->WOFF2 with fonttools
  into `src/styles/fonts/`. **Instrument Serif has one weight (400) and no bold
  cut**, so `font-synthesis-weight: none` is set in ds.css and `Heading` uses
  `font-normal` at every size. Do not reintroduce bold headings.
- **@font-face lives in `src/styles/fonts.css`, NOT in ds.css.** Vite's library
  mode inlines CSS-referenced assets and ignores `assetsInlineLimit`, so
  importing fonts.css from ds.css embedded ~110KB of base64 into cercle.css
  (171KB -> 25KB once separated). The site imports fonts.css directly; the sync
  ships the real .woff2 via `cfg.extraFonts`. Keep them separate.
- **The logo is vector-traced** from `LOGO without bg/Artboard 14.png` using
  `potracer` (pip). Two gotchas: potracer treats the FALSE region as ink, so the
  alpha mask is inverted before tracing; and the bitmap is padded so ink never
  touches the border, or the fill inverts. The mark paints with `currentColor`,
  so one vector covers all 12 supplied colourways.
- **The mark contains the "CERCLE" wordmark**, so header and footer show the
  logo alone with no adjacent text label.

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

- **The remote anchor is current** (project `ce4c6446-...`, pinned in config).
  Fetch it to `.design-sync/.cache/remote-sync.json` and pass `--remote` so the
  next sync diffs instead of re-verifying everything. Grades in
  `.design-sync/.cache/` are gitignored and do not carry across machines.
- **Renaming font files orphans the old ones remotely.** The brand-font switch
  left 10 Inter/Fraunces `.woff2` behind that had to be deleted explicitly; an
  anchored re-sync derives this automatically via `upload.deletePaths`.
- **Preview copy is invented brand voice**, not client-approved. It reads as
  real product copy ("The Atelier Coat", "A quieter kind of luxury"). If the
  client's actual positioning differs, the previews should be re-authored — the
  design agent imitates this copy.
- **Only a PNG logo was supplied, no vector.** The shipped path is a trace; if
  real vector artwork arrives, replace `src/ui/Logo.tsx` and recapture grades.
- **Fonts are committed to the repo** (`src/styles/fonts/`), so they no longer
  move with a dependency bump. OFL licences are in the client's source kit.
- **React Router is pinned to v6** by `vite-react-ssg`; a future upgrade changes
  what `Button`'s `to` branch bundles.
