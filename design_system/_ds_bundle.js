/* @ds-bundle: {"format":3,"namespace":"XbutforyDesignSystem_d0097d","components":[{"name":"BetaBurst","sourcePath":"components/brand/BetaBurst.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"CategoryTile","sourcePath":"components/cards/CategoryTile.jsx"},{"name":"EntryCard","sourcePath":"components/cards/EntryCard.jsx"},{"name":"AccountMenu","sourcePath":"components/chrome/AccountMenu.jsx"},{"name":"MastheadBar","sourcePath":"components/chrome/MastheadBar.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CodeChip","sourcePath":"components/core/CodeChip.jsx"},{"name":"Stamp","sourcePath":"components/core/Stamp.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"DigestSignup","sourcePath":"components/discovery/DigestSignup.jsx"},{"name":"FeaturedBar","sourcePath":"components/discovery/FeaturedBar.jsx"},{"name":"TagCloud","sourcePath":"components/discovery/TagCloud.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"FormField","sourcePath":"components/forms/FormField.jsx"},{"name":"SearchInput","sourcePath":"components/forms/SearchInput.jsx"},{"name":"SortToggle","sourcePath":"components/forms/SortToggle.jsx"},{"name":"SubmitPreview","sourcePath":"components/forms/SubmitPreview.jsx"},{"name":"GlossyNav","sourcePath":"components/navigation/GlossyNav.jsx"},{"name":"NavTabs","sourcePath":"components/navigation/NavTabs.jsx"},{"name":"CategoriesScreen","sourcePath":"ui_kits/directory/CategoriesScreen.jsx"},{"name":"DetailScreen","sourcePath":"ui_kits/directory/DetailScreen.jsx"},{"name":"FeedScreen","sourcePath":"ui_kits/directory/FeedScreen.jsx"},{"name":"Masthead","sourcePath":"ui_kits/directory/Masthead.jsx"},{"name":"SubmitScreen","sourcePath":"ui_kits/directory/SubmitScreen.jsx"}],"sourceHashes":{"components/brand/BetaBurst.jsx":"7142a83ebfa2","components/brand/Wordmark.jsx":"aa857ce13b96","components/cards/CategoryTile.jsx":"4d9d139cd8c6","components/cards/EntryCard.jsx":"19cb1fd960ad","components/chrome/AccountMenu.jsx":"c6028d72d3a9","components/chrome/MastheadBar.jsx":"d601d738a984","components/core/Button.jsx":"d992de7c4717","components/core/CodeChip.jsx":"a063d6875ed2","components/core/Stamp.jsx":"b40464937cd0","components/core/Tag.jsx":"a77522a92fc8","components/discovery/DigestSignup.jsx":"17ea72436058","components/discovery/FeaturedBar.jsx":"e762627d10ce","components/discovery/TagCloud.jsx":"8b14d1f78077","components/feedback/EmptyState.jsx":"ee3023dc9d7b","components/feedback/Toast.jsx":"c4fa5f42fc60","components/forms/FormField.jsx":"ec7ba1112b6b","components/forms/SearchInput.jsx":"fce4cef1164f","components/forms/SortToggle.jsx":"32ef93eb214b","components/forms/SubmitPreview.jsx":"ead3957ca203","components/navigation/GlossyNav.jsx":"b92a27eeef6b","components/navigation/NavTabs.jsx":"37583ce1847c","prototypes/maximal-home/app.jsx":"72f0169d77d7","prototypes/maximal-home/components.jsx":"0beab7279e75","prototypes/maximal-home/data.js":"31840c146763","prototypes/maximal-home/feed.jsx":"a4904f13f53b","prototypes/maximal-home/tweaks-panel.jsx":"6591467622ed","ui_kits/directory/CategoriesScreen.jsx":"218bfe8ffdd3","ui_kits/directory/DetailScreen.jsx":"ca66dbc02cfe","ui_kits/directory/FeedScreen.jsx":"bf477620cb6d","ui_kits/directory/Masthead.jsx":"4d0ed9c84688","ui_kits/directory/SubmitScreen.jsx":"e5b90c837cd8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.XbutforyDesignSystem_d0097d = window.XbutforyDesignSystem_d0097d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/BetaBurst.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SERIF = "var(--font-display, 'Newsreader', Georgia, serif)";

// 12-point sunburst, computed once.
const STAR_CLIP = (() => {
  const pts = 12,
    ro = 50,
    ri = 35,
    cx = 50,
    cy = 50,
    out = [];
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? ro : ri;
    const a = Math.PI / pts * i - Math.PI / 2;
    out.push(`${(cx + r * Math.cos(a)).toFixed(2)}% ${(cy + r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${out.join(',')})`;
})();

/**
 * A glossy early-2000s "starburst" badge — a 12-point amber sunburst with a
 * specular highlight and a rotated serif label. Pin it to a wordmark, hero, or
 * pricing card. Pure decoration; position it with `style` (absolute) at the call site.
 */
function BetaBurst({
  label = 'BETA',
  size = 78,
  rotate = 12,
  color,
  style,
  ...rest
}) {
  const fill = color || 'radial-gradient(circle at 38% 32%, #FFC24B, #F08A1D 62%, #D2670E)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'absolute',
      width: size,
      height: size,
      transform: `rotate(${rotate}deg)`,
      pointerEvents: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      clipPath: STAR_CLIP,
      background: fill,
      boxShadow: '0 2px 5px rgba(120,60,0,.4)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      clipPath: STAR_CLIP,
      mixBlendMode: 'screen',
      background: 'radial-gradient(circle at 38% 30%, rgba(255,255,255,.7), transparent 45%)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      transform: `rotate(${-rotate - 7}deg)`,
      fontFamily: SERIF,
      fontWeight: 700,
      fontStyle: 'italic',
      fontSize: size * 0.27,
      color: '#fff',
      letterSpacing: '.02em',
      textShadow: '0 1px 1px rgba(140,70,0,.55)'
    }
  }, label));
}
Object.assign(__ds_scope, { BetaBurst });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BetaBurst.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SERIF = "var(--font-display, 'Newsreader', Georgia, serif)";

/**
 * The XbutforY typographic wordmark: "XbutforY." with the pivot "but" (and
 * optionally the trailing "Y.") in the brand accent. Two maximal flourishes:
 * a faint offset "ghost" double-exposure behind it, and a corner BetaBurst.
 * No image asset — it is set live in Newsreader 700.
 */
function Wordmark({
  size = 64,
  accentY = true,
  ghost = false,
  beta = false,
  betaLabel = 'BETA',
  style,
  ...rest
}) {
  const acc = 'var(--accent, #E11D8F)';
  const ink = 'var(--ink, #171008)';
  const piece = (txt, on) => /*#__PURE__*/React.createElement("span", {
    style: {
      color: on ? acc : ink
    }
  }, txt);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-block',
      fontFamily: SERIF,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 0.9,
      letterSpacing: '-.014em',
      ...style
    }
  }, rest), ghost ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: 'translate(3px, 7px)',
      color: ink,
      opacity: 0.07,
      whiteSpace: 'nowrap',
      userSelect: 'none'
    }
  }, "XbutforY.") : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      whiteSpace: 'nowrap'
    }
  }, piece('X', false), piece('but', true), piece('for', false), piece('Y', accentY), piece('.', accentY)), beta ? /*#__PURE__*/React.createElement(__ds_scope.BetaBurst, {
    label: betaLabel,
    size: size * 1.18,
    style: {
      top: -size * 0.22,
      right: -size * 0.32
    }
  }) : null);
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/cards/CategoryTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CAT = {
  dating: 'var(--cat-dating, #B5472D)',
  crm: 'var(--cat-crm, #2B5BA8)',
  discovery: 'var(--cat-discovery, #2A7A56)',
  saas: 'var(--cat-saas, #6A3D9E)',
  payments: 'var(--cat-payments, #1B8080)',
  social: 'var(--cat-social, #A07A18)',
  logistics: 'var(--cat-logistics, #9B5523)'
};

/**
 * A category tile for the "Browse by Category" grid: hue chip + short code +
 * count on top, the full category name in serif, and a sample of entries.
 */
function CategoryTile({
  name,
  short,
  count,
  sample,
  category,
  color,
  onClick,
  style,
  ...rest
}) {
  const c = color || CAT[category] || 'var(--text-muted, #8A7D6F)';
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    style: {
      padding: 18,
      background: 'var(--surface-card, #FFFDFA)',
      border: '1px solid var(--border-card, #EDE4D5)',
      borderRadius: 'var(--radius-card, 10px)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-tile)',
      transition: 'border-color .18s, box-shadow .18s, transform .18s',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      background: c,
      borderRadius: 2,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
      fontSize: 9,
      letterSpacing: '0.08em',
      color: c
    }
  }, short), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
      fontSize: 11,
      color: 'var(--text-faint, #B5AB9B)'
    }
  }, count)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display, 'Newsreader', serif)",
      fontSize: 19,
      fontWeight: 600,
      color: 'var(--ink, #171008)',
      lineHeight: 1.1
    }
  }, name), sample ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
      fontSize: 12,
      fontWeight: 300,
      color: 'var(--text-soft, #9A8C7B)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, sample) : null);
}
Object.assign(__ds_scope, { CategoryTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CategoryTile.jsx", error: String((e && e.message) || e) }); }

// components/chrome/AccountMenu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";
const MONO = "var(--font-mono, 'Space Mono', monospace)";

/**
 * The signed-in session control for the ink utility bar. Shows the account's
 * @handle (with a small avatar disc) and opens a paper dropdown of account
 * actions. This is what replaces the "Sign in · Create account" links once a
 * user is authenticated — submissions are account-gated, so the handle here is
 * the same one stamped on their listings.
 */
function AccountMenu({
  handle,
  avatar,
  items = [{
    key: 'settings',
    label: 'Account settings'
  }, {
    key: 'submissions',
    label: 'Manage submissions'
  }, {
    key: 'signout',
    label: 'Sign out',
    divider: true
  }],
  onSelect,
  open: controlledOpen,
  onToggle,
  style,
  ...rest
}) {
  const [uncontrolled, setUncontrolled] = React.useState(false);
  const open = controlledOpen != null ? controlledOpen : uncontrolled;
  const toggle = () => {
    onToggle ? onToggle(!open) : setUncontrolled(!open);
  };
  const initial = (handle || '?').replace('@', '').charAt(0).toUpperCase();
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-block',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: toggle,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      background: 'transparent',
      border: '1px solid rgba(255,255,255,.16)',
      borderRadius: 7,
      padding: '4px 10px 4px 5px',
      fontFamily: MONO,
      fontSize: 12,
      color: 'var(--on-dark, #F3EDE3)',
      letterSpacing: '.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      fontFamily: SANS,
      fontSize: 11,
      fontWeight: 700,
      color: '#fff',
      background: avatar ? `center/cover url(${avatar})` : 'var(--accent, #E11D8F)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4)'
    }
  }, avatar ? '' : initial), handle, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: 9,
      opacity: 0.7,
      marginLeft: 1
    }
  }, "\u25BC")), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 8px)',
      right: 0,
      minWidth: 196,
      zIndex: 200,
      background: 'var(--surface-card, #FFFDFA)',
      border: '1px solid var(--border-card, #EDE4D5)',
      borderRadius: 10,
      boxShadow: 'var(--shadow-card-hover)',
      padding: 6,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 9,
      letterSpacing: '.12em',
      color: 'var(--text-faint, #B5AB9B)',
      padding: '7px 10px 6px'
    }
  }, "SIGNED IN AS ", handle), items.map(it => /*#__PURE__*/React.createElement(React.Fragment, {
    key: it.key
  }, it.divider ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-rule, #E3D9C8)',
      margin: '5px 4px'
    }
  }) : null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onSelect && onSelect(it.key);
      toggle();
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      borderRadius: 6,
      padding: '8px 10px',
      fontFamily: SANS,
      fontSize: 13,
      color: it.key === 'signout' ? 'var(--text-muted, #8A7D6F)' : 'var(--ink, #171008)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--surface-rail, #F0E9DC)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
    }
  }, it.label)))) : null);
}
Object.assign(__ds_scope, { AccountMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/AccountMenu.jsx", error: String((e && e.message) || e) }); }

// components/chrome/MastheadBar.jsx
try { (() => {
const MONO = "var(--font-mono, 'Space Mono', monospace)";

/**
 * The dark utility bar that caps the page: a pulsing live dot + masthead
 * "est." line on the left, account links on the right. Full-bleed ink.
 */
function MastheadBar({
  issue = 'est. 2026 \u2014 vol. 1, issue 26',
  links = [{
    label: 'Sign in'
  }, {
    label: 'Create account',
    strong: true
  }],
  onLink
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink, #171008)',
      color: 'var(--on-dark-muted, #C9BCA9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max, 1040px)',
      margin: '0 auto',
      padding: '9px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      fontFamily: MONO,
      fontSize: 11,
      letterSpacing: '0.03em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--accent, #C93B1B)',
      display: 'inline-block'
    }
  }), issue), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 20,
      flexShrink: 0
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => onLink && onLink(l.label),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: MONO,
      fontSize: 11,
      padding: 0,
      letterSpacing: '0.03em',
      color: l.strong ? 'var(--on-dark, #F3EDE3)' : 'var(--on-dark-muted, #C9BCA9)'
    }
  }, l.label)))));
}
Object.assign(__ds_scope, { MastheadBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chrome/MastheadBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    padding: '7px 13px',
    fontSize: 13
  },
  md: {
    padding: '10px 18px',
    fontSize: 14
  },
  lg: {
    padding: '13px 22px',
    fontSize: 15
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--accent, #C93B1B)',
    color: 'var(--on-accent, #fff)',
    fontWeight: 600,
    boxShadow: 'var(--shadow-button)'
  },
  secondary: {
    background: 'var(--surface-card, #FFFDFA)',
    color: 'var(--ink, #171008)',
    border: '1px solid var(--border-input, #D8CDB9)',
    fontWeight: 500,
    boxShadow: '0 1px 2px rgba(74,52,28,0.05)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-muted, #8A7D6F)',
    fontWeight: 400
  },
  dark: {
    background: 'var(--ink, #171008)',
    color: 'var(--on-dark, #F3EDE3)',
    fontWeight: 500
  }
};

// Glossy "gel" overlay — the early-2000s sheen layered over a solid fill.
function withGel(base) {
  return `linear-gradient(180deg, rgba(255,255,255,.32), rgba(255,255,255,.04) 46%, rgba(0,0,0,.07)), ${base}`;
}

/**
 * XbutforY button. Inline-styled, theme-aware via CSS custom properties.
 * The primary variant carries the warm accent glow; secondary is the paper
 * outline (RSS, filters); ghost is for nav tabs and quiet links. Set `gel` for
 * the glossy Y2K sheen on the primary/dark fills (the maximal-mode default).
 */
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  trailingArrow = false,
  gel = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
  style,
  ...rest
}) {
  const v = VARIANTS[variant];
  const glossy = gel && (variant === 'primary' || variant === 'dark');
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
    ...v,
    ...(glossy ? {
      background: withGel(v.background),
      border: '1px solid rgba(0,0,0,.18)',
      boxShadow: (v.boxShadow ? v.boxShadow + ', ' : '') + 'inset 0 1px 0 rgba(255,255,255,.45)'
    } : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: disabled ? undefined : onClick,
    style: s
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.15em',
      lineHeight: 1,
      marginTop: -1
    }
  }, icon) : null, children, trailingArrow ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192") : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/CodeChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Inline monospace "code chip" for the literal phrase X but for Y (or any
 * snippet dropped into running serif copy). Sized in em so it tracks its
 * surrounding text.
 */
function CodeChip({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("code", _extends({
    style: {
      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
      fontSize: '0.64em',
      background: 'var(--surface-sunken, #FBF9F4)',
      border: '1px solid var(--border-input, #D8CDB9)',
      borderRadius: 'var(--radius-tag, 4px)',
      padding: '2px 9px',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { CodeChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CodeChip.jsx", error: String((e && e.message) || e) }); }

// components/core/Stamp.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const COLORS = {
  NEW: 'var(--stamp-new, #C93B1B)',
  HOT: 'var(--stamp-hot, #B07A1A)'
};

/**
 * Rubber-stamp badge for an entry — NEW (fresh) or HOT (high engagement).
 * Slightly rotated, mono, hollow outline: it reads like an inked stamp.
 */
function Stamp({
  kind = 'NEW',
  children,
  style,
  ...rest
}) {
  const color = COLORS[kind] || 'var(--ink, #171008)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-block',
      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '0.12em',
      lineHeight: 1.1,
      padding: '3px 8px',
      border: `1.5px solid ${color}`,
      color,
      borderRadius: 'var(--radius-stamp, 3px)',
      transform: 'rotate(-3deg)',
      ...style
    }
  }, rest), children || kind);
}
Object.assign(__ds_scope, { Stamp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stamp.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CAT = {
  dating: 'var(--cat-dating, #B5472D)',
  crm: 'var(--cat-crm, #2B5BA8)',
  discovery: 'var(--cat-discovery, #2A7A56)',
  saas: 'var(--cat-saas, #6A3D9E)',
  payments: 'var(--cat-payments, #1B8080)',
  social: 'var(--cat-social, #A07A18)',
  logistics: 'var(--cat-logistics, #9B5523)'
};

/**
 * Small monospace category tag (DATING, SAAS, …). The text takes the category
 * hue; the border is the same hue softened to ~45% so it never shouts.
 */
function Tag({
  category,
  color,
  children,
  style,
  ...rest
}) {
  const c = color || CAT[category] || 'var(--text-muted, #8A7D6F)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-block',
      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
      fontSize: 9,
      letterSpacing: '0.08em',
      padding: '3px 9px',
      border: `1px solid color-mix(in srgb, ${c} 45%, transparent)`,
      color: c,
      borderRadius: 'var(--radius-tag, 4px)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/EntryCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function EntryCard({
  index,
  x,
  y,
  votes,
  voted = false,
  description,
  category,
  categoryLabel,
  submitter,
  ago,
  stamp,
  sponsored = false,
  url = '#',
  onVote,
  onView,
  style,
  ...rest
}) {
  const accent = 'var(--accent, #C93B1B)';
  const sponsorGlow = 'var(--sponsor, #E11D8F)';
  const isPinned = sponsored === 'pinned';
  const isSpotlight = sponsored === 'spotlight';
  const linkColor = sponsored ? sponsorGlow : accent;
  const frameStyle = isSpotlight ? {
    border: `1.5px solid ${sponsorGlow}`,
    boxShadow: 'var(--shadow-sponsor)'
  } : isPinned ? {
    border: `1.5px solid ${sponsorGlow}`,
    boxShadow: 'var(--shadow-pin)',
    background: 'linear-gradient(0deg, var(--sponsor-tint, rgba(225,29,143,0.05)), var(--sponsor-tint, rgba(225,29,143,0.05))), var(--surface-card, #FFFDFA)',
    overflow: 'hidden'
  } : {};
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onView,
    style: {
      background: 'var(--surface-card, #FFFDFA)',
      border: '1px solid var(--border-card, #EDE4D5)',
      borderRadius: 'var(--radius-card, 10px)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-card)',
      transition: 'border-color .18s, box-shadow .18s, transform .18s',
      ...frameStyle,
      ...style
    }
  }, rest), isPinned ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '7px 22px',
      background: sponsorGlow,
      color: '#fff',
      fontFamily: MONO,
      fontSize: 10,
      letterSpacing: '0.12em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2605 PINNED SPONSOR"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.82,
      fontSize: 9
    }
  }, "FEATURED PLACEMENT")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 18,
      padding: '20px 22px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onVote && onVote();
    },
    title: "upvote",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      width: 64,
      flexShrink: 0,
      padding: '10px 0 8px',
      background: '#fff',
      border: `1px solid ${voted ? accent : 'var(--border-card, #E7DCC9)'}`,
      borderRadius: 'var(--radius-vote, 9px)',
      boxShadow: voted ? 'none' : 'var(--shadow-inset)',
      cursor: 'pointer',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      lineHeight: 1,
      color: voted ? accent : 'var(--text-faint-2, #B0A493)'
    }
  }, "\u25B2"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SERIF,
      fontWeight: 700,
      fontSize: 21,
      lineHeight: 1,
      color: voted ? accent : 'var(--ink, #171008)'
    }
  }, votes), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 8,
      letterSpacing: '0.08em',
      color: 'var(--text-faint-2, #A89D90)'
    }
  }, "VOTES")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, index != null && !isPinned ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 12,
      color: 'var(--text-faint, #B5AB9B)'
    }
  }, index) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SERIF,
      fontWeight: 700,
      fontSize: 21,
      lineHeight: 1.12,
      color: 'var(--ink, #171008)'
    }
  }, x, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      fontWeight: 400,
      color: 'var(--text-soft, #9A8C7B)',
      fontSize: '0.8em'
    }
  }, " but for "), y), stamp ? /*#__PURE__*/React.createElement(__ds_scope.Stamp, {
    kind: stamp
  }) : null), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 12px',
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 1.5,
      color: 'var(--text-body, #6B5F50)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      flexWrap: 'wrap'
    }
  }, isSpotlight ? /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    color: "var(--sponsor-tag, #2E8B72)"
  }, "SPONSORED") : null, category || categoryLabel ? /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    category: category
  }, categoryLabel) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: 'var(--text-muted, #8A7D6F)'
    }
  }, "submitted by ", submitter, " \xB7 ", ago), /*#__PURE__*/React.createElement("a", {
    href: url,
    onClick: e => e.stopPropagation(),
    style: {
      marginLeft: 'auto',
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
      fontSize: 13,
      fontWeight: 500,
      color: linkColor,
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, "visit site \u2192")))));
}
Object.assign(__ds_scope, { EntryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/EntryCard.jsx", error: String((e && e.message) || e) }); }

// components/discovery/DigestSignup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function DigestSignup({
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
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: 'linear-gradient(180deg,var(--surface-card),#FCFAF5)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-card, 10px)',
      boxShadow: 'var(--shadow-card)',
      padding: 18,
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.14em',
      color: 'var(--ink)',
      borderBottom: '1.5px solid var(--ink)',
      paddingBottom: 9,
      marginBottom: 13
    }
  }, title) : null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      fontFamily: SANS,
      fontSize: 13,
      fontWeight: 300,
      lineHeight: 1.5,
      color: 'var(--text-body)'
    }
  }, pitch), /*#__PURE__*/React.createElement("input", {
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: placeholder,
    style: {
      width: '100%',
      padding: '10px 12px',
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-input)',
      borderRadius: 7,
      boxShadow: 'var(--shadow-inset)',
      fontFamily: SANS,
      fontSize: 13,
      color: 'var(--ink)',
      marginBottom: 8,
      boxSizing: 'border-box'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => onSubmit && onSubmit(email),
    style: {
      width: '100%',
      padding: '10px 0',
      cursor: 'pointer',
      fontFamily: SANS,
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--ink)',
      borderRadius: 7,
      border: '1px solid var(--border-input)',
      background: glossy ? gel('linear-gradient(180deg,#fff,#EDE5D7)') : 'var(--surface-rail)',
      boxShadow: '0 1px 2px rgba(74,52,28,.08)'
    }
  }, cta));
}
Object.assign(__ds_scope, { DigestSignup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/discovery/DigestSignup.jsx", error: String((e && e.message) || e) }); }

// components/discovery/FeaturedBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function FeaturedBar({
  label = 'AS FEATURED ON',
  badges = [],
  note = 'valid XHTML 1.0 · RSS 2.0',
  gel: glossy = true,
  maxWidth = 1200,
  style,
  ...rest
}) {
  const accent = 'var(--accent, #E11D8F)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTop: '1px solid var(--border-rule)',
      borderBottom: '1px solid var(--border-rule)',
      background: 'var(--surface-sunken)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      padding: '14px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      letterSpacing: '.12em',
      color: 'var(--text-muted)'
    }
  }, label), badges.map(b => /*#__PURE__*/React.createElement("span", {
    key: b,
    style: {
      fontFamily: SANS,
      fontSize: 12,
      fontWeight: 700,
      color: '#fff',
      padding: '4px 11px',
      borderRadius: 5,
      background: glossy ? gel(accent) : accent,
      border: '1px solid rgba(120,10,70,.4)',
      boxShadow: glossy ? 'inset 0 1px 0 rgba(255,255,255,.4)' : 'none',
      whiteSpace: 'nowrap'
    }
  }, b))), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: 'var(--text-faint)',
      letterSpacing: '.04em'
    }
  }, note) : null));
}
Object.assign(__ds_scope, { FeaturedBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/discovery/FeaturedBar.jsx", error: String((e && e.message) || e) }); }

// components/discovery/TagCloud.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";

/**
 * A weighted tag cloud — the classic Web 2.0 sidebar widget. Each tag's
 * font-size and opacity scale with its `weight` (1–5), so popular tags read
 * loudest. Links are quiet periwinkle blue, not the brand accent.
 */
function TagCloud({
  tags = [],
  color = '#2B5BA8',
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'baseline',
      gap: '6px 11px',
      lineHeight: 1.4,
      ...style
    }
  }, rest), tags.map(tag => {
    const label = typeof tag === 'string' ? tag : tag.label;
    const w = typeof tag === 'string' ? 3 : tag.weight || 3;
    return /*#__PURE__*/React.createElement("a", {
      key: label,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onSelect && onSelect(label);
      },
      style: {
        fontFamily: SANS,
        fontSize: 11 + w * 2.6,
        fontWeight: w >= 4 ? 600 : 400,
        color,
        textDecoration: 'none',
        opacity: 0.6 + w * 0.08
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { TagCloud });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/discovery/TagCloud.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The directory's empty state — serif headline + a mono line, optionally with
 * an accent call-to-action ("Be the first →").
 */
function EmptyState({
  title = 'Nothing here yet.',
  children,
  action,
  onAction,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: '70px 0',
      textAlign: 'center',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display, 'Newsreader', serif)",
      fontSize: 25,
      fontWeight: 700,
      margin: '0 0 6px',
      color: 'var(--ink, #171008)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
      fontSize: 12,
      color: 'var(--text-muted, #8A7D6F)',
      margin: 0
    }
  }, children, action ? /*#__PURE__*/React.createElement("span", {
    onClick: onAction,
    style: {
      color: 'var(--accent, #C93B1B)',
      cursor: 'pointer',
      textDecoration: 'underline',
      marginLeft: 6
    }
  }, action, " \u2192") : null));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The deadpan ink toast. The directory fixes it to the bottom-right and slides
 * it in; this component is just the printed-sticker surface — position it where
 * you need (e.g. wrap in a fixed container).
 */
function Toast({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-block',
      background: 'var(--ink, #171008)',
      color: 'var(--on-dark, #F3EDE3)',
      padding: '13px 20px',
      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
      fontSize: 11,
      maxWidth: 330,
      lineHeight: 1.55,
      letterSpacing: '0.01em',
      boxShadow: 'var(--shadow-toast)',
      borderRadius: 'var(--radius-toast, 4px)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";
const MONO = "var(--font-mono, 'Space Mono', monospace)";

/**
 * A labeled form field for the auth + settings screens — a mono uppercase label,
 * an inset paper input, and an optional hint or error line. Keeps every auth
 * form on the same rails. Pass `as="textarea"` for multi-line (bio).
 */
function FormField({
  label,
  hint,
  error,
  prefix,
  trailing,
  as = 'input',
  id,
  style,
  ...rest
}) {
  const fieldId = id || (label ? 'f-' + String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);
  const Tag = as;
  const inputStyle = {
    width: '100%',
    padding: prefix ? '11px 13px 11px 30px' : '11px 13px',
    boxSizing: 'border-box',
    background: 'var(--surface-sunken, #F6EFE3)',
    border: '1px solid ' + (error ? 'var(--accent, #E11D8F)' : 'var(--border-input, #D8CDB9)'),
    borderRadius: 'var(--radius-input, 8px)',
    boxShadow: 'var(--shadow-inset)',
    fontFamily: SANS,
    fontSize: 14,
    color: 'var(--ink, #171008)',
    display: 'block',
    minHeight: as === 'textarea' ? 78 : undefined,
    resize: as === 'textarea' ? 'vertical' : undefined
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'block',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '.12em',
      color: 'var(--text-muted, #8A7D6F)',
      textTransform: 'uppercase'
    }
  }, label), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: 'var(--accent, #E11D8F)'
    }
  }, error) : null) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, prefix ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      top: as === 'textarea' ? 12 : '50%',
      transform: as === 'textarea' ? 'none' : 'translateY(-50%)',
      fontFamily: MONO,
      fontSize: 14,
      color: 'var(--text-faint, #B5AB9B)',
      pointerEvents: 'none'
    }
  }, prefix) : null, /*#__PURE__*/React.createElement(Tag, _extends({
    id: fieldId,
    style: inputStyle
  }, rest)), trailing ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }, trailing) : null), hint && !error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontFamily: SANS,
      fontSize: 12,
      fontWeight: 300,
      color: 'var(--text-soft, #9A8C7B)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { FormField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The masthead search field — near-white, inset, with a magnifier glyph.
 * Controlled: pass `value` and `onChange`.
 */
function SearchInput({
  value,
  onChange,
  placeholder = 'Search the index\u2026',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    style: {
      width: '100%',
      padding: '11px 14px 11px 38px',
      background: 'var(--surface-card, #FFFDFA)',
      border: '1px solid var(--border-input, #D8CDB9)',
      borderRadius: 'var(--radius-input, 8px)',
      boxShadow: 'var(--shadow-inset)',
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
      fontSize: 14,
      color: 'var(--ink, #171008)',
      display: 'block',
      boxSizing: 'border-box'
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 13,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-faint, #B5AB9B)',
      fontSize: 16,
      pointerEvents: 'none',
      lineHeight: 1
    }
  }, "\u26B2"));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/SortToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DEFAULTS = [{
  key: 'newest',
  label: 'Newest'
}, {
  key: 'hot',
  label: 'Hot'
}, {
  key: 'top',
  label: 'Top'
}];

/**
 * Segmented control on a sunken rail — used to sort the feed (Newest/Hot/Top).
 */
function SortToggle({
  value = 'newest',
  options = DEFAULTS,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      gap: 2,
      background: 'var(--surface-rail, #E9E1D3)',
      padding: 3,
      borderRadius: 'var(--radius-input, 8px)',
      ...style
    }
  }, rest), options.map(o => {
    const active = o.key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.key,
      onClick: () => onChange && onChange(o.key),
      style: {
        fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
        fontSize: 12,
        fontWeight: active ? 600 : 500,
        padding: '5px 13px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: 'var(--radius-tag, 4px)',
        background: active ? 'var(--surface-card, #FFFDFA)' : 'transparent',
        color: active ? 'var(--ink, #171008)' : 'var(--text-muted, #8A7D6F)',
        boxShadow: active ? '0 1px 2px rgba(23,16,8,0.13)' : 'none',
        transition: 'all .15s'
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { SortToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SortToggle.jsx", error: String((e && e.message) || e) }); }

// components/forms/SubmitPreview.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The live "X but for Y" preview shown in the submit form — a dashed well that
 * renders the formula in serif as the user types X and Y.
 */
function SubmitPreview({
  x,
  y,
  label = 'Live preview',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: '20px 22px',
      background: 'var(--surface-sunken, #FBF9F4)',
      border: '1.5px dashed var(--placeholder, #C0B6A6)',
      borderRadius: 'var(--radius-card, 10px)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
      fontSize: 9,
      color: 'var(--text-muted, #8A7D6F)',
      display: 'block',
      marginBottom: 9,
      letterSpacing: '0.07em',
      textTransform: 'uppercase'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display, 'Newsreader', serif)",
      fontSize: 27,
      fontWeight: 700,
      lineHeight: 1.2,
      color: 'var(--ink, #171008)'
    }
  }, x || 'X', /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-soft, #9A8C7B)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: '0.66em'
    }
  }, " but for "), y || 'Y'));
}
Object.assign(__ds_scope, { SubmitPreview });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SubmitPreview.jsx", error: String((e && e.message) || e) }); }

// components/navigation/GlossyNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";
const MONO = "var(--font-mono, 'Space Mono', monospace)";

/**
 * The maximal-mode primary navigation: a glossy periwinkle gel bar with a
 * raised, inset-lit active tab. The loud counterpart to the calm NavTabs
 * (which uses a hairline accent underline). Sticky by default.
 */
function GlossyNav({
  items = [],
  active,
  onSelect,
  note,
  maxWidth = 1200,
  sticky = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      position: sticky ? 'sticky' : 'static',
      top: 0,
      zIndex: 100,
      background: 'linear-gradient(180deg,#CBDCF5,#A8C0E9 55%,#8FB0E2)',
      borderTop: '1px solid #E2EAF8',
      borderBottom: '1px solid #6E8FC6',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.65), 0 1px 3px rgba(40,70,120,.16)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      overflowX: 'auto'
    }
  }, items.map(it => {
    const label = typeof it === 'string' ? it : it.label;
    const on = label === active;
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      onClick: () => onSelect && onSelect(label),
      style: {
        cursor: 'pointer',
        border: on ? '1px solid #B7C8E6' : '1px solid transparent',
        fontFamily: SANS,
        fontSize: 14,
        fontWeight: on ? 700 : 500,
        color: on ? '#233A63' : '#3A4E70',
        padding: '7px 16px',
        margin: '6px 0',
        borderRadius: 7,
        whiteSpace: 'nowrap',
        background: on ? 'linear-gradient(180deg,#fff,#EAF0FB)' : 'transparent',
        boxShadow: on ? '0 1px 2px rgba(40,70,120,.18), inset 0 1px 0 #fff' : 'none'
      }
    }, label);
  })), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 12,
      color: '#3A5C8C',
      whiteSpace: 'nowrap',
      letterSpacing: '.02em'
    }
  }, note) : null));
}
Object.assign(__ds_scope, { GlossyNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/GlossyNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavTabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The primary nav tab bar (Latest / Trending / Top Voted / Categories / …).
 * Sticky band with a hairline top edge and a 1.5px ink bottom rule; the active
 * tab carries an accent underline.
 */
function NavTabs({
  tabs = [],
  active,
  onSelect,
  sticky = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      position: sticky ? 'sticky' : 'static',
      top: 0,
      zIndex: 100,
      background: 'var(--paper, #F3EDE3)',
      borderTop: '1px solid var(--border-nav-top, #E0D6C4)',
      borderBottom: '1.5px solid var(--ink, #171008)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max, 1040px)',
      margin: '0 auto',
      padding: '0 var(--page-gutter, 24px)',
      display: 'flex',
      gap: 24,
      overflowX: 'auto'
    }
  }, tabs.map(t => {
    const key = t.key || t.label;
    const on = key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      onClick: () => onSelect && onSelect(key),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
        fontSize: 14,
        fontWeight: on ? 600 : 400,
        color: on ? 'var(--ink, #171008)' : 'var(--text-muted, #8A7D6F)',
        padding: '14px 2px',
        borderBottom: `2px solid ${on ? 'var(--accent, #C93B1B)' : 'transparent'}`,
        whiteSpace: 'nowrap',
        transition: 'color .15s, border-color .15s',
        flexShrink: 0
      }
    }, t.label);
  })));
}
Object.assign(__ds_scope, { NavTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavTabs.jsx", error: String((e && e.message) || e) }); }

// prototypes/maximal-home/app.jsx
try { (() => {
/* XbutforY maximal-home — app shell + tweaks. */
const {
  useState: useStateA
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E11D8F",
  "glossyNav": true,
  "gel": true,
  "beta": true,
  "ghost": true,
  "wordmarkAccent": "butY",
  "density": "regular",
  "showSidebar": true
} /*EDITMODE-END*/;
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useStateA('Latest');
  const [voted, setVoted] = useStateA({});
  const entries = window.XBFY.ENTRIES;
  const toggleVote = rank => setVoted(v => ({
    ...v,
    [rank]: !v[rank]
  }));

  // Inject the single live runtime token: accent. Everything else reads design-system tokens.
  const rootStyle = {
    '--accent': t.accent
  };
  const tw = {
    glossyNav: t.glossyNav,
    gel: t.gel,
    beta: t.beta,
    ghost: t.ghost,
    wordmarkAccent: t.wordmarkAccent
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...rootStyle,
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(UtilityBar, null), /*#__PURE__*/React.createElement(Masthead, {
    t: tw
  }), /*#__PURE__*/React.createElement(NavBar, {
    t: tw,
    active: active,
    onNav: setActive
  }), /*#__PURE__*/React.createElement(HeroDek, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 28px 60px',
      display: 'grid',
      gridTemplateColumns: t.showSidebar ? 'minmax(0,1fr) 318px' : '1fr',
      gap: 30,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      paddingBottom: 13,
      borderBottom: '2px solid var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: SERIF,
      fontSize: 27,
      fontWeight: 700,
      margin: 0,
      lineHeight: 1
    }
  }, active, " Submissions"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: 'var(--text-muted)',
      marginTop: 7
    }
  }, "Showing 1\u20138 of 1,024")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: 'var(--text-faint)',
      letterSpacing: '.08em'
    }
  }, "SORT"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      background: 'var(--surface-rail)',
      padding: 3,
      borderRadius: 6
    }
  }, ['Newest', 'Hot', 'Top'].map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: s,
    style: {
      fontFamily: SANS,
      fontSize: 12,
      fontWeight: i === 0 ? 600 : 500,
      padding: '5px 13px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: 4,
      background: i === 0 ? 'var(--surface-card)' : 'transparent',
      color: i === 0 ? 'var(--ink)' : 'var(--text-muted)',
      boxShadow: i === 0 ? '0 1px 2px rgba(23,16,8,.13)' : 'none'
    }
  }, s))))), /*#__PURE__*/React.createElement(SponsoredRow, null), entries.map(e => /*#__PURE__*/React.createElement(EntryRow, {
    key: e.rank,
    e: e,
    voted: !!voted[e.rank],
    onVote: () => toggleVote(e.rank),
    density: t.density
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      fontFamily: SANS,
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--ink)',
      padding: '11px 26px',
      cursor: 'pointer',
      borderRadius: 9,
      border: '1px solid var(--border-input)',
      background: t.gel ? 'linear-gradient(180deg,#fff,#F1EADE)' : 'var(--surface-card)',
      boxShadow: '0 1px 2px rgba(74,52,28,.08)'
    }
  }, "Load more \u2193"))), t.showSidebar && /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      position: 'sticky',
      top: 64
    }
  }, /*#__PURE__*/React.createElement(Leaderboard, null), /*#__PURE__*/React.createElement(TagCloud, null), /*#__PURE__*/React.createElement(DigestWidget, null))), /*#__PURE__*/React.createElement(FeaturedBar, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "2000s dial"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Glossy gel nav",
    value: t.glossyNav,
    onChange: v => setTweak('glossyNav', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Gel buttons",
    value: t.gel,
    onChange: v => setTweak('gel', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "BETA sunburst",
    value: t.beta,
    onChange: v => setTweak('beta', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Drop-shadow wordmark",
    value: t.ghost,
    onChange: v => setTweak('ghost', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Sidebar widgets",
    value: t.showSidebar,
    onChange: v => setTweak('showSidebar', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Brand"
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Accent",
    value: t.accent,
    options: ['#E11D8F', '#C93B1B', '#1B6E80', '#6A3D9E', '#A07A18'],
    onChange: v => setTweak('accent', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Wordmark accent",
    value: t.wordmarkAccent,
    options: ['but', 'butY'],
    onChange: v => setTweak('wordmarkAccent', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Feed"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Density",
    value: t.density,
    options: ['compact', 'regular'],
    onChange: v => setTweak('density', v)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/maximal-home/app.jsx", error: String((e && e.message) || e) }); }

// prototypes/maximal-home/components.jsx
try { (() => {
/* XbutforY maximal-home — presentational components. Reads window.XBFY data.
   Exports all components to window at the end for cross-Babel-script sharing. */
const {
  useState
} = React;
const SERIF = "var(--font-display, 'Newsreader', Georgia, serif)";
const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SANS = "var(--font-sans, 'Outfit', system-ui, sans-serif)";

/* ---- 12-point sunburst clip-path (generated once) ---- */
const STAR_CLIP = (() => {
  const pts = 12,
    ro = 50,
    ri = 35,
    cx = 50,
    cy = 50,
    out = [];
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? ro : ri;
    const a = Math.PI / pts * i - Math.PI / 2;
    out.push(`${(cx + r * Math.cos(a)).toFixed(2)}% ${(cy + r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${out.join(',')})`;
})();

/* Glossy "gel" surface used on primary buttons & badges */
function gel(base) {
  return `linear-gradient(180deg, rgba(255,255,255,.32), rgba(255,255,255,.04) 46%, rgba(0,0,0,.07)), ${base}`;
}

/* ---------- Beta sunburst badge ---------- */
function BetaBurst({
  size = 78,
  top = -14,
  right = -10
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top,
      right,
      width: size,
      height: size,
      transform: 'rotate(12deg)',
      zIndex: 3,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      clipPath: STAR_CLIP,
      background: 'radial-gradient(circle at 38% 32%, #FFC24B, #F08A1D 62%, #D2670E)',
      boxShadow: '0 2px 5px rgba(120,60,0,.4)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      clipPath: STAR_CLIP,
      mixBlendMode: 'screen',
      background: 'radial-gradient(circle at 38% 30%, rgba(255,255,255,.7), transparent 45%)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      transform: 'rotate(-19deg)',
      fontFamily: SERIF,
      fontWeight: 700,
      fontStyle: 'italic',
      fontSize: size * 0.27,
      color: '#fff',
      letterSpacing: '.02em',
      textShadow: '0 1px 1px rgba(140,70,0,.55)'
    }
  }, "BETA"));
}

/* ---------- Wordmark ---------- */
function Wordmark({
  size = 64,
  t = {},
  footer = false
}) {
  const acc = 'var(--accent)';
  const base = footer ? 'var(--on-dark)' : 'var(--ink)';
  const yAcc = (t.wordmarkAccent || 'butY') === 'butY';
  const letter = (txt, on) => /*#__PURE__*/React.createElement("span", {
    style: {
      color: on ? acc : base
    }
  }, txt);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-block',
      fontFamily: SERIF,
      fontWeight: 700,
      fontSize: size,
      lineHeight: .9,
      letterSpacing: '-.014em'
    }
  }, !footer && t.ghost !== false && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      transform: 'translate(3px, 7px)',
      color: 'var(--ink)',
      opacity: .07,
      whiteSpace: 'nowrap',
      userSelect: 'none'
    }
  }, "X", /*#__PURE__*/React.createElement("span", null, "but"), "for", /*#__PURE__*/React.createElement("span", null, "Y.")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      whiteSpace: 'nowrap'
    }
  }, letter('X', false), letter('but', true), letter('for', false), letter('Y', yAcc), letter('.', yAcc)), !footer && t.beta !== false && /*#__PURE__*/React.createElement(BetaBurst, {
    size: size * 1.18,
    top: -size * 0.22,
    right: -size * 0.3
  }));
}

/* ---------- Top utility bar ---------- */
function UtilityBar() {
  const link = {
    color: 'var(--on-dark-muted)',
    textDecoration: 'none',
    marginLeft: 22,
    fontFamily: MONO,
    fontSize: 12
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)',
      color: 'var(--on-dark-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '9px 28px',
      fontFamily: MONO,
      fontSize: 12,
      letterSpacing: '.02em'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--accent)',
      marginRight: 9,
      verticalAlign: 'middle',
      animation: 'xbfy-pulse 2.4s ease-in-out infinite'
    }
  }), "est. 2026 \u2014 vol. 1, issue 26"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: link
  }, "Sign in"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      ...link,
      color: 'var(--on-dark)'
    }
  }, "Create account"))));
}

/* ---------- Masthead (eyebrow + wordmark + search + actions) ---------- */
function Masthead({
  t
}) {
  const accent = 'var(--accent)';
  const submitStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    fontFamily: SANS,
    fontSize: 15,
    fontWeight: 700,
    color: '#fff',
    padding: '12px 20px',
    borderRadius: 9,
    border: '1px solid ' + (t.gel ? 'rgba(120,10,70,.5)' : 'transparent'),
    background: t.gel ? gel(accent) : accent,
    boxShadow: t.gel ? 'var(--shadow-button), inset 0 1px 0 rgba(255,255,255,.45)' : 'var(--shadow-button)'
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '26px 28px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 12,
      letterSpacing: '.32em',
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, "THE DIRECTORY OF"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 66,
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      paddingBottom: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-faint)',
      fontSize: 16,
      pointerEvents: 'none'
    }
  }, "\u26B2"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search the index\u2026",
    style: {
      width: 330,
      maxWidth: '46vw',
      padding: '12px 14px 12px 38px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-input)',
      borderRadius: 9,
      boxShadow: 'var(--shadow-inset)',
      fontFamily: SANS,
      fontSize: 14,
      color: 'var(--ink)'
    }
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      fontFamily: SANS,
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--ink)',
      padding: '11px 16px',
      borderRadius: 9,
      border: '1px solid var(--border-input)',
      background: t.gel ? 'linear-gradient(180deg,#fff,#F3EDE3)' : 'var(--surface-card)',
      boxShadow: '0 1px 2px rgba(74,52,28,.06)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent,
      fontSize: 15
    }
  }, "\u2301"), " RSS"), /*#__PURE__*/React.createElement("button", {
    style: submitStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      marginTop: -2
    }
  }, "+"), " Submit a Site"))));
}

/* ---------- Navigation ---------- */
function NavBar({
  t,
  active,
  onNav
}) {
  const glossy = t.glossyNav !== false;
  const barStyle = glossy ? {
    backgroundColor: '#9FBEEA',
    background: 'linear-gradient(180deg,#BAD2F4,#8FB4EA 52%,#6E9CE0)',
    borderTop: '1px solid #DCE8FB',
    borderBottom: '1px solid #4E78BE',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7), 0 2px 4px rgba(30,60,120,.22)'
  } : {
    background: 'var(--paper)',
    borderTop: '1px solid var(--border-nav-top)',
    borderBottom: '1.5px solid var(--ink)'
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      marginTop: 18,
      ...barStyle
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: glossy ? 4 : 26,
      overflowX: 'auto'
    }
  }, window.XBFY.NAV.map(label => {
    const on = label === active;
    if (glossy) {
      return /*#__PURE__*/React.createElement("button", {
        key: label,
        onClick: () => onNav(label),
        style: {
          cursor: 'pointer',
          border: '1px solid transparent',
          background: 'transparent',
          fontFamily: SANS,
          fontSize: 14,
          fontWeight: on ? 700 : 600,
          color: on ? '#16315F' : '#274270',
          textShadow: on ? 'none' : '0 1px 0 rgba(255,255,255,.5)',
          padding: '7px 16px',
          margin: '7px 0',
          borderRadius: 8,
          whiteSpace: 'nowrap',
          ...(on ? {
            background: 'linear-gradient(180deg,#fff,#DCEAFC 60%,#C3DAF6)',
            border: '1px solid #9CBCE8',
            boxShadow: '0 1px 2px rgba(30,60,120,.28), inset 0 1px 0 #fff'
          } : {})
        }
      }, label);
    }
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      onClick: () => onNav(label),
      style: {
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        fontFamily: SANS,
        fontSize: 14,
        fontWeight: on ? 600 : 400,
        color: on ? 'var(--ink)' : 'var(--text-muted)',
        padding: '14px 2px',
        borderBottom: '2px solid ' + (on ? 'var(--accent)' : 'transparent'),
        whiteSpace: 'nowrap'
      }
    }, label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 12,
      color: glossy ? '#1F3A66' : 'var(--text-muted)',
      textShadow: glossy ? '0 1px 0 rgba(255,255,255,.4)' : 'none',
      whiteSpace: 'nowrap',
      letterSpacing: '.02em'
    }
  }, "1,024 sites indexed")));
}
Object.assign(window, {
  BetaBurst,
  Wordmark,
  UtilityBar,
  Masthead,
  NavBar,
  gel,
  SERIF,
  MONO,
  SANS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/maximal-home/components.jsx", error: String((e && e.message) || e) }); }

// prototypes/maximal-home/data.js
try { (() => {
// XbutforY — maximal-home prototype seed data. Attaches to window.
window.XBFY = window.XBFY || {};

// Muted category hues — reuse the brand's seven-hue category palette.
window.XBFY.CAT = {
  MARKETPLACE: '#9B5523',
  SOCIAL: '#A07A18',
  SAAS: '#6A3D9E',
  UTILITIES: '#2B5BA8',
  REFERENCE: '#2A7A56',
  HEALTH: '#B5472D',
  INFRASTRUCTURE: '#1B8080'
};
window.XBFY.ENTRIES = [{
  rank: '001',
  x: 'SeatGeek',
  y: 'Lamps',
  stamp: 'NEW',
  cat: 'MARKETPLACE',
  blurb: 'Aggregated secondary-market price tracking for mid-century modern lighting fixtures.',
  by: 'lucas_m',
  when: '2 hours ago',
  votes: 128
}, {
  rank: '002',
  x: 'Tinder',
  y: 'the Building you live in',
  stamp: 'HOT',
  cat: 'SOCIAL',
  blurb: 'Hyper-local matching for vertical communities. Trade sugar or find a gym partner downstairs.',
  by: 'urbanist',
  when: '5 hours ago',
  votes: 92
}, {
  rank: '003',
  x: 'Salesforce',
  y: 'Escorts',
  stamp: null,
  cat: 'SAAS',
  blurb: 'Privacy-first client relationship management tailored for high-end independent contractors.',
  by: 'dev_ops_plus',
  when: '12 hours ago',
  votes: 74
}, {
  rank: '004',
  x: 'Linktree',
  y: 'SWs',
  stamp: null,
  cat: 'UTILITIES',
  blurb: 'Censorship-resistant landing pages with built-in age verification and crypto payments.',
  by: 'cryptonight',
  when: 'Yesterday',
  votes: 61
}, {
  rank: '005',
  x: 'IMDb',
  y: 'Houseplants',
  stamp: null,
  cat: 'REFERENCE',
  blurb: 'Comprehensive database for cultivars, lineage tracking, and lighting requirement wikis.',
  by: 'green_thumb',
  when: '2 days ago',
  votes: 55
}, {
  rank: '006',
  x: 'Strava',
  y: 'Deep Sleep',
  stamp: null,
  cat: 'HEALTH',
  blurb: 'Competitive rest tracking. Leaderboards for lowest resting heart rate and REM efficiency.',
  by: 'somnus',
  when: '3 days ago',
  votes: 42
}, {
  rank: '007',
  x: 'Uber',
  y: 'Dog Walkers',
  stamp: null,
  cat: 'MARKETPLACE',
  blurb: 'On-demand vetted dog walkers with live GPS tracks of every block and bush.',
  by: 'fetch_io',
  when: '4 days ago',
  votes: 38
}, {
  rank: '008',
  x: 'Airbnb',
  y: 'Datacenters',
  stamp: null,
  cat: 'INFRASTRUCTURE',
  blurb: 'Short-term rack rentals for ML researchers who need GPU time without a contract.',
  by: 'rackd',
  when: '5 days ago',
  votes: 29
}];

// Tag cloud — weight drives font-size (classic Web 2.0 weighted cloud).
window.XBFY.TAGS = [{
  t: 'AI',
  w: 5
}, {
  t: 'dating',
  w: 3
}, {
  t: 'b2b',
  w: 2
}, {
  t: 'crypto',
  w: 5
}, {
  t: 'niche',
  w: 3
}, {
  t: 'SaaS',
  w: 5
}, {
  t: 'marketplace',
  w: 3
}, {
  t: 'plants',
  w: 2
}, {
  t: 'sleep',
  w: 3
}, {
  t: 'adult',
  w: 2
}, {
  t: 'hyperlocal',
  w: 3
}, {
  t: 'pets',
  w: 2
}, {
  t: 'GPU',
  w: 3
}, {
  t: 'sober',
  w: 2
}, {
  t: 'analog',
  w: 3
}, {
  t: 'weird',
  w: 5
}, {
  t: 'indie',
  w: 3
}, {
  t: 'nostalgia',
  w: 2
}, {
  t: 'fitness',
  w: 3
}, {
  t: 'lamps',
  w: 4
}];
window.XBFY.NAV = ['Latest', 'Trending', 'Top Voted', 'Categories', 'Random', 'Submit'];
window.XBFY.FEATURED = ['DIGG', 'del.icio.us', 'MetaFilter', 'TUAW', 'Daring Fireball', 'Waxy.org'];
window.XBFY.FOOTER = {
  index: ['Latest', 'Trending', 'Top All-Time', 'Submit a Site', 'API'],
  elsewhere: ['Twitter', 'Are.na', 'RSS Feed', 'Sitemap', 'Manifesto']
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/maximal-home/data.js", error: String((e && e.message) || e) }); }

// prototypes/maximal-home/feed.jsx
try { (() => {
/* XbutforY maximal-home — feed, sidebar, featured bar, footer. */
const SERIF2 = "var(--font-display, 'Newsreader', Georgia, serif)";
const MONO2 = "var(--font-mono, 'Space Mono', monospace)";
const SANS2 = "var(--font-sans, 'Outfit', system-ui, sans-serif)";
const CARD = {
  background: 'linear-gradient(180deg, var(--surface-card), #FBF7F0)',
  border: '1px solid var(--border-card)',
  borderRadius: 10,
  boxShadow: 'var(--shadow-card)'
};

/* ---------- Hero dek ---------- */
function HeroDek() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '34px 28px 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      fontFamily: MONO2,
      fontSize: 12,
      letterSpacing: '.12em',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--accent)',
      animation: 'xbfy-pulse 2.4s ease-in-out infinite'
    }
  }), "VOL. 01 \xB7 ISSUE 26 \xB7 JUN 2026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: SERIF2,
      fontSize: 'clamp(28px,3.4vw,42px)',
      fontWeight: 500,
      margin: '14px 0 0',
      lineHeight: 1.18,
      letterSpacing: '-.005em',
      maxWidth: 940,
      textWrap: 'pretty'
    }
  }, "A hand-curated index of ", /*#__PURE__*/React.createElement("i", {
    style: {
      color: 'color-mix(in srgb, var(--accent) 78%, #5a1010)'
    }
  }, "newly launched"), " websites that pitch themselves as ", /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: MONO2,
      fontSize: '.62em',
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-input)',
      borderRadius: 5,
      padding: '3px 10px',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      color: 'var(--accent)'
    }
  }, "X but for Y"), ". Updated daily, voted by humans."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      width: 'clamp(150px,24%,250px)',
      marginTop: 22,
      borderRadius: 2,
      background: 'var(--spectral)'
    }
  }));
}

/* ---------- Stamp ---------- */
function Stamp({
  kind
}) {
  const c = kind === 'HOT' ? 'var(--stamp-hot)' : 'var(--accent)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '.12em',
      padding: '3px 8px',
      border: '1.5px solid ' + c,
      borderRadius: 3,
      color: c,
      transform: 'rotate(-3deg)',
      display: 'inline-block'
    }
  }, kind);
}

/* ---------- Category tag ---------- */
function CatTag({
  cat
}) {
  const c = window.XBFY.CAT[cat] || 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontSize: 9,
      letterSpacing: '.1em',
      padding: '3px 9px',
      border: '1px solid ' + c,
      borderRadius: 4,
      color: c,
      background: 'color-mix(in srgb, ' + c + ' 7%, transparent)'
    }
  }, cat);
}

/* ---------- Vote box ---------- */
function VoteBox({
  votes,
  voted,
  onVote
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onVote,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
      width: 64,
      flexShrink: 0,
      padding: '10px 0 8px',
      borderRadius: 9,
      cursor: 'pointer',
      background: voted ? 'var(--accent)' : '#fff',
      border: '1px solid ' + (voted ? 'var(--accent)' : 'var(--border-card)'),
      boxShadow: voted ? '0 1px 4px var(--accent-shadow)' : 'var(--shadow-inset)',
      color: voted ? '#fff' : 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: 1,
      color: voted ? '#fff' : 'var(--text-faint-2)'
    }
  }, "\u25B2"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SERIF2,
      fontWeight: 700,
      fontSize: 21,
      lineHeight: 1.05
    }
  }, votes >= 1000 ? (votes / 1000).toFixed(1) + 'k' : votes), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontSize: 8,
      letterSpacing: '.1em',
      color: voted ? 'rgba(255,255,255,.8)' : 'var(--text-faint-2)'
    }
  }, "VOTES"));
}

/* ---------- Entry row ---------- */
function EntryRow({
  e,
  voted,
  onVote,
  density
}) {
  const pad = density === 'compact' ? '14px 18px' : '20px 22px';
  return /*#__PURE__*/React.createElement("div", {
    className: "xbfy-card",
    style: {
      ...CARD,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 18,
      padding: pad
    }
  }, /*#__PURE__*/React.createElement(VoteBox, {
    votes: e.votes,
    voted: voted,
    onVote: onVote
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, "#", e.rank), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SERIF2,
      fontSize: 22,
      fontWeight: 700,
      lineHeight: 1.12
    }
  }, e.x, /*#__PURE__*/React.createElement("i", {
    style: {
      fontWeight: 400,
      color: 'var(--text-soft)',
      fontSize: '.78em',
      margin: '0 .28em'
    }
  }, "but for"), e.y), e.stamp && /*#__PURE__*/React.createElement(Stamp, {
    kind: e.stamp
  })), density !== 'compact' && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 12px',
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 1.5,
      color: 'var(--text-body)',
      maxWidth: 640
    }
  }, e.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      flexWrap: 'wrap',
      marginTop: density === 'compact' ? 8 : 0
    }
  }, /*#__PURE__*/React.createElement(CatTag, {
    cat: e.cat
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "submitted by @", e.by, " \xB7 ", e.when), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      marginLeft: 'auto',
      fontFamily: SANS2,
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--accent)',
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, "visit site \u2192")))));
}

/* ---------- Sponsored row (gel ribbon) ---------- */
function SponsoredRow() {
  const s = 'var(--sponsor)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...CARD,
      marginTop: 14,
      border: '1.5px solid ' + s,
      boxShadow: 'var(--shadow-sponsor)',
      overflow: 'hidden',
      background: 'linear-gradient(0deg, var(--sponsor-tint), var(--sponsor-tint)), linear-gradient(180deg, var(--surface-card), #FBF7F0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '7px 22px',
      color: '#fff',
      fontFamily: MONO2,
      fontSize: 10,
      letterSpacing: '.12em',
      background: window.gel ? window.gel(s) : s
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2605 PINNED SPONSOR"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .85,
      fontSize: 9
    }
  }, "FEATURED PLACEMENT")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 18,
      padding: '18px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
      width: 64,
      flexShrink: 0,
      padding: '10px 0 8px',
      background: '#fff',
      border: '1px solid var(--border-card)',
      borderRadius: 9,
      boxShadow: 'var(--shadow-inset)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-faint-2)'
    }
  }, "\u25B2"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SERIF2,
      fontWeight: 700,
      fontSize: 21,
      lineHeight: 1.05
    }
  }, "2.3k"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontSize: 8,
      letterSpacing: '.1em',
      color: 'var(--text-faint-2)'
    }
  }, "VOTES")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SERIF2,
      fontSize: 22,
      fontWeight: 700,
      lineHeight: 1.12
    }
  }, "Linear", /*#__PURE__*/React.createElement("i", {
    style: {
      fontWeight: 400,
      color: 'var(--text-soft)',
      fontSize: '.78em',
      margin: '0 .28em'
    }
  }, "but for"), "Wedding Planning"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 12px',
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 1.5,
      color: 'var(--text-body)',
      maxWidth: 640
    }
  }, "Issue tracking, but every bug is a seating-chart crisis. Roadmaps for the aisle, sprints for the caterer."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontSize: 9,
      letterSpacing: '.1em',
      padding: '3px 9px',
      border: '1px solid var(--sponsor-tag)',
      borderRadius: 4,
      color: 'var(--sponsor-tag)'
    }
  }, "SPONSORED"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "submitted by @altar_ego \xB7 1 day ago"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      marginLeft: 'auto',
      fontFamily: SANS2,
      fontSize: 13,
      fontWeight: 500,
      color: s,
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, "visit site \u2192")))));
}

/* ---------- Sidebar widget shell ---------- */
function Widget({
  title,
  accent,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...CARD,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 14px',
      borderBottom: '1px solid var(--border-card)',
      background: 'linear-gradient(180deg,#fff,#F4EEE4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 2,
      background: accent || 'var(--accent)',
      transform: 'rotate(45deg)'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: MONO2,
      fontSize: 11,
      letterSpacing: '.14em',
      color: 'var(--ink)'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, children));
}

/* ---------- Tag cloud ---------- */
function TagCloud() {
  const hues = Object.values(window.XBFY.CAT);
  return /*#__PURE__*/React.createElement(Widget, {
    title: "TAG CLOUD",
    accent: "var(--cat-saas, #6A3D9E)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px 10px',
      lineHeight: 1.1
    }
  }, window.XBFY.TAGS.map((tag, i) => /*#__PURE__*/React.createElement("a", {
    key: tag.t,
    href: "#",
    style: {
      fontFamily: SANS2,
      fontWeight: tag.w >= 4 ? 700 : 500,
      textDecoration: 'none',
      fontSize: 11 + tag.w * 2.5,
      color: hues[i % hues.length],
      opacity: .55 + tag.w * 0.09
    }
  }, tag.t))));
}

/* ---------- Leaderboard widget ---------- */
function Leaderboard() {
  const top = window.XBFY.ENTRIES.slice().sort((a, b) => b.votes - a.votes).slice(0, 5);
  return /*#__PURE__*/React.createElement(Widget, {
    title: "TOP THIS WEEK",
    accent: "var(--stamp-hot, #C2410C)"
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, top.map((e, i) => /*#__PURE__*/React.createElement("li", {
    key: e.rank,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SERIF2,
      fontWeight: 700,
      fontSize: 16,
      color: i === 0 ? 'var(--accent)' : 'var(--text-faint)',
      width: 18
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SANS2,
      fontSize: 13,
      color: 'var(--ink)',
      flex: 1,
      lineHeight: 1.3
    }
  }, e.x, " ", /*#__PURE__*/React.createElement("i", {
    style: {
      color: 'var(--text-soft)',
      fontSize: '.86em'
    }
  }, "but for"), " ", e.y), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, e.votes)))));
}

/* ---------- Newsletter widget ---------- */
function DigestWidget() {
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement(Widget, {
    title: "WEEKLY DIGEST",
    accent: "var(--cat-marketplace, #9B5523)"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 10px',
      fontFamily: SANS2,
      fontSize: 13,
      color: 'var(--text-body)',
      lineHeight: 1.45
    }
  }, "The 10 best ", /*#__PURE__*/React.createElement("i", null, "X but for Y"), "s, every Sunday. No spam, just dubious brilliance."), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO2,
      fontSize: 12,
      color: 'var(--cat-reference, #2A7A56)',
      padding: '9px 0'
    }
  }, "\u2713 You're subscribed. Check your inbox.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "you@email.com",
    style: {
      flex: 1,
      minWidth: 0,
      padding: '9px 11px',
      fontFamily: SANS2,
      fontSize: 13,
      border: '1px solid var(--border-input)',
      borderRadius: 7,
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-inset)',
      color: 'var(--ink)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDone(true),
    style: {
      cursor: 'pointer',
      fontFamily: SANS2,
      fontSize: 13,
      fontWeight: 700,
      color: '#fff',
      border: '1px solid rgba(120,10,70,.4)',
      borderRadius: 7,
      padding: '0 14px',
      background: window.gel ? window.gel('var(--accent)') : 'var(--accent)',
      boxShadow: 'var(--shadow-button)'
    }
  }, "Join")));
}

/* ---------- "As featured on" marquee bar ---------- */
function FeaturedBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-card)',
      borderBottom: '1px solid var(--border-card)',
      background: 'var(--surface-sunken)',
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '13px 28px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO2,
      fontSize: 10,
      letterSpacing: '.16em',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, "AS LINKED FROM"), window.XBFY.FEATURED.map(f => /*#__PURE__*/React.createElement("span", {
    key: f,
    style: {
      fontFamily: SERIF2,
      fontStyle: 'italic',
      fontSize: 16,
      color: 'var(--text-faint)',
      opacity: .8
    }
  }, f))));
}

/* ---------- Footer ---------- */
function Footer() {
  const col = (title, items) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO2,
      fontSize: 10,
      letterSpacing: '.16em',
      color: 'var(--on-dark-muted)',
      marginBottom: 11
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      fontFamily: SANS2,
      fontSize: 14,
      color: 'var(--on-dark)',
      textDecoration: 'none',
      opacity: .85
    }
  }, i))));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink)',
      color: 'var(--on-dark)',
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '46px 28px 30px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
    size: 40,
    footer: true,
    t: {
      ghost: false,
      beta: false
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: SANS2,
      fontSize: 13,
      color: 'var(--on-dark-muted)',
      lineHeight: 1.5,
      maxWidth: 320,
      marginTop: 14
    }
  }, "The directory of ", /*#__PURE__*/React.createElement("i", null, "\"X, but for Y.\""), " A hand-curated, daily-updated, human-voted index of dubious brilliance.")), col('THE INDEX', window.XBFY.FOOTER.index), col('ELSEWHERE', window.XBFY.FOOTER.elsewhere)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '16px 28px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      fontFamily: MONO2,
      fontSize: 10,
      letterSpacing: '.05em',
      color: 'var(--on-dark-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "XBUTFORY \xA9 2026 \xB7 AN INDEX OF DUBIOUS BRILLIANCE"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      border: '1px solid rgba(255,255,255,.3)',
      borderRadius: 3,
      padding: '2px 6px'
    }
  }, "XHTML 1.0"), /*#__PURE__*/React.createElement("span", {
    style: {
      border: '1px solid rgba(255,255,255,.3)',
      borderRadius: 3,
      padding: '2px 6px'
    }
  }, "RSS 2.0"), /*#__PURE__*/React.createElement("span", null, "made by a builder, again")))));
}
Object.assign(window, {
  HeroDek,
  Stamp,
  CatTag,
  VoteBox,
  EntryRow,
  SponsoredRow,
  Widget,
  TagCloud,
  Leaderboard,
  DigestWidget,
  FeaturedBar,
  Footer,
  CARD
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/maximal-home/feed.jsx", error: String((e && e.message) || e) }); }

// prototypes/maximal-home/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "prototypes/maximal-home/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/directory/Masthead.jsx
try { (() => {
/**
 * The directory masthead: the dark utility bar (MastheadBar) + eyebrow/wordmark
 * + the search / RSS / Submit action row. Shared across every screen.
 */
function Masthead({
  query,
  onQuery,
  onSubmit,
  onRss,
  onHome
}) {
  return /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement(__ds_scope.MastheadBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max, 1040px)',
      margin: '0 auto',
      padding: '24px 24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
      fontSize: 12,
      letterSpacing: '0.32em',
      color: 'var(--text-muted, #8A7D6F)',
      marginBottom: 5
    }
  }, "THE DIRECTORY OF"), /*#__PURE__*/React.createElement("div", {
    onClick: onHome,
    style: {
      fontFamily: "var(--font-display, 'Newsreader', serif)",
      fontWeight: 700,
      fontSize: 'clamp(44px, 6.6vw, 66px)',
      lineHeight: 0.9,
      letterSpacing: '-0.012em',
      cursor: 'pointer',
      userSelect: 'none'
    }
  }, "X", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent, #E11D8F)'
    }
  }, "but"), "forY."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SearchInput, {
    value: query,
    onChange: onQuery,
    style: {
      flex: 1,
      minWidth: 220
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    icon: "\uD83D\uDCE1",
    onClick: onRss
  }, "RSS"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    icon: "+",
    onClick: onSubmit
  }, "Submit a Site"))));
}
Object.assign(__ds_scope, { Masthead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/directory/Masthead.jsx", error: String((e && e.message) || e) }); }

// ui_kits/directory/CategoriesScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SERIF = "var(--font-display, 'Newsreader', serif)";
const TABS = [{
  key: 'latest',
  label: 'Latest'
}, {
  key: 'trending',
  label: 'Trending'
}, {
  key: 'top',
  label: 'Top Voted'
}, {
  key: 'categories',
  label: 'Categories'
}, {
  key: 'random',
  label: 'Random'
}, {
  key: 'submit',
  label: 'Submit'
}];
const CATS = [{
  category: 'dating',
  short: 'DATING',
  name: 'Dating & Hookups',
  count: '3',
  sample: 'Tinder · Hinge · Grindr'
}, {
  category: 'crm',
  short: 'CRM',
  name: 'CRM & Sales',
  count: '3',
  sample: 'Salesforce · HubSpot · Pipedrive'
}, {
  category: 'discovery',
  short: 'DISCOVER',
  name: 'Metasearch & Discovery',
  count: '3',
  sample: 'Kayak · SeatGeek · Google Flights'
}, {
  category: 'saas',
  short: 'SAAS',
  name: 'SaaS & Productivity',
  count: '4',
  sample: 'Notion · Figma · GitHub'
}, {
  category: 'payments',
  short: 'FINANCE',
  name: 'Payments & Finance',
  count: '3',
  sample: 'Stripe · Venmo · Robinhood'
}, {
  category: 'social',
  short: 'SOCIAL',
  name: 'Social & Links',
  count: '3',
  sample: 'Linktree · LinkedIn · Twitter'
}, {
  category: 'logistics',
  short: 'SERVICES',
  name: 'Logistics & Services',
  count: '3',
  sample: 'Uber · Airbnb · DoorDash'
}];

/**
 * The "Browse by Category" screen — shared masthead + nav and a responsive grid
 * of CategoryTiles. Clicking a tile filters the feed (wire `onPick`).
 */
function CategoriesScreen({
  onPick
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink, #171008)',
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Masthead, null), /*#__PURE__*/React.createElement(__ds_scope.NavTabs, {
    tabs: TABS,
    active: "categories"
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--content-max, 1040px)',
      margin: '0 auto',
      padding: '34px 24px 90px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      fontFamily: MONO,
      fontSize: 12,
      letterSpacing: '0.12em',
      color: 'var(--text-muted, #8A7D6F)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--accent, #C93B1B)',
      display: 'inline-block'
    }
  }), "VOL. 01 \xB7 ISSUE 26 \xB7 JUN 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingBottom: 13,
      borderBottom: '2px solid var(--ink, #171008)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: SERIF,
      fontSize: 27,
      fontWeight: 700,
      margin: 0,
      lineHeight: 1
    }
  }, "Browse by Category"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: 'var(--text-muted, #8A7D6F)',
      marginTop: 7
    }
  }, "7 categories \xB7 pick one to filter the index")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: 14,
      marginTop: 18
    }
  }, CATS.map(c => /*#__PURE__*/React.createElement(__ds_scope.CategoryTile, _extends({
    key: c.category
  }, c, {
    onClick: () => onPick && onPick(c.category)
  }))))));
}
Object.assign(__ds_scope, { CategoriesScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/directory/CategoriesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/directory/DetailScreen.jsx
try { (() => {
const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SERIF = "var(--font-display, 'Newsreader', serif)";
const TABS = [{
  key: 'latest',
  label: 'Latest'
}, {
  key: 'trending',
  label: 'Trending'
}, {
  key: 'top',
  label: 'Top Voted'
}, {
  key: 'categories',
  label: 'Categories'
}, {
  key: 'random',
  label: 'Random'
}, {
  key: 'submit',
  label: 'Submit'
}];
const DEFAULT = {
  x: 'Notion',
  y: 'Recipes',
  name: 'Prep',
  votes: '1.5k',
  category: 'saas',
  categoryLabel: 'SAAS',
  categoryName: 'SaaS & Productivity',
  ago: '2 days ago',
  submitter: '@hungrybuilder',
  tagline: 'Your kitchen\u2019s second brain',
  pitch: 'Linked databases for ingredients, shopping lists, and meal plans \u2014 relational data, finally serving your dinner parties. Scales any recipe to any guest count automatically.',
  why: 'Home cooks are obsessive organizers with zero good tools. Prep speaks their language without making them learn database theory.'
};
const KLBL = {
  fontFamily: MONO,
  fontSize: 9,
  color: 'var(--text-muted, #8A7D6F)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  margin: '0 0 14px'
};
const MC = {
  padding: '14px 16px',
  borderBottom: '1px solid var(--border-soft, #E5DCCD)'
};
const MCK = {
  fontFamily: MONO,
  fontSize: 9,
  color: 'var(--text-muted, #8A7D6F)',
  letterSpacing: '0.06em',
  marginBottom: 4
};

/**
 * The entry detail screen: shared masthead + nav, a vote column, the big
 * "X but for Y" title with category badge, the pitch / why-it-works prose, and
 * the formula meta-card. Pass an `entry` or it falls back to a sample.
 */
function DetailScreen({
  entry = DEFAULT,
  onBack
}) {
  const e = entry;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink, #171008)',
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Masthead, null), /*#__PURE__*/React.createElement(__ds_scope.NavTabs, {
    tabs: TABS,
    active: "latest"
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--content-max, 1040px)',
      margin: '0 auto',
      padding: '34px 24px 90px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: 'var(--text-muted, #8A7D6F)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      marginBottom: 34,
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "\u2190 All entries"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '74px 1fr',
      gap: 34,
      alignItems: 'start',
      marginBottom: 46
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: '2px solid var(--border-rule, #D4C9B8)',
      color: 'var(--text-muted, #8A7D6F)',
      padding: '11px 12px',
      fontSize: 15,
      width: '100%',
      borderRadius: 6,
      lineHeight: 1,
      cursor: 'pointer'
    }
  }, "\u25B2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SERIF,
      fontWeight: 700,
      fontSize: 34,
      lineHeight: 1,
      margin: '7px 0 2px'
    }
  }, e.votes), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 9,
      color: 'var(--text-muted, #8A7D6F)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "votes")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 13,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 9,
      padding: '3px 8px',
      background: `var(--cat-${e.category}, #6A3D9E)`,
      color: '#fff',
      letterSpacing: '0.05em',
      borderRadius: 3
    }
  }, e.categoryLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: 'var(--text-muted, #8A7D6F)',
      letterSpacing: '0.04em'
    }
  }, "submitted ", e.ago)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: SERIF,
      fontSize: 'clamp(28px,4.6vw,50px)',
      fontWeight: 700,
      margin: '0 0 10px',
      lineHeight: 1.06
    }
  }, e.x, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-soft, #9A8C7B)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: '0.6em'
    }
  }, " but for "), e.y), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: 'var(--text-muted, #8A7D6F)',
      margin: '0 0 26px',
      fontWeight: 300,
      fontStyle: 'italic',
      lineHeight: 1.4
    }
  }, e.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "dark"
  }, "Visit ", e.name, " \u2197"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: 'var(--text-faint, #B5AB9B)'
    }
  }, "by ", e.submitter)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1.5px solid var(--border-rule, #D4C9B8)',
      paddingTop: 30,
      display: 'grid',
      gridTemplateColumns: '1fr 220px',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: KLBL
  }, "The pitch"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.8,
      margin: '0 0 30px',
      fontWeight: 300
    }
  }, e.pitch), /*#__PURE__*/React.createElement("p", {
    style: KLBL
  }, "Why it works"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.7,
      color: 'var(--text-body-soft, #5A5048)',
      margin: 0,
      fontWeight: 300
    }
  }, e.why)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-card, #EDE4D5)',
      background: 'var(--surface-card, #FFFDFA)',
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: MC
  }, /*#__PURE__*/React.createElement("div", {
    style: MCK
  }, "THE FORMULA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, e.x, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted, #8A7D6F)'
    }
  }, "\xD7"), " ", e.y)), /*#__PURE__*/React.createElement("div", {
    style: MC
  }, /*#__PURE__*/React.createElement("div", {
    style: MCK
  }, "CATEGORY"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, e.categoryName)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: MCK
  }, "STATUS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--status-live, #2A7A56)'
    }
  }, "\u25CF Live & launched")))))));
}
Object.assign(__ds_scope, { DetailScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/directory/DetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/directory/FeedScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SERIF = "var(--font-display, 'Newsreader', serif)";
const TABS = [{
  key: 'latest',
  label: 'Latest'
}, {
  key: 'trending',
  label: 'Trending'
}, {
  key: 'top',
  label: 'Top Voted'
}, {
  key: 'categories',
  label: 'Categories'
}, {
  key: 'random',
  label: 'Random'
}, {
  key: 'submit',
  label: 'Submit'
}];
const ENTRIES = [{
  index: '#001',
  x: 'Uber',
  y: 'Horses',
  votes: '1.1k',
  category: 'logistics',
  categoryLabel: 'SERVICES',
  submitter: '@trailblazer',
  ago: 'yesterday',
  stamp: 'NEW',
  description: 'Request horse transport in places cars literally cannot reach. Big in Appalachian trail towns and rural Montana.'
}, {
  index: '#002',
  x: 'Stripe',
  y: 'Lemonade Stands',
  votes: '923',
  category: 'payments',
  categoryLabel: 'FINANCE',
  submitter: '@dadof3',
  ago: 'yesterday',
  stamp: 'NEW',
  description: 'Tap-to-pay for kids aged 6–16, where a parent approves every transaction. Entrepreneurship without a shoebox of damp dollar bills.'
}, {
  index: '#003',
  x: 'Notion',
  y: 'Recipes',
  votes: '1.5k',
  category: 'saas',
  categoryLabel: 'SAAS',
  submitter: '@hungrybuilder',
  ago: '2 days ago',
  stamp: 'HOT',
  description: 'Linked databases for ingredients, shopping lists and meal plans — relational data, finally serving your dinner parties.'
}, {
  index: '#004',
  x: 'Kayak',
  y: 'Restaurant Tables',
  votes: '891',
  category: 'discovery',
  categoryLabel: 'DISCOVER',
  submitter: '@foodie',
  ago: '5 days ago',
  stamp: 'HOT',
  description: 'Compare availability and pricing across every reservation platform at once — OpenTable, Resy, Tock — in one grid.'
}];

// Two paid placements: one pinned to the top (one at a time), one spotlight mid-feed.
const PINNED = {
  sponsored: 'pinned',
  x: 'Linear',
  y: 'Wedding Planning',
  votes: '2.3k',
  category: 'saas',
  categoryLabel: 'SAAS',
  submitter: '@altar_ego',
  ago: '1 day ago',
  description: 'Issue tracking, but every bug is a seating-chart crisis. Roadmaps for the aisle, sprints for the caterer.'
};
const SPOTLIGHT = {
  sponsored: 'spotlight',
  x: 'Tinder',
  y: 'the Building You Live In',
  votes: '847',
  category: 'dating',
  categoryLabel: 'DATING',
  submitter: '@apt_4b',
  ago: '2 days ago',
  stamp: 'HOT',
  description: 'Why scroll through a whole city of strangers when the love of your life might share your elevator? Floormate matches verified residents inside your building only.'
};
const FEED = [PINNED, ENTRIES[0], ENTRIES[1], SPOTLIGHT, ENTRIES[2], ENTRIES[3]];

/**
 * The directory home screen: masthead, sticky nav, editorial hero, stat block,
 * and the Latest Submissions feed. A reference composition of the kit's
 * components — wire the handlers to real state in production.
 */
function FeedScreen() {
  const [query, setQuery] = React.useState('');
  const [tab, setTab] = React.useState('latest');
  const [sort, setSort] = React.useState('newest');
  const [voted, setVoted] = React.useState({});
  const q = query.toLowerCase().trim();
  const visible = FEED.filter(e => !q || (e.x + ' ' + e.y + ' ' + e.description + ' ' + (e.categoryLabel || '')).toLowerCase().includes(q));
  let n = 0;
  const numbered = visible.map(e => e.sponsored === 'pinned' ? {
    ...e,
    index: '\u2605 PINNED'
  } : {
    ...e,
    index: '#' + String(++n).padStart(3, '0')
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      color: 'var(--ink, #171008)',
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Masthead, {
    query: query,
    onQuery: e => setQuery(e.target.value)
  }), /*#__PURE__*/React.createElement(__ds_scope.NavTabs, {
    tabs: TABS,
    active: tab,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--content-max, 1040px)',
      margin: '0 auto',
      padding: '34px 24px 90px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      fontFamily: MONO,
      fontSize: 12,
      letterSpacing: '0.12em',
      color: 'var(--text-muted, #8A7D6F)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--accent, #C93B1B)',
      display: 'inline-block'
    }
  }), "VOL. 01 \xB7 ISSUE 26 \xB7 JUN 2026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: SERIF,
      fontSize: 'clamp(26px,3.5vw,40px)',
      fontWeight: 500,
      margin: '14px 0 0',
      lineHeight: 1.2,
      letterSpacing: '-0.005em',
      maxWidth: 880
    }
  }, "A hand-curated index of ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "newly launched"), " websites that pitch themselves as ", /*#__PURE__*/React.createElement(__ds_scope.CodeChip, null, "X but for Y"), ". Updated daily, voted by humans."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      width: 'clamp(150px,26%,240px)',
      marginTop: 20,
      borderRadius: 2,
      background: 'var(--spectral)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 24,
      marginTop: 30,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      letterSpacing: '0.14em',
      color: 'var(--text-muted, #8A7D6F)',
      marginBottom: 4
    }
  }, "IN THE INDEX"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SERIF,
      fontSize: 'clamp(46px,6.6vw,66px)',
      fontWeight: 700,
      lineHeight: 0.82
    }
  }, "18")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      paddingBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: 'var(--accent, #C93B1B)'
    }
  }, "\u25CF 2 new today"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: 'var(--text-muted, #8A7D6F)'
    }
  }, "7 categories \xB7 voted by humans"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      marginTop: 26,
      paddingBottom: 13,
      borderBottom: '2px solid var(--ink, #171008)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: SERIF,
      fontSize: 27,
      fontWeight: 700,
      margin: 0,
      lineHeight: 1
    }
  }, "Latest Submissions"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 11,
      color: 'var(--text-muted, #8A7D6F)',
      marginTop: 7
    }
  }, "Showing 1\u2013", visible.length, " of 18")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: 'var(--text-faint, #B5AB9B)',
      letterSpacing: '0.08em'
    }
  }, "SORT"), /*#__PURE__*/React.createElement(__ds_scope.SortToggle, {
    value: sort,
    onChange: setSort
  }))), visible.length === 0 ? /*#__PURE__*/React.createElement(__ds_scope.EmptyState, {
    action: "Be the first"
  }, "No \u201C", query, " but for ___\u201D in the index.") : numbered.map(e => /*#__PURE__*/React.createElement(__ds_scope.EntryCard, _extends({
    key: e.x + e.y
  }, e, {
    voted: !!voted[e.x],
    onVote: () => setVoted(v => ({
      ...v,
      [e.x]: !v[e.x]
    })),
    onView: () => {}
  })))));
}
Object.assign(__ds_scope, { FeedScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/directory/FeedScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/directory/SubmitScreen.jsx
try { (() => {
const MONO = "var(--font-mono, 'Space Mono', monospace)";
const SERIF = "var(--font-display, 'Newsreader', serif)";
const TABS = [{
  key: 'latest',
  label: 'Latest'
}, {
  key: 'trending',
  label: 'Trending'
}, {
  key: 'top',
  label: 'Top Voted'
}, {
  key: 'categories',
  label: 'Categories'
}, {
  key: 'random',
  label: 'Random'
}, {
  key: 'submit',
  label: 'Submit'
}];
const LABEL = {
  display: 'block',
  fontFamily: MONO,
  fontSize: 9,
  letterSpacing: '0.07em',
  color: 'var(--text-muted, #8A7D6F)',
  textTransform: 'uppercase',
  marginBottom: 7
};
const INPUT = {
  width: '100%',
  padding: '11px 14px',
  background: 'var(--surface-card, #FFFDFA)',
  border: '1px solid var(--border-input, #D8CDB9)',
  borderRadius: 8,
  boxShadow: 'var(--shadow-inset)',
  fontFamily: "var(--font-sans, 'Outfit', sans-serif)",
  fontSize: 15,
  color: 'var(--ink, #171008)',
  boxSizing: 'border-box'
};
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: LABEL
  }, label), children);
}

/**
 * The submit-a-site screen. The two top fields drive the live SubmitPreview,
 * and the listing tier flips the primary CTA label/color. A reference flow —
 * swap the no-op submit for a real handler.
 */
function SubmitScreen() {
  const [x, setX] = React.useState('');
  const [y, setY] = React.useState('');
  const [tier, setTier] = React.useState('free');
  const tierCard = (key, title, sub) => {
    const on = tier === key;
    const accent = key === 'feat';
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => setTier(key),
      style: {
        padding: '15px 16px',
        cursor: 'pointer',
        borderRadius: 6,
        border: `1.5px solid ${on ? accent ? 'var(--accent, #C93B1B)' : 'var(--ink, #171008)' : 'var(--border-input, #D8CDB9)'}`,
        background: on ? accent ? 'var(--accent, #C93B1B)' : 'var(--ink, #171008)' : 'var(--surface-card, #FFFDFA)',
        color: on ? '#fff' : 'var(--ink, #171008)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14,
        marginBottom: 3
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.75,
        fontWeight: 300
      }
    }, sub));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink, #171008)',
      fontFamily: "var(--font-sans, 'Outfit', sans-serif)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Masthead, null), /*#__PURE__*/React.createElement(__ds_scope.NavTabs, {
    tabs: TABS,
    active: "submit"
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 600,
      margin: '0 auto',
      padding: '46px 24px 90px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: SERIF,
      fontSize: 42,
      fontWeight: 700,
      margin: '0 0 8px',
      lineHeight: 1.05
    }
  }, "Submit a Site"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted, #8A7D6F)',
      margin: '0 0 36px',
      fontWeight: 300
    }
  }, "Free to list in the directory. $1.99 buys a featured homepage spot."), /*#__PURE__*/React.createElement(Field, {
    label: "The X \u2014 what existing product inspired it?"
  }, /*#__PURE__*/React.createElement("input", {
    style: INPUT,
    value: x,
    onChange: e => setX(e.target.value),
    placeholder: "Tinder, Salesforce, Notion\u2026"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "The Y \u2014 what oddly-specific niche does it serve?"
  }, /*#__PURE__*/React.createElement("input", {
    style: INPUT,
    value: y,
    onChange: e => setY(e.target.value),
    placeholder: "Dog parks, lemonade stands\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SubmitPreview, {
    x: x,
    y: y
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Product name"
  }, /*#__PURE__*/React.createElement("input", {
    style: INPUT,
    placeholder: "Floormate, LightSeek, Squeeze\u2026"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Product URL"
  }, /*#__PURE__*/React.createElement("input", {
    style: INPUT,
    placeholder: "https://\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: LABEL
  }, "Listing type"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8
    }
  }, tierCard('free', 'Free listing', 'Indexed within 24h'), tierCard('feat', 'Featured — $1.99', 'Homepage spot + boost'))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: tier === 'feat' ? 'primary' : 'dark',
    trailingArrow: true,
    style: {
      width: '100%',
      justifyContent: 'center',
      padding: 14
    }
  }, tier === 'feat' ? 'Launch for $1.99' : 'Submit for free'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: MONO,
      fontSize: 10,
      color: 'var(--text-faint, #B5AB9B)',
      textAlign: 'center',
      margin: '14px 0 0'
    }
  }, "no account needed \xB7 no spam \xB7 takes 30 seconds")));
}
Object.assign(__ds_scope, { SubmitScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/directory/SubmitScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BetaBurst = __ds_scope.BetaBurst;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.CategoryTile = __ds_scope.CategoryTile;

__ds_ns.EntryCard = __ds_scope.EntryCard;

__ds_ns.AccountMenu = __ds_scope.AccountMenu;

__ds_ns.MastheadBar = __ds_scope.MastheadBar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CodeChip = __ds_scope.CodeChip;

__ds_ns.Stamp = __ds_scope.Stamp;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DigestSignup = __ds_scope.DigestSignup;

__ds_ns.FeaturedBar = __ds_scope.FeaturedBar;

__ds_ns.TagCloud = __ds_scope.TagCloud;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.SortToggle = __ds_scope.SortToggle;

__ds_ns.SubmitPreview = __ds_scope.SubmitPreview;

__ds_ns.GlossyNav = __ds_scope.GlossyNav;

__ds_ns.NavTabs = __ds_scope.NavTabs;

__ds_ns.CategoriesScreen = __ds_scope.CategoriesScreen;

__ds_ns.DetailScreen = __ds_scope.DetailScreen;

__ds_ns.FeedScreen = __ds_scope.FeedScreen;

__ds_ns.Masthead = __ds_scope.Masthead;

__ds_ns.SubmitScreen = __ds_scope.SubmitScreen;

})();
