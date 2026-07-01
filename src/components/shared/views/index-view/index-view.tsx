'use client';

import {
  getInitialFilters,
  hasActiveFilters,
  itemMatchesFilters,
} from '@/lib/utils/filters';
import { itemMatchesSearch } from '@/lib/utils/search';
import { sortItems } from '@/lib/index-view/sort';
import { useMemo, useState } from 'react';
import {
  FocusFilterPill,
  IndexControls,
} from './index-controls/index-controls';
import { SortToggleResponsive } from './index-controls/toggles/sort-toggle-responsive';
import { ViewModeToggleResponsive } from './index-controls/toggles/view-mode-toggle-responsive';
import { IndexEmptyState } from './index-empty-state';
import type { IndexViewProps } from './types';
import { getInitialId } from './utils';

export function IndexView<T>({
  defaultSortId,
  defaultViewId,
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
      <section className="border-border/20 border-b px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6 lg:gap-8">
            <div className="flex flex-col gap-1">
              {eyebrow ? (
                <p className="text-muted-foreground/50 font-mono text-[11px] tracking-[0.24em] uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
              </h1>
            </div>

            <div className="flex-1">
              <IndexControls
                activeFilters={activeFilters}
                filters={filters}
                items={items}
                onFilterChange={handleFilterChange}
                onQueryChange={setQuery}
                query={query}
                searchPlaceholder={search.placeholder}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="border-border/30 mb-3 flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground/70 text-xs font-medium tracking-[0.2em] uppercase">
              {visibleItems.length}{' '}
              {visibleItems.length === 1 ? itemLabelSingular : itemLabelPlural}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <FocusFilterPill
                filters={filters}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                items={items}
              />
              <SortToggleResponsive
                activeSortId={activeSortId}
                onChange={setActiveSortId}
                sortOptions={sortOptions}
              />
              <ViewModeToggleResponsive
                activeViewId={activeViewId}
                onChange={setActiveViewId}
                views={views}
              />

              {hasControls ? (
                <button
                  type="button"
                  onClick={resetControls}
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded px-2 py-1 text-xs font-medium focus-visible:ring-2 focus-visible:outline-none"
                >
                  Clear
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
