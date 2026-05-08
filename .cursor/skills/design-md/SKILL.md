---
name: design-md
description: Use the DESIGN.md format (https://github.com/google-labs-code/design.md) to express, validate, and apply a project's visual identity. Activate this skill whenever the user asks to create, edit, lint, diff, or export a DESIGN.md, when they want to "use design.md" for a page or component, or when generating UI that should follow a documented design system.
---

# design-md

This skill lets the agent treat the DESIGN.md format as the **single source of truth** for the visual identity of any page or component generated in this repository.

DESIGN.md combines:

1. **YAML front matter** — machine-readable design tokens (colors, typography, spacing, rounded, components).
2. **Markdown prose** — human-readable rationale telling agents *why* those values exist and how to apply them.

The local CLI is installed as a devDependency:

```bash
npm install --save-dev "@google/design.md"
```

It exposes the binary `design.md` (Windows-friendly, available at `node_modules/.bin/design.md.cmd`).

## When to use this skill

Activate it when the user:

- Asks to "use design.md", "follow DESIGN.md", or references the spec at `https://github.com/google-labs-code/design.md`.
- Wants to bootstrap a design system file (`DESIGN.md`) for a page, brand, or feature.
- Asks to lint, diff, or export tokens (Tailwind v3/v4 or DTCG `tokens.json`).
- Builds new UI that should follow a coherent, agent-readable visual identity.

## Authoring a DESIGN.md

Always create one DESIGN.md per scope (root for the brand, or per feature folder for a sub-system).

### Front matter (canonical token shape)

```yaml
---
version: alpha
name: <Kit name>
description: <Optional one-liner>
colors:
  primary: "#1A1C1E"
  on-primary: "#FFFFFF"
  secondary: "#6C7278"
  tertiary: "#B8422E"        # the single accent driver
  neutral: "#F7F5F2"
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 4rem
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 3rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: 1.6
  label-caps:
    fontFamily: Inter
    fontSize: 0.75rem
    letterSpacing: 0.12em
rounded:
  sm: 4px
  md: 12px
  lg: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px
  card-surface:
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.lg}"
---
```

### Body sections (in canonical order)

`## Overview` → `## Colors` → `## Typography` → `## Layout` → `## Elevation & Depth` → `## Shapes` → `## Components` → `## Do's and Don'ts`

Sections may be omitted but must keep this order. Duplicate `##` headings are an error.

### Token references

Use `{path.to.token}` to reference any token from another token (e.g. `"{colors.primary}"`). Broken references are linter errors.

### Component properties supported

`backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`. Variants like `-hover`, `-active`, `-pressed` are siblings (e.g. `button-primary-hover`).

## CLI workflow

Run from the project root. On Windows PowerShell, prefer the local binary:

```bash
# Validate the DESIGN.md (exits 1 on errors)
./node_modules/.bin/design.md lint DESIGN.md

# Diff two versions to detect regressions
./node_modules/.bin/design.md diff DESIGN.md DESIGN-v2.md

# Export tokens
./node_modules/.bin/design.md export --format css-tailwind  DESIGN.md > styles/design-tokens.css
./node_modules/.bin/design.md export --format json-tailwind DESIGN.md > tailwind.theme.json
./node_modules/.bin/design.md export --format dtcg          DESIGN.md > tokens.json

# Inject the spec (or just rules) into agent context
./node_modules/.bin/design.md spec --rules
```

The linter runs these rules:

| Rule               | Severity |
| ------------------ | -------- |
| broken-ref         | error    |
| missing-primary    | warning  |
| contrast-ratio     | warning  |
| orphaned-tokens    | warning  |
| missing-typography | warning  |
| section-order      | warning  |
| token-summary      | info     |
| missing-sections   | info     |

Always lint before committing a DESIGN.md.

## Applying DESIGN.md to UI

When generating Next.js / React / Tailwind code from a DESIGN.md:

1. Read the front-matter tokens first; treat them as **normative**.
2. Read the prose to understand intent (mood, hierarchy, do's and don'ts).
3. Map tokens to CSS custom properties (`--color-primary`, `--spacing-md`, etc.) or to the Tailwind theme via `export --format css-tailwind` / `--format json-tailwind`.
4. Use component tokens (`button-primary`, `card-surface`, …) verbatim — never hard-code colors that exist as tokens.
5. Keep WCAG AA contrast (≥ 4.5:1) on every `backgroundColor` / `textColor` pair.
6. If the user asks for a new variant (hover, dark, compact), add it as a new component entry in DESIGN.md *first*, then implement it.

## Programmatic API

For tooling and tests:

```ts
import { lint } from "@google/design.md/linter";

const report = lint(fs.readFileSync("DESIGN.md", "utf8"));
report.findings;     // Finding[]
report.summary;      // { errors, warnings, info }
report.designSystem; // Parsed DesignSystemState
```

## Output expectations

Whenever this skill is active, the agent must:

- Author or update a DESIGN.md before (or alongside) producing UI code.
- Reference tokens by name in the generated code (CSS variables, Tailwind classes, or inline styles backed by tokens).
- Run `design.md lint DESIGN.md` and report findings to the user.
- Surface contrast warnings and propose fixes rather than silently accepting them.
