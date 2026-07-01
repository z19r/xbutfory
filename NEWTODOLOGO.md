here is a TODO list. You are an expert RoR bug fixer. Iterate these TODO items until they are complete. Most of them aren't dependant on eachother, so use subagents as necessary. Each TODO item should be checked off when completely.

If an agent fails, it should try again from the top of the list. Keep iterating this list until it's complete. If there are tasks that require significant input from me, try to use your best judgement. If you cannot/willnot use your best juudement, mark it as skipped, and put it at the bottom so that I can check it out with you when the res are complete.

Any questions before you start?


- [x] I don't believe sidekiq is running? — Migrated jobs from Solid Queue/inline to **Sidekiq** (Redis); worker in Procfile.dev; weekly digest via sidekiq-cron.
- [ ] THEME should be sort of hidden, like a sliding tray in waybar. Maybe just a little < or something.
- [x] Afterdark should only be allowed when logged in — `after_dark?` helper honors the cookie only when signed in (guards forged cookies); both feed + categories controllers use it.
  - [x] Hover/Tool tip when afterdark is disabled: 'Show NSFW (if logged out notice abouit login)' — signed-out toggle is a locked button with tooltip "Show NSFW — sign in to unlock After Dark"; clicking it opens the sign-in modal.
- [x] RSS button isn't hooked up — masthead RSS button is now a real link to `/feed.xml` (the Atom feed already works) instead of a toast.
- [ ] Weird horizontal scroll sometimes
- [x] No emails are sending in dev mode, they should all send via letter_opener — switched to **letter_opener_web** (in-app inbox at /letter_opener; plain letter_opener silently no-op'd without a browser). Worker processes deliver_later.
  - [x] Never sent plaintext email, delete them — removed all `.text.erb` mailer templates + the text layout; mailers are HTML-only.
- [ ] All the fake sites need to be removed and replaced with the sites in the jsob blob in @xbutfory.json
- [x] Modal should pop up when attempting to vote logged out, not toast — `auth_modal` Stimulus controller + dialog in layout (signed-out only); vote_controller dispatches `auth-modal:open` on 401 instead of a toast.
- [x] Weekly Digest -> if logged in, email should be prefilled, but editable — DigestSignupComponent takes `prefill_email`; home passes `current_user&.email`. Field stays editable.
- [x] Submission needs to be disabled when email is not confirmed — `require_confirmed_email` before_action on new/create/edit/update; unconfirmed users bounce to home with a "confirm your email" alert.
- [~] The X's should be static and defined by admin only — **spec'd as a self-contained Ralph-loop project in `approval_flow/`** (PROMPT.md + PRD + architecture + task_list). Big multi-part feature; deferred to its own loop per your call. Run `/ralph-loop` against `approval_flow/PROMPT.md` to build it.
  - [~] They should be shown in a typical dropdown (spec'd)
  - [~] a 'Suggest New' option should be available with a note saying it needs to be approved (spec'd)
    - [~] this needs to trigger an email to admin (spec'd)
    - [~] admin userface needs to have an option to approve or deny (spec'd)
    - [~] each needs to trigger an email to the OP (spec'd)
- [ ] One line pitch should not be optional
  - [ ] offer option to auto generate with AI/GPT
