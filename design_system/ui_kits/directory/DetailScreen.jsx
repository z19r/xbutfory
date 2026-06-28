import React from 'react';
import { Masthead } from './Masthead.jsx';
import { NavTabs } from '../../components/navigation/NavTabs.jsx';
import { Tag } from '../../components/core/Tag.jsx';
import { Button } from '../../components/core/Button.jsx';

const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SERIF = "var(--font-display, 'Newsreader', serif)";
const TABS = [
  { key: 'latest', label: 'Latest' }, { key: 'trending', label: 'Trending' },
  { key: 'top', label: 'Top Voted' }, { key: 'categories', label: 'Categories' },
  { key: 'random', label: 'Random' }, { key: 'submit', label: 'Submit' },
];

const DEFAULT = {
  x: 'Notion', y: 'Recipes', name: 'Prep', votes: '1.5k', category: 'saas',
  categoryLabel: 'SAAS', categoryName: 'SaaS & Productivity', ago: '2 days ago', submitter: '@hungrybuilder',
  tagline: 'Your kitchen\u2019s second brain',
  pitch: 'Linked databases for ingredients, shopping lists, and meal plans \u2014 relational data, finally serving your dinner parties. Scales any recipe to any guest count automatically.',
  why: 'Home cooks are obsessive organizers with zero good tools. Prep speaks their language without making them learn database theory.',
};

const KLBL = { fontFamily: MONO, fontSize: 9, color: 'var(--text-muted, #8A7D6F)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 14px' };
const MC = { padding: '14px 16px', borderBottom: '1px solid var(--border-soft, #E5DCCD)' };
const MCK = { fontFamily: MONO, fontSize: 9, color: 'var(--text-muted, #8A7D6F)', letterSpacing: '0.06em', marginBottom: 4 };

/**
 * The entry detail screen: shared masthead + nav, a vote column, the big
 * "X but for Y" title with category badge, the pitch / why-it-works prose, and
 * the formula meta-card. Pass an `entry` or it falls back to a sample.
 */
export function DetailScreen({ entry = DEFAULT, onBack }) {
  const e = entry;
  return (
    <div style={{ color: 'var(--ink, #171008)', fontFamily: "var(--font-sans, 'Outfit', sans-serif)" }}>
      <Masthead />
      <NavTabs tabs={TABS} active="latest" />
      <main style={{ maxWidth: 'var(--content-max, 1040px)', margin: '0 auto', padding: '34px 24px 90px' }}>
        <button onClick={onBack} style={{ fontFamily: MONO, fontSize: 10, color: 'var(--text-muted, #8A7D6F)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 34, letterSpacing: '0.06em', textTransform: 'uppercase' }}>&larr; All entries</button>

        <div style={{ display: 'grid', gridTemplateColumns: '74px 1fr', gap: 34, alignItems: 'start', marginBottom: 46 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <button style={{ background: 'none', border: '2px solid var(--border-rule, #D4C9B8)', color: 'var(--text-muted, #8A7D6F)', padding: '11px 12px', fontSize: 15, width: '100%', borderRadius: 6, lineHeight: 1, cursor: 'pointer' }}>&#9650;</button>
            <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 34, lineHeight: 1, margin: '7px 0 2px' }}>{e.votes}</div>
            <div style={{ fontFamily: MONO, fontSize: 9, color: 'var(--text-muted, #8A7D6F)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>votes</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: MONO, fontSize: 9, padding: '3px 8px', background: `var(--cat-${e.category}, #6A3D9E)`, color: '#fff', letterSpacing: '0.05em', borderRadius: 3 }}>{e.categoryLabel}</span>
              <span style={{ fontFamily: MONO, fontSize: 10, color: 'var(--text-muted, #8A7D6F)', letterSpacing: '0.04em' }}>submitted {e.ago}</span>
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.6vw,50px)', fontWeight: 700, margin: '0 0 10px', lineHeight: 1.06 }}>
              {e.x}<span style={{ color: 'var(--text-soft, #9A8C7B)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.6em' }}> but for </span>{e.y}
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-muted, #8A7D6F)', margin: '0 0 26px', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.4 }}>{e.tagline}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Button variant="dark">Visit {e.name} &#8599;</Button>
              <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--text-faint, #B5AB9B)' }}>by {e.submitter}</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1.5px solid var(--border-rule, #D4C9B8)', paddingTop: 30, display: 'grid', gridTemplateColumns: '1fr 220px', gap: 48 }}>
          <div>
            <p style={KLBL}>The pitch</p>
            <p style={{ fontSize: 17, lineHeight: 1.8, margin: '0 0 30px', fontWeight: 300 }}>{e.pitch}</p>
            <p style={KLBL}>Why it works</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-body-soft, #5A5048)', margin: 0, fontWeight: 300 }}>{e.why}</p>
          </div>
          <div>
            <div style={{ border: '1px solid var(--border-card, #EDE4D5)', background: 'var(--surface-card, #FFFDFA)', borderRadius: 10, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
              <div style={MC}><div style={MCK}>THE FORMULA</div><div style={{ fontSize: 14, fontWeight: 500 }}>{e.x} <span style={{ color: 'var(--text-muted, #8A7D6F)' }}>&times;</span> {e.y}</div></div>
              <div style={MC}><div style={MCK}>CATEGORY</div><div style={{ fontSize: 14, fontWeight: 500 }}>{e.categoryName}</div></div>
              <div style={{ padding: '14px 16px' }}><div style={MCK}>STATUS</div><div style={{ fontSize: 14, fontWeight: 500, color: 'var(--status-live, #2A7A56)' }}>&#9679; Live &amp; launched</div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
