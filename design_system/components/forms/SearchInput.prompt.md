The masthead search box. Pair it with a rotating placeholder for flavor ("Try 'Tinder but for…'").

```jsx
<SearchInput value={q} onChange={e => setQ(e.target.value)} placeholder="Search the index…" />
```

- Near-white with an inset shadow so it reads as a recessed well; the magnifier is decorative (`pointer-events:none`).
- Give it `flex:1` in the masthead row beside the RSS / Submit buttons.
