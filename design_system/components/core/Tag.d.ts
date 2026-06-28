import * as React from 'react';

/**
 * Monospace, hue-tinted category tag used on entry cards and tiles.
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** One of the seven directory categories — sets the hue automatically. */
  category?: 'dating' | 'crm' | 'discovery' | 'saas' | 'payments' | 'social' | 'logistics';
  /** Explicit color override (any CSS color); wins over `category`. */
  color?: string;
  /** Label text, e.g. "SAAS". */
  children?: React.ReactNode;
}

export declare function Tag(props: TagProps): JSX.Element;
