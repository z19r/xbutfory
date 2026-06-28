A tile for the "Browse by Category" grid. Lay them out in a `repeat(auto-fill, minmax(240px, 1fr))` grid.

```jsx
<CategoryTile
  category="dating" short="DATING"
  name="Dating & Hookups" count="3"
  sample="Tinder · Hinge · Grindr"
  onClick={() => filterBy('dating')}
/>
```

- Mirrors `EntryCard`'s surface (white, 10px, soft shadow) so the two views feel like one system.
