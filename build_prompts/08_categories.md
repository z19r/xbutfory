# Build Prompt 08 — Categories

> **Session goal:** the browse-by-category tile grid. Clicking a tile filters the feed.

## Context
Read `CLAUDE.md`. Ground truth: open `design_system/ui_kits/directory/categories.html`.
Reference: `CategoriesScreen.jsx` and the `CategoryTile` contract
(`design_system/components/cards/CategoryTile.{jsx,d.ts,prompt.md}`).

## The 7 categories (keys → hues are `--cat-*` tokens; do not invent more)
`dating`, `crm`, `discovery`, `saas`, `payments`, `social`, `logistics`. Each maps to a muted
hue used **only** on the tile's chip/dot and its tags.

## `CategoryTileComponent` contract
Params: `name` (full, e.g. "Dating & Hookups"), `short` (code, e.g. "DATING"), `count` (entries),
`sample` (joined sample entries for the subline, e.g. "Tinder · Hinge · Grindr"), `category`
(key → hue), `color` (override). Clickable → filters the feed to that category.
Tile styling: a soft card (`--shadow-tile`, `--radius-card`) with a hue chip/dot, the name in
Newsreader 600 (`--type-tile-title`, 19px), the short code in mono, count + sample sublines.

## Build the categories view (`GET /categories` → `CategoriesController#index`)
- A responsive **grid** of `CategoryTile`s (mirror `categories.html`'s columns/gaps).
- Section header `BROWSE BY CATEGORY` with the ink rule.
- Clicking a tile routes to the home feed filtered to that category
  (`/?category=dating`), reusing the home filter logic from prompt 05. Keep it a real,
  shareable URL; enhance with Turbo.
- Counts/samples come from the data (stub now, records after prompt 09) — truthful, not invented.

## Done when
- `/categories` matches `categories.html`: the hue-chipped tile grid, correct counts/samples,
  and tiles that filter the feed on click.

**Commit:** `feat: categories tile grid`.

➡️ Next: `09_data_model_and_seeds.md`.
