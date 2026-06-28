/* XbutforY maximal-home — presentational components. Reads window.XBFY data.
   Exports all components to window at the end for cross-Babel-script sharing. */
const { useState } = React;

const SERIF = "var(--font-display, 'Newsreader', Georgia, serif)";
const MONO  = "var(--font-mono, 'Space Mono', monospace)";
const SANS  = "var(--font-sans, 'Outfit', system-ui, sans-serif)";

/* ---- 12-point sunburst clip-path (generated once) ---- */
const STAR_CLIP = (() => {
  const pts = 12, ro = 50, ri = 35, cx = 50, cy = 50, out = [];
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? ro : ri;
    const a = (Math.PI / pts) * i - Math.PI / 2;
    out.push(`${(cx + r * Math.cos(a)).toFixed(2)}% ${(cy + r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${out.join(',')})`;
})();

/* Glossy "gel" surface used on primary buttons & badges */
function gel(base) {
  return `linear-gradient(180deg, rgba(255,255,255,.32), rgba(255,255,255,.04) 46%, rgba(0,0,0,.07)), ${base}`;
}

/* ---------- Beta sunburst badge ---------- */
function BetaBurst({ size = 78, top = -14, right = -10 }) {
  return (
    <span style={{ position: 'absolute', top, right, width: size, height: size, transform: 'rotate(12deg)', zIndex: 3, pointerEvents: 'none' }}>
      <span style={{ position: 'absolute', inset: 0, clipPath: STAR_CLIP,
        background: 'radial-gradient(circle at 38% 32%, #FFC24B, #F08A1D 62%, #D2670E)',
        boxShadow: '0 2px 5px rgba(120,60,0,.4)' }}></span>
      <span style={{ position: 'absolute', inset: 0, clipPath: STAR_CLIP, mixBlendMode: 'screen',
        background: 'radial-gradient(circle at 38% 30%, rgba(255,255,255,.7), transparent 45%)' }}></span>
      <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
        transform: 'rotate(-19deg)', fontFamily: SERIF, fontWeight: 700, fontStyle: 'italic',
        fontSize: size * 0.27, color: '#fff', letterSpacing: '.02em',
        textShadow: '0 1px 1px rgba(140,70,0,.55)' }}>BETA</span>
    </span>
  );
}

/* ---------- Wordmark ---------- */
function Wordmark({ size = 64, t = {}, footer = false }) {
  const acc = 'var(--accent)';
  const base = footer ? 'var(--on-dark)' : 'var(--ink)';
  const yAcc = (t.wordmarkAccent || 'butY') === 'butY';
  const letter = (txt, on) => <span style={{ color: on ? acc : base }}>{txt}</span>;
  return (
    <span style={{ position: 'relative', display: 'inline-block', fontFamily: SERIF, fontWeight: 700,
      fontSize: size, lineHeight: .9, letterSpacing: '-.014em' }}>
      {!footer && (t.ghost !== false) && (
        <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, transform: 'translate(3px, 7px)',
          color: 'var(--ink)', opacity: .07, whiteSpace: 'nowrap', userSelect: 'none' }}>
          X<span>but</span>for<span>Y.</span>
        </span>
      )}
      <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
        {letter('X', false)}{letter('but', true)}{letter('for', false)}{letter('Y', yAcc)}{letter('.', yAcc)}
      </span>
      {!footer && (t.beta !== false) && <BetaBurst size={size * 1.18} top={-size * 0.22} right={-size * 0.3} />}
    </span>
  );
}

/* ---------- Top utility bar ---------- */
function UtilityBar() {
  const link = { color: 'var(--on-dark-muted)', textDecoration: 'none', marginLeft: 22, fontFamily: MONO, fontSize: 12 };
  return (
    <div style={{ background: 'var(--ink)', color: 'var(--on-dark-muted)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 28px', fontFamily: MONO, fontSize: 12, letterSpacing: '.02em' }}>
        <span><span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', marginRight: 9, verticalAlign: 'middle', animation: 'xbfy-pulse 2.4s ease-in-out infinite' }}></span>est. 2026 — vol. 1, issue 26</span>
        <span><a href="#" style={link}>Sign in</a><a href="#" style={{ ...link, color: 'var(--on-dark)' }}>Create account</a></span>
      </div>
    </div>
  );
}

/* ---------- Masthead (eyebrow + wordmark + search + actions) ---------- */
function Masthead({ t }) {
  const accent = 'var(--accent)';
  const submitStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 9, whiteSpace: 'nowrap', cursor: 'pointer',
    fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#fff', padding: '12px 20px', borderRadius: 9,
    border: '1px solid ' + (t.gel ? 'rgba(120,10,70,.5)' : 'transparent'),
    background: t.gel ? gel(accent) : accent,
    boxShadow: t.gel ? 'var(--shadow-button), inset 0 1px 0 rgba(255,255,255,.45)' : 'var(--shadow-button)',
  };
  return (
    <header style={{ maxWidth: 1200, margin: '0 auto', padding: '26px 28px 0' }}>
      <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '.32em', color: 'var(--text-muted)', marginBottom: 8 }}>THE DIRECTORY OF</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ cursor: 'pointer' }}><Wordmark size={66} t={t} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 6, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontSize: 16, pointerEvents: 'none' }}>⚲</span>
            <input placeholder="Search the index…" style={{ width: 330, maxWidth: '46vw', padding: '12px 14px 12px 38px',
              background: 'var(--surface-card)', border: '1px solid var(--border-input)', borderRadius: 9,
              boxShadow: 'var(--shadow-inset)', fontFamily: SANS, fontSize: 14, color: 'var(--ink)' }} />
          </div>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: SANS, fontSize: 14,
            fontWeight: 500, color: 'var(--ink)', padding: '11px 16px', borderRadius: 9, border: '1px solid var(--border-input)',
            background: t.gel ? 'linear-gradient(180deg,#fff,#F3EDE3)' : 'var(--surface-card)', boxShadow: '0 1px 2px rgba(74,52,28,.06)' }}>
            <span style={{ color: accent, fontSize: 15 }}>⌁</span> RSS
          </button>
          <button style={submitStyle}><span style={{ fontSize: 18, marginTop: -2 }}>+</span> Submit a Site</button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Navigation ---------- */
function NavBar({ t, active, onNav }) {
  const glossy = t.glossyNav !== false;
  const barStyle = glossy
    ? { backgroundColor: '#9FBEEA', background: 'linear-gradient(180deg,#BAD2F4,#8FB4EA 52%,#6E9CE0)', borderTop: '1px solid #DCE8FB',
        borderBottom: '1px solid #4E78BE', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7), 0 2px 4px rgba(30,60,120,.22)' }
    : { background: 'var(--paper)', borderTop: '1px solid var(--border-nav-top)', borderBottom: '1.5px solid var(--ink)' };
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, marginTop: 18, ...barStyle }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '0 28px' }}>
        <div style={{ display: 'flex', gap: glossy ? 4 : 26, overflowX: 'auto' }}>
          {window.XBFY.NAV.map((label) => {
            const on = label === active;
            if (glossy) {
              return (
                <button key={label} onClick={() => onNav(label)} style={{ cursor: 'pointer', border: '1px solid transparent', background: 'transparent',
                  fontFamily: SANS, fontSize: 14, fontWeight: on ? 700 : 600, color: on ? '#16315F' : '#274270', textShadow: on ? 'none' : '0 1px 0 rgba(255,255,255,.5)',
                  padding: '7px 16px', margin: '7px 0', borderRadius: 8, whiteSpace: 'nowrap',
                  ...(on ? { background: 'linear-gradient(180deg,#fff,#DCEAFC 60%,#C3DAF6)', border: '1px solid #9CBCE8',
                    boxShadow: '0 1px 2px rgba(30,60,120,.28), inset 0 1px 0 #fff' } : {}) }}>{label}</button>
              );
            }
            return (
              <button key={label} onClick={() => onNav(label)} style={{ cursor: 'pointer', border: 'none', background: 'none',
                fontFamily: SANS, fontSize: 14, fontWeight: on ? 600 : 400, color: on ? 'var(--ink)' : 'var(--text-muted)',
                padding: '14px 2px', borderBottom: '2px solid ' + (on ? 'var(--accent)' : 'transparent'), whiteSpace: 'nowrap' }}>{label}</button>
            );
          })}
        </div>
        <span style={{ fontFamily: MONO, fontSize: 12, color: glossy ? '#1F3A66' : 'var(--text-muted)', textShadow: glossy ? '0 1px 0 rgba(255,255,255,.4)' : 'none', whiteSpace: 'nowrap', letterSpacing: '.02em' }}>1,024 sites indexed</span>
      </div>
    </nav>
  );
}

Object.assign(window, { BetaBurst, Wordmark, UtilityBar, Masthead, NavBar, gel, SERIF, MONO, SANS });
