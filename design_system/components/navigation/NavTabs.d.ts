import * as React from 'react';

/**
 * Sticky primary navigation tabs for the directory.
 */
export interface NavTab {
  key?: string;
  label: string;
}
export interface NavTabsProps {
  tabs: NavTab[];
  /** Active tab key (falls back to label). */
  active?: string;
  onSelect?: (key: string) => void;
  /** Stick to the top of the viewport on scroll. @default true */
  sticky?: boolean;
  style?: React.CSSProperties;
}

export declare function NavTabs(props: NavTabsProps): JSX.Element;
