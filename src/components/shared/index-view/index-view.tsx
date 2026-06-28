'use client';

import { useMemo, useState } from 'react';
import {
  getInitialFilters,
  hasActiveFilters,
  itemMatchesFilters,
} from '@/lib/index-view/filters';
import { itemMatchesSearch } from '@/lib/index-view/search';
import { sortItems } from '@/lib/index-view/sort';
import { getInitialId } from './utils';
import { IndexControls } from './index-controls';
import { IndexEmptyState } from './index-empty-state';
import { SortToggle } from './sort-toggle';
import { ViewModeToggle } from './view-mode-toggle';
import type { IndexViewProps } from './types';

export function IndexView<T>({
  defaultSortId,
  defaultViewId,
  description,
  emptyState,
  eyebrow,
  filters = [],
  itemLabelPlural,
  itemLabelSingular,
  items,
  search,
  sortOptions = [],
  title,
  views,
}: IndexViewProps<T>) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(() =>
    getInitialFilters(filters),
  );
  const [activeSortId, setActiveSortId] = useState(() =>
    getInitialId(sortOptions, defaultSortId),
  );
  const [activeViewId, setActiveViewId] = useState(() =>
    getInitialId(views, defaultViewId),
  );

  const visibleItems = useMemo(() => {
    const matchingItems = items.filter(
      (item) =>
        itemMatchesSearch(item, query, search.getText) &&
        itemMatchesFilters(item, filters, activeFilters),
    );

    return sortItems(matchingItems, sortOptions, activeSortId);
  }, [
    activeFilters,
    activeSortId,
    filters,
    items,
    query,
    search.getText,
    sortOptions,
  ]);

  const activeView = views.find((view) => view.id === activeViewId) ?? views[0];
  const hasControls = Boolean(query) || hasActiveFilters(activeFilters);

  function handleFilterChange(filterId: string, value: string) {
    setActiveFilters((current) => ({
      ...current,
      [filterId]: value,
    }));
  }

  function resetControls() {
    setQuery('');
    setActiveFilters(getInitialFilters(filters));
  }

  return (
    <main className="bg-background min-h-screen">
      <section className="border-border/40 border-b px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="text-muted-foreground/50 font-mono text-xs tracking-widest uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-foreground mt-3 text-4xl font-bold text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="text-muted-foreground/80 mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
              {description}
            </p>
          </div>

          <IndexControls
            activeFilters={activeFilters}
            filters={filters}
            items={items}
            onFilterChange={handleFilterChange}
            onQueryChange={setQuery}
            query={query}
            searchLabel={search.label}
            searchPlaceholder={search.placeholder}
          />
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-muted-foreground/70 text-sm">
              {visibleItems.length}{' '}
              {visibleItems.length === 1 ? itemLabelSingular : itemLabelPlural}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <SortToggle
                activeSortId={activeSortId}
                onChange={setActiveSortId}
                sortOptions={sortOptions}
              />
              <ViewModeToggle
                activeViewId={activeViewId}
                onChange={setActiveViewId}
                views={views}
              />

              {hasControls ? (
                <button
                  type="button"
                  onClick={resetControls}
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded px-2 py-1 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>

          {visibleItems.length > 0 ? (
            activeView.render(visibleItems)
          ) : (
            <IndexEmptyState
              description={emptyState.description}
              onReset={resetControls}
              resetLabel={emptyState.resetLabel}
              title={emptyState.title}
            />
          )}
        </div>
      </section>
    </main>
  );
}
