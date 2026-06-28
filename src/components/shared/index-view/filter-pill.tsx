import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FilterPillProps = {
  active: boolean;
  children: ReactNode;
  count?: number;
  onClick: () => void;
};

export function FilterPill({
  active,
  children,
  count,
  onClick,
}: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'focus-visible:ring-ring rounded px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
        active
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground/70 hover:text-foreground',
      )}
      aria-pressed={active}
    >
      <span>{children}</span>
      {typeof count === 'number' ? (
        <span className="text-muted-foreground/50 ml-1 tabular-nums">
          {count}
        </span>
      ) : null}
    </button>
  );
}
