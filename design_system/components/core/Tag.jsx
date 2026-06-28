import React from 'react';

const CAT = {
  dating:    'var(--cat-dating, #B5472D)',
  crm:       'var(--cat-crm, #2B5BA8)',
  discovery: 'var(--cat-discovery, #2A7A56)',
  saas:      'var(--cat-saas, #6A3D9E)',
  payments:  'var(--cat-payments, #1B8080)',
  social:    'var(--cat-social, #A07A18)',
  logistics: 'var(--cat-logistics, #9B5523)',
};

/**
 * Small monospace category tag (DATING, SAAS, …). The text takes the category
 * hue; the border is the same hue softened to ~45% so it never shouts.
 */
export function Tag({ category, color, children, style, ...rest }) {
  const c = color || CAT[category] || 'var(--text-muted, #8A7D6F)';
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: "var(--font-mono, 'Space Mono', monospace)",
        fontSize: 9,
        letterSpacing: '0.08em',
        padding: '3px 9px',
        border: `1px solid color-mix(in srgb, ${c} 45%, transparent)`,
        color: c,
        borderRadius: 'var(--radius-tag, 4px)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
