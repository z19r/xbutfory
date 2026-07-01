here is a TODO list. You are an expert RoR bug fixer. Iterate these TODO items until they are complete. Most of them aren't dependant on eachother, so use subagents as necessary. Each TODO item should be checked off when completely.

If an agent fails, it should try again from the top of the list. Keep iterating this list until it's complete. If there are tasks that require significant input from me, try to use your best judgement. If you cannot/willnot use your best juudement, mark it as skipped, and put it at the bottom so that I can check it out with you when the res are complete.

Any questions before you start?


- [x] I don't believe sidekiq is running? — Migrated jobs from Solid Queue/inline to **Sidekiq** (Redis); worker in Procfile.dev; weekly digest via sidekiq-cron.
- [ ] THEME should be sort of hidden, like a sliding tray in waybar. Maybe just a little < or something.
- [ ] Afterdark should only be allowed when logged in
  - [ ] Hover/Tool tip when afterdark is disabled: 'Show NSFW (if logged out notice abouit login)'
- [ ] RSS button isn't hooked up
- [ ] Weird horizontal scroll sometimes
- [x] No emails are sending in dev mode, they should all send via letter_opener — switched to **letter_opener_web** (in-app inbox at /letter_opener; plain letter_opener silently no-op'd without a browser). Worker processes deliver_later.
  - [x] Never sent plaintext email, delete them — removed all `.text.erb` mailer templates + the text layout; mailers are HTML-only.
- [ ] All the fake sites need to be removed and replaced with the sites in the jsob blob in @xbutfory.json
- [ ] Modal should pop up when attempting to vote logged out, not toast
- [ ] Weekly Digest -> if logged in, email should be prefilled, but editable
- [x] Submission needs to be disabled when email is not confirmed — `require_confirmed_email` before_action on new/create/edit/update; unconfirmed users bounce to home with a "confirm your email" alert.
- [ ] The X's should be static and defined by admin only
  - [ ] They should be shown in a typical dropdown
  - [ ] a 'Suggest New' option should be available with a note saying it needs to be approved
    - [ ] this needs to trigger an email to admin
    - [ ] admin userface needs to have an option to approve or deny
    - [ ] each needs to trigger an email to the OP
- [ ] One line pitch should not be optional
  - [ ] offer option to auto generate with AI/GPT
