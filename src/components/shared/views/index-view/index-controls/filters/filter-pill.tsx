import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type FilterPillProps = {
  active: boolean;
  children: ReactNode;
  compact?: boolean;
  count?: number;
  onClick: () => void;
};

export function FilterPill({
  active,
  children,
  compact = false,
  count,
  onClick,
}: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'focus-visible:ring-ring transition-colors focus-visible:ring-2 focus-visible:outline-none',
        compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs',
        active
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground/70 hover:text-foreground',
      )}
      aria-pressed={active}
    >
      <span className="font-medium">{children}</span>
      {typeof count === 'number' && !compact ? (
        <span className="text-muted-foreground/50 ml-1 tabular-nums">
          {count}
        </span>
      ) : null}
    </button>
  );
}
