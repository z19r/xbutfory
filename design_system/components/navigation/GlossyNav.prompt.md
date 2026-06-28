Maximal-mode primary navigation — a glossy periwinkle gel bar with a raised, inset-lit active tab. The loud counterpart to `NavTabs` (hairline underline). Use it on the maximal home / marketing surfaces.

```jsx
<GlossyNav
  items={['Latest', 'Trending', 'Top Voted', 'Categories', 'Random', 'Submit']}
  active="Latest"
  note="1,024 sites indexed"
  onSelect={(tab) => goTo(tab)}
/>
```

Props: `items`, `active`, `onSelect(label)`, `note` (right-aligned count), `maxWidth`, `sticky`. For the calm broadsheet use `NavTabs` instead.
