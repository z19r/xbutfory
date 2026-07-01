import React from 'react';

const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";
const MONO = "var(--font-mono, 'Space Mono', monospace)";

function gel(base) {
  return `linear-gradient(180deg, rgba(255,255,255,.32), rgba(255,255,255,.04) 46%, rgba(0,0,0,.07)), ${base}`;
}

/**
 * Weekly-digest email capture — a titled sidebar card with a pitch line, an
 * inset email field and a Subscribe button. The button can be a glossy "gel"
 * surface (`gel`) for the maximal look or a flat token surface.
 */
export function DigestSignup({
  title = 'WEEKLY DIGEST',
  pitch = 'The 10 best new “X but for Y” sites, every Sunday. No spam, no tracking.',
  placeholder = 'you@domain.com',
  cta = 'Subscribe',
  gel: glossy = false,
  onSubmit,
  style,
  ...rest
}) {
  const [email, setEmail] = React.useState('');
  return (
    <section style={{ background: 'linear-gradient(180deg,var(--surface-card),#FCFAF5)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-card, 10px)', boxShadow: 'var(--shadow-card)', padding: 18, ...style }} {...rest}>
      {title ? <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '.14em', color: 'var(--ink)', borderBottom: '1.5px solid var(--ink)', paddingBottom: 9, marginBottom: 13 }}>{title}</div> : null}
      <p style={{ margin: '0 0 12px', fontFamily: SANS, fontSize: 13, fontWeight: 300, lineHeight: 1.5, color: 'var(--text-body)' }}>{pitch}</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '10px 12px', background: 'var(--surface-sunken)', border: '1px solid var(--border-input)', borderRadius: 7, boxShadow: 'var(--shadow-inset)', fontFamily: SANS, fontSize: 13, color: 'var(--ink)', marginBottom: 8, boxSizing: 'border-box' }}
      />
      <button
        onClick={() => onSubmit && onSubmit(email)}
        style={{ width: '100%', padding: '10px 0', cursor: 'pointer', fontFamily: SANS, fontSize: 14, fontWeight: 600, color: 'var(--ink)', borderRadius: 7, border: '1px solid var(--border-input)', background: glossy ? gel('linear-gradient(180deg,#fff,#EDE5D7)') : 'var(--surface-rail)', boxShadow: '0 1px 2px rgba(74,52,28,.08)' }}
      >{cta}</button>
    </section>
  );
}
