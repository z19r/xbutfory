here is a TODO list. You are an expert RoR bug fixer. Iterate these TODO items until they are complete. Most of them aren't dependant on eachother, so use subagents as necessary. Each TODO item should be checked off when completely.

If an agent fails, it should try again from the top of the list. Keep iterating this list until it's complete. If there are tasks that require significant input from me, try to use your best judgement. If you cannot/willnot use your best juudement, mark it as skipped, and put it at the bottom so that I can check it out with you when the res are complete.

Any questions before you start?

> **STATUS (2026-07-01):** 10 of 12 items shipped on branch `fix/punch-list`, each with tests; full suite 305/0. Two items are parked at the bottom and **need you** — see "STILL NEEDS YOU" at the end.


- [x] I don't believe sidekiq is running? — Migrated jobs from Solid Queue/inline to **Sidekiq** (Redis); worker in Procfile.dev; weekly digest via sidekiq-cron.
- [x] THEME should be sort of hidden, like a sliding tray in waybar. Maybe just a little < or something. — accent swatches now live in a collapsed tray behind a small `‹` chevron that slides them open (theme_controller#toggleTray; rotates on open; respects reduced-motion).
- [x] Afterdark should only be allowed when logged in — `after_dark?` helper honors the cookie only when signed in (guards forged cookies); both feed + categories controllers use it.
  - [x] Hover/Tool tip when afterdark is disabled: 'Show NSFW (if logged out notice abouit login)' — signed-out toggle is a locked button with tooltip "Show NSFW — sign in to unlock After Dark"; clicking it opens the sign-in modal.
- [x] RSS button isn't hooked up — masthead RSS button is now a real link to `/feed.xml` (the Atom feed already works) instead of a toast.
- [x] Weird horizontal scroll sometimes — root cause: the featured bar's `width: 100vw` full-bleed includes the scrollbar (overflows when a vertical scrollbar appears). Fixed with `overflow-x: clip` on html/body (keeps sticky nav) + utility bar now wraps on mobile. Verified 0 overflow at 375/768/1440.
- [x] No emails are sending in dev mode, they should all send via letter_opener — switched to **letter_opener_web** (in-app inbox at /letter_opener; plain letter_opener silently no-op'd without a browser). Worker processes deliver_later.
  - [x] Never sent plaintext email, delete them — removed all `.text.erb` templates AND **designed the HTML emails** (branded `layouts/mailer.html.erb` + `EmailHelper`: warm paper, cream card, serif wordmark with the italic red *but for*, ink rule, mono eyebrow/footer, accent button). Confirmation, password reset, milestone, and weekly digest all restyled. *(First pass only deleted the plaintext and left bare HTML — corrected here.)*
- [x] All the fake sites need to be removed and replaced with the sites in the jsob blob in @xbutfory.json — **done.** `data/xbutfory.json` (83 sites) loaded via `SiteImporter` (`rake sites:import`); demo listings wiped. **The X's are foreign keys**: a `products` table (27 deduplicated Xs) with `entries.product_id` → `products.id`; the `x` string stays denormalized for display/search. Slugs auto-disambiguate when two sites share a formula (e.g. Letterboxd but for TV / video games).
- [x] Modal should pop up when attempting to vote logged out, not toast — `auth_modal` Stimulus controller + dialog in layout (signed-out only); vote_controller dispatches `auth-modal:open` on 401 instead of a toast.
- [x] Weekly Digest -> if logged in, email should be prefilled, but editable — DigestSignupComponent takes `prefill_email`; home passes `current_user&.email`. Field stays editable.
- [x] Submission needs to be disabled when email is not confirmed — `require_confirmed_email` before_action on new/create/edit/update; unconfirmed users bounce to home with a "confirm your email" alert.
- [~] The X's should be static and defined by admin only — **spec'd as a self-contained Ralph-loop project in `approval_flow/`** (PROMPT.md + PRD + architecture + task_list). Big multi-part feature; deferred to its own loop per your call. Run `/ralph-loop` against `approval_flow/PROMPT.md` to build it.
  - [~] They should be shown in a typical dropdown (spec'd)
  - [~] a 'Suggest New' option should be available with a note saying it needs to be approved (spec'd)
    - [~] this needs to trigger an email to admin (spec'd)
    - [~] admin userface needs to have an option to approve or deny (spec'd)
    - [~] each needs to trigger an email to the OP (spec'd)
- [x] One line pitch should not be optional — `description` now required on submit (via `require_pitch` flag so seeds/imports stay free); form relabeled, field `required`.
  - [x] offer option to auto generate with AI/GPT — "Auto-generate with AI" button → `PitchGenerator` (Claude `claude-haiku-4-5`) via POST /pitch; graceful degrade (friendly error) when `ANTHROPIC_API_KEY` is unset.

---

## STILL NEEDS YOU (the two parked items)

- **[~] Replace fake sites (#7 in list):** loader is built + tested (`SiteImporter`, `rake sites:import`, auto-runs from `db/seeds`). **Drop `xbutfory.json` at the repo root**, then run `rake sites:import`. Expected JSON shape is documented at the top of `app/services/site_importer.rb`.
- **[~] Admin-managed X's + Suggest-New approval flow (#11 in list):** by your call, this big multi-part feature was written up as a self-contained Ralph-loop project in **`approval_flow/`** (PROMPT.md + PRD + architecture + task_list) rather than built inline. To build it: `/ralph-loop` against `approval_flow/PROMPT.md`.

Everything else is done, tested, and committed on `fix/punch-list`.
