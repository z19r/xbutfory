import * as React from 'react';

/** One tag, with a 1–5 weight that drives its size and opacity. */
export interface TagCloudItem {
  label: string;
  weight?: 1 | 2 | 3 | 4 | 5;
}

/**
 * Weighted Web 2.0 tag cloud — popular tags render larger and bolder.
 * @startingPoint section="Discovery" subtitle="Weighted Web 2.0 tag cloud" viewport="700x150"
 */
export interface TagCloudProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Tags to render. A bare string defaults to weight 3. */
  tags: Array<TagCloudItem | string>;
  /** Link color. @default '#2B5BA8' (periwinkle) */
  color?: string;
  /** Called with the tag label on click. */
  onSelect?: (label: string) => void;
  style?: React.CSSProperties;
}

export declare function TagCloud(props: TagCloudProps): JSX.Element;
