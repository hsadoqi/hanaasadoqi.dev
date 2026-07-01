import type { ReactNode } from 'react';

export type FilterValue = string | string[];

export type Filter<T> = {
  id: string;
  label: string;
  getValue: (item: T) => FilterValue;
  getLabel?: (value: string) => string;
  maxOptions?: number;
  sortOptions?: (a: FilterOption, b: FilterOption) => number;
};

export type FilterOption = {
  count: number;
  label: string;
  value: string;
};

export type Search<T> = {
  getText: (item: T) => FilterValue;
  label?: string;
  placeholder: string;
};

export type SortOption<T> = {
  compare: (a: T, b: T) => number;
  id: string;
  label: string;
};

export type View<T> = {
  id: string;
  label: string;
  renderIcon?: () => ReactNode;
  render: (items: T[]) => ReactNode;
};

export type EmptyState = {
  description: string;
  resetLabel?: string;
  title: string;
};

export type ViewProps<T> = {
  defaultSortId?: string;
  defaultViewId?: string;
  description?: string;
  emptyState: EmptyState;
  eyebrow?: string;
  filters?: Array<Filter<T>>;
  itemLabelPlural: string;
  itemLabelSingular: string;
  items: T[];
  search: Search<T>;
  sortOptions?: Array<SortOption<T>>;
  title: string;
  views: Array<View<T>>;
};

export type ControlsProps<T> = {
  activeFilters: Record<string, string>;
  filters: Array<Filter<T>>;
  items: T[];
  onFilterChange: (filterId: string, value: string) => void;
  onQueryChange: (query: string) => void;
  query: string;
  searchPlaceholder: string;
};
