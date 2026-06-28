import React from 'react';
import { Masthead } from './Masthead.jsx';
import { NavTabs } from '../../components/navigation/NavTabs.jsx';
import { CategoryTile } from '../../components/cards/CategoryTile.jsx';

const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SERIF = "var(--font-display, 'Newsreader', serif)";
const TABS = [
  { key: 'latest', label: 'Latest' }, { key: 'trending', label: 'Trending' },
  { key: 'top', label: 'Top Voted' }, { key: 'categories', label: 'Categories' },
  { key: 'random', label: 'Random' }, { key: 'submit', label: 'Submit' },
];

const CATS = [
  { category: 'dating', short: 'DATING', name: 'Dating & Hookups', count: '3', sample: 'Tinder · Hinge · Grindr' },
  { category: 'crm', short: 'CRM', name: 'CRM & Sales', count: '3', sample: 'Salesforce · HubSpot · Pipedrive' },
  { category: 'discovery', short: 'DISCOVER', name: 'Metasearch & Discovery', count: '3', sample: 'Kayak · SeatGeek · Google Flights' },
  { category: 'saas', short: 'SAAS', name: 'SaaS & Productivity', count: '4', sample: 'Notion · Figma · GitHub' },
  { category: 'payments', short: 'FINANCE', name: 'Payments & Finance', count: '3', sample: 'Stripe · Venmo · Robinhood' },
  { category: 'social', short: 'SOCIAL', name: 'Social & Links', count: '3', sample: 'Linktree · LinkedIn · Twitter' },
  { category: 'logistics', short: 'SERVICES', name: 'Logistics & Services', count: '3', sample: 'Uber · Airbnb · DoorDash' },
];

/**
 * The "Browse by Category" screen — shared masthead + nav and a responsive grid
 * of CategoryTiles. Clicking a tile filters the feed (wire `onPick`).
 */
export function CategoriesScreen({ onPick }) {
  return (
    <div style={{ color: 'var(--ink, #171008)', fontFamily: "var(--font-sans, 'Outfit', sans-serif)" }}>
      <Masthead />
      <NavTabs tabs={TABS} active="categories" />
      <main style={{ maxWidth: 'var(--content-max, 1040px)', margin: '0 auto', padding: '34px 24px 90px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: MONO, fontSize: 12, letterSpacing: '0.12em', color: 'var(--text-muted, #8A7D6F)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent, #C93B1B)', display: 'inline-block' }} />
          VOL. 01 &middot; ISSUE 26 &middot; JUN 2026
        </div>
        <div style={{ marginTop: 24, paddingBottom: 13, borderBottom: '2px solid var(--ink, #171008)' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 27, fontWeight: 700, margin: 0, lineHeight: 1 }}>Browse by Category</h2>
          <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--text-muted, #8A7D6F)', marginTop: 7 }}>7 categories &middot; pick one to filter the index</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14, marginTop: 18 }}>
          {CATS.map((c) => (
            <CategoryTile key={c.category} {...c} onClick={() => onPick && onPick(c.category)} />
          ))}
        </div>
      </main>
    </div>
  );
}
