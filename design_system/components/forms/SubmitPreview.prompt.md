The reassuring "here's how it'll read" well in the submit flow. Wire `x`/`y` to the two form fields and it updates live.

```jsx
<SubmitPreview x={form.x} y={form.y} />
// → "Tinder but for Dog Parks" in serif, dashed border
```

- Empty fields show literal `X` / `Y` so the shape is always legible.
- It's the only dashed border in the system — that's deliberate: it signals "draft / preview", not a finished card.
