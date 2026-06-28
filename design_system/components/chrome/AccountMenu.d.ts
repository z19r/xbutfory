import * as React from 'react';

export interface AccountMenuItem {
  /** Action id passed to onSelect. */
  key: string;
  label: string;
  /** Draw a divider above this item. */
  divider?: boolean;
}

/**
 * Signed-in session control for the ink utility bar — @handle + avatar disc that
 * opens a paper dropdown of account actions. Replaces the Sign in / Create
 * account links once authenticated.
 * @startingPoint section="Chrome" subtitle="Logged-in account dropdown" viewport="700x260"
 */
export interface AccountMenuProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The account handle, e.g. "@apt_4b" — the same one stamped on listings. */
  handle: string;
  /** Optional avatar image URL (falls back to the handle's initial on accent). */
  avatar?: string;
  /** Menu actions. @default Account settings · Manage submissions · Sign out */
  items?: AccountMenuItem[];
  /** Called with the chosen item's `key`. */
  onSelect?: (key: string) => void;
  /** Controlled open state (omit to let the component manage its own). */
  open?: boolean;
  onToggle?: (next: boolean) => void;
  style?: React.CSSProperties;
}

export declare function AccountMenu(props: AccountMenuProps): JSX.Element;
