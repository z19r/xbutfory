import React from 'react';

const DEFAULTS = [
  { key: 'newest', label: 'Newest' },
  { key: 'hot', label: 'Hot' },
  { key: 'top', label: 'Top' },
];

/**
 * Segmented control on a sunken rail — used to sort the feed (Newest/Hot/Top).
 */
export function SortToggle({ value = 'newest', options = DEFAULTS, onChange, style, ...rest }) {
  return (
    <div style={{ display: 'inline-flex', gap: 2, background: 'var(--surface-rail, #E9E1D3)', padding: 3, borderRadius: 'var(--radius-input, 8px)', ...style }} {...rest}>
      {options.map((o) => {
        const active = o.key === value;
        return (
          <button
            key={o.key}
            onClick={() => onChange && onChange(o.key)}
            style={{
              fontFamily: "var(--font-sans, 'Outfit', sans-serif)", fontSize: 12, fontWeight: active ? 600 : 500,
              padding: '5px 13px', cursor: 'pointer', border: 'none', borderRadius: 'var(--radius-tag, 4px)',
              background: active ? 'var(--surface-card, #FFFDFA)' : 'transparent',
              color: active ? 'var(--ink, #171008)' : 'var(--text-muted, #8A7D6F)',
              boxShadow: active ? '0 1px 2px rgba(23,16,8,0.13)' : 'none', transition: 'all .15s',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
