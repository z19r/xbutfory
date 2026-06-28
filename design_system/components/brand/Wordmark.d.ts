import * as React from 'react';

/**
 * The XbutforY typographic wordmark — "XbutforY." set live in Newsreader 700,
 * accent on the pivot "but". Optional ghost double-exposure and corner beta burst.
 * @startingPoint section="Brand" subtitle="The XbutforY wordmark, set in type" viewport="700x150"
 */
export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Font size in px (drives the whole lockup). @default 64 */
  size?: number;
  /** Also color the trailing "Y." in the accent. @default true */
  accentY?: boolean;
  /** Faint offset double-exposure behind the mark (Y2K flourish). @default false */
  ghost?: boolean;
  /** Pin a BetaBurst to the top-right corner. @default false */
  beta?: boolean;
  /** Beta badge text. @default 'BETA' */
  betaLabel?: string;
  style?: React.CSSProperties;
}

export declare function Wordmark(props: WordmarkProps): JSX.Element;
