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
      className={cn('text-muted-foreground/40 font-mono text-xs', className)}
      {...props}
    >
      Featured
    </span>
  );
}
