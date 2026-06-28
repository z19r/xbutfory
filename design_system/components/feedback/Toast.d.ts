import * as React from 'react';

/**
 * Monospace ink toast with a hard offset shadow (printed-sticker feel).
 */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export declare function Toast(props: ToastProps): JSX.Element;
