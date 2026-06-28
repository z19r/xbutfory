The rotated rubber-stamp badge on an entry. Use `NEW` for sites launched in the last ~day, `HOT` for high vote velocity. Show at most one per entry.

```jsx
<Stamp kind="NEW" />
<Stamp kind="HOT" />
```

- `kind` picks the color (`--stamp-new` accent / `--stamp-hot` amber). Pass children only to override the word.
- It's intentionally hollow + rotated −3° — never fill it; that's what makes it read as ink on paper.
