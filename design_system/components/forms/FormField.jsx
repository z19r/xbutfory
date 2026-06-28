import React from 'react';

const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";
const MONO = "var(--font-mono, 'Space Mono', monospace)";

/**
 * A labeled form field for the auth + settings screens — a mono uppercase label,
 * an inset paper input, and an optional hint or error line. Keeps every auth
 * form on the same rails. Pass `as="textarea"` for multi-line (bio).
 */
export function FormField({
  label, hint, error, prefix, trailing, as = 'input', id, style, ...rest
}) {
  const fieldId = id || (label ? 'f-' + String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);
  const Tag = as;
  const inputStyle = {
    width: '100%', padding: prefix ? '11px 13px 11px 30px' : '11px 13px', boxSizing: 'border-box',
    background: 'var(--surface-sunken, #F6EFE3)', border: '1px solid ' + (error ? 'var(--accent, #E11D8F)' : 'var(--border-input, #D8CDB9)'),
    borderRadius: 'var(--radius-input, 8px)', boxShadow: 'var(--shadow-inset)',
    fontFamily: SANS, fontSize: 14, color: 'var(--ink, #171008)', display: 'block',
    minHeight: as === 'textarea' ? 78 : undefined, resize: as === 'textarea' ? 'vertical' : undefined,
  };
  return (
    <label htmlFor={fieldId} style={{ display: 'block', ...style }}>
      {label ? (
        <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 7 }}>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: 'var(--text-muted, #8A7D6F)', textTransform: 'uppercase' }}>{label}</span>
          {error ? <span style={{ fontFamily: MONO, fontSize: 10, color: 'var(--accent, #E11D8F)' }}>{error}</span> : null}
        </span>
      ) : null}
      <span style={{ position: 'relative', display: 'block' }}>
        {prefix ? <span style={{ position: 'absolute', left: 12, top: as === 'textarea' ? 12 : '50%', transform: as === 'textarea' ? 'none' : 'translateY(-50%)', fontFamily: MONO, fontSize: 14, color: 'var(--text-faint, #B5AB9B)', pointerEvents: 'none' }}>{prefix}</span> : null}
        <Tag id={fieldId} style={inputStyle} {...rest} />
        {trailing ? <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>{trailing}</span> : null}
      </span>
      {hint && !error ? <span style={{ display: 'block', marginTop: 6, fontFamily: SANS, fontSize: 12, fontWeight: 300, color: 'var(--text-soft, #9A8C7B)' }}>{hint}</span> : null}
    </label>
  );
}
