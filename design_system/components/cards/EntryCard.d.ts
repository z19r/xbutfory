import * as React from 'react';

/**
 * The signature XbutforY directory entry — vote box, "X but for Y" headline,
 * stamp, description and meta footer. The core building block of any feed.
 * @startingPoint section="Cards" subtitle="The X-but-for-Y entry row" viewport="700x150"
 */
export interface EntryCardProps {
  /** Rank label, e.g. "#001". Omit to hide. */
  index?: string;
  /** The familiar product ("Tinder"). */
  x: string;
  /** The oddly-specific niche ("the Building you live in"). */
  y: string;
  /** Vote count, pre-formatted (e.g. "1.5k"). */
  votes?: string | number;
  /** Whether the current user has upvoted (turns the box accent). */
  voted?: boolean;
  /** Two-line pitch (clamped). */
  description?: string;
  /** Category key — colors the tag. */
  category?: 'dating' | 'crm' | 'discovery' | 'saas' | 'payments' | 'social' | 'logistics';
  /** Tag label text, e.g. "SAAS". */
  categoryLabel?: React.ReactNode;
  /** Submitter handle, e.g. "@apt_4b". */
  submitter?: string;
  /** Relative time, e.g. "2 hours ago". */
  ago?: string;
  /** Optional rubber stamp. */
  stamp?: 'NEW' | 'HOT';
  /** Paid placement. 'pinned' = subtle magenta top accent (one at a time, sticks
   *  to the top of the feed); 'spotlight' = magenta glow halo mid-feed. Both add
   *  a green SPONSORED tag and tint the visit link magenta. */
  sponsored?: 'pinned' | 'spotlight';
  url?: string;
  onVote?: () => void;
  onView?: () => void;
  style?: React.CSSProperties;
}

export declare function EntryCard(props: EntryCardProps): JSX.Element;
