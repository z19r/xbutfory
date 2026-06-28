import * as React from 'react';

/**
 * The full-bleed dark utility bar at the very top of the directory.
 */
export interface MastheadBarLink {
  label: string;
  /** Render brighter (paper-colored) to mark the primary action. */
  strong?: boolean;
}
export interface MastheadBarProps {
  /** The left-hand "est." line. */
  issue?: string;
  /** Right-hand links. @default Sign in / Create account */
  links?: MastheadBarLink[];
  onLink?: (label: string) => void;
}

export declare function MastheadBar(props: MastheadBarProps): JSX.Element;
