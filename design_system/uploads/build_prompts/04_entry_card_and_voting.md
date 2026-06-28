# Build Prompt 04 — EntryCard & Voting

> **Session goal:** the hero of the whole system — the directory entry row — including both
> sponsored treatments, plus the live upvote interaction as a Stimulus controller.

## Context
Read `CLAUDE.md`. Contract: `design_system/components/cards/EntryCard.{jsx,d.ts,prompt.md}`
and `cards/sponsored.card.html` (open it — ground truth for the two paid formats). EntryCard
composes `Stamp` and `Tag` (built in prompt 03) — reuse those components, don't re-style them.

## `EntryCardComponent` contract (from EntryCard.d.ts)
Params (same names): `index` (e.g. `"#001"`, omit to hide), **`x`**, **`y`** (required — the
formula halves), `votes`, `voted` (bool), `description` (2-line clamp), `category` (one of the 7),
`category_label`, `submitter` (e.g. `@apt_4b`), `ago`, `stamp` (`:NEW | :HOT`),
`sponsored` (`:pinned | :spotlight`), `url`.

## Anatomy (left → right)
- **Vote box** (left, 64px wide): caret `▲`, the count in **Newsreader 700 / 21px**, `VOTES` micro
  label. Resting = inset shadow + faint caret/number. **Voted = accent border, accent caret +
  number, no inset.** Radius `--radius-vote` (9px). This is its own `<button>` — an **independent
  click target**.
- **Body**: the headline `{x}` + italic *" but for "* (`--text-soft`, serif italic, 0.8em) + `{y}`,
  Newsreader 700 / `--type-card-title` (21px); optional index number before it; optional `Stamp`
  after it. Then the 2-line clamped description (Outfit 300). Then the meta footer: `Tag` ·
  `submitted by {submitter} · {ago}` · right-aligned **`visit site →`** link (accent; its own
  click target).
- The **whole card is one click target** → entry detail. Vote button and visit link
  **stop propagation** (in Hotwire: separate Stimulus actions / `data-action` on the inner
  elements, or a Turbo Frame link, so clicking them doesn't trigger the card's navigation).

## Card styling
Near-white `--surface-card`, 1px `--border-card`, `--radius-card` (10px), the two-layer
**warm-brown** `--shadow-card`. Hover: border → `--border-card-hover`, shadow →
`--shadow-card-hover`, lift `translateY(-2px)` (`--lift`). Transitions `.18s`.

## Sponsored treatments (the only magenta in the system — `--sponsor` `#E11D8F`)
- **`:pinned`** — a **solid hot-magenta ribbon** across the top (`★ PINNED SPONSOR` /
  `FEATURED PLACEMENT`), magenta 1.5px border, `--shadow-pin` glow, faint `--sponsor-tint` wash.
  One slot, top of feed. Index number hidden when pinned.
- **`:spotlight`** — magenta glow halo `--shadow-sponsor` + magenta border, an inline green
  **`SPONSORED`** tag (`--sponsor-tag`) before the category tag, dropped mid-feed.
- Both tint the `visit site →` link magenta instead of accent.

## Voting interaction (`vote_controller.js`, Stimulus)
- Click the vote box → toggle `voted`, optimistic count bump, snap the box to the accent state
  (no bounce). Persist via a `POST` to the votes endpoint (created in prompt 09 — for now hit a
  stub action or no-op so the optimistic UI works). Re-click un-votes.
- Keyboard accessible (`<button>`, Enter/Space). Hit target ≥ 44px.

## Done when
- A standalone preview renders: a normal card, a `NEW`-stamped card, a voted card, a `:pinned`
  card, and a `:spotlight` card — all matching `sponsored.card.html` / `EntryCard.jsx`.
- Clicking the vote box toggles the accent state without navigating; clicking the card navigates;
  clicking the link opens the URL.

**Commit:** `feat: entry card with sponsored variants and live voting`.

➡️ Next: `05_feed_home.md`.
