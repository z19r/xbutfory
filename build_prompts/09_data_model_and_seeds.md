# Build Prompt 09 — Data Model & Seeds

> **Session goal:** the real persistence layer — models, migrations, associations, validations,
> and seed data — then swap the stub arrays in the feed/detail/categories/submit for real records.

## Context
Read `CLAUDE.md`. The data shape is dictated by the components — match their param names so the
swap is mechanical. Look at `EntryCard.d.ts`, `CategoryTile.d.ts`, and the stub hashes you used
in prompts 05–08.

## Schema

**`Entry`** (a directory listing — the `X but for Y`):
- `x:string` (familiar product), `y:string` (the niche) — both required.
- `description:text`, `url:string`, `submitter:string` (handle, e.g. `@apt_4b`).
- `category:string` — enum-constrained to the 7 keys
  (`dating crm discovery saas payments social logistics`).
- `stamp:string` — nullable enum (`NEW` / `HOT`); or **derive** it: `NEW` if created in the last
  ~24h, `HOT` by vote velocity (a method is fine — keep furniture truthful to data).
- `sponsored:string` — nullable enum (`pinned` / `spotlight`).
- `votes_count:integer` default 0 (counter cache — see Vote).
- timestamps. Add a `slug` (friendly id) if you want pretty `/entries/:slug` URLs.

**`Vote`** (one upvote):
- `belongs_to :entry`. Identify the voter by a signed cookie / session token (no auth/users in
  scope) — store `voter_token:string`. Unique index on `[entry_id, voter_token]` so a voter
  votes once. `counter_cache: true` to keep `entries.votes_count` live.

(Optional `Category` table — or keep categories as the static enum + a `categories.yml` of
display names/samples. The static approach is simpler and matches the fixed 7-hue system. Your call.)

## Validations
- `x`, `y` present; `url` format; `category` in the allowed set; `sponsored`/`stamp` in their sets.
- Vote uniqueness per `[entry, voter_token]`.

## Endpoints to back the existing UI
- `POST /entries/:id/votes` and `DELETE /entries/:id/votes` (or a toggle) — used by
  `vote_controller`. Respond to Turbo Stream so the count + voted state update without a full nav.
- `POST /entries` — used by the submit form (prompt 07). Set `stamp = NEW` on create.
- Feed/detail/categories now query real records (scopes: `by_category`, `latest`, `top`, `random`,
  `search(q)`). Pinned/spotlight come from the `sponsored` column — enforce **one pinned at top**.

## Seeds (`db/seeds.rb`)
Port the entries from the prototype so the app looks alive on first boot. Pull the real examples
from `design_system/prototype_source.dc.html` and `ui_kits/directory/index.html` (e.g. "Tinder
but for the Building you live in", "Stripe but for lemonade stands", "Uber but for Horses", etc.)
— keep the exact deadpan copy, categories, submitters, and vote counts. Seed **one** pinned
sponsor and **one** spotlight sponsor. ~12–20 entries across all 7 categories.

## Swap the stubs
Replace the stub arrays in prompts 05/06/08 with the scopes above. The component params don't
change — only the data source does.

## Done when
- `bin/rails db:seed` populates a believable index; home/detail/categories render real records;
  voting persists and is one-per-voter; submit creates a real `NEW` entry.
- `bin/rails test` green (add model + request tests for votes uniqueness and entry validation).

**Commit:** `feat: entry + vote models, validations, scopes, and seeds`.

➡️ Next: `10_polish_motion_toasts.md`.
