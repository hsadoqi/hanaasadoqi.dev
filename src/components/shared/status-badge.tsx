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
        draft:
          'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400',
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
      draft: 'bg-amber-500 dark:bg-amber-400',
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
  draft: 'Draft',
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
