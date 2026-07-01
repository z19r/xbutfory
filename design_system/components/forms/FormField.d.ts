import * as React from 'react';

/**
 * Labeled form field for auth + settings — mono label, inset paper input, hint/error.
 * Spreads native input/textarea attributes (value, onChange, type, placeholder…).
 * @startingPoint section="Forms" subtitle="Labeled input for auth & settings" viewport="700x150"
 */
export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono uppercase label above the field. */
  label?: React.ReactNode;
  /** Quiet helper line below (hidden when `error` is set). */
  hint?: React.ReactNode;
  /** Error message — turns the border accent and shows beside the label. */
  error?: React.ReactNode;
  /** Inline leading glyph inside the field, e.g. "@". */
  prefix?: React.ReactNode;
  /** Element pinned to the right inside the field (e.g. a show/hide toggle). */
  trailing?: React.ReactNode;
  /** Render a textarea instead of an input (e.g. bio). @default 'input' */
  as?: 'input' | 'textarea';
  style?: React.CSSProperties;
}

export declare function FormField(props: FormFieldProps): JSX.Element;
