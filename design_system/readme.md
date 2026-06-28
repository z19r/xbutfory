# XbutforY — Design System

> The directory of *"X, but for Y."* A hand-curated, daily-updated, human-voted
> index of newly launched websites that pitch themselves as a familiar product
> remixed for an oddly-specific niche ("Tinder but for the building you live in",
> "Stripe but for lemonade stands"). Editorial, deadpan, and unmistakably *printed*
> — warm paper, one brand pink, three type registers.

This system was **extracted from the working prototype** `XbutforY.dc.html` at the
project root (the single source of truth). Everything here — tokens, components,
the UI kit — is lifted from that file. No external codebase, Figma, or brand kit
was provided; if you have one, drop it in and reconcile.

---

## Index / manifest

- **`styles.css`** — the one file consumers link. `@import`s every token + font.
- **`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- **`guidelines/`** — 15 foundation specimen cards (Colors, Type, Spacing, Brand).
- **`components/`** — reusable React primitives:
  - `core/` — **Button**, **Stamp**, **Tag**, **CodeChip**
  - `cards/` — **EntryCard** (with `sponsored` pinned/spotlight), **CategoryTile**
  - `forms/` — **SearchInput**, **SortToggle**, **SubmitPreview**
  - `navigation/` — **NavTabs**
  - `chrome/` — **MastheadBar**
  - `feedback/` — **Toast**, **EmptyState**
- **`ui_kits/directory/`** — the directory screens. Self-contained interactive
  previews (`index.html` home · `detail.html` · `submit.html` · `categories.html`)
  plus JSX reference source (`Masthead.jsx`, `FeedScreen.jsx`, `DetailScreen.jsx`,
  `SubmitScreen.jsx`, `CategoriesScreen.jsx`).
- **`SKILL.md`** — Agent-Skill wrapper for use in Claude Code.

---

## Content fundamentals

**The premise is the product.** Every entry is the formula `X but for Y`: a known
product (X) reimagined for a niche (Y), joined by an italic *"but for"*. The phrase
is sacred — it appears in the wordmark, headlines, the code chip, the submit
preview, and the empty state.

**Voice: deadpan, self-aware, faintly conspiratorial.** It's an editor with a dry
sense of humor who has clearly seen too many launches. It commits to the bit and
never winks too hard.
- Masthead dek: *"A hand-curated index of newly launched websites that pitch
  themselves as `X but for Y`. Updated daily, voted by humans."*
- Colophon: *"AN INDEX OF DUBIOUS BRILLIANCE"* · *"made for builders, by a builder
  (again)."*
- Toasts (the running commentary): *"🏆 Five upvotes deep. You have taste. We
  respect that."* · *"🔮 Y-values scrambled. Find the hidden genius in the chaos."*
  · *"'Uber but for Horses' — yes, it's real."*

**Casing is a system, not a whim.**
- Mono labels are **ALL CAPS**, letter-spaced: `THE DIRECTORY OF`, `IN THE INDEX`,
  `VOL. 01 · ISSUE 26 · JUN 2026`, `VOTES`.
- Headlines and product names are **Title Case** serif.
- Body, toasts, and asides are **sentence case**, often trailing into lowercase
  ("made for builders, by a builder (again)").

**Person & tense.** Addresses the reader as *you* ("Swipe right on your
neighbors"). Editorial first-person-plural *we* shows up only in the commentary
("We respect that"). Present tense, active voice.

**Numbers as flavor.** Volume/issue numbers, "N new today", "Showing 1–N of M",
vote counts — these are editorial furniture (a newspaper masthead conceit), kept
truthful to the data but used for rhythm. Don't invent fake precision.

**Emoji.** Used **only** in transient toasts and the RSS button — one leading emoji
per message, never in headings, body, or labels. Treat them as stamps, not decoration.

---

## Visual foundations

### The big idea
A printed broadsheet that happens to be a website. One centered **1040px** column
on **warm cream paper** with a faint grain and a warm bloom up top. Structure comes
from **ink-black rules**, not boxes. Color is rationed to a single brand pink.
Cards are the one soft, floating element on an otherwise flat, typographic page.

### Color
- **Surfaces:** paper `#F3EDE3`; cards are the only near-white `#FFFDFA`; sunken
  wells `#FBF9F4`; the segmented-control rail `#E9E1D3`; ink `#171008`.
- **Text ramp** (all warm grey): strong `#171008` → body `#6B5F50` → muted
  `#8A7D6F` → soft `#9A8C7B` (the *"but for"*) → faint `#B5AB9B` (numbers, meta).
- **Accent:** one brand pink, default hot magenta `#E11D8F`, **themeable** through six
  curated options (magenta / vermilion / teal `#1B6E80` / violet `#6A3D9E` / ochre `#A07A18`
  / ink). It appears on the wordmark's pivot **`but`**, primary buttons, the active nav
  underline, NEW stamps, live dots, vote-active state, and "visit site" links —
  and nowhere else.
- **Category hues** (7, muted, one per section) live *only* on tags and the tile
  chip/dot: dating `#B5472D`, crm `#2B5BA8`, discovery `#2A7A56`, saas `#6A3D9E`,
  payments `#1B8080`, social `#A07A18`, logistics `#9B5523`.
- **Semantic:** NEW = accent, HOT = amber `#B07A1A`, live/launched = green `#2A7A56`.
- **Sponsored:** paid placements use hot magenta `--sponsor` `#E11D8F` — the same
  pink family as the accent, so sponsored cards lean on the **solid ribbon, glow halo
  and green SPONSORED label** (not hue alone) to read as ads.
  Two formats: *pinned* (a **solid hot-pink ribbon** across the top of the card +
  magenta border, glow `--shadow-pin` and a faint `--sponsor-tint` wash — one slot,
  top of feed) and *spotlight* (the magenta glow halo `--shadow-sponsor`, mid-feed).
  Both pair with a green `--sponsor-tag` `#2E8B72` SPONSORED label.
- **Signature gradients:** the `--spectral` hairline under the hero dek (warm→cool,
  the only rainbow in the system) and the `--bloom-layer` (two warm radials) behind
  the masthead.

### Type
Three faces, three jobs — never mix the jobs.
- **Newsreader** (serif) — the editorial voice: wordmark, headlines, product
  names, the giant stat number, and the italic *"but for"*. Weights 500 (dek) and
  700 (everything bold). Large display is optically tightened (`-0.012em`).
- **Space Mono** (mono) — the technical voice: every eyebrow, label, issue line,
  timestamp, submitter handle, the `X but for Y` code chip, and "VOTES". Always
  uppercase + letter-spaced for labels (`.32em` on the masthead eyebrow, `.14em`
  on stat labels).
- **Outfit** (sans) — the plain UI voice: body copy & descriptions (300 weight),
  buttons (600), nav (400), links (500).

### Spacing & layout
A loose ~4px rhythm, editorial not rigid. One centered `--content-max: 1040px`
column, `24px` gutters. Cards pad `20px 22px`, stack with `16px` gaps, and sit
`18px` from their vote box. Full-bleed only for the dark utility bar.

### Cards, borders & elevation
- **Cards** are the system's one soft surface: near-white `#FFFDFA`, `1px`
  `#EDE4D5` border, `10px` radius, and a **two-layer warm-brown shadow**
  (`rgba(74,52,28,…)` — never neutral grey): a tight contact shadow + a long soft
  ambient one, so they *float* over the textured paper.
- **Rules** do the structural work: `1.5–2px` solid ink under section headers and
  the footer; hairline `#D4C9B8` for minor dividers.
- **Stamps, tags, the code chip** are **sharp** (3–4px) and hollow — printed marks,
  not chips.

### Borders & inputs
Inputs and the RSS button are near-white with a `1px #D8CDB9` border, `8px` radius,
and an **inset** shadow (a recessed well). Focus swaps the border to ink. Primary
buttons carry the warm accent glow + a `1px` inner top highlight.

### Motion
Quick, restrained, mechanical — **no bounces**. Transitions `.15s–.18s`. Cards lift
`translateY(-2px)` and deepen their shadow on hover; buttons lift `-1px`. The only
looping animation is a 2.4s opacity **pulse** on the live dots. Toasts slide up
`10px` + fade in over `.3s`. An entry's vote box snaps to accent on click.

### Hover / press states
- Cards: border → `#E2D6C2`, shadow → `--shadow-card-hover`, lift `-2px`.
- Primary button: `opacity .94` + lift + deeper glow. Secondary: border → ink.
  Ghost/nav: muted text → ink.
- Links: underline appears. Vote box: hover border → accent; voted = accent border,
  accent caret + number, no inset.

### Texture, transparency & blur
- **Dot grid:** a warm dot every 17px (`--dots`), doubled with a half-offset ghost
  grid for a fine "dotted notebook" field. The most *visible* texture — read it in
  the gutters between cards.
- **Paper grain:** a fractal-noise SVG tile at ~3% alpha, repeated full-page under
  the dots (`--grain`).
- **Hero bloom:** two warm radial gradients (rose + amber) that fade into the paper
  within the first ~940px, giving the masthead atmosphere.
- No glassmorphism, no backdrop-blur. Transparency is used only inside shadows,
  the bloom, and softened tag borders (`color-mix(... 45%, transparent)`).

### Imagery
There is **none** by design — the system is purely typographic. The "logo" is the
wordmark. If you must place product imagery, keep it warm, restrained, and let the
type lead. Never hand-draw SVG illustrations.

---

## Iconography

Deliberately minimal and **drawn from Unicode**, not an icon library — it suits the
typeset, low-chrome aesthetic. There is **no icon font and no SVG icon set** to
copy (the only SVG in the system is the grain texture).

- **Caret** `▲` (`&#9650;`) — the upvote affordance in every vote box.
- **Magnifier** `⚲` (`&#9906;`) — search field.
- **Arrows** `→ ← ↗` (`&rarr; &larr; &#8599;`) — "visit site", back, external.
- **Live dot** `●` — masthead, issue line, status; pulses.
- **RSS** uses the 📡 emoji; the easter-egg button uses 🔮.
- **Stamps** (NEW / HOT) and **category tags** are typographic, not iconographic.

If you later introduce icons, choose a **thin, monoline** set (e.g. Lucide via CDN)
to match the hairline rules — and document the substitution here.

---

## Theming

`--accent` is the single hue knob. Set it on `:root` (or a scope) to one of the five
options and the wordmark, buttons, stamps, underline, dots, and links all follow.
Everything else — paper, ink, category hues — stays fixed.

## Caveats / substitutions
- **Fonts are Google-hosted** (Newsreader, Space Mono, Outfit) via `@import`, not
  bundled binaries — all three are free on Google Fonts. Swap in self-hosted
  `@font-face` if you need offline/locked assets.
- Component **specimen cards are static HTML** (they link `styles.css` for real
  tokens) so the Design System tab always renders; the real, themeable React
  components live beside them as `.jsx` + `.d.ts` + `.prompt.md`.
- Only the **home / Latest** screen is rebuilt as a UI kit. Detail, Submit, and
  Categories views exist in the source prototype and reuse the same components.
