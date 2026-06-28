# UI Kit — The Directory

A high-fidelity recreation of the **XbutforY** directory: a hand-curated index of
"X but for Y" websites, voted by humans.

## Files
**Self-contained interactive previews** (link the real `styles.css`; each is also a
**Starting Point**):
- **index.html** — the home / "Latest" view (masthead, sticky nav, editorial hero,
  stat block, submissions feed with **pinned + spotlight sponsors**). Search filters
  live and drops to the empty state; vanilla JS handles tab, sort, vote, and search.
- **detail.html** — an entry detail (vote column, big title, pitch / why-it-works,
  formula meta-card).
- **submit.html** — the submit flow; typing X and Y updates the live preview, and
  the listing tier flips the CTA.
- **categories.html** — the browse-by-category tile grid.

**JSX reference source** (composes the `components/` primitives — lift into
production and swap the static data/handlers):
- **Masthead.jsx** — `MastheadBar` + eyebrow/wordmark + search/RSS/Submit row.
- **FeedScreen.jsx** — home, composing `Masthead`, `NavTabs`, `SortToggle`,
  `EntryCard`, `CodeChip`.
- **DetailScreen.jsx** — detail, composing `Masthead`, `NavTabs`, `Tag`, `Button`.
- **SubmitScreen.jsx** — submit, composing `Masthead`, `NavTabs`, `SubmitPreview`,
  `Button`.
- **CategoriesScreen.jsx** — categories, composing `Masthead`, `NavTabs`,
  `CategoryTile`.

## The product, in one screen
The directory is a single centered editorial column on warm paper. Everything is
one of three type registers (serif headline, mono label, sans body), one brand
red, and a feed of `EntryCard`s. Other surfaces in the source prototype — entry
**detail**, the **submit** flow (with live "X but for Y" preview), and the
**Categories** tile grid — reuse these same components and tokens.

## Sponsored placements
Two paid formats live on `EntryCard` via the `sponsored` prop: **pinned** (a solid
hot-pink ribbon across the top + magenta border, glow and tint; one slot at the very
top) and **spotlight** (magenta glow halo, dropped mid-feed). Both add a green
SPONSORED tag. See them live in `index.html`.
