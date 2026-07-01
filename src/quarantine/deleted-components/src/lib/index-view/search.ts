import type { IndexViewFilterValue } from '@/components/shared/index-view/types';

export function normalizeSearchValue(value: IndexViewFilterValue) {
  return (Array.isArray(value) ? value : [value])
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function itemMatchesSearch<T>(
  item: T,
  query: string,
  getText: (item: T) => IndexViewFilterValue,
) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return true;

  return normalizeSearchValue(getText(item)).includes(normalizedQuery);
}
