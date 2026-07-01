import React from 'react';
import { BetaBurst } from './BetaBurst.jsx';

const SERIF = "var(--font-display, 'Newsreader', Georgia, serif)";

/**
 * The XbutforY typographic wordmark: "XbutforY." with the pivot "but" (and
 * optionally the trailing "Y.") in the brand accent. Two maximal flourishes:
 * a faint offset "ghost" double-exposure behind it, and a corner BetaBurst.
 * No image asset — it is set live in Newsreader 700.
 */
export function Wordmark({ size = 64, accentY = true, ghost = false, beta = false, betaLabel = 'BETA', style, ...rest }) {
  const acc = 'var(--accent, #E11D8F)';
  const ink = 'var(--ink, #171008)';
  const piece = (txt, on) => <span style={{ color: on ? acc : ink }}>{txt}</span>;
  return (
    <span style={{ position: 'relative', display: 'inline-block', fontFamily: SERIF, fontWeight: 700, fontSize: size, lineHeight: 0.9, letterSpacing: '-.014em', ...style }} {...rest}>
      {ghost ? (
        <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, transform: 'translate(3px, 7px)', color: ink, opacity: 0.07, whiteSpace: 'nowrap', userSelect: 'none' }}>
          XbutforY.
        </span>
      ) : null}
      <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
        {piece('X', false)}{piece('but', true)}{piece('for', false)}{piece('Y', accentY)}{piece('.', accentY)}
      </span>
      {beta ? <BetaBurst label={betaLabel} size={size * 1.18} style={{ top: -size * 0.22, right: -size * 0.32 }} /> : null}
    </span>
  );
}
