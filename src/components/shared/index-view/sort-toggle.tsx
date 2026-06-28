import { FilterPill } from './filter-pill';
import type { IndexViewSortOption } from './types';

type SortToggleProps<T> = {
  activeSortId: string;
  onChange: (sortId: string) => void;
  sortOptions: Array<IndexViewSortOption<T>>;
};

export function SortToggle<T>({
  activeSortId,
  onChange,
  sortOptions,
}: SortToggleProps<T>) {
  if (sortOptions.length === 0) return null;

  return (
    <div className="border-border/40 bg-muted/20 flex flex-wrap gap-1 rounded-lg border p-1">
      {sortOptions.map((option) => (
        <FilterPill
          key={option.id}
          active={activeSortId === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </FilterPill>
      ))}
    </div>
  );
}
