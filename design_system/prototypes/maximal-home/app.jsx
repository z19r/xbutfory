/* XbutforY maximal-home — app shell + tweaks. */
const { useState: useStateA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E11D8F",
  "glossyNav": true,
  "gel": true,
  "beta": true,
  "ghost": true,
  "wordmarkAccent": "butY",
  "density": "regular",
  "showSidebar": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useStateA('Latest');
  const [voted, setVoted] = useStateA({});
  const entries = window.XBFY.ENTRIES;

  const toggleVote = (rank) => setVoted((v) => ({ ...v, [rank]: !v[rank] }));

  // Inject the single live runtime token: accent. Everything else reads design-system tokens.
  const rootStyle = { '--accent': t.accent };

  const tw = { glossyNav: t.glossyNav, gel: t.gel, beta: t.beta, ghost: t.ghost, wordmarkAccent: t.wordmarkAccent };

  return (
    <div style={{ ...rootStyle, minHeight: '100vh' }}>
      <UtilityBar />
      <Masthead t={tw} />
      <NavBar t={tw} active={active} onNav={setActive} />
      <HeroDek />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px 60px', display: 'grid',
        gridTemplateColumns: t.showSidebar ? 'minmax(0,1fr) 318px' : '1fr', gap: 30, alignItems: 'start' }}>
        <main>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingBottom: 13, borderBottom: '2px solid var(--ink)' }}>
            <div>
              <h2 style={{ fontFamily: SERIF, fontSize: 27, fontWeight: 700, margin: 0, lineHeight: 1 }}>{active} Submissions</h2>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'var(--text-muted)', marginTop: 7 }}>Showing 1–8 of 1,024</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontFamily: MONO, fontSize: 10, color: 'var(--text-faint)', letterSpacing: '.08em' }}>SORT</span>
              <div style={{ display: 'flex', gap: 2, background: 'var(--surface-rail)', padding: 3, borderRadius: 6 }}>
                {['Newest', 'Hot', 'Top'].map((s, i) => (
                  <button key={s} style={{ fontFamily: SANS, fontSize: 12, fontWeight: i === 0 ? 600 : 500, padding: '5px 13px', cursor: 'pointer', border: 'none', borderRadius: 4,
                    background: i === 0 ? 'var(--surface-card)' : 'transparent', color: i === 0 ? 'var(--ink)' : 'var(--text-muted)', boxShadow: i === 0 ? '0 1px 2px rgba(23,16,8,.13)' : 'none' }}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          <SponsoredRow />
          {entries.map((e) => (
            <EntryRow key={e.rank} e={e} voted={!!voted[e.rank]} onVote={() => toggleVote(e.rank)} density={t.density} />
          ))}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 26 }}>
            <button style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: 'var(--ink)', padding: '11px 26px', cursor: 'pointer',
              borderRadius: 9, border: '1px solid var(--border-input)', background: t.gel ? 'linear-gradient(180deg,#fff,#F1EADE)' : 'var(--surface-card)', boxShadow: '0 1px 2px rgba(74,52,28,.08)' }}>
              Load more ↓
            </button>
          </div>
        </main>

        {t.showSidebar && (
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 64 }}>
            <Leaderboard />
            <TagCloud />
            <DigestWidget />
          </aside>
        )}
      </div>

      <FeaturedBar />
      <Footer />

      <TweaksPanel>
        <TweakSection label="2000s dial" />
        <TweakToggle label="Glossy gel nav" value={t.glossyNav} onChange={(v) => setTweak('glossyNav', v)} />
        <TweakToggle label="Gel buttons" value={t.gel} onChange={(v) => setTweak('gel', v)} />
        <TweakToggle label="BETA sunburst" value={t.beta} onChange={(v) => setTweak('beta', v)} />
        <TweakToggle label="Drop-shadow wordmark" value={t.ghost} onChange={(v) => setTweak('ghost', v)} />
        <TweakToggle label="Sidebar widgets" value={t.showSidebar} onChange={(v) => setTweak('showSidebar', v)} />

        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={['#E11D8F', '#C93B1B', '#1B6E80', '#6A3D9E', '#A07A18']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Wordmark accent" value={t.wordmarkAccent}
          options={['but', 'butY']}
          onChange={(v) => setTweak('wordmarkAccent', v)} />

        <TweakSection label="Feed" />
        <TweakRadio label="Density" value={t.density}
          options={['compact', 'regular']}
          onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
