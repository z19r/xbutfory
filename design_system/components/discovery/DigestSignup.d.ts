import * as React from 'react';

/**
 * Weekly-digest email capture card for the sidebar — title, pitch, email field, Subscribe.
 * @startingPoint section="Discovery" subtitle="Newsletter signup sidebar card" viewport="700x220"
 */
export interface DigestSignupProps extends React.HTMLAttributes<HTMLElement> {
  /** Card eyebrow. @default 'WEEKLY DIGEST' */
  title?: string;
  /** Supporting line. */
  pitch?: string;
  /** Email field placeholder. @default 'you@domain.com' */
  placeholder?: string;
  /** Button label. @default 'Subscribe' */
  cta?: string;
  /** Glossy "gel" button surface for the maximal look. @default false */
  gel?: boolean;
  /** Called with the entered email on Subscribe. */
  onSubmit?: (email: string) => void;
  style?: React.CSSProperties;
}

export declare function DigestSignup(props: DigestSignupProps): JSX.Element;
