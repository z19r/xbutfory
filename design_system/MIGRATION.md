# Migrating XbutforY — old build → new build

You (Claude Code) have already implemented an earlier version of XbutforY: the **calm
broadsheet** style, with **anonymous submissions** (a free-text `submitter` string and
"no account needed"). This guide updates that codebase to the **current** design system:

1. **Maximal (Y2K) is now the default visual style.**
2. **Accounts are mandatory** — you cannot submit, vote, or appear as a byline without one.

Work top-to-bottom. Each section says *what changed*, *what to do*, and *which design-system
file is the reference*. Pull exact values from the components and templates named here rather
than eyeballing screenshots.

---

## Part 1 — Visual migration (calm → maximal)

The tokens did **not** change — `styles.css`, the palette, type, and spacing are identical, and
`--accent` is still the single hue knob (now defaulting to magenta `#E11D8F`). What changed is the
**chrome and surface treatment**. The calm components still exist; the maximal ones are the new
default for home / marketing / auth. Keep product-dense list views calm if you prefer.

Swap these, surface by surface:

| Surface | Old (calm) | New (maximal) | Reference |
|---|---|---|---|
| Primary nav | `NavTabs` (hairline accent underline) | `GlossyNav` (periwinkle gel bar, raised active tab) | `components/navigation/GlossyNav.*` |
| Primary buttons | `Button variant="primary"` | same + **`gel`** prop (glossy sheen) | `components/core/Button.*` |
| Wordmark | plain `XbutforY.` | `Wordmark` with **`ghost`** + **`beta`** on the home masthead | `components/brand/Wordmark.*` |
| Hero/social proof | — (none) | `FeaturedBar` ("AS FEATURED ON" + `valid XHTML 1.0` stamp) | `components/discovery/FeaturedBar.*` |
| Sidebar | — (none) | `TagCloud` (weighted) + `DigestSignup` | `components/discovery/*` |
| Home reference | `templates/directory-home` | `templates/maximal-home` | use as the canonical home |

Rules that still hold (do not "maximalize" these): paper + ink + **one** rationed accent;
category hues only on tags; mono labels ALL-CAPS; the italic *"but for"* connector is sacred;
emoji only in toasts + the RSS button. The maximalism is gloss, starburst, ghost, and the tag
cloud — **not** new colors. See `readme.md` → "Maximal mode" for the full vocabulary.

**Concrete steps**
- Replace the nav component on the home/marketing pages with `GlossyNav` (props: `items`,
  `active`, `onSelect`, `note`). Keep `NavTabs` available if any view wants the quiet look.
- Add `gel` to the Submit / Sign-in CTAs.
- On the home masthead, render `<Wordmark ghost beta />`; keep the plain `<Wordmark />` in the footer.
- Add the right rail (`TagCloud` + `DigestSignup`) and the `FeaturedBar` strip between feed and footer.

---

## Part 2 — Accounts (the big one)

Submissions are now **account-bound**. The old anonymous `submitter` string is replaced by a real
relationship to a user, and posting requires authentication.

### 2a. Data model

- **New `users` table** (or your auth provider's equivalent): `id`, `handle` (unique, public,
  immutable — the `@handle`), `display_name`, `email` (unique, private), `password_hash` (or SSO id),
  `bio`, `avatar_url`, `created_at`, plus notification prefs and an `api_key`.
- **`submissions` change:** drop the free-text `submitter` column; add `user_id` (FK → `users.id`,
  **NOT NULL**). The byline shown on a listing (`@apt_4b`) is now `users.handle` joined through `user_id`.
- **`submissions.status`** enum: `live` · `pending` · `needs_edits` · `withdrawn` (+ optional
  `reviewer_note` for `needs_edits`). The old model effectively only had "live".
- **Votes** become `(user_id, submission_id)` unique pairs (one vote per member), not an anonymous counter.

> Migration of existing rows: existing anonymous submissions have no owner. Either (a) create a
> placeholder "legacy" user and assign them, or (b) keep them read-only and require re-claim. Pick
> one and state it; do not silently drop them.

### 2b. Auth gating

- **Submit** is now behind auth. Unauthenticated users hitting submit → redirect to
  `templates/sign-in`. Reference: `templates/submit-site` now shows a "Posting as @handle" banner
  and a signed-in utility bar (no more "no account needed").
- **Vote** requires a session; prompt sign-in on click when logged out.

### 2c. Session / nav state (what the utility bar shows)

The ink utility bar is the session indicator:
- **Logged out:** the `Sign in` · `Create account` links (unchanged markup).
- **Logged in:** swap those links for **`AccountMenu`** — an avatar disc + `@handle ▾` that opens a
  paper dropdown: *Account settings · Manage submissions · Sign out*. Reference:
  `components/chrome/AccountMenu.*` and the "signed in" half of `components/chrome/chrome.card.html`.

### 2d. The five new/updated screens

Build these from the templates (each is a `templates/<slug>/` DC in the maximal style):

1. **Sign in** — `templates/sign-in` — email + password, forgot link, link to create account.
2. **Create account** — `templates/create-account` — picks the **public @handle** (validated,
   lowercase, permanent), email, password, agreement. This is the identity used everywhere.
3. **Account settings** — `templates/account-settings` — Profile (handle/display/bio/avatar),
   Email & password, Notifications (digest + replies + milestones), Connected (personal RSS + API
   key), and a Danger zone (delete account → withdraws all listings).
4. **Manage submissions** — `templates/manage-submissions` — the member's own listings with
   status pills and **Edit / Withdraw / Cancel / Restore / Edit & resubmit** per state.
5. **Logged-in nav state** — `AccountMenu` in the utility bar (see 2c), present on every
   authenticated page.

### 2e. Identity decision (locked)

**Submissions are tied to accounts. There is no anonymous posting.** The public byline is the
account's `@handle`, chosen at signup and shown on every listing. `FormField` (`prefix="@"`) is the
input used for it. Do not reintroduce a free-text submitter field.

---

## Part 3 — Checklist

- [ ] Tokens unchanged — confirm `styles.css` still linked; bump `--accent` default to `#E11D8F` if hard-coded.
- [ ] Home: `GlossyNav` + `Wordmark ghost beta` + gel CTAs + `TagCloud`/`DigestSignup` rail + `FeaturedBar`.
- [ ] `users` table + `submissions.user_id` (NOT NULL) + `status` enum + per-user votes.
- [ ] Decide + document the legacy-submission migration path.
- [ ] Gate submit + vote behind auth; redirect to sign-in.
- [ ] Utility bar: `AccountMenu` when authenticated, links when not.
- [ ] Ship the 5 screens from the templates above.
- [ ] EntryCard byline reads `users.handle` via `user_id` — remove the old `submitter` string.

When in doubt, open the referenced `.prompt.md` next to each component for its API and a usage snippet.
