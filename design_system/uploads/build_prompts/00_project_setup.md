# Build Prompt 00 — Project Setup

> **Session goal:** stand up a clean Rails 8 app with the right gems, asset pipeline, and
> folder skeleton. No UI yet. Ends with a booting app and a green `bin/rails test`.

## Context
You're building **XbutforY**, an editorial "*X but for Y*" product directory. Read
`CLAUDE.md` (repo root) before starting — it fixes the stack and brand law. The design
reference is in `design_system/`.

## Do this

1. **Generate the app** (greenfield):
   ```
   rails new . -d postgresql --css=app --javascript=importmap --skip-jbuilder
   ```
   If the directory isn't empty because of this handoff bundle, generate into a temp dir and
   move files in, keeping `CLAUDE.md`, `README.md`, `build_prompts/`, and `design_system/`.

2. **Add gems** to the Gemfile and `bundle install`:
   - `view_component`
   - `propshaft` (default on Rails 8 — confirm it's the asset pipeline, not Sprockets)
   - dev/test: `dotenv-rails` is optional; keep deps minimal.

3. **Set up ViewComponent**: create `app/components/`, configure the preview path, and confirm
   `bin/rails g component Probe text` generates a `probe_component.rb` + sidecar `.html.erb`.
   Delete the probe after confirming.

4. **Create the folder skeleton** (empty for now, filled by later prompts):
   ```
   app/assets/stylesheets/tokens/      # token CSS lands here in prompt 01
   app/assets/stylesheets/components/  # per-component CSS
   app/components/                     # ViewComponents
   app/javascript/controllers/         # Stimulus controllers
   ```

5. **Database**: `bin/rails db:create`. No models yet (prompt 09 adds them).

6. **Routes & smoke page**: add a `PagesController#home` mapped to `root`, rendering a bare
   "XbutforY — booting" so `bin/rails s` shows something. Real layout comes in prompt 02.

7. **Sanity**: `bin/rails test` is green; `bin/rails s` boots; root loads.

## Done when
- App boots, root renders, tests pass.
- ViewComponent generator works.
- The four skeleton folders exist.

**Commit:** `chore: scaffold Rails 8 app with ViewComponent + importmap`.

➡️ Next: `01_tokens_and_fonts.md`.
