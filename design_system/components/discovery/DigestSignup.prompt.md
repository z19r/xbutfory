Weekly-digest email-capture card for the sidebar — title, pitch line, inset email field, Subscribe button.

```jsx
<DigestSignup gel onSubmit={(email) => subscribe(email)} />
```

Props: `title`, `pitch`, `placeholder`, `cta`, `gel` (glossy button for the maximal look — leave off for the calm system), `onSubmit(email)`. Manages its own input state.
