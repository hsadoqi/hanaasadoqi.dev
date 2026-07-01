import type { IndexViewSortOption } from '@/components/shared/views/index-view/types';

export function sortItems<T>(
  items: T[],
  sortOptions: Array<IndexViewSortOption<T>>,
  activeSortId: string,
) {
  const sortOption = sortOptions.find((option) => option.id === activeSortId);

  if (!sortOption) return items;

  return items.toSorted(sortOption.compare);
}
