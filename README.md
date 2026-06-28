# XbutforY — Claude Code Build Package

This bundle contains everything Claude Code needs to build **XbutforY** — the
editorial "*X, but for Y*" product directory — as a **greenfield Ruby on Rails app**.

> XbutforY is a hand-curated, daily-updated, human-voted index of newly launched
> websites that pitch themselves as a familiar product remixed for an oddly-specific
> niche ("Tinder but for the building you live in", "Stripe but for lemonade stands").
> Editorial, deadpan, and unmistakably *printed* — warm paper, one brand red, three
> type registers.

---

## How to use this package

1. **Open this folder as a Claude Code workspace** (or drop it at the root of a new repo).
2. Read **`CLAUDE.md`** first — it is the persistent project brief (stack decisions,
   brand law, file conventions). Copy it to your repo root so it's auto-loaded every session.
3. Work through **`build_prompts/`** in numerical order. **Each prompt is a separate,
   self-contained Claude Code session** — paste one prompt, let it finish, commit, then
   start a fresh session with the next. This keeps every session's context small and focused.
4. **`design_system/`** is the source of truth for *look and behavior*. It is a set of
   **design references** (HTML/CSS/JSX prototypes), **not** code to copy verbatim — you are
   recreating these designs in idiomatic Rails (Hotwire + ViewComponent + CSS). The token
   CSS files, however, *are* meant to be used nearly as-is.

## What's inside

```
claude_code_handoff/
├── README.md                  ← you are here
├── CLAUDE.md                  ← persistent project brief — copy to repo root
├── build_prompts/             ← paste these into Claude Code one at a time, in order
│   ├── 00_project_setup.md
│   ├── 01_tokens_and_fonts.md
│   ├── 02_layout_and_chrome.md
│   ├── 03_core_components.md
│   ├── 04_entry_card_and_voting.md
│   ├── 05_feed_home.md
│   ├── 06_detail.md
│   ├── 07_submit.md
│   ├── 08_categories.md
│   ├── 09_data_model_and_seeds.md
│   └── 10_polish_motion_toasts.md
└── design_system/             ← the design reference (look + behavior)
    ├── readme.md              ← THE design guide — voice, color, type, spacing, motion
    ├── styles.css             ← @imports every token file (the one CSS entry point)
    ├── tokens/                ← colors / typography / spacing / effects / fonts (CSS vars)
    ├── guidelines/            ← 15 foundation specimen cards (visual reference)
    ├── components/            ← React primitives + .d.ts contracts + .prompt.md usage notes
    ├── ui_kits/               ← full screen prototypes (index/detail/submit/categories .html)
    └── prototype_source.dc.html ← the original single-file prototype (ground truth)
```

## Fidelity: HIGH

Everything in `design_system/` is **pixel-level hi-fi** — final colors (exact hex),
typography, spacing, shadows, and interactions. Match it precisely. When a build prompt
and a design file disagree, **the design file wins** (open the relevant `ui_kits/*.html`
in a browser and read the computed styles).

## Recommended order of attack

Foundations → chrome → components → screens → data → polish:

`00 → 01 → 02 → 03 → 04 → 05 → 09 (data) → 06 → 07 → 08 → 10`

(You can pull the data model `09` earlier if you prefer real records before building the
feed `05`. The prompts are written so either order works — `05` ships with stub data that
`09` later replaces.)
