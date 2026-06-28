import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  ALL_FILTER_VALUE,
  createFilterOptions,
} from '@/lib/index-view/filters';
import { FilterGroup } from './filter-group';
import { FilterPill } from './filter-pill';
import type { IndexViewFilter } from './types';

type IndexControlsProps<T> = {
  activeFilters: Record<string, string>;
  filters: Array<IndexViewFilter<T>>;
  items: T[];
  onFilterChange: (filterId: string, value: string) => void;
  onQueryChange: (query: string) => void;
  query: string;
  searchLabel?: string;
  searchPlaceholder: string;
};

export function IndexControls<T>({
  activeFilters,
  filters,
  items,
  onFilterChange,
  onQueryChange,
  query,
  searchLabel = 'Search',
  searchPlaceholder,
}: IndexControlsProps<T>) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1fr)] lg:items-start">
      <label className="block max-w-xl">
        <span className="text-muted-foreground/70 mb-2 block text-xs font-medium tracking-wider uppercase">
          {searchLabel}
        </span>
        <span className="relative block">
          <Search
            aria-hidden="true"
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-11 pl-9"
          />
        </span>
      </label>

      {filters.length > 0 ? (
        <div className="grid gap-4">
          {filters.map((filter) => {
            const options = createFilterOptions(items, filter);
            const activeValue = activeFilters[filter.id] ?? ALL_FILTER_VALUE;

            return (
              <FilterGroup key={filter.id} label={filter.label}>
                <FilterPill
                  active={activeValue === ALL_FILTER_VALUE}
                  count={items.length}
                  onClick={() => onFilterChange(filter.id, ALL_FILTER_VALUE)}
                >
                  All
                </FilterPill>
                {options.map((option) => (
                  <FilterPill
                    key={option.value}
                    active={activeValue === option.value}
                    count={option.count}
                    onClick={() => onFilterChange(filter.id, option.value)}
                  >
                    {option.label}
                  </FilterPill>
                ))}
              </FilterGroup>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
