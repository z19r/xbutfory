The little category label on entry cards and tiles. Pass a `category` and it colors itself from the category hue tokens.

```jsx
<Tag category="saas">SAAS</Tag>
<Tag category="dating">DATING</Tag>
<Tag color="var(--text-muted)">UNCATEGORIZED</Tag>
```

- `category` maps to `--cat-*`; `color` overrides for off-roster labels.
- Keep labels short and UPPERCASE — they're a code, not a sentence.
