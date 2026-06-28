import React from 'react';

const CAT = {
  dating: 'var(--cat-dating, #B5472D)', crm: 'var(--cat-crm, #2B5BA8)',
  discovery: 'var(--cat-discovery, #2A7A56)', saas: 'var(--cat-saas, #6A3D9E)',
  payments: 'var(--cat-payments, #1B8080)', social: 'var(--cat-social, #A07A18)',
  logistics: 'var(--cat-logistics, #9B5523)',
};

/**
 * A category tile for the "Browse by Category" grid: hue chip + short code +
 * count on top, the full category name in serif, and a sample of entries.
 */
export function CategoryTile({ name, short, count, sample, category, color, onClick, style, ...rest }) {
  const c = color || CAT[category] || 'var(--text-muted, #8A7D6F)';
  return (
    <div
      onClick={onClick}
      style={{
        padding: 18, background: 'var(--surface-card, #FFFDFA)',
        border: '1px solid var(--border-card, #EDE4D5)', borderRadius: 'var(--radius-card, 10px)',
        cursor: 'pointer', boxShadow: 'var(--shadow-tile)',
        transition: 'border-color .18s, box-shadow .18s, transform .18s', ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 11 }}>
        <span style={{ width: 10, height: 10, background: c, borderRadius: 2, flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: 9, letterSpacing: '0.08em', color: c }}>{short}</span>
        <span style={{ marginLeft: 'auto', fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: 11, color: 'var(--text-faint, #B5AB9B)' }}>{count}</span>
      </div>
      <div style={{ fontFamily: "var(--font-display, 'Newsreader', serif)", fontSize: 19, fontWeight: 600, color: 'var(--ink, #171008)', lineHeight: 1.1 }}>{name}</div>
      {sample ? <div style={{ marginTop: 8, fontFamily: "var(--font-sans, 'Outfit', sans-serif)", fontSize: 12, fontWeight: 300, color: 'var(--text-soft, #9A8C7B)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sample}</div> : null}
    </div>
  );
}
