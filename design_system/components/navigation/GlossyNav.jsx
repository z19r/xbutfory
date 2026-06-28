import React from 'react';

const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";
const MONO = "var(--font-mono, 'Space Mono', monospace)";

/**
 * The maximal-mode primary navigation: a glossy periwinkle gel bar with a
 * raised, inset-lit active tab. The loud counterpart to the calm NavTabs
 * (which uses a hairline accent underline). Sticky by default.
 */
export function GlossyNav({ items = [], active, onSelect, note, maxWidth = 1200, sticky = true, style, ...rest }) {
  return (
    <nav
      style={{
        position: sticky ? 'sticky' : 'static', top: 0, zIndex: 100,
        background: 'linear-gradient(180deg,#CBDCF5,#A8C0E9 55%,#8FB0E2)',
        borderTop: '1px solid #E2EAF8', borderBottom: '1px solid #6E8FC6',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.65), 0 1px 3px rgba(40,70,120,.16)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ maxWidth, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '0 28px' }}>
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
          {items.map((it) => {
            const label = typeof it === 'string' ? it : it.label;
            const on = label === active;
            return (
              <button
                key={label}
                onClick={() => onSelect && onSelect(label)}
                style={{
                  cursor: 'pointer', border: on ? '1px solid #B7C8E6' : '1px solid transparent',
                  fontFamily: SANS, fontSize: 14, fontWeight: on ? 700 : 500,
                  color: on ? '#233A63' : '#3A4E70', padding: '7px 16px', margin: '6px 0', borderRadius: 7, whiteSpace: 'nowrap',
                  background: on ? 'linear-gradient(180deg,#fff,#EAF0FB)' : 'transparent',
                  boxShadow: on ? '0 1px 2px rgba(40,70,120,.18), inset 0 1px 0 #fff' : 'none',
                }}
              >{label}</button>
            );
          })}
        </div>
        {note ? <span style={{ fontFamily: MONO, fontSize: 12, color: '#3A5C8C', whiteSpace: 'nowrap', letterSpacing: '.02em' }}>{note}</span> : null}
      </div>
    </nav>
  );
}
