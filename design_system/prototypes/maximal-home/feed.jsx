/* XbutforY maximal-home — feed, sidebar, featured bar, footer. */
const SERIF2 = "var(--font-display, 'Newsreader', Georgia, serif)";
const MONO2  = "var(--font-mono, 'Space Mono', monospace)";
const SANS2  = "var(--font-sans, 'Outfit', system-ui, sans-serif)";

const CARD = {
  background: 'linear-gradient(180deg, var(--surface-card), #FBF7F0)',
  border: '1px solid var(--border-card)', borderRadius: 10, boxShadow: 'var(--shadow-card)',
};

/* ---------- Hero dek ---------- */
function HeroDek() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '34px 28px 30px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: MONO2, fontSize: 12, letterSpacing: '.12em', color: 'var(--text-muted)' }}>
        <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'xbfy-pulse 2.4s ease-in-out infinite' }}></span>
        VOL. 01 · ISSUE 26 · JUN 2026
      </div>
      <h1 style={{ fontFamily: SERIF2, fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 500, margin: '14px 0 0', lineHeight: 1.18, letterSpacing: '-.005em', maxWidth: 940, textWrap: 'pretty' }}>
        A hand-curated index of <i style={{ color: 'color-mix(in srgb, var(--accent) 78%, #5a1010)' }}>newly launched</i> websites that pitch themselves as <code style={{ fontFamily: MONO2, fontSize: '.62em', background: 'var(--surface-sunken)', border: '1px solid var(--border-input)', borderRadius: 5, padding: '3px 10px', whiteSpace: 'nowrap', verticalAlign: 'middle', color: 'var(--accent)' }}>X but for Y</code>. Updated daily, voted by humans.
      </h1>
      <div style={{ height: 3, width: 'clamp(150px,24%,250px)', marginTop: 22, borderRadius: 2, background: 'var(--spectral)' }}></div>
    </div>
  );
}

/* ---------- Stamp ---------- */
function Stamp({ kind }) {
  const c = kind === 'HOT' ? 'var(--stamp-hot)' : 'var(--accent)';
  return <span style={{ fontFamily: MONO2, fontWeight: 700, fontSize: 10, letterSpacing: '.12em', padding: '3px 8px', border: '1.5px solid ' + c, borderRadius: 3, color: c, transform: 'rotate(-3deg)', display: 'inline-block' }}>{kind}</span>;
}

/* ---------- Category tag ---------- */
function CatTag({ cat }) {
  const c = window.XBFY.CAT[cat] || 'var(--text-muted)';
  return <span style={{ fontFamily: MONO2, fontSize: 9, letterSpacing: '.1em', padding: '3px 9px', border: '1px solid ' + c, borderRadius: 4, color: c, background: 'color-mix(in srgb, ' + c + ' 7%, transparent)' }}>{cat}</span>;
}

/* ---------- Vote box ---------- */
function VoteBox({ votes, voted, onVote }) {
  return (
    <button onClick={onVote} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: 64, flexShrink: 0,
      padding: '10px 0 8px', borderRadius: 9, cursor: 'pointer',
      background: voted ? 'var(--accent)' : '#fff', border: '1px solid ' + (voted ? 'var(--accent)' : 'var(--border-card)'),
      boxShadow: voted ? '0 1px 4px var(--accent-shadow)' : 'var(--shadow-inset)', color: voted ? '#fff' : 'inherit' }}>
      <span style={{ fontSize: 12, lineHeight: 1, color: voted ? '#fff' : 'var(--text-faint-2)' }}>▲</span>
      <span style={{ fontFamily: SERIF2, fontWeight: 700, fontSize: 21, lineHeight: 1.05 }}>{votes >= 1000 ? (votes / 1000).toFixed(1) + 'k' : votes}</span>
      <span style={{ fontFamily: MONO2, fontSize: 8, letterSpacing: '.1em', color: voted ? 'rgba(255,255,255,.8)' : 'var(--text-faint-2)' }}>VOTES</span>
    </button>
  );
}

/* ---------- Entry row ---------- */
function EntryRow({ e, voted, onVote, density }) {
  const pad = density === 'compact' ? '14px 18px' : '20px 22px';
  return (
    <div className="xbfy-card" style={{ ...CARD, marginTop: 14 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: pad }}>
        <VoteBox votes={e.votes} voted={voted} onVote={onVote} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: MONO2, fontSize: 12, color: 'var(--text-faint)' }}>#{e.rank}</span>
            <span style={{ fontFamily: SERIF2, fontSize: 22, fontWeight: 700, lineHeight: 1.12 }}>
              {e.x}<i style={{ fontWeight: 400, color: 'var(--text-soft)', fontSize: '.78em', margin: '0 .28em' }}>but for</i>{e.y}
            </span>
            {e.stamp && <Stamp kind={e.stamp} />}
          </div>
          {density !== 'compact' && (
            <p style={{ margin: '8px 0 12px', fontSize: 14, fontWeight: 300, lineHeight: 1.5, color: 'var(--text-body)', maxWidth: 640 }}>{e.blurb}</p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, flexWrap: 'wrap', marginTop: density === 'compact' ? 8 : 0 }}>
            <CatTag cat={e.cat} />
            <span style={{ fontFamily: MONO2, fontSize: 11, color: 'var(--text-muted)' }}>submitted by @{e.by} · {e.when}</span>
            <a href="#" style={{ marginLeft: 'auto', fontFamily: SANS2, fontSize: 13, fontWeight: 500, color: 'var(--accent)', textDecoration: 'none', whiteSpace: 'nowrap' }}>visit site →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sponsored row (gel ribbon) ---------- */
function SponsoredRow() {
  const s = 'var(--sponsor)';
  return (
    <div style={{ ...CARD, marginTop: 14, border: '1.5px solid ' + s, boxShadow: 'var(--shadow-sponsor)', overflow: 'hidden',
      background: 'linear-gradient(0deg, var(--sponsor-tint), var(--sponsor-tint)), linear-gradient(180deg, var(--surface-card), #FBF7F0)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '7px 22px', color: '#fff',
        fontFamily: MONO2, fontSize: 10, letterSpacing: '.12em', background: window.gel ? window.gel(s) : s }}>
        <span>★ PINNED SPONSOR</span><span style={{ opacity: .85, fontSize: 9 }}>FEATURED PLACEMENT</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '18px 22px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: 64, flexShrink: 0, padding: '10px 0 8px', background: '#fff', border: '1px solid var(--border-card)', borderRadius: 9, boxShadow: 'var(--shadow-inset)' }}>
          <span style={{ fontSize: 12, color: 'var(--text-faint-2)' }}>▲</span>
          <span style={{ fontFamily: SERIF2, fontWeight: 700, fontSize: 21, lineHeight: 1.05 }}>2.3k</span>
          <span style={{ fontFamily: MONO2, fontSize: 8, letterSpacing: '.1em', color: 'var(--text-faint-2)' }}>VOTES</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: SERIF2, fontSize: 22, fontWeight: 700, lineHeight: 1.12 }}>Linear<i style={{ fontWeight: 400, color: 'var(--text-soft)', fontSize: '.78em', margin: '0 .28em' }}>but for</i>Wedding Planning</span>
          <p style={{ margin: '8px 0 12px', fontSize: 14, fontWeight: 300, lineHeight: 1.5, color: 'var(--text-body)', maxWidth: 640 }}>Issue tracking, but every bug is a seating-chart crisis. Roadmaps for the aisle, sprints for the caterer.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: MONO2, fontSize: 9, letterSpacing: '.1em', padding: '3px 9px', border: '1px solid var(--sponsor-tag)', borderRadius: 4, color: 'var(--sponsor-tag)' }}>SPONSORED</span>
            <span style={{ fontFamily: MONO2, fontSize: 11, color: 'var(--text-muted)' }}>submitted by @altar_ego · 1 day ago</span>
            <a href="#" style={{ marginLeft: 'auto', fontFamily: SANS2, fontSize: 13, fontWeight: 500, color: s, textDecoration: 'none', whiteSpace: 'nowrap' }}>visit site →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sidebar widget shell ---------- */
function Widget({ title, accent, children }) {
  return (
    <section style={{ ...CARD, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--border-card)',
        background: 'linear-gradient(180deg,#fff,#F4EEE4)' }}>
        <span style={{ width: 9, height: 9, borderRadius: 2, background: accent || 'var(--accent)', transform: 'rotate(45deg)' }}></span>
        <h3 style={{ margin: 0, fontFamily: MONO2, fontSize: 11, letterSpacing: '.14em', color: 'var(--ink)' }}>{title}</h3>
      </div>
      <div style={{ padding: 14 }}>{children}</div>
    </section>
  );
}

/* ---------- Tag cloud ---------- */
function TagCloud() {
  const hues = Object.values(window.XBFY.CAT);
  return (
    <Widget title="TAG CLOUD" accent="var(--cat-saas, #6A3D9E)">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', lineHeight: 1.1 }}>
        {window.XBFY.TAGS.map((tag, i) => (
          <a key={tag.t} href="#" style={{ fontFamily: SANS2, fontWeight: tag.w >= 4 ? 700 : 500, textDecoration: 'none',
            fontSize: 11 + tag.w * 2.5, color: hues[i % hues.length], opacity: .55 + tag.w * 0.09 }}>{tag.t}</a>
        ))}
      </div>
    </Widget>
  );
}

/* ---------- Leaderboard widget ---------- */
function Leaderboard() {
  const top = window.XBFY.ENTRIES.slice().sort((a, b) => b.votes - a.votes).slice(0, 5);
  return (
    <Widget title="TOP THIS WEEK" accent="var(--stamp-hot, #C2410C)">
      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {top.map((e, i) => (
          <li key={e.rank} style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
            <span style={{ fontFamily: SERIF2, fontWeight: 700, fontSize: 16, color: i === 0 ? 'var(--accent)' : 'var(--text-faint)', width: 18 }}>{i + 1}</span>
            <span style={{ fontFamily: SANS2, fontSize: 13, color: 'var(--ink)', flex: 1, lineHeight: 1.3 }}>{e.x} <i style={{ color: 'var(--text-soft)', fontSize: '.86em' }}>but for</i> {e.y}</span>
            <span style={{ fontFamily: MONO2, fontSize: 11, color: 'var(--text-muted)' }}>{e.votes}</span>
          </li>
        ))}
      </ol>
    </Widget>
  );
}

/* ---------- Newsletter widget ---------- */
function DigestWidget() {
  const [done, setDone] = React.useState(false);
  return (
    <Widget title="WEEKLY DIGEST" accent="var(--cat-marketplace, #9B5523)">
      <p style={{ margin: '0 0 10px', fontFamily: SANS2, fontSize: 13, color: 'var(--text-body)', lineHeight: 1.45 }}>
        The 10 best <i>X but for Y</i>s, every Sunday. No spam, just dubious brilliance.
      </p>
      {done ? (
        <div style={{ fontFamily: MONO2, fontSize: 12, color: 'var(--cat-reference, #2A7A56)', padding: '9px 0' }}>✓ You're subscribed. Check your inbox.</div>
      ) : (
        <div style={{ display: 'flex', gap: 6 }}>
          <input placeholder="you@email.com" style={{ flex: 1, minWidth: 0, padding: '9px 11px', fontFamily: SANS2, fontSize: 13, border: '1px solid var(--border-input)', borderRadius: 7, background: 'var(--surface-card)', boxShadow: 'var(--shadow-inset)', color: 'var(--ink)' }} />
          <button onClick={() => setDone(true)} style={{ cursor: 'pointer', fontFamily: SANS2, fontSize: 13, fontWeight: 700, color: '#fff', border: '1px solid rgba(120,10,70,.4)', borderRadius: 7, padding: '0 14px', background: window.gel ? window.gel('var(--accent)') : 'var(--accent)', boxShadow: 'var(--shadow-button)' }}>Join</button>
        </div>
      )}
    </Widget>
  );
}

/* ---------- "As featured on" marquee bar ---------- */
function FeaturedBar() {
  return (
    <div style={{ borderTop: '1px solid var(--border-card)', borderBottom: '1px solid var(--border-card)', background: 'var(--surface-sunken)', marginTop: 34 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 22, padding: '13px 28px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: MONO2, fontSize: 10, letterSpacing: '.16em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>AS LINKED FROM</span>
        {window.XBFY.FEATURED.map((f) => (
          <span key={f} style={{ fontFamily: SERIF2, fontStyle: 'italic', fontSize: 16, color: 'var(--text-faint)', opacity: .8 }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const col = (title, items) => (
    <div>
      <div style={{ fontFamily: MONO2, fontSize: 10, letterSpacing: '.16em', color: 'var(--on-dark-muted)', marginBottom: 11 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {items.map((i) => <a key={i} href="#" style={{ fontFamily: SANS2, fontSize: 14, color: 'var(--on-dark)', textDecoration: 'none', opacity: .85 }}>{i}</a>)}
      </div>
    </div>
  );
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--on-dark)', marginTop: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '46px 28px 30px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <Wordmark size={40} footer={true} t={{ ghost: false, beta: false }} />
          <p style={{ fontFamily: SANS2, fontSize: 13, color: 'var(--on-dark-muted)', lineHeight: 1.5, maxWidth: 320, marginTop: 14 }}>
            The directory of <i>"X, but for Y."</i> A hand-curated, daily-updated, human-voted index of dubious brilliance.
          </p>
        </div>
        {col('THE INDEX', window.XBFY.FOOTER.index)}
        {col('ELSEWHERE', window.XBFY.FOOTER.elsewhere)}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: MONO2, fontSize: 10, letterSpacing: '.05em', color: 'var(--on-dark-muted)' }}>
          <span>XBUTFORY © 2026 · AN INDEX OF DUBIOUS BRILLIANCE</span>
          <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <span style={{ border: '1px solid rgba(255,255,255,.3)', borderRadius: 3, padding: '2px 6px' }}>XHTML 1.0</span>
            <span style={{ border: '1px solid rgba(255,255,255,.3)', borderRadius: 3, padding: '2px 6px' }}>RSS 2.0</span>
            <span>made by a builder, again</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { HeroDek, Stamp, CatTag, VoteBox, EntryRow, SponsoredRow, Widget, TagCloud, Leaderboard, DigestWidget, FeaturedBar, Footer, CARD });
