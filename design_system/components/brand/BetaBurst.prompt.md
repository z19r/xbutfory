A glossy 12-point amber starburst "BETA" badge — the signature early-2000s flourish; absolutely-position it over a wordmark or hero.

```jsx
<span style={{ position: 'relative', display: 'inline-block' }}>
  <Wordmark size={64} />
  <BetaBurst label="BETA" size={78} style={{ top: -14, right: -28 }} />
</span>
```

Decoration only (no interactivity). Props: `label`, `size`, `rotate`, `color` (override the amber fill, e.g. the brand accent). The label auto counter-rotates to stay upright. Use sparingly — one per view.
