import React from 'react';

const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";
const MONO = "var(--font-mono, 'Space Mono', monospace)";

function gel(base) {
  return `linear-gradient(180deg, rgba(255,255,255,.32), rgba(255,255,255,.04) 46%, rgba(0,0,0,.07)), ${base}`;
}

/**
 * The full-bleed "AS FEATURED ON" social-proof strip — a sunken band of glossy
 * gel badges, capped on the right with a retro validity stamp
 * ("valid XHTML 1.0 · RSS 2.0"). A signature blogosphere flourish.
 */
export function FeaturedBar({
  label = 'AS FEATURED ON',
  badges = [],
  note = 'valid XHTML 1.0 · RSS 2.0',
  gel: glossy = true,
  maxWidth = 1200,
  style,
  ...rest
}) {
  const accent = 'var(--accent, #E11D8F)';
  return (
    <div style={{ borderTop: '1px solid var(--border-rule)', borderBottom: '1px solid var(--border-rule)', background: 'var(--surface-sunken)', ...style }} {...rest}>
      <div style={{ maxWidth, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', padding: '14px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.12em', color: 'var(--text-muted)' }}>{label}</span>
          {badges.map((b) => (
            <span key={b} style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: '#fff', padding: '4px 11px', borderRadius: 5, background: glossy ? gel(accent) : accent, border: '1px solid rgba(120,10,70,.4)', boxShadow: glossy ? 'inset 0 1px 0 rgba(255,255,255,.4)' : 'none', whiteSpace: 'nowrap' }}>{b}</span>
          ))}
        </div>
        {note ? <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--text-faint)', letterSpacing: '.04em' }}>{note}</span> : null}
      </div>
    </div>
  );
}
