import React from 'react';

const MONO = "var(--font-mono, 'Space Mono', monospace)";

/**
 * The dark utility bar that caps the page: a pulsing live dot + masthead
 * "est." line on the left, account links on the right. Full-bleed ink.
 */
export function MastheadBar({
  issue = 'est. 2026 \u2014 vol. 1, issue 26',
  links = [{ label: 'Sign in' }, { label: 'Create account', strong: true }],
  onLink,
}) {
  return (
    <div style={{ background: 'var(--ink, #171008)', color: 'var(--on-dark-muted, #C9BCA9)' }}>
      <div style={{ maxWidth: 'var(--content-max, 1040px)', margin: '0 auto', padding: '9px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, fontFamily: MONO, fontSize: 11, letterSpacing: '0.03em' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent, #C93B1B)', display: 'inline-block' }} />
          {issue}
        </span>
        <span style={{ display: 'flex', gap: 20, flexShrink: 0 }}>
          {links.map((l, i) => (
            <button
              key={i}
              onClick={() => onLink && onLink(l.label)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: MONO, fontSize: 11, padding: 0, letterSpacing: '0.03em', color: l.strong ? 'var(--on-dark, #F3EDE3)' : 'var(--on-dark-muted, #C9BCA9)' }}
            >
              {l.label}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}
