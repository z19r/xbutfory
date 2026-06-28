import React from 'react';

/**
 * The primary nav tab bar (Latest / Trending / Top Voted / Categories / …).
 * Sticky band with a hairline top edge and a 1.5px ink bottom rule; the active
 * tab carries an accent underline.
 */
export function NavTabs({ tabs = [], active, onSelect, sticky = true, style, ...rest }) {
  return (
    <nav
      style={{
        position: sticky ? 'sticky' : 'static', top: 0, zIndex: 100,
        background: 'var(--paper, #F3EDE3)', borderTop: '1px solid var(--border-nav-top, #E0D6C4)',
        borderBottom: '1.5px solid var(--ink, #171008)', ...style,
      }}
      {...rest}
    >
      <div style={{ maxWidth: 'var(--content-max, 1040px)', margin: '0 auto', padding: '0 var(--page-gutter, 24px)', display: 'flex', gap: 24, overflowX: 'auto' }}>
        {tabs.map((t) => {
          const key = t.key || t.label;
          const on = key === active;
          return (
            <button
              key={key}
              onClick={() => onSelect && onSelect(key)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "var(--font-sans, 'Outfit', sans-serif)", fontSize: 14,
                fontWeight: on ? 600 : 400, color: on ? 'var(--ink, #171008)' : 'var(--text-muted, #8A7D6F)',
                padding: '14px 2px', borderBottom: `2px solid ${on ? 'var(--accent, #C93B1B)' : 'transparent'}`,
                whiteSpace: 'nowrap', transition: 'color .15s, border-color .15s', flexShrink: 0,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
