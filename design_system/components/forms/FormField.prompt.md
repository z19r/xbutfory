A labeled form field — mono uppercase label, inset paper input, optional hint/error — that keeps every auth and settings form on the same rails.

```jsx
<FormField label="Handle" prefix="@" placeholder="apt_4b" hint="This is public — it's stamped on every site you submit." />
<FormField label="Email" type="email" error="That address is already registered." />
<FormField label="Bio" as="textarea" placeholder="Tell builders who you are." />
```

Spreads native input attrs (`value`, `onChange`, `type`, `placeholder`, `required`…). Props: `label`, `hint`, `error` (accent border + message), `prefix` (e.g. `@`), `trailing` (e.g. a show/hide button), `as` (`input` | `textarea`). Used across Sign in, Create account, and Account settings.
