Shown when a search or filter returns nothing. Keep the copy dry and point the user at submitting.

```jsx
<EmptyState action="Be the first" onAction={goSubmit}>
  No “{query} but for ___” in the index.
</EmptyState>
```

- Serif headline over one mono line; the optional `action` renders as the accent CTA.
- This is the place the brand voice gets to shrug — "Nothing here yet." not "0 results found".
