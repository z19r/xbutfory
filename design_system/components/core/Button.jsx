import React from 'react';

const SIZES = {
  sm: { padding: '7px 13px', fontSize: 13 },
  md: { padding: '10px 18px', fontSize: 14 },
  lg: { padding: '13px 22px', fontSize: 15 },
};

const VARIANTS = {
  primary:   { background: 'var(--accent, #C93B1B)', color: 'var(--on-accent, #fff)', fontWeight: 600, boxShadow: 'var(--shadow-button)' },
  secondary: { background: 'var(--surface-card, #FFFDFA)', color: 'var(--ink, #171008)', border: '1px solid var(--border-input, #D8CDB9)', fontWeight: 500, boxShadow: '0 1px 2px rgba(74,52,28,0.05)' },
  ghost:     { background: 'transparent', color: 'var(--text-muted, #8A7D6F)', fontWeight: 400 },
  dark:      { background: 'var(--ink, #171008)', color: 'var(--on-dark, #F3EDE3)', fontWeight: 500 },
};

/**
 * XbutforY button. Inline-styled, theme-aware via CSS custom properties.
 * The primary variant carries the warm accent glow; secondary is the paper
 * outline (RSS, filters); ghost is for nav tabs and quiet links.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  trailingArrow = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
  style,
  ...rest
}) {
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    fontFamily: "var(--font-sans, 'Outfit', system-ui, sans-serif)",
    lineHeight: 1,
    border: '1px solid transparent',
    borderRadius: 'var(--radius-input, 8px)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap',
    transition: 'opacity .15s, transform .15s, box-shadow .15s, border-color .15s',
    opacity: disabled ? 0.5 : 1,
    ...SIZES[size],
    ...VARIANTS[variant],
    ...style,
  };
  return (
    <button type={type} disabled={disabled} onClick={disabled ? undefined : onClick} style={s} {...rest}>
      {icon ? <span style={{ fontSize: '1.15em', lineHeight: 1, marginTop: -1 }}>{icon}</span> : null}
      {children}
      {trailingArrow ? <span aria-hidden="true">&rarr;</span> : null}
    </button>
  );
}
