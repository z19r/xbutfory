import * as React from 'react';

/**
 * Centered empty / no-results state with the house deadpan tone.
 */
export interface EmptyStateProps {
  /** Serif headline. @default 'Nothing here yet.' */
  title?: string;
  /** The mono explainer line (often a search echo). */
  children?: React.ReactNode;
  /** Optional accent CTA text (a → is appended). */
  action?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}

export declare function EmptyState(props: EmptyStateProps): JSX.Element;
