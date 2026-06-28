# CLAUDE.md — XbutforY

Persistent project brief. **Read this every session.** It is the law for both *what we're
building* and *how it must look and read*. The full design guide lives in
`design_system/readme.md`; this file is the operating summary plus the engineering rules.

---

## 1. The product

**XbutforY** is a directory of "*X, but for Y*" websites — a known product (X) reimagined
for a niche (Y), joined by an italic *"but for"*. It's a hand-curated, daily-updated,
human-voted index of newly launched sites. Think Product Hunt's mechanics with the soul of
a deadpan printed broadsheet.

Core surfaces:
- **Home / "Latest"** — masthead, sticky nav, editorial hero, a stat block, and the feed of
  entry cards (with pinned + spotlight sponsors). Search + sort + vote are live.
- **Detail** — one entry expanded (vote column, big title, pitch / "why it works", formula card).
- **Submit** — a form where typing X and Y updates a live "X but for Y" preview; listing tier flips the CTA.
- **Categories** — a browse-by-category tile grid.

**The `X but for Y` formula is sacred.** It appears in the wordmark, headlines, the code
chip, the submit preview, and the empty state. Never break it.

---

## 2. Stack (greenfield — use exactly this unless told otherwise)

- **Rails 8**, Ruby 3.3+, **PostgreSQL**.
- **Hotwire** (Turbo + Stimulus) for all interactivity — no React, no SPA. The design's
  vanilla-JS behaviors (vote, search-filter, live submit preview, toasts, tab/sort) become
  **Stimulus controllers**.
- **ViewComponent** gem for every reusable UI primitive (Button, Stamp, Tag, CodeChip,
  EntryCard, CategoryTile, SearchInput, SortToggle, NavTabs, Masthead, Toast, EmptyState).
  One component = one `app/components/<name>_component.rb` + `.html.erb` sidecar.
- **Plain CSS**, served through the asset pipeline (Propshaft). **No** Tailwind, no CSS-in-JS,
  no utility framework. The design is token-driven CSS custom properties — keep it that way.
- **importmap-rails** for JS (no Node build step).
- Tests: minitest (Rails default). Add component tests for ViewComponents where it's cheap.

> Rationale: the design is server-rendered editorial content with light, surgical
> interactivity. Hotwire + ViewComponent matches it 1:1 and keeps the bundle near-zero.

---

## 3. Brand law (non-negotiable)

The one-liner: **warm paper, one brand red, three type registers (serif headline / mono
label / sans body), ink rules instead of boxes, cards that float on warm shadows, deadpan
editorial voice, and the sacred `X but for Y` formula.**

- **Color is rationed.** Paper `#F3EDE3`, ink `#171008`, and exactly **one** themeable accent
  (`--accent`, default vermilion `#C93B1B`). Category hues (7, muted) appear *only* on tags and
  tile chips. Sponsored = hot magenta `#E11D8F`, deliberately outside the warm palette so ads
  read as ads. Never introduce a color that isn't a token in `tokens/colors.css`.
- **Structure comes from ink rules, not boxes.** 1.5–2px solid ink under section headers;
  hairlines for minor dividers. Cards are the *one* soft, floating surface (10px radius,
  two-layer **warm-brown** shadow `rgba(74,52,28,…)` — never neutral grey).
- **Three type faces, three jobs, never mixed:** **Newsreader** serif = headlines, wordmark,
  product names, stat numbers, the italic *"but for"*. **Space Mono** = every eyebrow/label/
  timestamp/issue-line/code-chip, always UPPERCASE + letter-spaced. **Outfit** sans = body
  (300), buttons (600), nav (400), links (500).
- **Stamps / tags / code chip are SHARP** (3–4px, hollow, printed marks). Inputs/buttons are
  **soft** (8px) with an inset or accent-glow.
- **Motion is quick, mechanical, no bounces** (.15–.18s). Cards lift `translateY(-2px)`;
  buttons `-1px`. The only loop is a 2.4s opacity pulse on live dots.
- **Emoji only in transient toasts and the RSS button** — one leading emoji, never in
  headings/body/labels.
- **No imagery, no SVG illustrations, no glassmorphism/backdrop-blur.** The system is purely
  typographic. The only SVG is the grain texture.

### Voice
Deadpan, self-aware, faintly conspiratorial — an editor who has seen too many launches and
commits to the bit. Mono labels are ALL CAPS; headlines/product names are Title Case;
body/toasts/asides are sentence case. Address the reader as *you*; editorial *we* only in
toast commentary. Present tense, active voice. Numbers (vol/issue, "N new today", vote counts)
are editorial furniture — truthful to the data, never invented precision.

---

## 4. Engineering conventions

- **Tokens are the single source of styling truth.** Port `design_system/tokens/*.css` into
  `app/assets/stylesheets/tokens/` essentially verbatim and reference the CSS variables
  everywhere. Do not hardcode hex values in component CSS — use `var(--token)`.
- **`--accent` is the only theme knob.** Setting it on `:root` re-themes wordmark, buttons,
  stamps, nav underline, live dots, vote-active, and links. Don't wire accent anywhere it
  isn't already used.
- **One ViewComponent per primitive**, mirroring `design_system/components/`. Each React
  `.jsx` + `.d.ts` over there maps to a Ruby component: the `.d.ts` prop interface becomes the
  component's initializer params (same names, same allowed values). The `.prompt.md` shows
  intended usage. **Translate, don't transliterate** — idiomatic ERB/Ruby, not ported JSX.
- **Scope component CSS** by a root class (e.g. `.c-entry-card`) in a per-component stylesheet,
  or co-locate styles — your call, but keep it token-driven and avoid leaking global selectors.
- **Stimulus controllers** own the interactions named in each screen prompt. Keep them small
  and one-responsibility (`vote_controller`, `search_filter_controller`,
  `submit_preview_controller`, `toast_controller`, `sort_controller`).
- **Accessibility:** the vote control and visit link are independent click targets inside a
  clickable card — preserve that (a real `<button>` and `<a>`, `stopPropagation` equivalent via
  separate Turbo/Stimulus targets). Hit targets ≥ 44px. Honor `prefers-reduced-motion` (kill
  the pulse + transforms).
- **Commit after each build prompt.** Conventional, present-tense messages.

---

## 5. Where to look when unsure

1. `design_system/readme.md` — the complete design guide (read it once, fully).
2. `design_system/ui_kits/*.html` — open in a browser; these are the ground-truth screens.
   Inspect computed styles to settle any measurement.
3. `design_system/tokens/*.css` — exact values.
4. `design_system/components/<group>/<Name>.d.ts` + `.prompt.md` — the per-component contract.
5. `design_system/prototype_source.dc.html` — the original everything-in-one prototype.

When a build prompt is ambiguous, the design files win. When the design files are silent,
follow the brand law above and ask.

<!-- rtk-instructions v2 -->
# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)
```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (60-99% savings)
```bash
rtk cargo test          # Cargo test failures only (90%)
rtk go test             # Go test failures only (90%)
rtk jest                # Jest failures only (99.5%)
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk pytest              # Python test failures only (90%)
rtk rake test           # Ruby test failures only (90%)
rtk rspec               # RSpec test failures only (60%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)
```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)
```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)
```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)
```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%). Format flags (-c, -l, -L, -o, -Z) run raw.
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)
```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)
```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)
```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands
```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category | Commands | Typical Savings |
|----------|----------|-----------------|
| Tests | vitest, playwright, cargo test | 90-99% |
| Build | next, tsc, lint, prettier | 70-87% |
| Git | status, log, diff, add, commit | 59-80% |
| GitHub | gh pr, gh run, gh issue | 26-87% |
| Package Managers | pnpm, npm, npx | 70-90% |
| Files | ls, read, grep, find | 60-75% |
| Infrastructure | docker, kubectl | 85% |
| Network | curl, wget | 65-70% |

Overall average: **60-90% token reduction** on common development operations.
<!-- /rtk-instructions -->

<!-- icm:start -->
## Persistent memory (ICM) — MANDATORY

This project uses [ICM](https://github.com/rtk-ai/icm) for persistent memory across sessions.
You MUST use it actively. Not optional.

### Recall (before starting work)
```bash
icm recall "query"                        # search memories
icm recall "query" -t "topic-name"        # filter by topic
icm recall-context "query" --limit 5      # formatted for prompt injection
```

### Store — MANDATORY triggers
You MUST call `icm store` when ANY of the following happens:
1. **Error resolved** → `icm store -t errors-resolved -c "description" -i high -k "keyword1,keyword2"`
2. **Architecture/design decision** → `icm store -t decisions-{project} -c "description" -i high`
3. **User preference discovered** → `icm store -t preferences -c "description" -i critical`
4. **Significant task completed** → `icm store -t context-{project} -c "summary of work done" -i high`
5. **Conversation exceeds ~20 tool calls without a store** → store a progress summary

Do this BEFORE responding to the user. Not after. Not later. Immediately.

Do NOT store: trivial details, info already in CLAUDE.md, ephemeral state (build logs, git status).

### Other commands
```bash
icm update <id> -c "updated content"     # edit memory in-place
icm health                                # topic hygiene audit
icm topics                                # list all topics
```
<!-- icm:end -->
