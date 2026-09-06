# OurCercle — how to build with this design system

OurCercle is a **dark-first** brand system: cream type on deep wine grounds,
with cream itself used as the alternate ground for contrast sections. There is
no light mode and no white page — designs that assume one will be unreadable.

The exported global is `window.Cercle`.

## 1. Wrap everything in `DesignSystemProvider`

```jsx
<DesignSystemProvider>
  <Section tone="canvas">…</Section>
</DesignSystemProvider>
```

It supplies two things every component assumes:

- **A router context.** `Button` renders a react-router `Link` whenever it is
  given `to`, and **throws without a Router**. This is the single most common
  cause of a blank render.
- **The dark ground.** It paints `--color-canvas` and sets the default text
  colour. The stylesheet deliberately does *not* paint `html`/`body`, so
  without this wrapper components render on whatever the host page is —
  usually white, where cream text disappears.

## 2. Style with semantic tokens, not raw colours

Tailwind v4, using the CSS-variable arbitrary syntax: `bg-(--color-surface)`,
`text-(--color-text-muted)`, `border-(--color-border)`.

**Use these role tokens. Do not invent hex values, and do not reach for ramp
steps like `--color-wine-700`** — only the steps the components already use are
present in the shipped CSS, so most ramp references will not resolve. Every
token below is verified present.

| Role | Tokens |
| --- | --- |
| Grounds | `--color-canvas` (deepest), `--color-surface`, `--color-surface-raised`, `--color-surface-alt` and `--color-surface-alt-raised` (the CREAM alternates — see §3) |
| Text | `--color-text`, `--color-text-muted`, `--color-text-subtle`; on cream grounds `--color-text-on-alt`, `--color-text-on-alt-muted`, `--color-text-on-alt-subtle` |
| Lines | `--color-border`, `--color-border-subtle`, `--color-border-strong` |
| Actions | `--color-primary` + `--color-on-primary`, `--color-accent` + `--color-on-accent`, `--color-primary-hover`, `--color-accent-hover`, `--color-link` |
| Status | `--color-success`, `--color-warning`, `--color-danger`, `--color-focus` |
| Type | `--font-sans` (Manrope, body/UI), `--font-display` (Bricolage Grotesque, headings), `--text-display` |
| Layout | `--container-content`, `--container-prose`, `--spacing-section`, `--spacing-section-lg`, `--radius-card`, `--radius-control`, `--shadow-card` |
| Motion | `--duration-base`, `--ease-out-soft` |

Pair `--color-primary` only with `--color-on-primary` (and accent with
`on-accent`). Those pairs are contrast-checked; improvised combinations are not.

**Wine leads, cream supports.** Use `--color-surface-alt` / `-alt-raised` for
alternating section grounds to give a long page rhythm — not as a second accent.

## 3. The cream ground is a LIGHT surface — two rules

`tone="alt"` and `tone="alt-raised"` are cream. In an otherwise dark system that
inverts everything about them:

1. **Always reach for them through `<Section tone="alt">`.** Section sets the
   text colour and rebinds `--color-text-muted` / `-subtle` / `-link` to their
   on-alt equivalents, so composed content stays legible. Painting
   `bg-(--color-surface-alt)` onto a bare `<div>` skips that and leaves cream
   text on cream.
2. **Use `variant="accent"` for buttons on cream, never `primary`.** The primary
   button is a cream fill — cream on cream. Accent is the wine fill (6.3:1).

## 4. The display face is heavy by default

`--font-display` is **Bricolage Grotesque, a genuinely variable grotesk
(200-800)**, replacing the client's Instrument Serif per direct request. Unlike
that earlier face, hierarchy can use real weight again: `Heading` sets
`font-extrabold`/`font-bold`/`font-semibold` by size rather than forcing every
size to the same weight. Don't drop headings back to `font-normal`, the look is
built around the heavy end of the range. `--font-sans` is Manrope, also
variable (200-800), for body and UI text.

## 5. `Logo` paints with `currentColor`

One vector, every colourway — set the colour on the element rather than looking
for per-colour assets: `<Logo className="h-8 w-auto text-(--color-accent)" />`.
The mark **already contains the "CERCLE" wordmark**, so don't put a text label
next to it. It is slightly taller than wide: constrain one axis (`h-8 w-auto`)
rather than forcing a square.

## 6. Compose with the library, not with raw elements

`Section` (page band, `tone` + `size`) wraps `Container` (`content` | `prose`
width) — that pairing is the standard page scaffold. `ImageSlot` reserves
photography by aspect ratio (`ratio="3 / 2"`) and shows a brief until a `src`
arrives, so layouts don't move when real images land. Use `Heading` with an
explicit `level` for document structure and `size` for appearance; they are
independent. Long-form copy goes in `Prose`, which styles its descendants, so
write plain `<h2>/<p>/<ul>` inside it rather than per-element classes.
`Textarea` matches `Input`'s padding, border and error/hint behaviour exactly
— pair them in the same form without adjustment.

**`Card` and `ImageSlot` both take `tone="cream"`** for the case where a
*single object* (an event listing, a portrait) sits on cream rather than a
whole section. This is different from `Section tone="alt"`: use the `Section`
prop for a full-bleed cream band, and the component-level `cream` tone for one
card or image floating inside an otherwise dark section (see OurCercle's
Cercles and Story pages for real examples of each).

## 7. Where the truth lives

Read `styles.css` and its `@import` closure (it pulls in `_ds_bundle.css`, which
holds every token definition and component style) before styling anything. Each
component's real API is in its `<Name>.d.ts`, and usage in `<Name>.prompt.md`.

## 8. Idiomatic example

```jsx
<DesignSystemProvider>
  <Section tone="canvas" size="lg">
    <Container>
      <Eyebrow className="mb-4">The Cercles</Eyebrow>
      <Heading level={1} size="display">Four ways into a room.</Heading>
      <p className="mt-6 max-w-2xl text-lg text-(--color-text-muted)">
        Every Cercle is small on purpose. The format changes; the intent doesn't.
      </p>
      <Button to="/invite" size="lg" className="mt-9">Request an invite</Button>
    </Container>
  </Section>
</DesignSystemProvider>
```

Library components carry the controls; your own layout glue uses the tokens above.
