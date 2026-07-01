# Architecture — Curated X + suggestion approval flow

All names below reference the **actual** files/patterns in this repo. The design
deliberately clones the existing submissions-moderation shape so it reads as
native to the app.

---

## 1. Data model — MOSTLY ALREADY BUILT

> **Read `app/models/product.rb` and `app/models/entry.rb` first.** The X is
> already a foreign-key table with an AASM approval lifecycle. This flow only
> adds attribution (`suggested_by`) + wiring. **Do not recreate the model, the
> FK, or the approval states.**

### `Product` (EXISTS) — the canonical X vocabulary + suggestion queue

Already shipped (`db/schema.rb`): `products(name, slug, url, state, approved_at,
timestamps)` with a unique `LOWER(name)` index, unique `slug`, and an index on
`state`. `entries.product_id` FK already links each listing to its X.

`Product` already includes **AASM** on the `state` column — this *is* the
suggestion lifecycle, so use it (don't add a `status` enum):

- states: `pending` (initial) → `approved` (event `approve`, stamps
  `approved_at`) / `rejected` (event `reject`).
- scopes: `Product.pending` / `.approved` / `.rejected` (AASM-generated) and
  `.alphabetical`.
- `Product.for_name(name, url:, approved:)` — dedupes on `LOWER(name)`.
- The dropdown *is* `Product.approved`; the suggestion inbox *is*
  `Product.pending`.

**The only Product changes this flow needs:**

1. A migration adding **`suggested_by_id`** (bigint, nullable, FK → `users`) so a
   pending X remembers who proposed it (seed/admin rows leave it null).
2. `belongs_to :suggested_by, class_name: 'User', optional: true`.
3. A `for_dropdown` convenience scope = `approved.alphabetical`.
4. `after` callbacks on the existing `approve`/`reject` events to run the
   side-effects (release entries, email the OP) — see §4.

### `Entry` (EXISTS) — already linked, already stateful

`entry.x` stays a `string` (drives `Entry#title`/search); `entry.product_id` is
the FK. Both already exist. `Entry` already has **AASM** status
(`live/pending/needs_edits/withdrawn`). A submission gated on a *pending* X is
created `status: 'pending'` — an existing state kept out of the feed by the
existing scopes. **No entry migration or model change is needed.**

> Interaction with the first-post rule (`SubmissionsController#create`): a
> submission whose X is a **pending** (just-suggested) product is `pending`
> regardless of author trust. Only when the X is already **approved** does the
> normal trust rule (`current_user.entries.live.exists?`) decide live-vs-pending.

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
    member { patch :approve; patch :reject }  # suggestion verdicts
  end
end
```

`approve`/`reject` map straight onto the Product AASM events `approve!` /
`reject!`, and mirror the submissions queue's `approve`/`request_changes`
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

  def index   # queue of pending + browse approved/rejected, filtered like submissions
  def new/create/edit/update/destroy   # admin-owned CRUD for approved vocabulary

  def approve # product.approve! if product.may_approve?  (AASM event)
  def reject  # product.reject!  if product.may_reject?   (AASM event)
end
```

The verdict actions just fire the **existing AASM events** — the side-effects
(release entries, email the OP) hang off the model callbacks in §4, exactly like
`Vote after_create_commit → MilestoneNotifier`.

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

### `Products::Suggestion` (new)
`create(name:, user:)` → reuse **`Product.for_name(name)`** (dedupes on
`LOWER(name)`, creates in `pending` since `approved:` defaults false). If the
returned product is already `approved`, just return it (nothing to review). If
it's freshly `pending`, set `suggested_by: user` and fire
`ProductSuggestionMailer.submitted(product:).deliver_later` to notify admins.

### Verdicts = the Product AASM events (no `Products::Decision` needed)
The approve/reject side-effects hang off the **existing** `approve`/`reject`
events as `after` callbacks on `Product` (mirrors `Vote after_create_commit →
MilestoneNotifier`):

- `approve` already stamps `approved_at`. Add an `after` that (a) releases
  matching gated listings — `entries.pending.find_each(&:approve!)` (drive the
  Entry state machine; don't `update_all` a status) — and (b) emails the OP:
  `ProductSuggestionMailer.approved(product: self).deliver_later if suggested_by`.
- `reject` adds an `after` emailing `ProductSuggestionMailer.rejected(...)`,
  guarded on `suggested_by`.

Keeping the logic on the events means an admin `product.approve!` from anywhere
(console, future bulk tools) does the right thing.

---

## 5. Mailer — `ProductSuggestionMailer` (new)

Mirror `UserMailer` / `MilestoneMailer` conventions (inherit
`ApplicationMailer`, subject in headline Title Case, HTML view under
`app/views/product_suggestion_mailer/`). **Use the existing branded email
system**: the `mailer` layout (`app/views/layouts/mailer.html.erb` — warm paper,
serif wordmark, mono footer) and `EmailHelper` (`email_button`, `email_eyebrow`)
are already built. Do NOT ship bare `<p>` emails. Three touchpoints:

| method                  | to                     | trigger                          |
|-------------------------|------------------------|----------------------------------|
| `submitted(product:)`   | admin(s) (`User.where(admin: true)`) | R4 — new suggestion filed        |
| `approved(product:)`    | `product.suggested_by.email`         | R5/R6 — editor approved          |
| `rejected(product:)`    | `product.suggested_by.email`         | R5/R6 — editor rejected          |

All dispatched `deliver_later` → Sidekiq (`config.active_job.queue_adapter =
:sidekiq`; a `worker` process runs it — mail lands in the `/letter_opener`
inbox in dev). HTML-only (plaintext `.text.erb` templates were removed). Copy is
deadpan editorial (sentence-case body), no emoji in the body per brand law.

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
  Approve, a `details`-wrapped Reject form. Reuse `ButtonComponent`
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
- Approve/Reject are independent `button_to`/form targets (no nested interactive
  ambiguity), matching the submissions queue.
- Honor `prefers-reduced-motion` (kill the reveal transform + any pulse).

---

## 9. Test surface (minitest — dirs already exist)

- `test/models/product_test.rb` — **already exists** (AASM states/scopes,
  `for_name`). *Extend* it with `suggested_by` + the approve/reject `after`
  callbacks (entry release, mailer enqueue).
- `test/services/products/suggestion_test.rb` — create dedupes, sets
  `suggested_by`, enqueues admin mail. (No `decision_test` — verdicts are the
  Product AASM events, covered in `product_test`.)
- `test/mailers/product_suggestion_mailer_test.rb` — 3 methods (`submitted`,
  `approved`, `rejected`), recipients, subjects.
- `test/controllers/admin/products_controller_test.rb` — `require_admin` gate,
  index filter, approve/reject (fire the events).
- `test/controllers/submissions_controller_test.rb` (extend) — dropdown path,
  suggest-new path creates a pending product + a pending entry + enqueues admin
  mail; a pending X keeps the entry pending regardless of author trust.
- Fixtures: add `test/fixtures/products.yml` (all `state: approved` for the
  dropdown); the admin `editor` and the standard `member`/`unconfirmed` users
  already exist in `test/fixtures/users.yml`.
