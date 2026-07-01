# PRD — Curated "X" list with admin-approved suggestions

## Problem

Today the **X** in "*X but for Y*" is free text on the submit form
(`app/views/submissions/new.html.erb`, `f.text_field :x`). Free text means the
same product shows up spelled a dozen ways ("Notion", "notion", "Notion.so"),
which pollutes search (`Entry.search` matches on `x`), makes the sacred formula
look sloppy, and gives the editors no control over the vocabulary of the
directory.

The product owner wants the **X's to become a curated, admin-managed
vocabulary** — a canonical list the editors own — while still letting the crowd
propose additions through a lightweight, moderated suggestion flow.

## Users

- **Submitter (OP)** — a signed-in member filling out the submit form. Picks an X
  from a dropdown; if theirs isn't listed, suggests a new one and waits for a
  verdict.
- **Editor / admin** — a `User` with `admin: true` (gated by `require_admin` in
  `app/controllers/concerns/authentication.rb`). Owns the canonical list and
  approves or denies suggestions.

## Requirements

### R1 — Curated X list, admin-owned
- The `Product` model (already built) holds the canonical X names. Admin-only
  CRUD lives under the existing `admin` namespace (mirrors
  `Admin::SubmissionsController`).
- Products carry an AASM `state` (`pending`, `approved`, `rejected`) so a single
  table is both the live vocabulary (`Product.approved`) and the suggestion queue
  (`Product.pending`).

### R2 — Dropdown on submit
- The submit form's "The X" field becomes a `<select>` of **approved** products
  (kept sorted), replacing the free-text input.
- The live "X but for Y" preview (`submit_preview_controller.js`,
  `SubmitPreviewComponent`) keeps working off the dropdown's selected value.

### R3 — "Suggest New" affordance
- The dropdown includes a **"Suggest New…"** option. Choosing it reveals a text
  input (Stimulus-toggled) plus a mono-label note:
  *"New X's are reviewed by an editor before they can be used."*
- The formula chip stays honest — the typed suggestion feeds the live preview.

### R4 — Submitting a suggestion
- Submitting the form with a new X creates a `pending` `Product` (via
  `Product.for_name`) attributed to the OP (`suggested_by`), then **emails the
  admin(s)**.
- The submitted entry itself is held/associated so it can go live once (and if)
  the X is approved — see Acceptance below.

### R5 — Admin approve / reject
- The admin suggestion queue (new `Admin::ProductsController`, same shape as the
  submissions queue) lists pending products with **Approve** and **Reject**
  actions (`button_to … method: :patch`, matching the existing approve /
  request_changes buttons).
- **Approve** → `product.approve!` (AASM); it enters the dropdown.
- **Reject** → `product.reject!` (AASM); it never appears in the dropdown.

### R6 — Email the OP on every decision
- Approve **and** reject each send an email to the OP (`suggested_by.email`),
  in the deadpan editorial voice, via `deliver_later` (Sidekiq — see
  `config.active_job.queue_adapter = :sidekiq`).

## Non-goals

- No public "browse all X's" page (that's a future idea).
- No editing of an already-`approved` product's name mid-flight (rename is a
  separate concern; out of scope).
- No change to the Y field — Y stays free text.
- No new colors, fonts, or surfaces. Brand law (`CLAUDE.md` §3) is untouched:
  mono uppercase labels, tokens only, ink rules not boxes.

## Acceptance criteria

1. `Product` (already built) has `name` (unique, case-insensitive) + AASM `state`
   (`pending`/`approved`/`rejected`). This flow adds a `suggested_by` optional
   `belongs_to :user`.
2. Submit form renders a `<select>` of approved products plus a "Suggest New…"
   option; no free-text X input remains for the normal path.
3. Picking "Suggest New…" reveals a text field + the approval note via a Stimulus
   controller; hiding/showing is keyboard-accessible and honors reduced motion.
4. Submitting with an existing approved X sets `entry.x` to that product's name
   and behaves exactly as today.
5. Submitting a brand-new X creates a `pending` Product attributed to the OP and
   enqueues an email to admins. The entry is created with `status: 'pending'`
   and is **not** shown in the public feed until its X is approved.
6. Admin queue lists pending products; **Approve** fires `approve!` → `approved`,
   **Reject** fires `reject!` → `rejected`. Each verdict enqueues an email to the OP.
7. On approve, any pending entries whose X matches the newly-approved product are
   released to `live` (or become eligible for the normal moderation queue —
   decided in `architecture.md`).
8. All three mailer methods have mailer tests; models/controllers/services have
   minitest coverage; the suite is green.
9. Zero hardcoded hex/font values in new views/CSS — `var(--token)` only.
