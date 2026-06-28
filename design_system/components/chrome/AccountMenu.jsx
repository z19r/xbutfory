import React from 'react';

const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";
const MONO = "var(--font-mono, 'Space Mono', monospace)";

/**
 * The signed-in session control for the ink utility bar. Shows the account's
 * @handle (with a small avatar disc) and opens a paper dropdown of account
 * actions. This is what replaces the "Sign in · Create account" links once a
 * user is authenticated — submissions are account-gated, so the handle here is
 * the same one stamped on their listings.
 */
export function AccountMenu({
  handle,
  avatar,
  items = [
    { key: 'settings', label: 'Account settings' },
    { key: 'submissions', label: 'Manage submissions' },
    { key: 'signout', label: 'Sign out', divider: true },
  ],
  onSelect,
  open: controlledOpen,
  onToggle,
  style,
  ...rest
}) {
  const [uncontrolled, setUncontrolled] = React.useState(false);
  const open = controlledOpen != null ? controlledOpen : uncontrolled;
  const toggle = () => { onToggle ? onToggle(!open) : setUncontrolled(!open); };
  const initial = (handle || '?').replace('@', '').charAt(0).toUpperCase();

  return (
    <span style={{ position: 'relative', display: 'inline-block', ...style }} {...rest}>
      <button
        onClick={toggle}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'transparent',
          border: '1px solid rgba(255,255,255,.16)', borderRadius: 7, padding: '4px 10px 4px 5px',
          fontFamily: MONO, fontSize: 12, color: 'var(--on-dark, #F3EDE3)', letterSpacing: '.02em',
        }}
      >
        <span style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'grid', placeItems: 'center', fontFamily: SANS, fontSize: 11, fontWeight: 700, color: '#fff', background: avatar ? `center/cover url(${avatar})` : 'var(--accent, #E11D8F)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4)' }}>
          {avatar ? '' : initial}
        </span>
        {handle}
        <span aria-hidden="true" style={{ fontSize: 9, opacity: 0.7, marginLeft: 1 }}>&#9660;</span>
      </button>

      {open ? (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 196, zIndex: 200,
            background: 'var(--surface-card, #FFFDFA)', border: '1px solid var(--border-card, #EDE4D5)',
            borderRadius: 10, boxShadow: 'var(--shadow-card-hover)', padding: 6, overflow: 'hidden',
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '.12em', color: 'var(--text-faint, #B5AB9B)', padding: '7px 10px 6px' }}>SIGNED IN AS {handle}</div>
          {items.map((it) => (
            <React.Fragment key={it.key}>
              {it.divider ? <div style={{ height: 1, background: 'var(--border-rule, #E3D9C8)', margin: '5px 4px' }}></div> : null}
              <button
                onClick={() => { onSelect && onSelect(it.key); toggle(); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none',
                  background: 'transparent', borderRadius: 6, padding: '8px 10px', fontFamily: SANS, fontSize: 13,
                  color: it.key === 'signout' ? 'var(--text-muted, #8A7D6F)' : 'var(--ink, #171008)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-rail, #F0E9DC)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >{it.label}</button>
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </span>
  );
}
