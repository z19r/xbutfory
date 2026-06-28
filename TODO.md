# XbutforY — Build Plan & TODO

> Living plan. Reconciles the current Rails implementation against the design system
> (`design_system/ui_kits/directory/*.html`, `design_system/tokens/*.css`,
> `design_system/components/**`). Ordered by priority. Check items off as completed;
> add new findings under the right section. The design files are the ground truth.

**Status legend:** `[ ]` todo · `[~]` in progress · `[x]` done · `[?]` needs a decision

---

## P0 — Foundation (cross-cutting; these silently break everything downstream)

### 0.1 Reconcile phantom CSS tokens  ✅ DONE (commit: P0.1)
Component CSS referenced ~20 undefined custom properties; styles silently dropped. Fixed.
- [x] Added 3 tokens: `--type-section: 42px`, `--type-detail-title: clamp(28px,4.6vw,50px)` (typography.css); `--focus-ring: rgba(201,59,27,0.20)` (colors.css)
- [x] 1:1 renames applied: `--font-serif`→`--font-display`, `--surface-code`→`--surface-sunken`, `--sponsored`→`--sponsor`, `--radius-soft`→`--radius-input`, `--radius-sharp`→`--radius-tag`
- [x] Context-dependent applied per call site: `--text-secondary`→`--text-muted`/`--text-body`/`--text-soft`; `--border-default`→`--border-input`/`--border-rule`/`--placeholder`; `--space-*`→numbered scale per line
- [x] All 10 files swept (submit_form, detail, categories, category_tile, submit_preview, code_chip, tag, stamp, empty_state, search_input)
- [x] Guard test `test/assets/css_token_test.rb` — fails on any undefined `var(--x)`. Passing.
- Note: a few no-design-reference values (focus-ring alpha, ghost-formula color, submit gutter) logged in ZTODO for sign-off.

### 0.2 Reseed category taxonomy to match the design  ✅ DONE (commit: P0.2)
- [x] `db/seeds.rb` categories rewritten to the design 7 with correct `color_token`s
- [x] Curated names + short codes (DATING/CRM/DISCOVER/SAAS/FINANCE/SOCIAL/SERVICES)
- [x] All 19 seeded entries remapped to the 7 categories (every category has ≥1 entry)
- [x] Added `short_code` column to categories; tile uses it (falls back to derived)
- [x] Updated fixtures + tests off the old slugs; reseeded; verified tags + tiles colored
- Note: home shows 5 hues by default because the NSFW dating/crm entries are hidden (correct).

---

## P1 — Screens that are materially incomplete

### 1.1 Detail screen (`/entry/:slug`) — ✅ DONE (commit: P1.1)
All items below complete: model fields added + backfilled; two-column split; formula
meta-card (THE FORMULA / CATEGORY / STATUS ● Live & launched); THE PITCH + WHY IT WORKS;
tagline; 74px vote column with "votes" label; vote button wired to vote_controller (with
configurable active class + milestone toasts); editorial back link; ink Visit button;
.6em italic connector; CodeChip removed; friendly 404. Tests added.

<details><summary>original checklist (all done)</summary>
Reference: `design_system/ui_kits/directory/detail.html`. Files: `app/views/entries/show.html.erb`,
`app/assets/stylesheets/components/detail.css`, `app/controllers/entries_controller.rb`, `app/models/entry.rb`.

Model/data:
- [ ] Add `tagline:string` (italic one-liner under title)
- [ ] Add `why:text` ("why it works" — distinct from `description`/pitch)
- [ ] Add `name:string` (product name, e.g. "Floormate") — used by Visit button + meta
- [ ] (Optional) status concept — for now hardcode "● Live & launched"; revisit if needed
- [ ] Backfill these fields in seeds

Layout & structure:
- [ ] Two-column split: `grid-template-columns: 1fr 220px; gap: 48px`
- [ ] Editorial back link at TOP: mono 10px uppercase `← All entries` (`.back`), not a secondary button
- [ ] Vote column: 74px wide, `2px solid var(--border-rule)` button, `--type` 34px count, "votes" label below
- [ ] Wire vote button to `vote_controller` (currently DEAD — stale `c-entry-card__vote-btn` classes, no Stimulus). Reuse the home card's data-attributes + entry-id.
- [ ] Badge row: category badge + "submitted N ago" timestamp inline
- [ ] Title: `clamp(28px,4.6vw,50px)`, line-height 1.06; italic connector `.conn` at `.6em`, `--text-soft`, weight 400
- [ ] Tagline under title: 17px italic weight 300 `--text-muted`
- [ ] Actions: ink-black Visit button (`background:var(--ink); color:var(--on-dark); padding:11px 22px`) + "by @user"
- [ ] Left col: "THE PITCH" eyebrow label + pitch (17px, line-height 1.8, weight 300) + "WHY IT WORKS" label + why body (15px, line-height 1.7, `--text-body-soft`)
- [ ] Right col: **formula meta-card** (brand-sacred) — `--shadow-card` floating card with: `THE FORMULA` → `X × Y`, `CATEGORY` → full label, `STATUS` → `● Live & launched`
- [ ] Remove the extraneous CodeChip (not in reference)
- [ ] `entries#show` — friendly 404 for bad slug
</details>

### 1.2 Submit screen (`/submit`) — ✅ DONE (commit: P1.2)
Single 600px column; inline dashed draft-well preview; Product name field; optional handle
(defaults to "anonymous"); listing-tier radios with CTA flip (ink "Submit for free →" ↔
accent "Launch for $1.99 →", Stripe stubbed with a payment-coming-soon notice); footer
micro-copy; corrected title/dek/inputs (inset shadow, 9px labels); `tier` column + validation.
Tests added. NOTE: schema migrations require a dev-server restart to clear the column cache.

<details><summary>original checklist (all done)</summary>
Reference: `design_system/ui_kits/directory/submit.html`, `SubmitPreview.prompt.md`.
Files: `app/views/submissions/new.html.erb`, `app/components/submit_preview_component.*`,
`app/components/submit_form_component.*`, `submit_form.css`, `submit_preview.css`,
`submit_preview_controller.js`, `submissions_controller.rb`, `app/models/entry.rb`.

Monetization (biggest gap):
- [ ] Add listing-tier selector: Free (Indexed within 24h) vs Featured — $1.99 (Homepage spot + boost)
- [ ] CTA flips with tier: ink "Submit for free →" ↔ accent "Launch for $1.99 →"
- [ ] Add `tier` (or reuse `sponsored`) column; wire into create. Stimulus controller for the flip (extend `submit_preview` or new `tier_controller`)
- [?] Payment flow for $1.99 — out of scope for now? Decide: stub vs real (Stripe). Likely stub + "coming soon" until decided.

Preview (brand law):
- [ ] Change preview from solid floating card → **dashed draft well**: `border:1.5px dashed var(--placeholder)`, `background:var(--surface-sunken)`, left-aligned, no `--shadow-card`
- [ ] Connector `.conn` `.66em` italic `--text-soft`
- [ ] Fix stale-preview bug: on `render :new` after validation failure, seed preview with submitted x/y

Fields & layout:
- [ ] Single centered 600px column; preview INLINE between Y and Product-name (not sticky sidebar)
- [ ] Add Product name field (+ `name` column from 1.1)
- [ ] Make `submitter` optional (reference: "no account needed"); remove presence validation OR drop the field
- [ ] Footer micro-copy: "no account needed · no spam · takes 30 seconds" (mono 10px `--text-faint`, centered)
- [ ] Title "Submit a Site" (42px serif 700); dek with pricing message ("Free to list… $1.99 buys a featured homepage spot.", weight 300 `--text-muted`)
- [ ] Inputs: add `--shadow-inset`, `1px var(--border-input)`, `--surface-card`, 15px, padding 11px 14px
- [ ] Labels 9px (`--type-micro`)
- [ ] Pitch field: "One-line pitch (optional)", rows=2
</details>

### 1.3 Categories screen (`/categories`) — ✅ DONE (commit: P1.3)
Dateline + live dot; ink-rule heading "Browse by Category" (serif 27px); mono dek; grid
`minmax(240)`/gap 14; tiles use `--shadow-tile`; source-app samples (top product names);
curated short codes. Tiles now filter the HOME feed via a "filtered: NAME ✕" chip (replaced
the separate sub-page). N+1 fixed: `Category.with_stats` computes counts+samples in 2 queries
(logic in the model, not the controller). Tests added.

<details><summary>original checklist (all done)</summary>
Reference: `CategoriesScreen.jsx`, `categories.html`. Files: `app/views/categories/index.html.erb`,
`category_tile_component.*`, `categories.css`, `category_tile.css`, `categories_controller.rb`.
(Depends on 0.2 reseed.)
- [ ] Add issue dateline + live dot eyebrow above heading (`VOL. 01 · ISSUE 26 · JUN 2026`)
- [ ] Heading "Browse by Category" serif `--type-h2` (27px) 700; wrap in block with `border-bottom:2px solid var(--ink)` (brand ink rule)
- [ ] Dek → mono 11px `--text-muted`: "7 categories · pick one to filter the index"
- [ ] Grid `minmax(240px,1fr)`, gap 14px
- [ ] Tile resting shadow `--shadow-tile` (not `--shadow-card`)
- [?] Sample model: source apps (e.g. "Tinder · Hinge · Grindr") per reference, vs current live "X but for Y". Decide. Add `sample_apps` data if going with reference.
- [?] Curated short codes via 0.2 data
- [x] Sample model resolved → source apps (decision #2); filtering routes through the home feed (decision #3)
</details>

---

## P2 — Home polish & sponsored placements

- [x] **REGRESSION FIXED** (commit 647fbef): restored home hero issue dateline + `<i>newly launched</i>` italic; added regression tests.
- [ ] Verify/complete sponsored card variants on the feed: PINNED (ribbon "★ PINNED SPONSOR / Learn more →", `--sponsor-tint` wash, `--shadow-pin`) and SPOTLIGHT (`--shadow-sponsor` magenta glow, SPONSORED tag in `--sponsor-tag`)
- [ ] Confirm pinned sponsor renders at top, spotlight mid-feed (per reference ORG/PINNED/SPOTLIGHT logic)
- [x] Re-verify card category-tag hues after 0.2 reseed
- [x] Wordmark colors (X ink, but accent, for ink, Y accent, . ink)
- [x] Hero dek copy + `<code>` chip
- [x] Sort options Newest/Hot/Top
- [x] Live dots as real circles (utility bar, hero, stats)
- [x] Card meta "by @" + footer aside `--text-faint`

---

## P2 — Cross-cutting features & easter eggs (from prototype_source.dc.html)

- [x] Konami code → fireworks + coupon modal
- [x] Y wordmark easter egg (cycles values)
- [x] After Dark (NSFW) toggle + cookie filter
- [x] Search easter eggs (bacon, xbutfory, nsfw hint)
- [ ] **Theme switcher** — 6 accent options (`#C93B1B/#1B6E80/#6A3D9E/#A07A18/#171008/#E11D8F`). colors.css says the directory "ships a theme switch". Persist via cookie; set `--accent` on `:root`.
- [ ] Rotating search placeholders (cycle every ~3.4s through the prototype's list)
- [ ] Vote milestone toasts (5 → 🏆, 12 → 🔥) in `vote_controller`
- [ ] Footer scramble easter egg (🔮 button scrambles all Y values briefly)
- [ ] Idle toast ("still there?") after inactivity
- [?] RSS — real `/feed.xml` (Atom/RSS of latest entries) vs current toast stub. Decide; if real, add a feeds controller + builder.

---

## P3 — Auth & accounts  [? BLOCKED: no design exists]
No design system screens exist for any of these. Currently stubbed (`/sign_in`, `/sign_up`
redirect with "coming soon" toast). **Needs design direction before building.**
- [?] Sign in
- [?] Create account
- [?] Account settings (logged-in)
- [?] Logged-in view / session UI
- [?] Manage your submissions (edit/withdraw)
- [?] Tie submissions to accounts (currently anonymous `submitter` string)

---

## Engineering quality & guardrails

- [ ] Categories N+1: `categories_controller` / tiles run per-category count + sample queries. Use `counter_cache` (`entries_count` exists on categories) and/or `includes`/grouped counts.
- [ ] Keep business logic OUT of controllers (user rule). Audit `PagesController#sort_entries` — move sort/filter resolution to model scopes / a query object if it grows.
- [ ] Maintain ≥80% test coverage. Add tests for: detail formula card + vote wiring, submit tier flip + create with name/tier, categories reseed hues, theme switcher, token-undefined guard.
- [ ] Accessibility: vote button + visit link as independent targets on detail; 44px hit targets; honor `prefers-reduced-motion` (kill pulse/fireworks/transforms).
- [ ] Commit after each build prompt (conventional, present-tense).

---

## Decisions — RESOLVED (see ZTODO.md for the open/overridable ones)
1. Submit $1.99 featured tier → **stub now** (Stripe later). Record tier, "payment coming soon".
2. Categories sample text → **source apps** (top entries' product names). [override in ZTODO]
3. Category filtering → **filter the home feed via a "filtered: NAME ✕" chip** (prototype
   behavior); drop the separate sub-page. [override in ZTODO]
4. RSS → **real `/feed.xml`** (native Rails) **+** keep the toast.
5. Auth/accounts → **blocked** pending designs (user supplying). Tracked in ZTODO.

> Questions/designs for the user live in **ZTODO.md**. This file is my execution backlog.
