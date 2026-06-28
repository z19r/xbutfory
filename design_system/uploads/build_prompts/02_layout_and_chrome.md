# Build Prompt 02 — Layout & Chrome

> **Session goal:** the persistent page frame — application layout, the dark utility bar, the
> **Masthead** (eyebrow + wordmark + dek + search/RSS/Submit row), the sticky **NavTabs**, and
> the footer/colophon. Static content is fine; data wiring comes later.

## Context
Read `CLAUDE.md`. Reference: `design_system/ui_kits/directory/index.html` (open it — this is
the ground truth for the chrome), `Masthead.jsx`, and the component contracts in
`design_system/components/chrome/MastheadBar.*` and `navigation/NavTabs.*`.

## Layout rules (from the design)
- One centered editorial column, **`--content-max` (1040px)**, `--page-gutter` (24px) sides.
- Structure is made of **ink rules**, not boxes. A 1.5–2px solid ink rule sits under section
  headers and above the footer.
- Full-bleed is used **only** for the dark utility bar (ink background, paper-colored text).

## Build these ViewComponents

1. **`UtilityBarComponent`** — the thin full-bleed ink bar at the very top: a pulsing live dot
   `●` (2.4s opacity pulse), the issue line in Space Mono uppercase
   (`VOL. 01 · ISSUE 26 · JUN 2026` — pass as params), and a right-aligned aside. Paper-colored
   text (`--on-dark`, muted `--on-dark-muted`).

2. **`MastheadComponent`** (maps to `MastheadBar` + the eyebrow/wordmark/search row):
   - Eyebrow: `THE DIRECTORY OF` — Space Mono, `--track-eyebrow` (.32em), `--type-eyebrow`.
   - **Wordmark**: `Xbutfor` in ink + `Y.` in `--accent`, Newsreader 700, `--type-logo`, optically
     tightened. This is the logo — no image.
   - **Dek**: the serif hero line (`--type-hero`, weight 500) with the **`--spectral` hairline**
     gradient rule directly under it (the only rainbow in the system).
   - **Action row**: `SearchInput` slot (built in prompt 03 — leave a placeholder slot/yield),
     an RSS button (📡, the one allowed emoji button), and a primary **Submit** button slot.

3. **`NavTabsComponent`** — the sticky nav band (faint top edge `--border-nav-top`). Tabs:
   `Latest · Trending · Top · Categories`. Active tab carries the **accent underline**. Make it
   `position: sticky` under the masthead. Tab switching is wired in prompt 05 — for now mark
   active by a param.

4. **`FooterComponent` / colophon** — ink rule above; `AN INDEX OF DUBIOUS BRILLIANCE`,
   `made for builders, by a builder (again).`, Space Mono labels. Sentence-case asides.

5. **`application.html.erb`** layout — compose: utility bar → masthead → sticky nav → `yield`
   → footer, all inside the centered 1040px column (except the full-bleed utility bar).

## Motion / states
- Live dot: 2.4s opacity pulse loop (respect `prefers-reduced-motion`).
- Nav tab hover: muted text → ink. Active: accent underline.

## Done when
- Home renders the full chrome around an empty content slot, matching `index.html` visually.
- Wordmark, eyebrow tracking, spectral rule, sticky nav, and dark bar all match.

**Commit:** `feat: application layout, utility bar, masthead, nav tabs, footer`.

➡️ Next: `03_core_components.md`.
