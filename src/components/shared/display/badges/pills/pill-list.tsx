import { cn } from '@/lib/utils';

import { Pill, type PillVariant } from './pill';

type PillListProps = {
  items: string[];
  variant?: Extract<PillVariant, 'focus' | 'tech'>;
  limit?: number;
  className?: string;
  overflowLabel?: 'more' | 'count';
};

export function PillList({
  items,
  variant = 'focus',
  limit,
  className,
  overflowLabel = 'more',
}: PillListProps) {
  const visibleItems = limit ? items.slice(0, limit) : items;
  const hiddenCount = limit ? Math.max(items.length - limit, 0) : 0;

  if (items.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {visibleItems.map((item) => (
        <Pill key={item} variant={variant}>
          {item}
        </Pill>
      ))}
      {hiddenCount > 0 && (
        <span className="type-caption">
          +{hiddenCount}
          {overflowLabel === 'more' ? ' more' : ''}
        </span>
      )}
    </div>
  );
}
