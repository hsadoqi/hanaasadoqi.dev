import { Pill, type PillVariant } from '@/components/shared/badges';
import { cn } from '@/lib/utils';

type TagListProps = {
  tags: string[];
  variant?: Extract<PillVariant, 'focus' | 'tech'>;
  limit?: number;
  className?: string;
  overflowLabel?: 'more' | 'count';
};

export function ProjectTagList({
  tags,
  variant = 'focus',
  limit,
  className,
  overflowLabel = 'more',
}: TagListProps) {
  const visibleTags = limit ? tags.slice(0, limit) : tags;
  const hiddenCount = limit ? Math.max(tags.length - limit, 0) : 0;

  if (tags.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {visibleTags.map((tag) => (
        <Pill key={tag} variant={variant}>
          {tag}
        </Pill>
      ))}
      {hiddenCount > 0 && (
        <span className="text-muted-foreground/60 text-xs">
          +{hiddenCount}
          {overflowLabel === 'more' ? ' more' : ''}
        </span>
      )}
    </div>
  );
}
