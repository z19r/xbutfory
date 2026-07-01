The XbutforY wordmark, set live in Newsreader 700 with the pivot "but" in the brand accent — no image asset. Supports two maximal flourishes.

```jsx
<Wordmark size={66} ghost beta />          {/* full Y2K: ghost + starburst */}
<Wordmark size={26} accentY={false} />     {/* quiet footer lockup */}
```

Props: `size` (drives the lockup), `accentY` (also tint the trailing "Y."), `ghost` (faint offset double-exposure), `beta` + `betaLabel` (corner BetaBurst). For the calm brand mark leave `ghost`/`beta` off; turn both on for the loud maximal home.
