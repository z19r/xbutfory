import React from 'react';

/**
 * The directory's empty state — serif headline + a mono line, optionally with
 * an accent call-to-action ("Be the first →").
 */
export function EmptyState({ title = 'Nothing here yet.', children, action, onAction, style, ...rest }) {
  return (
    <div style={{ padding: '70px 0', textAlign: 'center', ...style }} {...rest}>
      <p style={{ fontFamily: "var(--font-display, 'Newsreader', serif)", fontSize: 25, fontWeight: 700, margin: '0 0 6px', color: 'var(--ink, #171008)' }}>{title}</p>
      <p style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: 12, color: 'var(--text-muted, #8A7D6F)', margin: 0 }}>
        {children}
        {action ? <span onClick={onAction} style={{ color: 'var(--accent, #C93B1B)', cursor: 'pointer', textDecoration: 'underline', marginLeft: 6 }}>{action} &rarr;</span> : null}
      </p>
    </div>
  );
}
