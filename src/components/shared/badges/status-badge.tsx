import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex h-5 w-fit shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      status: {
        active:
          'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400',
        live: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400',
        launched:
          'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400',
        shipped:
          'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400',
        brainstorming:
          'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400',
        draft:
          'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400',
        'in-progress':
          'border-blue-500/20 bg-blue-500/10 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400',
        development:
          'border-blue-500/20 bg-blue-500/10 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400',
        design:
          'border-pink-500/20 bg-pink-500/10 text-pink-700 dark:border-pink-400/20 dark:bg-pink-400/10 dark:text-pink-400',
        concept: 'border-border bg-muted text-muted-foreground',
        planned: 'border-border bg-muted text-muted-foreground',
        archived: 'border-border bg-muted text-muted-foreground line-through',
        paused: 'border-border bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      status: 'planned',
    },
  },
);

const statusDotVariants = cva('size-1.5 rounded-full', {
  variants: {
    status: {
      active: 'bg-emerald-500 dark:bg-emerald-400',
      live: 'bg-emerald-500 dark:bg-emerald-400',
      launched: 'bg-emerald-500 dark:bg-emerald-400',
      shipped: 'bg-emerald-500 dark:bg-emerald-400',
      brainstorming: 'bg-amber-500 dark:bg-amber-400',
      draft: 'bg-amber-500 dark:bg-amber-400',
      'in-progress': 'bg-blue-500 dark:bg-blue-400',
      development: 'bg-blue-500 dark:bg-blue-400',
      design: 'bg-pink-500 dark:bg-pink-400',
      concept: 'bg-muted-foreground',
      planned: 'bg-muted-foreground',
      archived: 'bg-muted-foreground',
      paused: 'bg-muted-foreground',
    },
  },
  defaultVariants: {
    status: 'planned',
  },
});

const statusLabels: Record<NonNullable<StatusBadgeProps['status']>, string> = {
  active: 'Active',
  live: 'Live',
  launched: 'Launched',
  shipped: 'Shipped',
  brainstorming: 'Brainstorming',
  draft: 'Draft',
  'in-progress': 'In progress',
  development: 'Development',
  design: 'Design',
  concept: 'Concept',
  planned: 'Planned',
  archived: 'Archived',
  paused: 'Paused',
};

type Status = NonNullable<VariantProps<typeof statusBadgeVariants>['status']>;

type StatusBadgeProps = Omit<React.ComponentProps<'span'>, 'status'> & {
  status?: Status | (string & {});
  dotClassName?: string;
};

export function StatusBadge({
  status = 'planned',
  className,
  dotClassName,
  children,
  ...props
}: StatusBadgeProps) {
  const knownStatus = status as Status;
  const isKnown = knownStatus in statusLabels;

  return (
    <span
      data-slot="status-badge"
      data-status={status}
      className={cn(
        isKnown
          ? statusBadgeVariants({ status: knownStatus })
          : statusBadgeVariants({ status: 'planned' }),
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          isKnown
            ? statusDotVariants({ status: knownStatus })
            : statusDotVariants({ status: 'planned' }),
          dotClassName,
        )}
        aria-hidden="true"
      />
      {children ?? (isKnown ? statusLabels[knownStatus] : status)}
    </span>
  );
}
