Buttons for XbutforY — primary CTAs, paper-outline utility buttons, and quiet nav/text links. Reach for it anywhere the directory needs a clickable action.

```jsx
<Button variant="primary" icon="+">Submit a Site</Button>
<Button variant="secondary" icon="📡">RSS</Button>
<Button variant="ghost">Trending</Button>
<Button variant="primary" trailingArrow>Submit for free</Button>
```

- **variant** — `primary` (accent fill + warm glow), `secondary` (near-white paper outline, e.g. RSS / filters), `ghost` (nav tabs, inline links), `dark` (ink fill).
- **size** — `sm` · `md` · `lg`. **icon** leads the label; **trailingArrow** appends a →.
- **gel** — adds the glossy early-2000s sheen to `primary`/`dark` fills; this is the maximal-mode default for the Submit CTA. Leave off for the calm broadsheet.
- Colors/shadows come from tokens, so the button re-themes automatically when `--accent` changes.

```jsx
<Button variant="primary" gel icon="+">Submit a Site</Button>   {/* maximal */}
```
