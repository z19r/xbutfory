import * as React from 'react';

/**
 * Inset search field with magnifier glyph, used in the masthead.
 */
export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export declare function SearchInput(props: SearchInputProps): JSX.Element;
