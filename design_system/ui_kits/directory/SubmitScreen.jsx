import React from 'react';
import { Masthead } from './Masthead.jsx';
import { NavTabs } from '../../components/navigation/NavTabs.jsx';
import { SubmitPreview } from '../../components/forms/SubmitPreview.jsx';
import { Button } from '../../components/core/Button.jsx';

const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SERIF = "var(--font-display, 'Newsreader', serif)";
const TABS = [
  { key: 'latest', label: 'Latest' }, { key: 'trending', label: 'Trending' },
  { key: 'top', label: 'Top Voted' }, { key: 'categories', label: 'Categories' },
  { key: 'random', label: 'Random' }, { key: 'submit', label: 'Submit' },
];

const LABEL = { display: 'block', fontFamily: MONO, fontSize: 9, letterSpacing: '0.07em', color: 'var(--text-muted, #8A7D6F)', textTransform: 'uppercase', marginBottom: 7 };
const INPUT = { width: '100%', padding: '11px 14px', background: 'var(--surface-card, #FFFDFA)', border: '1px solid var(--border-input, #D8CDB9)', borderRadius: 8, boxShadow: 'var(--shadow-inset)', fontFamily: "var(--font-sans, 'Outfit', sans-serif)", fontSize: 15, color: 'var(--ink, #171008)', boxSizing: 'border-box' };

function Field({ label, children }) {
  return <div style={{ marginBottom: 20 }}><label style={LABEL}>{label}</label>{children}</div>;
}

/**
 * The submit-a-site screen. The two top fields drive the live SubmitPreview,
 * and the listing tier flips the primary CTA label/color. A reference flow —
 * swap the no-op submit for a real handler.
 */
export function SubmitScreen() {
  const [x, setX] = React.useState('');
  const [y, setY] = React.useState('');
  const [tier, setTier] = React.useState('free');

  const tierCard = (key, title, sub) => {
    const on = tier === key;
    const accent = key === 'feat';
    return (
      <div onClick={() => setTier(key)} style={{ padding: '15px 16px', cursor: 'pointer', borderRadius: 6, border: `1.5px solid ${on ? (accent ? 'var(--accent, #C93B1B)' : 'var(--ink, #171008)') : 'var(--border-input, #D8CDB9)'}`, background: on ? (accent ? 'var(--accent, #C93B1B)' : 'var(--ink, #171008)') : 'var(--surface-card, #FFFDFA)', color: on ? '#fff' : 'var(--ink, #171008)' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 300 }}>{sub}</div>
      </div>
    );
  };

  return (
    <div style={{ color: 'var(--ink, #171008)', fontFamily: "var(--font-sans, 'Outfit', sans-serif)" }}>
      <Masthead />
      <NavTabs tabs={TABS} active="submit" />
      <main style={{ maxWidth: 600, margin: '0 auto', padding: '46px 24px 90px' }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 700, margin: '0 0 8px', lineHeight: 1.05 }}>Submit a Site</h1>
        <p style={{ color: 'var(--text-muted, #8A7D6F)', margin: '0 0 36px', fontWeight: 300 }}>Free to list in the directory. $1.99 buys a featured homepage spot.</p>

        <Field label="The X — what existing product inspired it?"><input style={INPUT} value={x} onChange={(e) => setX(e.target.value)} placeholder="Tinder, Salesforce, Notion…" /></Field>
        <Field label="The Y — what oddly-specific niche does it serve?"><input style={INPUT} value={y} onChange={(e) => setY(e.target.value)} placeholder="Dog parks, lemonade stands…" /></Field>

        <div style={{ marginBottom: 22 }}><SubmitPreview x={x} y={y} /></div>

        <Field label="Product name"><input style={INPUT} placeholder="Floormate, LightSeek, Squeeze…" /></Field>
        <Field label="Product URL"><input style={INPUT} placeholder="https://…" /></Field>

        <div style={{ marginBottom: 28 }}>
          <label style={LABEL}>Listing type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {tierCard('free', 'Free listing', 'Indexed within 24h')}
            {tierCard('feat', 'Featured — $1.99', 'Homepage spot + boost')}
          </div>
        </div>

        <Button variant={tier === 'feat' ? 'primary' : 'dark'} trailingArrow style={{ width: '100%', justifyContent: 'center', padding: 14 }}>
          {tier === 'feat' ? 'Launch for $1.99' : 'Submit for free'}
        </Button>
        <p style={{ fontFamily: MONO, fontSize: 10, color: 'var(--text-faint, #B5AB9B)', textAlign: 'center', margin: '14px 0 0' }}>no account needed &middot; no spam &middot; takes 30 seconds</p>
      </main>
    </div>
  );
}
