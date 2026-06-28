# ZTODO — Questions & Design Requests for the User

> Append-only running list of things that block me pending a human decision or a missing
> design. I keep working everything else in `TODO.md`; items here are skipped until you
> answer. Newest at the bottom of each section.

## 🎨 Designs needed (no design system screens exist for these)

- [ ] **Auth / accounts** — you said you'll supply designs shortly. Needed for:
  - Sign in
  - Create account
  - Account settings (logged-in)
  - Logged-in nav/session state (what the utility bar shows when signed in)
  - "Manage your submissions" (edit / withdraw a listing)
  - Decision: do submissions get tied to accounts, or stay anonymous (`submitter` string)?
- [ ] **Submit → Featured tier payment ($1.99)** — Stripe is the eventual target but I'm
  stubbing it. When ready: do you want Stripe Checkout (hosted redirect) or Elements
  (embedded)? Any product/price already created in Stripe?

## ❓ Decisions I made for you (override any of these)

> You said #2 and #3 below weren't clear, so I picked the design-faithful option and kept
> moving. Reply if you want it changed.

- [ ] **(#2) Category tile sample text** — I'm showing the category's *source apps* (the top
  entries' product names, e.g. "Tinder · Hinge · Grindr"), matching the design. The old
  behavior showed a live "X but for Y" string. Override → tell me which.
- [ ] **(#3) Category filtering** — clicking a category tile now filters the **home feed**
  with a "filtered: NAME ✕" chip (this is what the prototype does), instead of the separate
  category sub-page we'd built. Override → tell me if you want the standalone sub-page back.

## 🔎 Values with no design reference (need sign-off; sensible defaults applied)

- [ ] **Submit 2-col gutter** — design shows a single 600px column, so the old 2-col gutter
  has no reference; using `--space-12` (30px) only where a gap is still needed.
- [ ] **`--focus-ring` alpha** — no design spec for input focus rings; using
  `rgba(201,59,27,0.20)` (accent at 20%). OK?
- [ ] **EmptyState ghost formula color** — the JSX renders the empty-state formula in full
  `--ink`; our Rails component fades it as a ghost placeholder (`--placeholder`). Keep the
  faded ghost, or match JSX and render it ink-solid?

## 🚀 Deploy / infra (blocked on your explicit go-ahead per your standing rule)

- [ ] Nothing requested yet. I will NOT push to main or deploy anywhere without you saying so.
