A weighted tag cloud — the classic Web 2.0 sidebar widget; each tag scales with its 1–5 `weight`.

```jsx
<TagCloud
  tags={[{ label: 'AI', weight: 5 }, { label: 'crypto', weight: 5 }, { label: 'pets', weight: 2 }]}
  onSelect={(t) => filterBy(t)}
/>
```

Props: `tags` (array of `{label, weight}` or bare strings → weight 3), `color` (default periwinkle `#2B5BA8` — keep it off the brand accent), `onSelect`. Drop it inside a sidebar card.
