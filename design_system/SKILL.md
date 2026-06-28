---
name: xbutfory-design
description: Use this skill to generate well-branded interfaces and assets for XbutforY — the editorial "X, but for Y" startup directory — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# XbutforY — design skill

XbutforY is a hand-curated, daily-updated, human-voted directory of newly launched
"X but for Y" websites. The base look is a **printed broadsheet that happens to be a
website**: warm cream paper with grain + dot-grid, structure from ink-black rules
(not boxes), one rationed brand pink, three type registers (Newsreader serif /
Space Mono / Outfit sans), and cards as the single soft floating surface. The
**default register is now “maximal” (early-2000s Y2K)** — beta starburst, ghost
wordmark, glossy periwinkle nav, gel buttons — layered on those same tokens. And
**accounts are mandatory**: no anonymous submissions.

## How to use this skill

1. **Read `readme.md` first** — it is the full design guide: content/voice
   fundamentals, visual foundations (color, type, spacing, cards, motion, texture),
   **Maximal mode (Y2K) — the default look**, **Accounts & identity**, iconography,
   and theming. Everything below is a pointer into it.
   - **Updating a build Claude Code already shipped?** Read **`MIGRATION.md`** — it
     maps the old calm / anonymous version to the current maximal / account-gated one.
2. **Explore the other files** before building:
   - `styles.css` — the one stylesheet to link. It `@import`s every token + webfont.
   - `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`.
   - `components/` — React primitives (`Button` with `gel`, `Stamp`, `Tag`, `CodeChip`,
     `EntryCard`, `CategoryTile`, `Wordmark`, `BetaBurst`, `TagCloud`, `DigestSignup`,
     `FeaturedBar`, `SearchInput`, `SortToggle`, `SubmitPreview`, `FormField`, `NavTabs`,
     `GlossyNav`, `MastheadBar`, `AccountMenu`, `Toast`, `EmptyState`). Each has `.jsx` +
     `.d.ts` + `.prompt.md`.
   - `templates/` — copyable DC starting points. **Maximal is the default:** `maximal-home`
     (canonical), plus `directory-home` (calm alt), `entry-detail`, `submit-site`,
     `categories`, and the account screens `sign-in`, `create-account`, `account-settings`,
     `manage-submissions`.
   - `ui_kits/directory/` — full-screen interactive recreations plus JSX reference source.
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
- **Color is rationed:** one themeable brand pink (`--accent`, default hot magenta
  `#E11D8F`) on the wordmark's pivot `but`, primary/gel buttons, active nav, NEW
  stamps, live dots, vote-active, and "visit site" links — nowhere else. Category
  hues live only on tags/tile chips.
- **Accounts are mandatory:** submissions are tied to a member; the public byline is
  the account's `@handle`. Logged-in, the utility bar shows `AccountMenu` (not the
  Sign in / Create account links). No anonymous `submitter` strings.
- **Iconography is Unicode**, not an icon library (caret `▲`, magnifier `⚲`,
  arrows `→ ← ↗`, live dot `●`). No icon font, no SVG icon set. If you must add
  icons, use a thin monoline set (e.g. Lucide via CDN) and document the swap.
- **Motion** is quick and mechanical — no bounces. Cards lift `-2px` and deepen
  their warm-brown shadow on hover; the only loop is a 2.4s pulse on live dots.

## If invoked with no other guidance

Ask the user what they want to build or design, ask a few focused questions
(surface, audience, fidelity, how many variations), then act as an expert XbutforY
designer who outputs HTML artifacts **or** production code, depending on the need.
