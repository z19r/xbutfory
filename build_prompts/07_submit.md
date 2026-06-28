# Build Prompt 07 — Submit Flow

> **Session goal:** the submit screen — a form where typing **X** and **Y** updates a **live
> "X but for Y" preview**, with a listing-tier choice that flips the CTA. Real persistence.

## Context
Read `CLAUDE.md`. Ground truth: open `design_system/ui_kits/directory/submit.html`. Reference:
`SubmitScreen.jsx` and the `SubmitPreview` contract
(`design_system/components/forms/SubmitPreview.{jsx,d.ts,prompt.md}`).

## `SubmitPreviewComponent` contract
Params: `x`, `y` (what the user has typed so far), `label` (eyebrow, default `Live preview`).
It's a **dashed "live preview" well** (`--surface-sunken`, dashed border) rendering the formula
the same way the card/title do — the serif headline with the italic *" but for "* — and falling
back to literal **`X`** / **`Y`** placeholders when empty. This is the emotional centerpiece of
the form: the user watches their idea become a real listing as they type.

## Build the submit view (`GET /submit` → form; `POST /entries` → create)
1. **Form fields** — X (familiar product), Y (the niche), description, category (the 7 keys →
   their hues), submitter handle, URL. Fields use `SearchInput`-style wells: near-white,
   `--border-input`, inset shadow, focus border → ink. Field labels in Space Mono micro
   (`--type-micro`), uppercase.
2. **`SubmitPreview`** sits beside/above the fields and updates live via a
   **`submit_preview_controller`** (Stimulus) — as X and Y change, the preview re-renders the
   formula; empty → `X` / `Y` placeholders. Debounce lightly.
3. **Listing tier** — a choice (e.g. Free vs. a paid/sponsored tier). Selecting the paid tier
   **flips the primary CTA** copy/treatment (and hints the sponsored placement). Keep it honest
   and deadpan — no dark-pattern pressure.
4. **Submit** — `POST /entries` creates the record (model lands in prompt 09; until then, validate
   + flash a success **Toast** and redirect home). On success, fire a celebratory toast in the
   house voice (one leading emoji).
5. **Validation** — X and Y required; URL must look like a URL; show inline errors in the
   editorial style (no harsh red boxes — use the accent sparingly + helper text).

## Done when
- `/submit` matches `submit.html`: live formula preview that fills in as you type, the
  fallback `X`/`Y` placeholders, the tier toggle flipping the CTA, validation, and a success
  toast + redirect.

**Commit:** `feat: submit flow with live X-but-for-Y preview`.

➡️ Next: `08_categories.md`.
