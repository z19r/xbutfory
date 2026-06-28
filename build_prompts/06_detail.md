# Build Prompt 06 — Entry Detail

> **Session goal:** the single-entry detail screen — vote column, big serif title, the pitch /
> "why it works" prose, and the formula meta-card.

## Context
Read `CLAUDE.md`. Ground truth: open `design_system/ui_kits/directory/detail.html`. Reference:
`DetailScreen.jsx`. Reuses Masthead, NavTabs, Tag, Button, the vote box, and CodeChip.

## Route & controller
`GET /entries/:id` → `EntriesController#show`. Until prompt 09 lands real models, render from
the same stub data source used on the home feed (look the entry up by id/slug). A "back" link
(`← back to the index`) returns to home.

## Layout (inside the 1040px column)
- **Vote column** (left) — the same vote box treatment as the card, scaled up; this is the
  primary action on the page. Reuse the `vote_controller`.
- **Title** — the full `X` + italic *" but for "* + `Y` in Newsreader 700 at a larger display
  size than the card title; optional `Stamp`. The category `Tag` sits near it.
- **Pitch / "why it works"** — the longer editorial prose in `--text-body-soft` (Outfit 300,
  generous line-height). This is where the deadpan voice gets a little more room — still
  sentence case, still committed to the bit, no winking.
- **Formula meta-card** — a small card restating the formula with a `CodeChip` (`X but for Y`),
  the submitter handle, timestamp, vote count, and a primary **`visit site →`** Button.
- Meta furniture in Space Mono (submitter, `submitted {ago}`, issue line).

## States / interactions
- Voting works (shared controller); voted state matches the card.
- Hover/press states per `CLAUDE.md` (links underline, button lifts `-1px`).
- `prefers-reduced-motion` respected.

## Done when
- `/entries/:id` matches `detail.html`: vote column, big formula title, prose, formula meta-card,
  working vote + visit, and a working back link.

**Commit:** `feat: entry detail screen`.

➡️ Next: `07_submit.md`.
