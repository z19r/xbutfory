/* @ds-bundle: {"format":3,"namespace":"XbutforyDesignSystem_d0097d","components":[{"name":"CategoryTile","sourcePath":"components/cards/CategoryTile.jsx"},{"name":"EntryCard","sourcePath":"components/cards/EntryCard.jsx"},{"name":"MastheadBar","sourcePath":"components/chrome/MastheadBar.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CodeChip","sourcePath":"components/core/CodeChip.jsx"},{"name":"Stamp","sourcePath":"components/core/Stamp.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"SearchInput","sourcePath":"components/forms/SearchInput.jsx"},{"name":"SortToggle","sourcePath":"components/forms/SortToggle.jsx"},{"name":"SubmitPreview","sourcePath":"components/forms/SubmitPreview.jsx"},{"name":"NavTabs","sourcePath":"components/navigation/NavTabs.jsx"},{"name":"CategoriesScreen","sourcePath":"ui_kits/directory/CategoriesScreen.jsx"},{"name":"DetailScreen","sourcePath":"ui_kits/directory/DetailScreen.jsx"},{"name":"FeedScreen","sourcePath":"ui_kits/directory/FeedScreen.jsx"},{"name":"Masthead","sourcePath":"ui_kits/directory/Masthead.jsx"},{"name":"SubmitScreen","sourcePath":"ui_kits/directory/SubmitScreen.jsx"}],"sourceHashes":{"components/cards/CategoryTile.jsx":"4d9d139cd8c6","components/cards/EntryCard.jsx":"19cb1fd960ad","components/chrome/MastheadBar.jsx":"d601d738a984","components/core/Button.jsx":"e9b7d89630bb","components/core/CodeChip.jsx":"a063d6875ed2","components/core/Stamp.jsx":"b40464937cd0","components/core/Tag.jsx":"a77522a92fc8","components/feedback/EmptyState.jsx":"ee3023dc9d7b","components/feedback/Toast.jsx":"c4fa5f42fc60","components/forms/SearchInput.jsx":"fce4cef1164f","components/forms/SortToggle.jsx":"32ef93eb214b","components/forms/SubmitPreview.jsx":"ead3957ca203","components/navigation/NavTabs.jsx":"37583ce1847c","ui_kits/directory/CategoriesScreen.jsx":"218bfe8ffdd3","ui_kits/directory/DetailScreen.jsx":"ca66dbc02cfe","ui_kits/directory/FeedScreen.jsx":"bf477620cb6d","ui_kits/directory/Masthead.jsx":"4d0ed9c84688","ui_kits/directory/SubmitScreen.jsx":"e5b90c837cd8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.XbutforyDesignSystem_d0097d = window.XbutforyDesignSystem_d0097d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

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

/**
 * XbutforY button. Inline-styled, theme-aware via CSS custom properties.
 * The primary variant carries the warm accent glow; secondary is the paper
 * outline (RSS, filters); ghost is for nav tabs and quiet links.
 */
function Button({
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

__ds_ns.CategoryTile = __ds_scope.CategoryTile;

__ds_ns.EntryCard = __ds_scope.EntryCard;

__ds_ns.MastheadBar = __ds_scope.MastheadBar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CodeChip = __ds_scope.CodeChip;

__ds_ns.Stamp = __ds_scope.Stamp;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.SortToggle = __ds_scope.SortToggle;

__ds_ns.SubmitPreview = __ds_scope.SubmitPreview;

__ds_ns.NavTabs = __ds_scope.NavTabs;

__ds_ns.CategoriesScreen = __ds_scope.CategoriesScreen;

__ds_ns.DetailScreen = __ds_scope.DetailScreen;

__ds_ns.FeedScreen = __ds_scope.FeedScreen;

__ds_ns.Masthead = __ds_scope.Masthead;

__ds_ns.SubmitScreen = __ds_scope.SubmitScreen;

})();
