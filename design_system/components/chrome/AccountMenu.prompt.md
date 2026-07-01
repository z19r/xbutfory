The signed-in session control for the ink utility bar — shows the account @handle + avatar disc and opens a paper dropdown (Account settings · Manage submissions · Sign out). This is the **logged-in nav state**: it replaces the "Sign in · Create account" links once authenticated.

```jsx
{user
  ? <AccountMenu handle={user.handle} onSelect={(k) => route(k)} />
  : <span><a href="/signin">Sign in</a><a href="/signup">Create account</a></span>}
```

Props: `handle` (required — same one stamped on the user's listings), `avatar`, `items`, `onSelect(key)`, plus optional controlled `open`/`onToggle`. Sits on the dark utility bar; the dropdown is a light paper card. Because submissions are account-gated, the handle here is the canonical identity across the app.
