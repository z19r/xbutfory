# Task list — Curated X + suggestion approval flow

Ordered, test-first (minitest — RED → GREEN → refactor). **Commit after each
task** with the suggested conventional message. This mirrors `PROMPT.md`'s
checklist 1:1. Read `architecture.md` for the shape of each piece; do not
hardcode hex/font values (brand law, `CLAUDE.md` §3).

Run tests with `bin/rails test` (or `rtk rake test`). Dev stack is
`bin/dev` / `just dev` via overmind — never raw `bin/rails server`.

---

### 1. `Product` model + migration
- **Test first:** `test/models/product_test.rb` — presence/uniqueness (case-
  insensitive `name`), `status` enum defaults `approved`, slug from name,
  `for_dropdown` returns approved-only sorted by name.
- Migration `create_products` (see column table in `architecture.md`), unique
  `LOWER(name)` + `slug` indexes, `index_on_status`. `app/models/product.rb`
  cloning `Entry`'s enum/slug idioms.
- `test/fixtures/products.yml` (a couple approved, one pending w/ `suggested_by`).
- **Commit:** `feat: add Product model for curated X vocabulary`

### 2. Link Entry → Product (additive)
- **Test first:** extend `test/models/entry_test.rb` — optional `belongs_to
  :product`; `entry.x` still drives `title`.
- Migration adding nullable `product_id` + FK/index to `entries`.
  `belongs_to :product, optional: true` on `Entry`. **No** change to `x`.
- **Commit:** `feat: link entries to their curated X product`

### 3. `ProductSuggestionMailer` (3 methods)
- **Test first:** `test/mailers/product_suggestion_mailer_test.rb` — recipients
  (`submitted` → admins; `approved`/`denied` → `suggested_by.email`), subjects,
  bodies mention the product name.
- Mailer + 3 HTML views under `app/views/product_suggestion_mailer/`, deadpan
  copy, shared `mailer` layout. Model conventions after `UserMailer`.
- **Commit:** `feat: add product suggestion mailer (submit/approve/deny)`

### 4. `Products::Suggestion` service
- **Test first:** `test/services/products/suggestion_test.rb` — dedupes on
  `LOWER(name)`, creates `pending` w/ `suggested_by`, enqueues admin mail
  (`assert_enqueued_email_with` / `deliver_later`).
- `app/services/products/suggestion.rb` (style after `MilestoneNotifier`).
- **Commit:** `feat: add Products::Suggestion service`

### 5. `Products::Decision` service
- **Test first:** `test/services/products/decision_test.rb` — `approve!` flips
  status + `decided_at`, releases matching pending entries, enqueues OP
  approved-mail; `deny!` flips + enqueues denied-mail; guards missing
  `suggested_by`.
- `app/services/products/decision.rb`.
- **Commit:** `feat: add Products::Decision approve/deny service`

### 6. Admin CRUD + verdict controller
- **Test first:** `test/controllers/admin/products_controller_test.rb` —
  `require_admin` (non-admin → 404), index filter/counts, `approve`/`deny`
  member actions call the service and redirect with a notice.
- Add `resources :products do member { patch :approve; patch :deny } end` to the
  `namespace :admin` block. `Admin::ProductsController` cloning
  `Admin::SubmissionsController`.
- **Commit:** `feat: add admin products queue with approve/deny`

### 7. Admin queue view
- **Test first (or system-ish):** assert index renders pending products with
  Approve/Deny controls.
- `app/views/admin/products/index.html.erb` (+ minimal `new/edit`), cloning
  `l-manage__*` / `c-sub__*` markup from the submissions queue; `ButtonComponent`
  reused; token-driven scoped CSS.
- **Commit:** `feat: build admin product moderation queue view`

### 8. Submit controller: dropdown + suggest-new
- **Test first:** extend `test/controllers/submissions_controller_test.rb` —
  (a) choosing an approved product sets `entry.x` + `entry.product`;
  (b) suggest-new creates a `pending` Product + `pending` Entry + enqueues admin
  mail; (c) empty/garbage suggestion is rejected with a form error.
- `#new` exposes `@products = Product.for_dropdown`; `#create` resolves X via the
  sentinel + `Products::Suggestion`. Keep tier/payment branch intact.
- **Commit:** `feat: resolve submit X via curated dropdown + suggestions`

### 9. Submit view + Stimulus
- Swap `f.text_field :x` → `f.select :x` from `@products` + `"Suggest New…"`
  sentinel; add hidden suggestion input + mono approval note.
- `app/javascript/controllers/suggest_product_controller.js` — reveal/hide on
  sentinel, focus input, relay value to `submit-preview`. Compose on the existing
  `data-controller` root. Reduced-motion safe, ≥44px targets.
- **Commit:** `feat: curated X dropdown + suggest-new field on submit form`

### 10. Release-on-approve wiring + green-suite pass
- Confirm task-5 release logic is exercised end-to-end (pending entry goes live
  when its X is approved) and covered by a test.
- Full `bin/rails test` green; grep new views/CSS for stray hex/font literals
  (must be `var(--token)` only).
- **Commit:** `test: cover suggestion approval release flow`

---

## Suggested commit sequence (summary)
1. `feat: add Product model for curated X vocabulary`
2. `feat: link entries to their curated X product`
3. `feat: add product suggestion mailer (submit/approve/deny)`
4. `feat: add Products::Suggestion service`
5. `feat: add Products::Decision approve/deny service`
6. `feat: add admin products queue with approve/deny`
7. `feat: build admin product moderation queue view`
8. `feat: resolve submit X via curated dropdown + suggestions`
9. `feat: curated X dropdown + suggest-new field on submit form`
10. `test: cover suggestion approval release flow`
