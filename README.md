# Cercle

Marketing site for Cercle. React SPA, prerendered to static HTML at build time.

## Stack

| Concern   | Choice                       | Why                                                |
| --------- | ---------------------------- | -------------------------------------------------- |
| Build     | Vite 8                       | Fast dev loop                                      |
| UI        | React 19 + TypeScript        |                                                    |
| Routing   | React Router 6 (data router) | Pinned by `vite-react-ssg`                         |
| Prerender | `vite-react-ssg`             | Emits real HTML per route so the site is crawlable |
| Styling   | Tailwind v4                  | Tokens live in CSS, not a JS config                |
| Host      | Netlify                      | Push to deploy                                     |

## Commands

```bash
npm install
npm run dev            # dev server
npm run build          # typecheck, bundle, prerender to dist/
npm run preview        # serve the built site
npm run tokens         # regenerate colour tokens (requires Python 3)
npm run lint
npm run format
```

Node 22 (see `.nvmrc`). Netlify is pinned to the same version in `netlify.toml`.

## How prerendering works

`npm run build` walks every route in `src/routes.tsx` and writes a real HTML
file per page — `dist/index.html`, `dist/about.html`, and so on — with content
and meta tags already in the markup. React then hydrates on top.

**Routes must be statically enumerable in `src/routes.tsx`.** A path that only
exists at runtime will not be prerendered and will not be indexed.

Per-page `<title>`, description, canonical and Open Graph tags come from
`src/components/Seo.tsx`.

## Design system

### Colours

`src/styles/tokens.css` is **generated — do not edit it by hand.** Run
`npm run tokens` after changing `scripts/gen-tokens.py`.

The client's palette is a barbell: four very dark primaries (1.4–3.9%
luminance) and five very light secondaries (43–85%), with `rose wine` as the
only mid-tone. UI needs mid-tones for borders, muted text and hover states, so
the generator expands each brand colour into a 12-step ramp by interpolating
lightness in OKLCH at fixed hue, tapering chroma at both ends.

**Every client-approved hex is pinned to its nearest ramp step**, so approved
colours appear verbatim rather than approximated:

| Palette name   | Hex       | Token               |
| -------------- | --------- | ------------------- |
| crimson hour   | `#471224` | `--color-wine-900`  |
| velvet dusk    | `#331628` | `--color-plum-900`  |
| forest depth   | `#1D3D3C` | `--color-teal-800`  |
| midnight moss  | `#012B2A` | `--color-teal-900`  |
| rose wine      | `#8C3A51` | `--color-wine-600`  |
| candlelight    | `#F7EEC7` | `--color-cream-100` |
| raw linen      | `#E8D4AF` | `--color-cream-200` |
| dusk lilac     | `#D3C5D4` | `--color-lilac-200` |
| pressed violet | `#BFA8C2` | `--color-lilac-300` |
| morning sage   | `#C4D9CA` | `--color-sage-200`  |

The generator asserts contrast on 14 semantic pairings and **exits non-zero
rather than emitting a failing combination**, so a token change that breaks
accessibility fails the build instead of shipping.

### Semantic layer

`src/styles/index.css` maps ramps to roles (`--color-surface`, `--color-text`,
`--color-accent`…). **Components reference roles only, never a raw ramp step**,
so re-theming means editing that one block.

The site is dark-ground throughout and wine-led, matching the brand's loading
animation. Teal is the alternate section ground. Status colours are derived
from the palette (sage = success, raw linen = warning, light wine = danger)
rather than introducing unapproved hues.

### Components

Import from `src/ui` — never by file path:

```tsx
import { Button, Card, Container, Heading, Section } from '../ui'
```

`Badge` · `Button` · `Card` · `Container` · `Eyebrow` · `Heading` · `Input` ·
`Logo` · `Prose` · `Section`

## Content

All copy lives in `src/content/` as typed TypeScript, not inline in JSX. There
is no CMS: the client sends changes and you commit them. Because the content
already has a schema, swapping in a CMS later is a contained change.

## Before launch

- [ ] Replace `site.url` in `src/content/site.ts` — currently `https://example.com`.
      Wrong here means broken canonical URLs and social previews.
- [ ] Same domain fix in `public/robots.txt`.
- [ ] Replace all placeholder copy in `src/content/pages.ts`.
- [ ] Replace `src/ui/Logo.tsx` with the supplied vector logo.
- [ ] Add `public/og-default.png` (1200×630) — social previews 404 without it.
- [ ] Add `public/favicon.svg` in brand colours.
- [ ] Set brand fonts in `src/styles/index.css` (`--font-sans`, `--font-display`).
- [ ] Add a `sitemap.xml`, or remove the reference from `robots.txt`.
- [ ] Decide on analytics (Plausible/Umami need no cookie banner; GA does).

## Known issues

**React Router 6 carries two moderate advisories** (open redirect via backslash
in `<Link>`/`useNavigate`; constructor injection in `deserializeErrors()`),
fixed in 7.18+ — which `vite-react-ssg@0.9.2` does not accept. Exposure here is
minimal: the site passes no user input to `navigate()` and does no SSR data
hydration. Revisit when `vite-react-ssg` supports React Router 7.
