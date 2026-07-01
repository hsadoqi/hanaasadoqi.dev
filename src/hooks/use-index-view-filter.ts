'use client';

import { useCallback, useMemo, useState } from 'react';

import type { IndexViewFilterValue } from '@/components/shared/views/index-view';
import { normalizeSearchValue } from '@/lib/utils/search';

export type IndexViewFilterMode = 'any' | 'all';

export type IndexViewFilterConfig<T> = {
  id: string;
  getValues: (item: T) => IndexViewFilterValue;
  initialValue?: string[];
  mode?: IndexViewFilterMode;
};

export type IndexViewFilterOption = {
  count: number;
  value: string;
};

export type IndexViewFilterState = Record<string, string[]>;

export type IndexViewSortConfig<T, TSortId extends string> = {
  compare: (a: T, b: T) => number;
  id: TSortId;
};

export type UseIndexViewFilterProps<T, TSortId extends string> = {
  defaultSortId: TSortId;
  filters?: Array<IndexViewFilterConfig<T>>;
  getSearchText: (item: T) => IndexViewFilterValue;
  items: T[];
  sortOptions: Array<IndexViewSortConfig<T, TSortId>>;
};

function toValues(value: IndexViewFilterValue) {
  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

function getInitialFilters<T>(filters: Array<IndexViewFilterConfig<T>>) {
  return Object.fromEntries(
    filters.map((filter) => [filter.id, filter.initialValue ?? []]),
  );
}

export function useIndexViewFilter<T, TSortId extends string>({
  defaultSortId,
  filters = [],
  getSearchText,
  items,
  sortOptions,
}: UseIndexViewFilterProps<T, TSortId>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<IndexViewFilterState>(() =>
    getInitialFilters(filters),
  );
  const [sortBy, setSortBy] = useState<TSortId>(defaultSortId);

  const filterOptions = useMemo(() => {
    return Object.fromEntries(
      filters.map((filter) => {
        const counts = items.reduce((map, item) => {
          for (const value of toValues(filter.getValues(item))) {
            map.set(value, (map.get(value) ?? 0) + 1);
          }

          return map;
        }, new Map<string, number>());

        const options = Array.from(counts.entries())
          .map(([value, count]) => ({ count, value }))
          .toSorted((a, b) => a.value.localeCompare(b.value));

        return [filter.id, options];
      }),
    ) as Record<string, IndexViewFilterOption[]>;
  }, [filters, items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const matchingItems = items.filter((item) => {
      const matchesSearch =
        !normalizedQuery ||
        normalizeSearchValue(getSearchText(item)).includes(normalizedQuery);

      if (!matchesSearch) return false;

      return filters.every((filter) => {
        const selectedValues = activeFilters[filter.id] ?? [];
        if (selectedValues.length === 0) return true;

        const itemValues = toValues(filter.getValues(item));

        return (filter.mode ?? 'any') === 'all'
          ? selectedValues.every((value) => itemValues.includes(value))
          : selectedValues.some((value) => itemValues.includes(value));
      });
    });

    const sortOption = sortOptions.find((option) => option.id === sortBy);

    return sortOption
      ? matchingItems.toSorted(sortOption.compare)
      : matchingItems;
  }, [
    activeFilters,
    filters,
    getSearchText,
    items,
    searchQuery,
    sortBy,
    sortOptions,
  ]);

  const setFilterValues = useCallback((filterId: string, values: string[]) => {
    setActiveFilters((current) => ({
      ...current,
      [filterId]: values,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveFilters(getInitialFilters(filters));
  }, [filters]);

  const hasActiveFilters =
    Boolean(searchQuery) ||
    Object.values(activeFilters).some((values) => values.length > 0);

  return {
    activeFilters,
    clearFilters,
    filterOptions,
    filteredItems,
    hasActiveFilters,
    resultCount: filteredItems.length,
    searchQuery,
    setActiveFilters,
    setFilterValues,
    setSearchQuery,
    setSortBy,
    sortBy,
  };
}
