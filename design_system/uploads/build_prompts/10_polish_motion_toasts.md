# Build Prompt 10 — Polish: Motion, Toasts & Easter Eggs

> **Session goal:** the finishing layer — the **Toast** running-commentary system, final motion
> pass, accessibility sweep, the theme switch, and the directory's easter eggs.

## Context
Read `CLAUDE.md`. Ground truth for motion/voice: `design_system/readme.md` (Motion + Voice
sections) and `design_system/components/feedback/Toast.{jsx,d.ts,prompt.md}`. The prototype
(`prototype_source.dc.html`) contains the easter eggs and the exact toast copy.

## 1. Toast system (`ToastComponent` + `toast_controller`)
- Visual: a printed-sticker feel — `--radius-toast`, the **hard offset** shadow `--shadow-toast`
  (`4px 4px 0 …`, not soft), ink or paper surface per the spec. Slides up `10px` + fades in over
  `.3s`; auto-dismisses.
- **Voice = running editorial commentary**, one leading emoji each (the only place besides the RSS
  button emoji is allowed). Use the real lines from the prototype, e.g.
  *"🏆 Five upvotes deep. You have taste. We respect that."*,
  *"🔮 Y-values scrambled. Find the hidden genius in the chaos."*,
  *"'Uber but for Horses' — yes, it's real."*
- Triggers: successful submit, an upvote milestone (e.g. 5th upvote), the random-sort scramble,
  and the easter eggs below. Drive via Turbo Stream / a Stimulus queue so multiple can stack.

## 2. Motion pass (audit everything against the spec)
Quick, mechanical, **no bounces**, `.15–.18s`, `--ease`. Confirm: card hover lift `-2px` +
shadow deepen; button hover `-1px` + deeper glow; live-dot 2.4s opacity pulse; vote box snaps to
accent on click; nav/link hovers. **`prefers-reduced-motion`**: disable the pulse, transforms,
and toast slide — keep opacity/instant states.

## 3. Theme switch (if not already done in prompt 05)
The five curated `--accent` options (vermilion / teal / violet / ochre / ink) as a small control
that sets `--accent` on `:root` and persists (cookie/localStorage). One-line hue swap — verify
wordmark `Y.`, buttons, stamps, nav underline, live dots, vote-active, and links all follow, and
**nothing else** changes color.

## 4. Easter eggs (from the prototype — keep them subtle)
Port whatever the prototype ships (e.g. the **Konami code** unlocking a coupon/modal, the
🔮 "scramble the Y-values" button, the "Uber but for Horses" gag). These are the brand's wink —
implement faithfully but don't over-expose them.

## 5. Final QA sweep
- Every color is a token (`var(--…)`), no stray hex.
- Three type registers used for their assigned jobs only.
- Emoji confined to toasts + RSS button.
- The `X but for Y` formula intact in wordmark, headlines, code chip, submit preview, empty state.
- Keyboard: vote, submit, nav, theme switch all operable; focus visible; hit targets ≥ 44px.
- `bin/rails test` green.

## Done when
- Toasts fire in the house voice with the sticker look; motion matches the spec and respects
  reduced-motion; the theme switch works; easter eggs are in; QA checklist passes.

**Commit:** `feat: toasts, motion polish, theme switch, and easter eggs`.

🎉 That's the build. The app should now match the prototype end-to-end.
