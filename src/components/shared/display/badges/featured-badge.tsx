import { cn } from '@/lib/utils';
import { StatusColorVariant, StatusType } from '@/types';

type FeaturedBadgeStatus =
  | StatusType
  | {
      value: StatusType;
      color: StatusColorVariant;
    };

type FeaturedBadgeProps = React.ComponentProps<'span'> & {
  status: FeaturedBadgeStatus;
};

export function FeaturedBadge({
  className,
  status,
  ...props
}: FeaturedBadgeProps) {
  const statusValue = typeof status === 'string' ? status : status.value;

  return (
    <span
      data-status={statusValue}
      data-slot="featured-badge"
      className={cn(
        'border-accent bg-accent text-accent-foreground inline-flex items-center gap-1 rounded-xs border px-2.5 py-1 font-mono text-xs font-medium',
        className,
      )}
      {...props}
    >
      <span
        className="bg-accent-foreground/50 size-1.5 rounded-full"
        aria-hidden="true"
      />
      Featured
    </span>
  );
}
