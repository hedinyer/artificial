---
version: alpha
name: Hedinyer Portfolio
description: Studio-grade dark portfolio for Hedinyer — editorial typography, deep ink surfaces, and a single electric accent that drives every interaction.
colors:
  primary: "#0A0A0B"
  on-primary: "#F5F5F7"
  surface: "#111114"
  surface-elevated: "#17171B"
  surface-muted: "#1F1F24"
  border: "#2A2A30"
  border-strong: "#3A3A42"
  text-primary: "#F5F5F7"
  text-secondary: "#A1A1AA"
  text-muted: "#8B8B92"
  tertiary: "#22D3EE"
  on-tertiary: "#0A0A0B"
  tertiary-soft: "#0E3A44"
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 4.5rem
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: -0.03em
  h1:
    fontFamily: Playfair Display
    fontSize: 3.25rem
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.02em
  h2:
    fontFamily: Playfair Display
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.015em
  h3:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.14em
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 6px
  md: 12px
  lg: 20px
  xl: 32px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  '2xl': 96px
  '3xl': 160px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.full}"
    padding: 14px
    typography: "{typography.label-caps}"
  button-primary-hover:
    backgroundColor: "{colors.on-primary}"
    textColor: "{colors.primary}"
  button-ghost:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: 14px
    typography: "{typography.label-caps}"
  button-ghost-hover:
    backgroundColor: "{colors.border}"
    textColor: "{colors.on-primary}"
  card-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-project-hover:
    backgroundColor: "{colors.surface-elevated}"
  card-operations-case:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-operations-case-hover:
    backgroundColor: "{colors.surface-elevated}"
  ops-metric-pill:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: 8px
    typography: "{typography.mono-sm}"
  card-analytics-case:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-analytics-case-hover:
    backgroundColor: "{colors.surface-elevated}"
  badge-status:
    backgroundColor: "{colors.tertiary-soft}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
    padding: 8px
    typography: "{typography.label-caps}"
  tag-tech:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: 6px
    typography: "{typography.mono-sm}"
  nav-link:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-caps}"
  nav-link-hover:
    textColor: "{colors.on-primary}"
  input-field:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 14px
  input-field-focus:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
  meta-caption:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-muted}"
    typography: "{typography.mono-sm}"
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    height: 1px
---

## Overview

**Editorial Studio meets Quantum Lab.** The Hedinyer portfolio reads like a long-form magazine spread for a software studio — generous whitespace, oversized serif headlines, monospaced metadata, and a single electric cyan that activates every interaction. The palette is rooted in deep, slightly warm blacks; the cyan never appears outside intentional moments (CTAs, status, focus). The result feels both *premium* and *technical* — closer to a contemporary type foundry's site than to a generic dev portfolio.

## Colors

Dark, layered surfaces carry the entire experience. We separate background from card from elevated card with three increasingly lighter tints of black so structure is felt rather than drawn.

- **Primary (#0A0A0B):** Page background. The deepest ink — slightly warmer than `#000` so headlines breathe.
- **Surface (#111114):** Default card and section background.
- **Surface Elevated (#17171B):** Hovered cards, inputs, modals — anything that should "lift" toward the reader.
- **Surface Muted (#1F1F24):** Tags, ghost buttons, and inert chrome.
- **Border (#2A2A30) / Border Strong (#3A3A42):** Hairlines for cards and dividers; the strong variant is reserved for focused/hovered borders.
- **Text Primary (#F5F5F7):** Editorial off-white for headlines and body. Avoid pure `#FFF` — too clinical against the warm black.
- **Text Secondary (#A1A1AA) / Muted (#71717A):** Supporting copy and metadata.
- **Tertiary — "Quantum Cyan" (#22D3EE):** The single accent. Used only for: primary CTA fill, focus rings, status pulse, link hover underline, and the gradient stop in the hero name. Never as decorative chrome.
- **Tertiary Soft (#0E3A44):** Background for status badges so the cyan glyph is legible without shouting.

## Typography

Two families, sharp contrast.

- **Playfair Display (serif)** — display, h1, h2. Carries the editorial gravitas; large, tight tracking, modest weight (600 not 700) so it stays elegant rather than aggressive.
- **Inter (sans)** — h3 and below, all UI copy. Dependable, neutral, paired with `letterSpacing: 0.14em` and `uppercase` for `label-caps` to feel like masthead metadata.
- **JetBrains Mono** — only for tech tags and timestamps. Reinforces the "studio" / "lab" notion without leaking into prose.

Hierarchy: every section opens with a `label-caps` eyebrow → an h2 in serif → body-lg lede → body-md body. Never skip the eyebrow.

## Layout

- Max content width: **1200px** (`max-w-7xl`).
- Vertical rhythm: sections separated by `spacing.3xl` (160px) on desktop, collapsing to `spacing.xl` (48px) on mobile.
- Grid: 12-column implicit; project cards in 1/2/3 columns at sm/md/lg breakpoints.
- Sticky header with backdrop blur over `primary` at 80% opacity.

## Elevation & Depth

No drop shadows. Depth comes from:

1. The three-tone surface ladder (`surface` → `surface-elevated` → `surface-muted`).
2. Hairline `border` lines (1px).
3. A subtle radial cyan glow behind the hero (`tertiary` at 8% opacity, blurred 120px).

Hovering a card promotes `surface` → `surface-elevated` and `border` → `border-strong` — never adds a shadow.

## Shapes

- Buttons and badges are **fully rounded** (`rounded.full`) — pill shapes signal interactivity in a sea of rectangles.
- Cards use `rounded.lg` (20px) — soft enough to feel modern, sharp enough to read as "system".
- Tags use `rounded.sm` (6px) — they should feel like inline metadata, not interactive pills.

## Components

- **button-primary** — solid cyan pill, used at most twice per page (primary CTA + contact). Hover inverts to white-on-black to feel deliberate.
- **button-ghost** — muted surface pill for secondary actions; hover lightens border only.
- **card-project** — surface card holding a project; hover lifts to `surface-elevated`. Inside: aspect-video media, then `label-caps` eyebrow, h3 title, body-sm description, tag row, and link row.
- **card-operations-case** — card alta para casos de automatización por empresa: contexto, alcance, impacto, stack y resultados operativos en una lectura vertical clara.
- **card-analytics-case** — card alta para casos gastronómicos en Alemania: reto, solución implementada, resultados y stack de analítica/forecast.
- **badge-status** — tiny pill at the top of the hero ("Disponible para proyectos") with a pulsing cyan dot.
- **tag-tech** — monospaced tech name on `surface-muted`, no border.
- **ops-metric-pill** — metadata pill for KPI/result highlights in operational case cards.
- **nav-link** — `label-caps`, secondary text color, transitioning to primary on hover. Underlined on hover with a 1px cyan line.

## Do's and Don'ts

**Do**

- Reserve cyan for moments of decision (CTA, status, focus, link hover).
- Pair every serif headline with a monospaced or all-caps eyebrow.
- Let sections breathe — `spacing.3xl` between major blocks is the default.
- Use the surface ladder to imply depth.

**Don't**

- Don't introduce a second accent color (no purple, no pink, no gradient rainbows).
- Don't apply drop shadows; depth is tonal, not optical.
- Don't use Playfair below 1.5rem — it loses elegance.
- Don't let body text drop below `#A1A1AA` for meaningful copy (contrast falls below AA).
- Don't add decorative chrome around the cyan — it must remain a quiet, deliberate signal.
