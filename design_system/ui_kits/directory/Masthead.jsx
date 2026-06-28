import React from 'react';
import { MastheadBar } from '../../components/chrome/MastheadBar.jsx';
import { SearchInput } from '../../components/forms/SearchInput.jsx';
import { Button } from '../../components/core/Button.jsx';

/**
 * The directory masthead: the dark utility bar (MastheadBar) + eyebrow/wordmark
 * + the search / RSS / Submit action row. Shared across every screen.
 */
export function Masthead({ query, onQuery, onSubmit, onRss, onHome }) {
  return (
    <header>
      <MastheadBar />
      <div style={{ maxWidth: 'var(--content-max, 1040px)', margin: '0 auto', padding: '24px 24px 0' }}>
        <div style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: 12, letterSpacing: '0.32em', color: 'var(--text-muted, #8A7D6F)', marginBottom: 5 }}>THE DIRECTORY OF</div>
        <div onClick={onHome} style={{ fontFamily: "var(--font-display, 'Newsreader', serif)", fontWeight: 700, fontSize: 'clamp(44px, 6.6vw, 66px)', lineHeight: 0.9, letterSpacing: '-0.012em', cursor: 'pointer', userSelect: 'none' }}>
          X<span style={{ color: 'var(--accent, #E11D8F)' }}>but</span>forY.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
          <SearchInput value={query} onChange={onQuery} style={{ flex: 1, minWidth: 220 }} />
          <Button variant="secondary" icon="📡" onClick={onRss}>RSS</Button>
          <Button variant="primary" icon="+" onClick={onSubmit}>Submit a Site</Button>
        </div>
      </div>
    </header>
  );
}
