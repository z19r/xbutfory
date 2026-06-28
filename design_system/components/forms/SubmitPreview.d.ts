import * as React from 'react';

/**
 * Dashed "live preview" well that renders the X but for Y formula as the user
 * fills in the submit form. Falls back to literal "X" / "Y" placeholders.
 */
export interface SubmitPreviewProps {
  /** The familiar product the user typed. */
  x?: string;
  /** The niche the user typed. */
  y?: string;
  /** Eyebrow label. @default 'Live preview' */
  label?: string;
  style?: React.CSSProperties;
}

export declare function SubmitPreview(props: SubmitPreviewProps): JSX.Element;
