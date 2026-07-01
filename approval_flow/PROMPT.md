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
**approve** or **deny** each one, and every verdict emails the original
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

- [ ] **1. Product model + migration.** `Product` with `name` (unique,
  case-insensitive), `slug`, `status` enum (`approved`/`pending`/`denied`,
  string-backed like `Entry#status`, default `approved`), optional
  `belongs_to :suggested_by, class_name: 'User'`, `decided_at`. `for_dropdown`
  scope (approved, sorted). Model test + `products.yml` fixture. GREEN.
- [ ] **2. Entry ↔ Product link.** Nullable `product_id` + FK on `entries`,
  `belongs_to :product, optional: true`. `entry.x` unchanged. Test GREEN.
- [ ] **3. `ProductSuggestionMailer`** with `submitted(product:)` (→ admins),
  `approved(product:)` and `denied(product:)` (→ `product.suggested_by.email`).
  HTML views + deadpan copy. Mailer test GREEN.
- [ ] **4. `Products::Suggestion` service** — find-or-create pending product
  (dedupe on `LOWER(name)`), attribute to OP, enqueue admin mail. Test GREEN.
- [ ] **5. `Products::Decision` service** — `approve!` / `deny!` flip status +
  `decided_at`; approve releases matching pending entries to live; each enqueues
  the OP mail (guard missing `suggested_by`). Test GREEN.
- [ ] **6. Admin queue controller + routes.** `Admin::ProductsController`
  (`require_admin`, index filter/counts, `approve`/`deny` members) added to the
  `namespace :admin` block. Controller test GREEN.
- [ ] **7. Admin queue view** cloning the submissions queue markup
  (`l-manage__*` / `c-sub__*`), `ButtonComponent`, token-driven CSS. Renders
  pending products with Approve/Deny.
- [ ] **8. Submit controller** — `#new` exposes `@products = Product.for_dropdown`;
  `#create` resolves X from the dropdown or hands "Suggest New" off to
  `Products::Suggestion`, creating the entry as `pending` until approved. Empty
  suggestion → form error. Controller test GREEN.
- [ ] **9. Submit view + Stimulus.** Replace `f.text_field :x` with a `<select>`
  + "Suggest New…" sentinel + revealed suggestion input + mono approval note.
  New `suggest_product_controller.js` reveals/hides, focuses, and relays the
  value to `submit_preview_controller`. Reduced-motion safe, ≥44px targets.
- [ ] **10. Release-on-approve + green suite.** End-to-end: approving an X frees
  its pending entries. Full `bin/rails test` green; new views/CSS use
  `var(--token)` only (grep for stray hex/fonts).

## Completion promise

When **every** checklist item is done, the full minitest suite passes
(`bin/rails test` green), and new UI is token-only + brand-law compliant, output
exactly:

```
<promise>APPROVAL FLOW COMPLETE</promise>
```

Do not emit the promise while any test is red or any checklist item is
unchecked. If blocked, state the blocker and stop — do not fake completion.
