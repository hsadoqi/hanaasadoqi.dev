import type {
  IndexViewFilter,
  IndexViewFilterOption,
} from '@/components/shared/index-view/types';

export const ALL_FILTER_VALUE = 'all';

export function toFilterValues(value: string | string[]) {
  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

export function createFilterOptions<T>(
  items: T[],
  filter: IndexViewFilter<T>,
): IndexViewFilterOption[] {
  const counts = items.reduce((map, item) => {
    for (const value of toFilterValues(filter.getValue(item))) {
      map.set(value, (map.get(value) ?? 0) + 1);
    }

    return map;
  }, new Map<string, number>());

  const options = Array.from(counts.entries()).map(([value, count]) => ({
    count,
    label: filter.getLabel?.(value) ?? value,
    value,
  }));

  const sortedOptions = options.toSorted(
    filter.sortOptions ??
      ((a, b) =>
        a.label.localeCompare(b.label) || a.value.localeCompare(b.value)),
  );

  return typeof filter.maxOptions === 'number'
    ? sortedOptions.slice(0, filter.maxOptions)
    : sortedOptions;
}

export function itemMatchesFilters<T>(
  item: T,
  filters: Array<IndexViewFilter<T>>,
  activeFilters: Record<string, string>,
) {
  return filters.every((filter) => {
    const activeValue = activeFilters[filter.id] ?? ALL_FILTER_VALUE;

    if (activeValue === ALL_FILTER_VALUE) return true;

    return toFilterValues(filter.getValue(item)).includes(activeValue);
  });
}

export function hasActiveFilters(activeFilters: Record<string, string>) {
  return Object.values(activeFilters).some(
    (value) => value !== ALL_FILTER_VALUE,
  );
}

export function getInitialFilters<T>(filters: Array<IndexViewFilter<T>>) {
  return Object.fromEntries(
    filters.map((filter) => [filter.id, ALL_FILTER_VALUE]),
  );
}
