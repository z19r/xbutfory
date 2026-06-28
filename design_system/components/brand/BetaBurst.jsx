import React from 'react';

const SERIF = "var(--font-display, 'Newsreader', Georgia, serif)";

// 12-point sunburst, computed once.
const STAR_CLIP = (() => {
  const pts = 12, ro = 50, ri = 35, cx = 50, cy = 50, out = [];
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? ro : ri;
    const a = (Math.PI / pts) * i - Math.PI / 2;
    out.push(`${(cx + r * Math.cos(a)).toFixed(2)}% ${(cy + r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${out.join(',')})`;
})();

/**
 * A glossy early-2000s "starburst" badge — a 12-point amber sunburst with a
 * specular highlight and a rotated serif label. Pin it to a wordmark, hero, or
 * pricing card. Pure decoration; position it with `style` (absolute) at the call site.
 */
export function BetaBurst({ label = 'BETA', size = 78, rotate = 12, color, style, ...rest }) {
  const fill = color || 'radial-gradient(circle at 38% 32%, #FFC24B, #F08A1D 62%, #D2670E)';
  return (
    <span
      style={{ position: 'absolute', width: size, height: size, transform: `rotate(${rotate}deg)`, pointerEvents: 'none', ...style }}
      {...rest}
    >
      <span style={{ position: 'absolute', inset: 0, clipPath: STAR_CLIP, background: fill, boxShadow: '0 2px 5px rgba(120,60,0,.4)' }}></span>
      <span style={{ position: 'absolute', inset: 0, clipPath: STAR_CLIP, mixBlendMode: 'screen', background: 'radial-gradient(circle at 38% 30%, rgba(255,255,255,.7), transparent 45%)' }}></span>
      <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', transform: `rotate(${-rotate - 7}deg)`, fontFamily: SERIF, fontWeight: 700, fontStyle: 'italic', fontSize: size * 0.27, color: '#fff', letterSpacing: '.02em', textShadow: '0 1px 1px rgba(140,70,0,.55)' }}>{label}</span>
    </span>
  );
}
