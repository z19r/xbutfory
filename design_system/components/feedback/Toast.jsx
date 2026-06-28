import React from 'react';

/**
 * The deadpan ink toast. The directory fixes it to the bottom-right and slides
 * it in; this component is just the printed-sticker surface — position it where
 * you need (e.g. wrap in a fixed container).
 */
export function Toast({ children, style, ...rest }) {
  return (
    <div
      style={{
        display: 'inline-block', background: 'var(--ink, #171008)', color: 'var(--on-dark, #F3EDE3)',
        padding: '13px 20px', fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: 11,
        maxWidth: 330, lineHeight: 1.55, letterSpacing: '0.01em',
        boxShadow: 'var(--shadow-toast)', borderRadius: 'var(--radius-toast, 4px)', ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
