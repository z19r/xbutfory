# Ralph-loop prompt — Curated X list with admin-approved suggestions

Feed this file to `/ralph-loop`. It is self-contained; the companion planning
docs (`PRD.md`, `architecture.md`, `task_list.md`) live beside it in
`approval_flow/`.

---

## Goal

Turn the free-text **X** in "*X but for Y*" into a **curated, admin-managed
vocabulary**. On the submit form the X becomes a dropdown of approved products
plus a **"Suggest New…"** option (with a note that suggestions need editor
approval). Filing a suggestion emails the admins; the admin queue lets an editor
**approve** or **reject** each one, and every verdict emails the original
suggester (OP). Build it the way this repo already builds things.

## Ground rules (this repo — non-negotiable)

- **Stack:** Rails 8, Hotwire (Turbo + Stimulus — no React), **ViewComponent**
  for UI primitives, plain token-driven CSS (Propshaft, no Tailwind), importmap.
  Read `CLAUDE.md` before touching UI.
- **Mailers:** dispatch with `deliver_later`. The app runs **Sidekiq**
  (`config.active_job.queue_adapter = :sidekiq`). Model new mailers on
  `app/mailers/user_mailer.rb` + `milestone_mailer.rb`.
- **Admin gating:** `require_admin` from
  `app/controllers/concerns/authentication.rb` (non-admin → 404, not 403).
  Clone `app/controllers/admin/submissions_controller.rb` and its view
  `app/views/admin/submissions/index.html.erb` for the new queue.
- **Services:** small single-responsibility objects in `app/services/`, style
  after `MilestoneNotifier` / `FeaturedPurchase`.
- **Brand law (`CLAUDE.md` §3):** mono UPPERCASE labels, `var(--token)` only (no
  new hex/fonts/colors), ink rules not boxes, sharp stamps / soft inputs,
  mechanical `.15–.18s` motion, `prefers-reduced-motion` respected, the sacred
  `X but for Y` formula never broken.
- **The X field stays a `string` on `Entry`** (`db/schema.rb`) — keep
  `Entry#title`/`Entry.search` working. New `product_id` is purely additive.

## TDD (mandatory)

Minitest, test-first, RED → GREEN → refactor. Test dirs already exist
(`test/models`, `test/services`, `test/mailers`, `test/controllers/admin`,
`test/components`, `test/fixtures`). Run with `bin/rails test`. Assert enqueued
mail with `assert_enqueued_email_with`. **Commit after each checklist item** with
the conventional messages in `task_list.md`.

Do **not** run raw `bin/rails server`; the dev stack is `bin/dev` / `just dev`
(overmind) per house standards.

---

## TODO checklist (ordered — each item independently checkable)

> **PREFLIGHT (do first, don't skip):** read `app/models/product.rb`,
> `app/models/entry.rb`, `db/schema.rb`. The `Product` model, its **AASM**
> approval lifecycle (`pending → approved`/`rejected`, `approve!`/`reject!`,
> `approved_at`), the `.pending/.approved/.rejected` scopes, `Product.for_name`,
> the `entries.product_id` FK, and the branded mailer layout + `EmailHelper`
> **already exist**. Do NOT recreate any of them. This flow adds attribution +
> wiring on top.

- [ ] **1. Attribution + dropdown scope.** Migration adds nullable
  `suggested_by_id` (FK → users) to `products`. `Product`:
  `belongs_to :suggested_by, class_name: 'User', optional: true` +
  `scope :for_dropdown, -> { approved.alphabetical }`. Add `products.yml`
  (all `state: approved`). Extend `product_test`. GREEN.
- [ ] **2. `ProductSuggestionMailer`** — `submitted(product:)` (→ admins),
  `approved(product:)` + `rejected(product:)` (→ `product.suggested_by.email`).
  Use the existing `mailer` layout + `EmailHelper` (branded, NOT bare `<p>`).
  Mailer test GREEN.
- [ ] **3. `Products::Suggestion` service** — `Product.for_name(name)` (dedupes,
  creates `pending`); if already `approved`, return it; else set `suggested_by`
  + enqueue `ProductSuggestionMailer.submitted`. Test GREEN.
- [ ] **4. Verdict side-effects on the AASM events.** Add `after` callbacks to
  the existing `approve`/`reject` events on `Product`: approve releases gated
  listings (`entries.pending.find_each(&:approve!)`) and emails the OP; reject
  emails the OP (guard on `suggested_by`, like `MilestoneNotifier`). Extend
  `product_test`. GREEN.
- [ ] **5. Admin queue controller + routes.** `Admin::ProductsController`
  (`require_admin`, index filter/counts, `approve`/`reject` members that fire
  `product.approve!`/`reject!`) in the `namespace :admin` block. Test GREEN.
- [ ] **6. Admin queue view** cloning the submissions queue markup
  (`l-manage__*` / `c-sub__*`), `ButtonComponent`, token CSS. Pending products
  with Approve/Reject.
- [ ] **7. Submit controller** — `#new` exposes
  `@products = Product.for_dropdown`; `#create` resolves X from the dropdown
  (set `entry.x` + `entry.product`) or hands "Suggest New" to
  `Products::Suggestion`. A pending X forces the entry `pending` regardless of
  the first-post trust rule. Empty suggestion → form error. Test GREEN.
- [ ] **8. Submit view + Stimulus.** Replace `f.text_field :x` with a `<select>`
  of approved X's + "Suggest New…" sentinel + revealed input + mono approval
  note. New `suggest_product_controller.js` reveals/focuses and relays the value
  to `submit_preview_controller`. Reduced-motion safe, ≥44px targets.
- [ ] **9. Green suite.** Approving an X frees its pending entries end-to-end.
  Full `bin/rails test` green; new views/CSS use `var(--token)` only.

## Completion promise

When **every** checklist item is done, the full minitest suite passes
(`bin/rails test` green), and new UI is token-only + brand-law compliant, output
exactly:

```
<promise>APPROVAL FLOW COMPLETE</promise>
```

Do not emit the promise while any test is red or any checklist item is
unchecked. If blocked, state the blocker and stop — do not fake completion.
