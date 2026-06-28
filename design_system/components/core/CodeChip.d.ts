import * as React from 'react';

/**
 * Inline monospace chip for a literal snippet inside serif copy — most often
 * the phrase "X but for Y".
 */
export interface CodeChipProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export declare function CodeChip(props: CodeChipProps): JSX.Element;
