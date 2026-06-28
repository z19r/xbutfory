import React from 'react';

/**
 * The masthead search field — near-white, inset, with a magnifier glyph.
 * Controlled: pass `value` and `onChange`.
 */
export function SearchInput({ value, onChange, placeholder = 'Search the index\u2026', style, ...rest }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '11px 14px 11px 38px', background: 'var(--surface-card, #FFFDFA)',
          border: '1px solid var(--border-input, #D8CDB9)', borderRadius: 'var(--radius-input, 8px)',
          boxShadow: 'var(--shadow-inset)', fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
          fontSize: 14, color: 'var(--ink, #171008)', display: 'block', boxSizing: 'border-box',
        }}
        {...rest}
      />
      <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint, #B5AB9B)', fontSize: 16, pointerEvents: 'none', lineHeight: 1 }}>&#9906;</span>
    </div>
  );
}
