The directory's primary navigation — a sticky tab bar under the masthead.

```jsx
<NavTabs
  active="latest"
  onSelect={setTab}
  tabs={[
    { key: 'latest', label: 'Latest' },
    { key: 'trending', label: 'Trending' },
    { key: 'top', label: 'Top Voted' },
    { key: 'categories', label: 'Categories' },
    { key: 'random', label: 'Random' },
    { key: 'submit', label: 'Submit' },
  ]}
/>
```

- The active tab gets the accent underline; everything else is muted and darkens on hover.
- It's `position:sticky` by default — place it as a direct child of a tall scroll container (not inside a short header) so it pins correctly.
