import React from 'react';
import { Stamp } from '../core/Stamp.jsx';
import { Tag } from '../core/Tag.jsx';

const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SERIF = "var(--font-display, 'Newsreader', serif)";

/**
 * The signature directory row: a vote box on the left, then the
 * "X but for Y" headline with optional NEW/HOT stamp, a two-line description,
 * and a footer of category tag · submitter · timestamp · visit link.
 * The whole card is clickable (onView); the vote button and link stop
 * propagation so they act independently.
 *
 * Two paid placements via `sponsored`:
 *  - 'pinned'    — a solid hot-magenta ribbon across the top + magenta border,
 *                  glow and faint tint. The loudest treatment; one slot, top of feed.
 *  - 'spotlight' — a magenta glow halo + inline SPONSORED tag, dropped mid-feed.
 */
export function EntryCard({
  index, x, y, votes, voted = false, description,
  category, categoryLabel, submitter, ago, stamp, sponsored = false,
  url = '#', onVote, onView, style, ...rest
}) {
  const accent = 'var(--accent, #C93B1B)';
  const sponsorGlow = 'var(--sponsor, #E11D8F)';
  const isPinned = sponsored === 'pinned';
  const isSpotlight = sponsored === 'spotlight';
  const linkColor = sponsored ? sponsorGlow : accent;

  const frameStyle = isSpotlight
    ? { border: `1.5px solid ${sponsorGlow}`, boxShadow: 'var(--shadow-sponsor)' }
    : isPinned
    ? { border: `1.5px solid ${sponsorGlow}`, boxShadow: 'var(--shadow-pin)', background: 'linear-gradient(0deg, var(--sponsor-tint, rgba(225,29,143,0.05)), var(--sponsor-tint, rgba(225,29,143,0.05))), var(--surface-card, #FFFDFA)', overflow: 'hidden' }
    : {};

  return (
    <div
      onClick={onView}
      style={{
        background: 'var(--surface-card, #FFFDFA)', border: '1px solid var(--border-card, #EDE4D5)',
        borderRadius: 'var(--radius-card, 10px)', cursor: 'pointer', boxShadow: 'var(--shadow-card)',
        transition: 'border-color .18s, box-shadow .18s, transform .18s', ...frameStyle, ...style,
      }}
      {...rest}
    >
      {isPinned ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '7px 22px', background: sponsorGlow, color: '#fff', fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em' }}>
          <span>&#9733; PINNED SPONSOR</span>
          <span style={{ opacity: 0.82, fontSize: 9 }}>FEATURED PLACEMENT</span>
        </div>
      ) : null}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '20px 22px' }}>
        <button
          onClick={(e) => { e.stopPropagation(); onVote && onVote(); }}
          title="upvote"
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: 64,
            flexShrink: 0, padding: '10px 0 8px', background: '#fff',
            border: `1px solid ${voted ? accent : 'var(--border-card, #E7DCC9)'}`,
            borderRadius: 'var(--radius-vote, 9px)', boxShadow: voted ? 'none' : 'var(--shadow-inset)',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <span style={{ fontSize: 11, lineHeight: 1, color: voted ? accent : 'var(--text-faint-2, #B0A493)' }}>&#9650;</span>
          <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 21, lineHeight: 1, color: voted ? accent : 'var(--ink, #171008)' }}>{votes}</span>
          <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.08em', color: 'var(--text-faint-2, #A89D90)' }}>VOTES</span>
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {index != null && !isPinned ? <span style={{ fontFamily: MONO, fontSize: 12, color: 'var(--text-faint, #B5AB9B)' }}>{index}</span> : null}
            <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 21, lineHeight: 1.12, color: 'var(--ink, #171008)' }}>
              {x}<span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--text-soft, #9A8C7B)', fontSize: '0.8em' }}> but for </span>{y}
            </span>
            {stamp ? <Stamp kind={stamp} /> : null}
          </div>
          <p style={{ margin: '8px 0 12px', fontFamily: "var(--font-sans, 'Outfit', sans-serif)", fontSize: 14, fontWeight: 300, lineHeight: 1.5, color: 'var(--text-body, #6B5F50)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, flexWrap: 'wrap' }}>
            {isSpotlight ? <Tag color="var(--sponsor-tag, #2E8B72)">SPONSORED</Tag> : null}
            {(category || categoryLabel) ? <Tag category={category}>{categoryLabel}</Tag> : null}
            <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--text-muted, #8A7D6F)' }}>submitted by {submitter} &middot; {ago}</span>
            <a href={url} onClick={(e) => e.stopPropagation()} style={{ marginLeft: 'auto', fontFamily: "var(--font-sans, 'Outfit', sans-serif)", fontSize: 13, fontWeight: 500, color: linkColor, textDecoration: 'none', whiteSpace: 'nowrap' }}>visit site &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  );
}
