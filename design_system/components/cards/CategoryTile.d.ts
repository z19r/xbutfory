import * as React from 'react';

/**
 * Clickable tile in the "Browse by Category" grid. Filters the feed on click.
 */
export interface CategoryTileProps {
  /** Full name, e.g. "Dating & Hookups". */
  name: string;
  /** Short code, e.g. "DATING". */
  short?: string;
  /** Count of entries, e.g. "3". */
  count?: string | number;
  /** Sample entries joined for the subline, e.g. "Tinder · Hinge · Grindr". */
  sample?: string;
  /** Category key — sets the hue. */
  category?: 'dating' | 'crm' | 'discovery' | 'saas' | 'payments' | 'social' | 'logistics';
  /** Explicit color override. */
  color?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export declare function CategoryTile(props: CategoryTileProps): JSX.Element;
