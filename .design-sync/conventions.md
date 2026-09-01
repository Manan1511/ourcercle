# Cercle — how to build with this design system

Cercle is a **dark-only** brand system: cream type on deep wine and teal grounds.
There is no light mode. Designs that assume a white page will be unreadable.

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
| Grounds | `--color-canvas` (deepest), `--color-surface`, `--color-surface-raised`, `--color-surface-alt` and `--color-surface-alt-raised` (the teal alternates) |
| Text | `--color-text`, `--color-text-muted`, `--color-text-subtle` |
| Lines | `--color-border`, `--color-border-subtle`, `--color-border-strong` |
| Actions | `--color-primary` + `--color-on-primary`, `--color-accent` + `--color-on-accent`, `--color-primary-hover`, `--color-accent-hover`, `--color-link` |
| Status | `--color-success`, `--color-warning`, `--color-danger`, `--color-focus` |
| Type | `--font-sans` (Inter, body), `--font-display` (Fraunces, headings), `--text-display` |
| Layout | `--container-content`, `--container-prose`, `--spacing-section`, `--spacing-section-lg`, `--radius-card`, `--radius-control`, `--shadow-card` |
| Motion | `--duration-base`, `--ease-out-soft` |

Pair `--color-primary` only with `--color-on-primary` (and accent with
`on-accent`). Those pairs are contrast-checked; improvised combinations are not.

**Wine leads, teal supports.** Use `--color-surface-alt` / `-alt-raised` for
alternating section grounds to give a long page rhythm — not as a second accent.

## 3. Compose with the library, not with raw elements

`Section` (page band, `tone` + `size`) wraps `Container` (`content` | `prose`
width) — that pairing is the standard page scaffold. Use `Heading` with an
explicit `level` for document structure and `size` for appearance; they are
independent. Long-form copy goes in `Prose`, which styles its descendants, so
write plain `<h2>/<p>/<ul>` inside it rather than per-element classes.

## 4. Where the truth lives

Read `styles.css` and its `@import` closure (it pulls in `_ds_bundle.css`, which
holds every token definition and component style) before styling anything. Each
component's real API is in its `<Name>.d.ts`, and usage in `<Name>.prompt.md`.

## 5. Idiomatic example

```jsx
<DesignSystemProvider>
  <Section tone="canvas" size="lg">
    <Container>
      <Eyebrow className="mb-4">The collection</Eyebrow>
      <Heading level={1} size="display">A quieter kind of luxury</Heading>
      <p className="mt-6 max-w-2xl text-lg text-(--color-text-muted)">
        Made slowly, in small numbers.
      </p>
      <Button to="/contact" size="lg" className="mt-9">Book a consultation</Button>
    </Container>
  </Section>
</DesignSystemProvider>
```

Library components carry the controls; your own layout glue uses the tokens above.
