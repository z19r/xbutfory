# Build Prompt 03 — Core Components

> **Session goal:** the four sharp little primitives everything else composes — **Button**,
> **Stamp**, **Tag**, **CodeChip** — plus the form inputs **SearchInput** and **SortToggle**.
> Build them as ViewComponents with the exact prop contracts.

## Context
Read `CLAUDE.md`. Each component has a contract in `design_system/components/`:
`core/Button.*`, `core/Stamp.*`, `core/Tag.*`, `core/CodeChip.*`, `forms/SearchInput.*`,
`forms/SortToggle.*`. The `.d.ts` is the prop list; `.prompt.md` shows usage; the `.jsx` is
the exact styling. **Translate JSX → ERB/Ruby idiomatically** — same prop names + allowed values.

## Components & contracts

1. **`ButtonComponent`** — `variant: :primary | :secondary | :ghost | :dark` (default `:primary`),
   `size: :sm | :md | :lg` (default `:md`), `icon:` (leading glyph/emoji), `trailing_arrow:`
   (append `→`), plus standard `type`/`disabled`. Primary = accent fill + **warm accent glow**
   (`--shadow-button`) + 1px inner top highlight; lifts `-1px` on hover. Secondary = ink border.
   Ghost = quiet text → ink on hover. Radius `--radius-input` (8px), Outfit 600.

2. **`StampComponent`** — `kind: :NEW | :HOT` (default `:NEW`), optional label override via
   content. **Sharp** (3px), hollow, printed-mark look — colored border + matching text, no fill.
   NEW = accent; HOT = amber `--stamp-hot`. Space Mono, uppercase.

3. **`TagComponent`** — `category:` (one of the 7 keys → sets hue automatically), `color:`
   override (wins over category), label via content. Mono, hue-tinted, **sharp** (`--radius-tag`,
   4px), softened border via `color-mix(... 45%, transparent)`. The 7 hues are the `--cat-*` tokens.

4. **`CodeChipComponent`** — inline mono chip for a literal snippet inside serif copy, almost
   always the phrase `X but for Y`. Sunken surface `--surface-sunken`, sharp, mono.

5. **`SearchInputComponent`** — near-white field, `--border-input`, `--radius-input` (8px),
   **inset** shadow (recessed well), leading magnifier glyph `⚲`. Focus swaps border → ink.
   Placeholder uses `--placeholder`. (Live filtering behavior is wired in prompt 05 — expose a
   `data-` hook / Stimulus target now.)

6. **`SortToggleComponent`** — a **segmented control** on the rail track `--surface-rail`. Options
   like `New · Top · Random`. Active segment raises to a near-white pill. (Behavior in prompt 05.)

## Iconography (Unicode only — no icon font, no SVG icons)
Caret `▲` `&#9650;`, magnifier `⚲` `&#9906;`, arrows `→ ← ↗`. Stamps/tags are typographic.

## Build a ViewComponent preview
Add a `lookbook`-style or plain preview page (e.g. `/dev/components`) rendering every variant —
this is your living spec sheet. Mirror `design_system/components/core/core.card.html` and
`forms/forms.card.html` for the exact set of states to show.

## Done when
- All six components match their `.jsx` styling and expose the `.d.ts` prop names/values.
- The preview page shows every variant; primary button glow, sharp stamps/tags, and the inset
  search well all read correctly.

**Commit:** `feat: core primitives (button, stamp, tag, code chip, search, sort)`.

➡️ Next: `04_entry_card_and_voting.md`.
