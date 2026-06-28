import * as React from 'react';

/**
 * A glossy 12-point "starburst" beta badge — the loudest early-2000s flourish.
 * Decorative; absolutely-position it over a wordmark or hero via `style`.
 * @startingPoint section="Brand" subtitle="Glossy Y2K starburst badge" viewport="700x150"
 */
export interface BetaBurstProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge text. @default 'BETA' */
  label?: string;
  /** Diameter in px. @default 78 */
  size?: number;
  /** Tilt in degrees (the label counter-rotates to stay legible). @default 12 */
  rotate?: number;
  /** Override the amber fill with any CSS color/gradient. */
  color?: string;
  style?: React.CSSProperties;
}

export declare function BetaBurst(props: BetaBurstProps): JSX.Element;
