# Build Prompt 01 — Tokens & Fonts

> **Session goal:** install the entire design-token layer and the three webfonts so every
> later prompt can reference CSS variables. Pure CSS, no components.

## Context
Read `CLAUDE.md`. The tokens are the **single source of styling truth** — port them nearly
verbatim. Source files: `design_system/tokens/` (`colors.css`, `typography.css`,
`spacing.css`, `effects.css`, `fonts.css`) and `design_system/styles.css` (the `@import` hub).

## Do this

1. **Copy the token files** into `app/assets/stylesheets/tokens/` essentially as-is:
   `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`. Keep every
   custom property name identical — components depend on them.

2. **Fonts** (Newsreader, Space Mono, Outfit) load from Google Fonts via the `@import` in
   `fonts.css`. Keep that for now. (Optional hardening: self-host later by downloading the
   families and swapping in local `@font-face` — note it in a TODO, don't block on it.)

3. **Create `app/assets/stylesheets/application.css`** as the entry point. It must, in order:
   - `@import` the five token files (fonts first).
   - Add a small **base/reset** layer: `*{box-sizing:border-box}`, zero body margin, and set the
     **page surface** on `body` using the documented recipe in `effects.css` (the comment block
     above `--bloom-layer`): paper background-color + the `--bloom-layer` multi-image stack with
     the matching `background-repeat/size/position` lists. Set default body type to
     `var(--font-sans)`, `var(--type-body)`, `color: var(--text-strong)`, `line-height: var(--lh-body)`.
   - Import the (currently empty) `components/` stylesheets — set up the convention now.

4. **Verify the surface renders**: temporarily drop the masthead-less home page on the paper
   background and confirm in a browser you see warm cream paper, the faint dot grid, and the
   warm bloom up top. Screenshot for your own check.

5. **Theme knob check**: confirm setting `--accent: var(--accent-teal)` on `:root` is a clean
   single-line swap (you'll expose this as a real theme switch later — just confirm the plumbing).

## Guardrails
- **Do not** hardcode hex anywhere — only `var(--token)`.
- **Do not** rename or "tidy" token names.
- The page surface is a **multi-layer background on one element** — don't split it into nested divs.

## Done when
- `application.css` imports all tokens + fonts and sets the paper surface on `body`.
- A blank page shows correct paper + grain + bloom and all three fonts are available.
- Flipping `--accent` on `:root` visibly works.

**Commit:** `feat: install design tokens, webfonts, and paper surface`.

➡️ Next: `02_layout_and_chrome.md`.
