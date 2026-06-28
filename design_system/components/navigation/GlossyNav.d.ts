import * as React from 'react';

/** A nav item — a bare label or an object (room for future per-item data). */
export type GlossyNavItem = string | { label: string };

/**
 * Maximal-mode primary nav — a glossy periwinkle gel bar with a raised active
 * tab. The loud counterpart to NavTabs.
 * @startingPoint section="Navigation" subtitle="Glossy Y2K periwinkle nav bar" viewport="1200x60"
 */
export interface GlossyNavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Tab labels, in order. */
  items: GlossyNavItem[];
  /** The active tab's label. */
  active?: string;
  /** Called with the clicked tab's label. */
  onSelect?: (label: string) => void;
  /** Right-aligned mono note, e.g. "1,024 sites indexed". */
  note?: string;
  /** Inner max-width to align with the page grid. @default 1200 */
  maxWidth?: number;
  /** Stick to the top on scroll. @default true */
  sticky?: boolean;
  style?: React.CSSProperties;
}

export declare function GlossyNav(props: GlossyNavProps): JSX.Element;
