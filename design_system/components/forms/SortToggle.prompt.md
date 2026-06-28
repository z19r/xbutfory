The feed's sort switch — a segmented control on a sunken rail. Pairs with the "Latest Submissions / Showing 1–N" header.

```jsx
<SortToggle value={sort} onChange={setSort} />
```

- The active segment lifts to near-white with a tiny shadow; inactive segments are muted text on the rail.
- Same pattern works for any 2–4 short, mutually-exclusive options.
