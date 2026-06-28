import React from 'react';
import { Masthead } from './Masthead.jsx';
import { NavTabs } from '../../components/navigation/NavTabs.jsx';
import { SortToggle } from '../../components/forms/SortToggle.jsx';
import { EntryCard } from '../../components/cards/EntryCard.jsx';
import { CodeChip } from '../../components/core/CodeChip.jsx';
import { EmptyState } from '../../components/feedback/EmptyState.jsx';

const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SERIF = "var(--font-display, 'Newsreader', serif)";

const TABS = [
  { key: 'latest', label: 'Latest' }, { key: 'trending', label: 'Trending' },
  { key: 'top', label: 'Top Voted' }, { key: 'categories', label: 'Categories' },
  { key: 'random', label: 'Random' }, { key: 'submit', label: 'Submit' },
];

const ENTRIES = [
  { index: '#001', x: 'Uber', y: 'Horses', votes: '1.1k', category: 'logistics', categoryLabel: 'SERVICES', submitter: '@trailblazer', ago: 'yesterday', stamp: 'NEW', description: 'Request horse transport in places cars literally cannot reach. Big in Appalachian trail towns and rural Montana.' },
  { index: '#002', x: 'Stripe', y: 'Lemonade Stands', votes: '923', category: 'payments', categoryLabel: 'FINANCE', submitter: '@dadof3', ago: 'yesterday', stamp: 'NEW', description: 'Tap-to-pay for kids aged 6–16, where a parent approves every transaction. Entrepreneurship without a shoebox of damp dollar bills.' },
  { index: '#003', x: 'Notion', y: 'Recipes', votes: '1.5k', category: 'saas', categoryLabel: 'SAAS', submitter: '@hungrybuilder', ago: '2 days ago', stamp: 'HOT', description: 'Linked databases for ingredients, shopping lists and meal plans — relational data, finally serving your dinner parties.' },
  { index: '#004', x: 'Kayak', y: 'Restaurant Tables', votes: '891', category: 'discovery', categoryLabel: 'DISCOVER', submitter: '@foodie', ago: '5 days ago', stamp: 'HOT', description: 'Compare availability and pricing across every reservation platform at once — OpenTable, Resy, Tock — in one grid.' },
];

// Two paid placements: one pinned to the top (one at a time), one spotlight mid-feed.
const PINNED = { sponsored: 'pinned', x: 'Linear', y: 'Wedding Planning', votes: '2.3k', category: 'saas', categoryLabel: 'SAAS', submitter: '@altar_ego', ago: '1 day ago', description: 'Issue tracking, but every bug is a seating-chart crisis. Roadmaps for the aisle, sprints for the caterer.' };
const SPOTLIGHT = { sponsored: 'spotlight', x: 'Tinder', y: 'the Building You Live In', votes: '847', category: 'dating', categoryLabel: 'DATING', submitter: '@apt_4b', ago: '2 days ago', stamp: 'HOT', description: 'Why scroll through a whole city of strangers when the love of your life might share your elevator? Floormate matches verified residents inside your building only.' };
const FEED = [PINNED, ENTRIES[0], ENTRIES[1], SPOTLIGHT, ENTRIES[2], ENTRIES[3]];

/**
 * The directory home screen: masthead, sticky nav, editorial hero, stat block,
 * and the Latest Submissions feed. A reference composition of the kit's
 * components — wire the handlers to real state in production.
 */
export function FeedScreen() {
  const [query, setQuery] = React.useState('');
  const [tab, setTab] = React.useState('latest');
  const [sort, setSort] = React.useState('newest');
  const [voted, setVoted] = React.useState({});

  const q = query.toLowerCase().trim();
  const visible = FEED.filter((e) => !q || (e.x + ' ' + e.y + ' ' + e.description + ' ' + (e.categoryLabel || '')).toLowerCase().includes(q));
  let n = 0;
  const numbered = visible.map((e) => (e.sponsored === 'pinned' ? { ...e, index: '\u2605 PINNED' } : { ...e, index: '#' + String(++n).padStart(3, '0') }));

  return (
    <div style={{ minHeight: '100vh', color: 'var(--ink, #171008)', fontFamily: "var(--font-sans, 'Outfit', sans-serif)" }}>
      <Masthead query={query} onQuery={(e) => setQuery(e.target.value)} />
      <NavTabs tabs={TABS} active={tab} onSelect={setTab} />

      <main style={{ maxWidth: 'var(--content-max, 1040px)', margin: '0 auto', padding: '34px 24px 90px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: MONO, fontSize: 12, letterSpacing: '0.12em', color: 'var(--text-muted, #8A7D6F)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent, #C93B1B)', display: 'inline-block' }} />
          VOL. 01 &middot; ISSUE 26 &middot; JUN 2026
        </div>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 500, margin: '14px 0 0', lineHeight: 1.2, letterSpacing: '-0.005em', maxWidth: 880 }}>
          A hand-curated index of <span style={{ fontStyle: 'italic' }}>newly launched</span> websites that pitch themselves as <CodeChip>X but for Y</CodeChip>. Updated daily, voted by humans.
        </h1>
        <div style={{ height: 3, width: 'clamp(150px,26%,240px)', marginTop: 20, borderRadius: 2, background: 'var(--spectral)' }} />

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: 30, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', color: 'var(--text-muted, #8A7D6F)', marginBottom: 4 }}>IN THE INDEX</div>
            <div style={{ fontFamily: SERIF, fontSize: 'clamp(46px,6.6vw,66px)', fontWeight: 700, lineHeight: 0.82 }}>18</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 7 }}>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--accent, #C93B1B)' }}>&#9679; 2 new today</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--text-muted, #8A7D6F)' }}>7 categories &middot; voted by humans</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginTop: 26, paddingBottom: 13, borderBottom: '2px solid var(--ink, #171008)' }}>
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize: 27, fontWeight: 700, margin: 0, lineHeight: 1 }}>Latest Submissions</h2>
            <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--text-muted, #8A7D6F)', marginTop: 7 }}>Showing 1&ndash;{visible.length} of 18</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ fontFamily: MONO, fontSize: 10, color: 'var(--text-faint, #B5AB9B)', letterSpacing: '0.08em' }}>SORT</span>
            <SortToggle value={sort} onChange={setSort} />
          </div>
        </div>

        {visible.length === 0 ? (
          <EmptyState action="Be the first">No “{query} but for ___” in the index.</EmptyState>
        ) : numbered.map((e) => (
          <EntryCard
            key={e.x + e.y}
            {...e}
            voted={!!voted[e.x]}
            onVote={() => setVoted((v) => ({ ...v, [e.x]: !v[e.x] }))}
            onView={() => {}}
          />
        ))}
      </main>
    </div>
  );
}
