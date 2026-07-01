# Architecture — Curated X + suggestion approval flow

All names below reference the **actual** files/patterns in this repo. The design
deliberately clones the existing submissions-moderation shape so it reads as
native to the app.

---

## 1. Data model

### `Product` (new) — the canonical X vocabulary + suggestion queue

One table serves double duty: it *is* the dropdown (rows where
`status = 'approved'`) and it *is* the suggestion inbox (rows where
`status = 'pending'`).

Migration (`db/migrate/…_create_products.rb`):

| column          | type      | notes                                                    |
|-----------------|-----------|----------------------------------------------------------|
| `name`          | string    | `null: false`; canonical X (e.g. "Notion")               |
| `slug`          | string    | `null: false`; `parameterize`d, unique index             |
| `status`        | string    | `null: false, default: 'approved'`                       |
| `suggested_by_id` | bigint  | FK → `users`, **nullable** (seeded/admin-created rows)    |
| `decided_at`    | datetime  | nullable; stamped on approve/deny                        |
| timestamps      |           |                                                          |

Indexes: unique on `slug`, unique on `LOWER(name)` (mirrors the
`index_users_on_lower_email` expression index already in `db/schema.rb`),
plus `index_products_on_status`.

`app/models/product.rb`:

```ruby
class Product < ApplicationRecord
  belongs_to :suggested_by, class_name: 'User', optional: true

  # String-backed enum, matching Entry#status style (app/models/entry.rb).
  enum :status,
       { approved: 'approved', pending: 'pending', denied: 'denied' },
       default: 'approved'

  validates :name, :slug, presence: true
  validates :slug, uniqueness: true
  validates :name, uniqueness: { case_sensitive: false }

  before_validation :generate_slug, on: :create

  scope :for_dropdown, -> { approved.order(:name) }

  private

  def generate_slug
    self.slug = name.to_s.parameterize if slug.blank? && name.present?
  end
end
```

Note the enum/slug/`before_validation` mirrors `Entry` exactly so future readers
recognize the pattern.

### `Entry` (existing) — one added association, no column change

`entry.x` stays a `string` (schema unchanged; keeps `Entry#title` and search
working). We add a **non-breaking** link so an entry knows which product it
points at and stays hidden while that product is pending:

- Optional `belongs_to :product` via a nullable `product_id` (second small
  migration). `entry.x` is still the source of truth for display; `product_id`
  is the referential handle used to release pending entries on approval.
- Reuse the existing `Entry#status` enum. A submission gated on a pending X is
  created with `status: 'pending'` (a value that already exists) so it's kept out
  of the public feed by the existing `feed_query`/scopes — no new state needed.

> Decision: **do not** denormalize X onto Product-only. Keeping `entry.x` avoids
> touching `Entry#title`, `Entry.search`, slug generation, and every view that
> renders `entry.x`. `product_id` is purely additive.

---

## 2. Routes (`config/routes.rb`)

Extend the existing `namespace :admin` block (which already holds
`submissions`):

```ruby
namespace :admin do
  root to: 'submissions#index'
  resources :submissions, only: [:index] do
    member { patch :approve; patch :request_changes }
  end
  resources :products do            # admin CRUD for the vocabulary
    member { patch :approve; patch :deny }   # suggestion verdicts
  end
end
```

`approve`/`deny` mirror the submissions queue's `approve`/`request_changes`
member routes 1:1.

No new public routes are required — the dropdown and suggest-new field are part
of the existing `submissions#new` / `submissions#create` flow.

---

## 3. Controllers

### `Admin::ProductsController` (new) — clone of `Admin::SubmissionsController`

Same skeleton: `before_action :require_admin` (from `Authentication`), a
`STATUSES`/filter list, `@counts` via `index_with`, and `button_to` verdicts.

```ruby
class Admin::ProductsController < ApplicationController
  before_action :require_admin

  def index   # queue of pending + browse approved/denied, filtered like submissions
  def new/create/edit/update/destroy   # admin-owned CRUD for approved vocabulary

  def approve # Products::Decision.approve!(product) → status: approved, decided_at
  def deny    # Products::Decision.deny!(product)    → status: denied,   decided_at
end
```

Redirects use `notice:` in the deadpan editorial voice, matching
`Admin::SubmissionsController` ("Approved — …", "Sent … back for edits.").

### `SubmissionsController` (existing) — extended, not rewritten

- `#new`: expose `@products = Product.for_dropdown` for the dropdown, alongside
  the existing `@categories`.
- `#create`: before building the entry, resolve X:
  - **existing approved product** chosen → set `entry.x` + `entry.product`.
  - **"Suggest New…"** chosen with a typed name → hand off to
    `Products::Suggestion` (below), attach the returned pending product, and
    create the entry as `status: 'pending'`.
- Keep the current tier / payment branching intact; the suggestion path is
  orthogonal to Featured checkout.

---

## 4. Service objects (`app/services/` — house pattern)

Follow the existing service style (`MilestoneNotifier`, `FeaturedPurchase`):
small, single-responsibility, `self.call`-ish class methods, mailers fired with
`deliver_later`.

### `Products::Suggestion`
`create(name:, user:)` → finds-or-creates a `Product` (dedupe on `LOWER(name)`;
if it already exists approved, just return it; if pending, reuse it), sets
`status: pending` + `suggested_by: user`, then
`ProductSuggestionMailer.submitted(product:).deliver_later` to notify admins.

### `Products::Decision`
`approve!(product)` / `deny!(product)`:
- flips status, stamps `decided_at`.
- on approve: release matching pending entries
  (`Entry.pending.where(product: product).update_all(status: 'live')` — or route
  them into the normal moderation queue; pick one and state it in the entry
  fixture tests).
- emails the OP: `ProductSuggestionMailer.approved(product:)` /
  `.denied(product:)` via `deliver_later`, guarded like `MilestoneNotifier`
  (`suggested_by.present?`).

---

## 5. Mailer — `ProductSuggestionMailer` (new)

Mirror `UserMailer` / `MilestoneMailer` conventions (inherit
`ApplicationMailer`, subject in headline Title Case, HTML view under
`app/views/product_suggestion_mailer/`, wrapped by the shared `mailer` layout).
Three touchpoints:

| method                  | to                     | trigger                          |
|-------------------------|------------------------|----------------------------------|
| `submitted(product:)`   | admin(s) (`User.where(admin: true)`) | R4 — new suggestion filed        |
| `approved(product:)`    | `product.suggested_by.email`         | R5/R6 — editor approved          |
| `denied(product:)`      | `product.suggested_by.email`         | R5/R6 — editor denied            |

All dispatched `deliver_later` → Sidekiq (`config.active_job.queue_adapter =
:sidekiq`). Copy is deadpan editorial (sentence-case body, one optional leading
emoji only if a transient tone calls for it — otherwise none, per brand law).

---

## 6. ViewComponents & views (brand law: `CLAUDE.md` §3, `design_system/`)

- **Submit form** (`app/views/submissions/new.html.erb`): swap the
  `f.text_field :x` for `f.select :x` populated from `@products`, appended with a
  `"__suggest__"` sentinel option labeled **"Suggest New…"**. A hidden text
  field (`x_suggestion`) and the mono approval note live in a
  `data-approval-target` block, revealed by the Stimulus controller below.
- Reuse existing primitives — `FormFieldComponent` for the suggestion input's
  label/hint/error styling; `TagComponent`/`StampComponent` untouched.
- **Admin queue** (`app/views/admin/products/index.html.erb`): clone the
  `l-manage__*` / `c-sub__*` structure from
  `app/views/admin/submissions/index.html.erb` — status pills, `button_to`
  Approve, a `details`-wrapped Deny form. Reuse `ButtonComponent`
  (`variant: "secondary", size: "sm"`).
- CSS: a per-surface stylesheet scoped by a root class (e.g. `.c-suggest`),
  token-driven (`var(--token)` only), sharp marks for the note stamp / soft 8px
  for inputs, mechanical `.15–.18s` transitions, `prefers-reduced-motion`
  killing the reveal transform. **No new color tokens.**

---

## 7. Stimulus — `suggest_product_controller.js` (new)

One responsibility: watch the X `<select>`; when the `"__suggest__"` sentinel is
chosen, reveal the suggestion text input + approval note and focus the input;
otherwise hide them. It also relays the active value (selected option *or* typed
suggestion) to the existing `submit-preview` controller so the live
"X but for Y" chip stays truthful (dispatch an input event / share a target).

Keep `submit_preview_controller.js` and `tier_controller.js` behavior intact;
the new controller is additive and composes on the same
`data-controller="submit-preview tier"` root (add `suggest-product`).

---

## 8. Accessibility & motion

- Suggest-new input has a real `<label>`; reveal is not motion-gated for
  screen readers (toggle `hidden`, not just opacity).
- Hit targets ≥ 44px (`CLAUDE.md` §4).
- Approve/Deny are independent `button_to`/form targets (no nested interactive
  ambiguity), matching the submissions queue.
- Honor `prefers-reduced-motion` (kill the reveal transform + any pulse).

---

## 9. Test surface (minitest — dirs already exist)

- `test/models/product_test.rb` — validations, enum, slug, `for_dropdown`.
- `test/services/products/suggestion_test.rb`,
  `test/services/products/decision_test.rb` — create/approve/deny + entry release.
- `test/mailers/product_suggestion_mailer_test.rb` — 3 methods, recipients,
  subjects (assert `deliver_later` enqueues).
- `test/controllers/admin/products_controller_test.rb` — `require_admin` gate,
  index filter, approve/deny.
- `test/controllers/submissions_controller_test.rb` (extend) — dropdown path,
  suggest-new path creates pending product + entry + enqueues admin mail.
- `test/components/…` — optional component test for the suggestion field render.
- Fixtures: add `test/fixtures/products.yml`; an admin user already exists via
  the `users` fixtures (`admin: true`).
