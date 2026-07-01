# Task list — Curated X + suggestion approval flow

Ordered, test-first (minitest — RED → GREEN → refactor). **Commit after each
task** with the suggested conventional message. Mirrors `PROMPT.md` 1:1. Read
`architecture.md` for the shape of each piece; use `var(--token)` only (brand
law, `CLAUDE.md` §3).

Run tests with `bin/rails test` (or `rtk rake test`). Dev stack is `just dev`
via overmind — never raw `bin/rails server`.

> **PREFLIGHT — already built, do not recreate:** `Product` (AASM
> `pending → approved`/`rejected`, `approve!`/`reject!`, `approved_at`,
> `.pending/.approved/.rejected` scopes, `Product.for_name`), the
> `entries.product_id` FK, `Entry belongs_to :product`, the first-post approval
> rule, and the branded `mailer` layout + `EmailHelper`. Read
> `app/models/product.rb`, `app/models/entry.rb`, `db/schema.rb` first.

---

### 1. Attribution + dropdown scope
- **Test first:** extend `test/models/product_test.rb` — `suggested_by`
  association is optional; `Product.for_dropdown` returns only `approved`,
  alphabetical.
- Migration adds nullable `suggested_by_id` (FK → `users`) to `products`.
  `Product`: `belongs_to :suggested_by, class_name: 'User', optional: true` +
  `scope :for_dropdown, -> { approved.alphabetical }`.
- `test/fixtures/products.yml` — a few `state: approved` X's (dropdown data).
- **Commit:** `feat: attribute suggested X's and add the approved-X dropdown scope`

### 2. `ProductSuggestionMailer` (3 methods)
- **Test first:** `test/mailers/product_suggestion_mailer_test.rb` — recipients
  (`submitted` → admins; `approved`/`rejected` → `suggested_by.email`), subjects.
- Mailer + HTML views under `app/views/product_suggestion_mailer/`, using the
  existing `mailer` layout + `EmailHelper` (`email_button`, `email_eyebrow`) —
  branded, HTML-only, deadpan copy, no emoji in body.
- **Commit:** `feat: ProductSuggestionMailer for X suggestion verdicts`

### 3. `Products::Suggestion` service
- **Test first:** `test/services/products/suggestion_test.rb` — dedupes via
  `Product.for_name`; a fresh name creates a `pending` product with
  `suggested_by` and enqueues `submitted`; an already-`approved` name just
  returns it (no mail).
- `app/services/products/suggestion.rb`.
- **Commit:** `feat: Products::Suggestion queues a pending X for review`

### 4. Verdict side-effects on the Product AASM events
- **Test first:** extend `test/models/product_test.rb` — `approve!` releases
  gated listings (`entries.pending` → live via the Entry machine) and enqueues
  `approved`; `reject!` enqueues `rejected`; both guard on `suggested_by`.
- Add `after` callbacks to the existing `approve`/`reject` events on `Product`
  (do NOT add a separate `Products::Decision`).
- **Commit:** `feat: release gated listings and notify the OP on X verdicts`

### 5. Admin queue controller + routes
- **Test first:** `test/controllers/admin/products_controller_test.rb` —
  `require_admin` gate; index lists pending; `approve`/`reject` fire the events.
- `Admin::ProductsController` + `member { patch :approve; patch :reject }` in the
  `namespace :admin` block.
- **Commit:** `feat: admin queue to approve or reject suggested X's`

### 6. Admin queue view
- Clone the submissions-queue markup (`l-manage__*` / `c-sub__*`),
  `ButtonComponent`, token CSS. Pending products with Approve/Reject; show
  `suggested_by`. (Visual — verify by rendering.)
- **Commit:** `feat: admin X-suggestion queue view`

### 7. Submit controller — dropdown + suggest-new
- **Test first:** extend `test/controllers/submissions_controller_test.rb` —
  choosing an approved X sets `entry.product`; "Suggest New" creates a `pending`
  product + a `pending` entry + enqueues `submitted`; a pending X keeps the entry
  pending regardless of author trust; empty suggestion → form error.
- `#new` sets `@products = Product.for_dropdown`; `#create` resolves the X or
  routes to `Products::Suggestion`.
- **Commit:** `feat: submit via the curated X dropdown or suggest a new one`

### 8. Submit view + Stimulus
- Replace `f.text_field :x` with a `<select>` of approved X's + "Suggest New…"
  sentinel + revealed input + mono approval note. `suggest_product_controller.js`
  reveals/focuses and relays to `submit_preview_controller`. Reduced-motion,
  ≥44px targets.
- **Commit:** `feat: X dropdown with inline suggest-new on the submit form`

### 9. Green suite + wrap
- Full `bin/rails test` green; grep new views/CSS for stray hex/fonts.
- Output `<promise>APPROVAL FLOW COMPLETE</promise>`.
- **Commit:** `test: green suite for the X suggestion approval flow`
