'use client';

import {
  getInitialFilters,
  hasActiveFilters,
  itemMatchesFilters,
} from '@/lib/utils/filters';
import { itemMatchesSearch } from '@/lib/utils/search';
import { sortItems } from '@/lib/utils/sort';
import { useMemo, useState } from 'react';

import { IndexEmptyState } from '../../../states/index-empty-state';
import type { ViewProps } from '@/components/shared/forms/types';
import { getInitialId } from '@/lib/utils/get-initial-id';
import { FocusFilterPill } from '@/components/shared/forms/filters/focus-filter-pill';
import { SortToggleResponsive } from '@/components/shared/forms/toggles/sort-toggle';
import { ViewModeToggleResponsive } from '@/components/shared/forms/toggles/view-mode-toggle';
import { SearchForm } from '@/components/shared/forms';

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
}: ViewProps<T>) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    () => getInitialFilters(filters),
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
  const normalizedTitle = title.toLowerCase();
  const collectionId =
    normalizedTitle === 'case studies'
      ? 'all-case-studies'
      : normalizedTitle === 'writing'
        ? 'all-writing'
        : 'all-projects';
  const secondaryAnchorId =
    normalizedTitle === 'case studies' || normalizedTitle === 'writing'
      ? 'topics'
      : 'featured';

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
      <section
        id="overview"
        className="border-border/20 scroll-mt-24 border-b px-4 py-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="flex flex-1 flex-col gap-2">
              {eyebrow ? (
                <p className="text-muted-foreground/60 font-mono text-[11px] tracking-[0.24em] uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h1>
            </div>
            <div
              id="filters"
              className="flex flex-1 scroll-mt-24 flex-col items-stretch sm:items-end"
            >
              <div className="flex w-full flex-col gap-2 sm:max-w-lg sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                {query !== '' && (
                  <p className="text-muted-foreground/70 flex-shrink-0 text-xs font-medium tracking-[0.2em] uppercase">
                    {visibleItems.length}{' '}
                    {visibleItems.length === 1
                      ? itemLabelSingular
                      : itemLabelPlural}
                  </p>
                )}
                <SearchForm
                  onQueryChange={setQuery}
                  query={query}
                  placeholder={search.placeholder}
                  inputWrapperClassName="sm:max-w-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id={collectionId}
        className="scroll-mt-24 px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div
            id={secondaryAnchorId}
            className="border-border/25 mb-4 flex scroll-mt-24 flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <FocusFilterPill
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              items={items}
            />

            <div className="flex flex-wrap items-center gap-2">
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
