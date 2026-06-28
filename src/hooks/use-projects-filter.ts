'use client';

import { useCallback, useMemo, useState } from 'react';

import { useIndexViewFilter } from './use-index-view-filter';

type SortOption = 'featured' | 'name-asc' | 'name-desc';
type ViewMode = 'grid' | 'list';

export type UseProjectsFilterProps<T> = {
  items: T[];
  getTitle: (item: T) => string;
  getDescription: (item: T) => string;
  getTags: (item: T) => string[];
  getFeatured?: (item: T) => boolean;
  getSearchText?: (item: T) => Array<string | null | undefined>;
};

function toSearchValues(values: Array<string | null | undefined>) {
  return values.filter((value): value is string => Boolean(value));
}

export function useProjectsFilter<T>({
  items,
  getTitle,
  getDescription,
  getTags,
  getFeatured,
  getSearchText,
}: UseProjectsFilterProps<T>) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filters = useMemo(
    () => [
      {
        id: 'tags',
        getValues: getTags,
        mode: 'any' as const,
      },
    ],
    [getTags],
  );

  const sortOptions = useMemo(
    () => [
      {
        id: 'featured' as const,
        compare: (a: T, b: T) => {
          if (!getFeatured) return getTitle(a).localeCompare(getTitle(b));
          return (
            Number(getFeatured(b)) - Number(getFeatured(a)) ||
            getTitle(a).localeCompare(getTitle(b))
          );
        },
      },
      {
        id: 'name-asc' as const,
        compare: (a: T, b: T) => getTitle(a).localeCompare(getTitle(b)),
      },
      {
        id: 'name-desc' as const,
        compare: (a: T, b: T) => getTitle(b).localeCompare(getTitle(a)),
      },
    ],
    [getFeatured, getTitle],
  );

  const getItemSearchText = useCallback(
    (item: T) =>
      toSearchValues(
        getSearchText?.(item) ?? [
          getTitle(item),
          getDescription(item),
          ...getTags(item),
        ],
      ),
    [getDescription, getSearchText, getTags, getTitle],
  );

  const {
    activeFilters,
    clearFilters,
    filterOptions,
    filteredItems,
    resultCount,
    searchQuery,
    setFilterValues,
    setSearchQuery,
    setSortBy,
    sortBy,
  } = useIndexViewFilter<T, SortOption>({
    defaultSortId: 'featured',
    filters,
    getSearchText: getItemSearchText,
    items,
    sortOptions,
  });

  const selectedTags = activeFilters.tags ?? [];
  const allTags = (filterOptions.tags ?? []).map((option) => option.value);
  const setSelectedTags = useCallback(
    (tags: string[]) => setFilterValues('tags', tags),
    [setFilterValues],
  );

  return {
    // State
    searchQuery,
    selectedTags,
    sortBy,
    viewMode,
    allTags,
    filteredItems,

    // Setters
    setSearchQuery,
    setSelectedTags,
    setSortBy,
    setViewMode,

    // Utilities
    clearFilters,
    resultCount,
  };
}
