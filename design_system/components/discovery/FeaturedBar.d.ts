import * as React from 'react';

/**
 * Full-bleed "AS FEATURED ON" social-proof strip — glossy gel badges plus a
 * retro validity stamp. A blogosphere-era flourish; place between feed and footer.
 * @startingPoint section="Discovery" subtitle="‘As featured on’ social-proof strip" viewport="1200x70"
 */
export interface FeaturedBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lead label. @default 'AS FEATURED ON' */
  label?: string;
  /** Publication names rendered as gel badges. */
  badges: string[];
  /** Right-aligned retro note. @default 'valid XHTML 1.0 · RSS 2.0'. Pass '' to hide. */
  note?: string;
  /** Glossy gel badge surface. @default true */
  gel?: boolean;
  /** Inner content max-width to align with the page grid. @default 1200 */
  maxWidth?: number;
  style?: React.CSSProperties;
}

export declare function FeaturedBar(props: FeaturedBarProps): JSX.Element;
