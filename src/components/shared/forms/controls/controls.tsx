'use client';

import { FocusFilterPill } from '../filters/focus-filter-pill';
import { SearchForm } from '../search/search-form';
import { SortToggleResponsive } from '../toggles/sort-toggle';
import { ViewModeToggleResponsive } from '../toggles/view-mode-toggle';
import type { Filter, SortOption, View } from '../types';

type ControlsProps<T> = {
  activeFilters?: Record<string, string>;
  filters?: Array<Filter<T>>;
  items: T[];
  onFilterChange: (filterId: string, value: string) => void;
  onQueryChange: (query: string) => void;
  query: string;
  searchPlaceholder?: string;
  activeSortId?: string;
  onSortChange?: (id: string) => void;
  sortOptions?: Array<SortOption<T>>;
  activeViewId?: string;
  onViewChange?: (id: string) => void;
  views?: Array<View<T>>;
};

export function Controls<T>({
  activeFilters = {},
  filters = [],
  items,
  onFilterChange,
  onQueryChange,
  query,
  searchPlaceholder,
  activeSortId,
  onSortChange,
  sortOptions,
  activeViewId,
  onViewChange,
  views,
}: ControlsProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <SearchForm
        className="w-full"
        query={query}
        onQueryChange={onQueryChange}
        placeholder={searchPlaceholder}
        inputWrapperClassName="sm:max-w-md"
      />

      <div className="flex items-center justify-between">
        <FocusFilterPill
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          items={items}
        />

        <div className="flex items-center gap-2">
          {sortOptions && typeof activeSortId === 'string' && onSortChange ? (
            <SortToggleResponsive
              activeSortId={activeSortId}
              onChange={onSortChange}
              sortOptions={sortOptions}
            />
          ) : null}

          {views && typeof activeViewId === 'string' && onViewChange ? (
            <ViewModeToggleResponsive
              activeViewId={activeViewId}
              onChange={onViewChange}
              views={views}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Controls;