import * as React from 'react';

/**
 * Primary actions, utility buttons, and quiet nav/text links for XbutforY.
 * @startingPoint section="Core" subtitle="Primary, secondary, ghost & dark buttons" viewport="700x160"
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Visual treatment. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Leading glyph or emoji, e.g. '+' or '📡'. */
  icon?: React.ReactNode;
  /** Append a trailing → arrow. @default false */
  trailingArrow?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
