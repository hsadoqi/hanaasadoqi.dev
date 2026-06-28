import type { AspectRatio, StatusType } from '../types';

export const CASE_STUDY_STATUS = {
  brainstorming: 'Brainstorming',
  'in-progress': 'In Progress',
  archived: 'Archived',
  launched: 'Launched',
  concept: 'Concept validation',
  development: 'Development',
  design: 'Design',
} as const satisfies Record<StatusType, string>;

export const CASE_STUDY_STATUS_LABELS = {
  brainstorming: CASE_STUDY_STATUS.brainstorming,
  'in-progress': CASE_STUDY_STATUS['in-progress'],
  archived: CASE_STUDY_STATUS.archived,
  launched: CASE_STUDY_STATUS.launched,
  concept: CASE_STUDY_STATUS.concept,
  development: CASE_STUDY_STATUS.development,
  design: CASE_STUDY_STATUS.design,
} as const satisfies Record<StatusType, string>;

export const BADGE_STYLES = {
  primary: 'bg-primary/10 text-primary',
  muted: 'bg-muted text-muted-foreground',
  accent: 'bg-accent/10 text-accent',
} as const;

export const STYLING_UTILS = {
  shadow: 'shadow-sm shadow-black/[0.03]',
  borderRadius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
  },
  card: 'border-border/60 bg-card overflow-hidden border',
} as const;

export const SPACING = {
  cardPadding: 'p-6 sm:p-8 lg:p-10',
  sectionGap: 'space-y-5',
  gridGap: 'gap-5',
  gap: {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-8',
  },
} as const;

export const ASPECT_RATIOS = {
  video: '16 / 9',
  square: '1 / 1',
  portrait: '3 / 4',
  custom: 'auto',
} as const satisfies Record<AspectRatio, string>;

export const RESPONSIVE_SCALES = {
  mobile: 'scale-100',
  tablet: 'sm:scale-110',
  desktop: 'lg:scale-[1.2]',
} as const;

export const GRADIENTS = {
  artifactBackground:
    'bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.10),transparent_28%),linear-gradient(to_bottom,hsl(var(--background)/0),hsl(var(--background)/0.65))]',
  overlay: 'from-background/0 to-background/65',
} as const;

export const STATUS_BADGE_CONFIG = {
  size: 'text-[11px]',
  padding: 'px-2.5 py-1',
  tracking: 'tracking-wide',
  numberVariant: 'font-mono text-[11px] tabular-nums',
} as const;

export const CASE_STUDY_STATUS_OPTIONS = Object.keys(
  CASE_STUDY_STATUS_LABELS,
) as StatusType[];
