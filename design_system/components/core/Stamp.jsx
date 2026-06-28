import React from 'react';

const COLORS = {
  NEW: 'var(--stamp-new, #C93B1B)',
  HOT: 'var(--stamp-hot, #B07A1A)',
};

/**
 * Rubber-stamp badge for an entry — NEW (fresh) or HOT (high engagement).
 * Slightly rotated, mono, hollow outline: it reads like an inked stamp.
 */
export function Stamp({ kind = 'NEW', children, style, ...rest }) {
  const color = COLORS[kind] || 'var(--ink, #171008)';
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: "var(--font-mono, 'Space Mono', monospace)",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: '0.12em',
        lineHeight: 1.1,
        padding: '3px 8px',
        border: `1.5px solid ${color}`,
        color,
        borderRadius: 'var(--radius-stamp, 3px)',
        transform: 'rotate(-3deg)',
        ...style,
      }}
      {...rest}
    >
      {children || kind}
    </span>
  );
}
