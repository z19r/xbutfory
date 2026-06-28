The thin ink bar that caps the directory — an "est. 2026 — vol. 1, issue 26" colophon line on the left and account links on the right.

```jsx
<MastheadBar
  issue="est. 2026 — vol. 1, issue 26"
  links={[{ label: 'Sign in' }, { label: 'Create account', strong: true }]}
  onLink={(label) => {}}
/>
```

- Full-bleed ink; sits above the masthead. The live dot is static here — wrap it in your own `pulse` keyframe if you want it breathing (the prototype does).
- Keep the issue line mono and lowercase; it's a printed colophon, not a headline.
