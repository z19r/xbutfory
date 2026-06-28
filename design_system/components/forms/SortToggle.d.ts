import * as React from 'react';

/**
 * Segmented sort control sitting on a sunken rail (Newest / Hot / Top).
 */
export interface SortOption {
  key: string;
  label: string;
}
export interface SortToggleProps {
  /** Active option key. @default 'newest' */
  value?: string;
  /** @default [{key:'newest',label:'Newest'},{key:'hot',label:'Hot'},{key:'top',label:'Top'}] */
  options?: SortOption[];
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
}

export declare function SortToggle(props: SortToggleProps): JSX.Element;
