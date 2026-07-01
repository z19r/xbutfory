import React from 'react';

const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";

/**
 * A weighted tag cloud — the classic Web 2.0 sidebar widget. Each tag's
 * font-size and opacity scale with its `weight` (1–5), so popular tags read
 * loudest. Links are quiet periwinkle blue, not the brand accent.
 */
export function TagCloud({ tags = [], color = '#2B5BA8', onSelect, style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 11px', lineHeight: 1.4, ...style }} {...rest}>
      {tags.map((tag) => {
        const label = typeof tag === 'string' ? tag : tag.label;
        const w = typeof tag === 'string' ? 3 : (tag.weight || 3);
        return (
          <a
            key={label}
            href="#"
            onClick={(e) => { e.preventDefault(); onSelect && onSelect(label); }}
            style={{ fontFamily: SANS, fontSize: 11 + w * 2.6, fontWeight: w >= 4 ? 600 : 400, color, textDecoration: 'none', opacity: 0.6 + w * 0.08 }}
          >{label}</a>
        );
      })}
    </div>
  );
}
