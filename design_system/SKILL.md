---
name: xbutfory-design
description: Use this skill to generate well-branded interfaces and assets for XbutforY — the editorial "X, but for Y" startup directory — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# XbutforY — design skill

XbutforY is a hand-curated, daily-updated, human-voted directory of newly launched
"X but for Y" websites. The look is a **printed broadsheet that happens to be a
website**: warm cream paper with grain + dot-grid, structure from ink-black rules
(not boxes), one rationed brand red, three type registers (Newsreader serif /
Space Mono / Outfit sans), and cards as the single soft floating surface.

## How to use this skill

1. **Read `readme.md` first** — it is the full design guide: content/voice
   fundamentals, visual foundations (color, type, spacing, cards, motion, texture),
   iconography, and theming. Everything below is a pointer into it.
2. **Explore the other files** before building:
   - `styles.css` — the one stylesheet to link. It `@import`s every token + webfont.
   - `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`.
   - `components/` — React primitives (`Button`, `Stamp`, `Tag`, `CodeChip`,
     `EntryCard`, `CategoryTile`, `SearchInput`, `SortToggle`, `SubmitPreview`,
     `NavTabs`, `MastheadBar`, `Toast`, `EmptyState`). Each has `.jsx` + `.d.ts`
     + `.prompt.md`.
   - `ui_kits/directory/` — full-screen interactive recreations (home / detail /
     submit / categories) plus their JSX reference source.
   - `guidelines/` — foundation specimen cards (`*.card.html`).

## When building

- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets you
  need out of this folder and produce **static HTML** the user can open. Link
  `styles.css` (or inline the tokens) so the real palette, type, and effects apply.
  Reuse the `ui_kits/directory/*.html` screens as starting points — they are
  self-contained and link only `styles.css`.
- **Production code**: copy assets and read the rules here to become an expert in
  the brand, then write components against the CSS custom properties. The `.jsx`
  primitives are reference implementations — keep them token-driven.

## The rules that matter most

- **`X but for Y`** is the product. The italic *"but for"* connector is sacred —
  it appears in the wordmark, headlines, the code chip, and the submit preview.
- **Voice:** deadpan, self-aware, faintly conspiratorial. Mono labels are ALL CAPS
  + letter-spaced; headlines/names are Title Case serif; body/toasts are sentence
  case. Address the reader as *you*; editorial *we* only in toast commentary.
- **Emoji** appear only in transient toasts and the RSS button — never in
  headings, body, or labels.
- **Color is rationed:** one themeable brand red (`--accent`, default vermilion
  `#C93B1B`) on the wordmark `Y.`, primary buttons, active nav underline, NEW
  stamps, live dots, vote-active, and "visit site" links — nowhere else. Category
  hues live only on tags/tile chips. Sponsored placements use the one magenta.
- **Iconography is Unicode**, not an icon library (caret `▲`, magnifier `⚲`,
  arrows `→ ← ↗`, live dot `●`). No icon font, no SVG icon set. If you must add
  icons, use a thin monoline set (e.g. Lucide via CDN) and document the swap.
- **Motion** is quick and mechanical — no bounces. Cards lift `-2px` and deepen
  their warm-brown shadow on hover; the only loop is a 2.4s pulse on live dots.

## If invoked with no other guidance

Ask the user what they want to build or design, ask a few focused questions
(surface, audience, fidelity, how many variations), then act as an expert XbutforY
designer who outputs HTML artifacts **or** production code, depending on the need.
