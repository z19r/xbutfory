The hero of the whole system — one directory entry. Stack these to build the Latest / Trending / Top feeds.

```jsx
<EntryCard
  index="#001"
  x="Tinder" y="the Building you live in"
  votes="847" voted={false}
  description="Hyper-local matching for vertical communities. Trade sugar or find a gym partner downstairs."
  category="dating" categoryLabel="DATING"
  submitter="@apt_4b" ago="yesterday"
  stamp="NEW"
  onVote={() => {}} onView={() => {}}
/>
```

- The card is one click target (`onView`); the **vote box** and **visit link** stop propagation.
- Pass `voted` to light the vote box accent. `stamp` is optional and shows at most one badge.
- Composes `Stamp` and `Tag` internally — don't re-wrap those.
