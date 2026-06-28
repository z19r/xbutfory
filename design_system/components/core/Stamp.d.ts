import * as React from 'react';

/**
 * The rubber-stamp badge that flags a directory entry as fresh or trending.
 */
export interface StampProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** NEW = launched in the last day; HOT = high vote velocity. @default 'NEW' */
  kind?: 'NEW' | 'HOT';
  /** Override the label text (defaults to the kind). */
  children?: React.ReactNode;
}

export declare function Stamp(props: StampProps): JSX.Element;
