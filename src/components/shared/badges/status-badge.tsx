import { cn } from '@/lib/utils';

const statusBadgeClassName =
  'inline-flex h-5 w-fit shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap';

const statusLabels = {
  active: 'Active',
  available: 'Available',
  completed: 'Completed',
  live: 'Live',
  launched: 'Launched',
  published: 'Published',
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
  unavailable: 'Unavailable',
} as const;

type Status = keyof typeof statusLabels;

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
      className={cn(statusBadgeClassName, className)}
      {...props}
    >
      <span
        className={cn('size-1.5 rounded-full', dotClassName)}
        aria-hidden="true"
      />
      {children ?? (isKnown ? statusLabels[knownStatus] : status)}
    </span>
  );
}
