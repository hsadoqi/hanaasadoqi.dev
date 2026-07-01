import { cn } from '@/lib/utils';
import { StatusType } from '@/types';

type FeaturedBadgeProps = React.ComponentProps<'span'> & {
  status: StatusType;
};

export function FeaturedBadge({
  className,
  status,
  ...props
}: FeaturedBadgeProps) {
  return (
    <span
      data-status={status}
      data-slot="featured-badge"
      className={cn(
        'border-foreground/20 bg-foreground/5 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-xs font-medium',
        className,
      )}
      {...props}
    >
      <span
        className="bg-foreground/50 size-1.5 rounded-full"
        aria-hidden="true"
      />
      Featured
    </span>
  );
}
