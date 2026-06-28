import React from 'react';

/**
 * The live "X but for Y" preview shown in the submit form — a dashed well that
 * renders the formula in serif as the user types X and Y.
 */
export function SubmitPreview({ x, y, label = 'Live preview', style, ...rest }) {
  return (
    <div
      style={{
        padding: '20px 22px', background: 'var(--surface-sunken, #FBF9F4)',
        border: '1.5px dashed var(--placeholder, #C0B6A6)', borderRadius: 'var(--radius-card, 10px)', ...style,
      }}
      {...rest}
    >
      <span style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: 9, color: 'var(--text-muted, #8A7D6F)', display: 'block', marginBottom: 9, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontFamily: "var(--font-display, 'Newsreader', serif)", fontSize: 27, fontWeight: 700, lineHeight: 1.2, color: 'var(--ink, #171008)' }}>
        {x || 'X'}<span style={{ color: 'var(--text-soft, #9A8C7B)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.66em' }}> but for </span>{y || 'Y'}
      </span>
    </div>
  );
}
