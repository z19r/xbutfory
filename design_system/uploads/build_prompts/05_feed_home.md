# Build Prompt 05 — Home / "Latest" Feed

> **Session goal:** assemble the home screen — the editorial hero + stat block, the live
> search filter, the sort toggle, tab switching, the sponsored placements in-feed, and the
> empty state. Uses stub data now; prompt 09 swaps in real records.

## Context
Read `CLAUDE.md`. Ground truth: open `design_system/ui_kits/directory/index.html` — its
vanilla JS does tab/sort/vote/search and the empty-state drop. Reference composition:
`design_system/ui_kits/directory/FeedScreen.jsx`. Components already built: Masthead, NavTabs,
SortToggle, SearchInput, EntryCard, Stamp, Tag, CodeChip, Button.

## Build the home view (`PagesController#home`, `app/views/pages/home.html.erb`)

1. **Hero + stat block** (between nav and feed): the serif editorial dek and a **stat block** —
   a giant Newsreader 700 number (`--type-stat`, line-height .82) with a mono label beneath
   (e.g. `IN THE INDEX`), plus "N new today" furniture. Include a `CodeChip` rendering
   `X but for Y` in the intro copy. Numbers are editorial furniture — truthful to the data.

2. **Section header** — `THE SUBMISSIONS` (or "Latest") mono label with a 1.5–2px ink rule under it.

3. **The feed** — a stack of `EntryCard`s, `--feed-gap` (16px) between them. Inject sponsors:
   - exactly **one `:pinned`** card at the very top of the feed,
   - **one `:spotlight`** card mid-feed.
   Stub the data as a Ruby array of hashes for now (prompt 09 replaces with records).

4. **Empty state** (`EmptyStateComponent`, see `design_system/components/feedback/EmptyState.*`):
   shown when search matches nothing — a deadpan line that keeps the `X but for Y` bit. Build the
   component here if not already.

## Interactions (Stimulus controllers)
- **`search_filter_controller`** — typing in `SearchInput` live-filters the visible cards
  (client-side over the rendered feed is fine for the prototype; match by x/y/description/category).
  When nothing matches, swap the feed for the empty state. Debounce ~120ms.
- **`sort_controller`** — `SortToggle` segments (New / Top / Random) reorder the feed. "Random"
  is the easter-egg "scramble the Y-values" energy — reorder, don't fabricate.
- **`tabs` (NavTabs)** — `Latest / Trending / Top` switch the active underline and the feed's
  sort/filter. `Categories` routes to the categories screen (prompt 08). Keep these as real URLs
  where possible (`?tab=trending`) so they're shareable + Turbo-friendly; enhance with Stimulus.
- Voting already works from prompt 04.

## Theme switch (optional but on-brand)
The directory "ships a theme switch" — expose the five curated `--accent` options
(vermilion / teal / violet / ochre / ink) as a small control that sets `--accent` on `:root`.
Persist the choice (cookie or `localStorage`). One-line hue swap, nothing else changes.

## Done when
- Home matches `index.html`: hero, stat block, section rule, feed with one pinned + one spotlight
  sponsor, working search→empty-state, sort reorder, tab switching, and live voting.

**Commit:** `feat: home/latest feed with search, sort, tabs, sponsors, empty state`.

➡️ Next: `06_detail.md` (or jump to `09_data_model_and_seeds.md` to back this with real records).
