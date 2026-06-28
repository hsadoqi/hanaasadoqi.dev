import type { ReactNode } from 'react';

export type IndexViewFilterValue = string | string[];

export type IndexViewFilter<T> = {
  id: string;
  label: string;
  getValue: (item: T) => IndexViewFilterValue;
  getLabel?: (value: string) => string;
  maxOptions?: number;
  sortOptions?: (a: IndexViewFilterOption, b: IndexViewFilterOption) => number;
};

export type IndexViewFilterOption = {
  count: number;
  label: string;
  value: string;
};

export type IndexViewSearch<T> = {
  getText: (item: T) => IndexViewFilterValue;
  label?: string;
  placeholder: string;
};

export type IndexViewSortOption<T> = {
  compare: (a: T, b: T) => number;
  id: string;
  label: string;
};

export type IndexViewView<T> = {
  id: string;
  label: string;
  render: (items: T[]) => ReactNode;
};

export type IndexViewEmptyState = {
  description: string;
  resetLabel?: string;
  title: string;
};

export type IndexViewProps<T> = {
  defaultSortId?: string;
  defaultViewId?: string;
  description: string;
  emptyState: IndexViewEmptyState;
  eyebrow?: string;
  filters?: Array<IndexViewFilter<T>>;
  itemLabelPlural: string;
  itemLabelSingular: string;
  items: T[];
  search: IndexViewSearch<T>;
  sortOptions?: Array<IndexViewSortOption<T>>;
  title: string;
  views: Array<IndexViewView<T>>;
};
