import React from 'react';

/**
 * Inline monospace "code chip" for the literal phrase X but for Y (or any
 * snippet dropped into running serif copy). Sized in em so it tracks its
 * surrounding text.
 */
export function CodeChip({ children, style, ...rest }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-mono, 'Space Mono', monospace)",
        fontSize: '0.64em',
        background: 'var(--surface-sunken, #FBF9F4)',
        border: '1px solid var(--border-input, #D8CDB9)',
        borderRadius: 'var(--radius-tag, 4px)',
        padding: '2px 9px',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        ...style,
      }}
      {...rest}
    >
      {children}
    </code>
  );
}
