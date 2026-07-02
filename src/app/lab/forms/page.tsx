'use client';

import {
  ActiveFiltersSummary,
  ControlField,
  Controls,
  DynamicTagSelector,
  FilterGroup,
  FilterPill,
  SearchControls,
  SearchForm,
  SortSelect,
  SortToggleResponsive,
  ViewModeToggleResponsive,
} from '@/components/shared/forms';
import type { Filter, SortOption, View } from '@/components/shared/forms/types';
import type { ViewToggleOption } from '@/components/shared/forms/toggles/view-mode-toggle';
import { createFilterOptions } from '@/lib/utils/filters';
import { GridIcon, ListIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

type DemoItem = {
  id: string;
  title: string;
  focus: string[];
  status: 'in-progress' | 'design' | 'launched';
};

const demoItems: DemoItem[] = [
  {
    id: 'generafi',
    title: 'Generafi',
    focus: ['Payroll Compliance', 'Rules Engine'],
    status: 'in-progress',
  },
  {
    id: 'synapcity',
    title: 'Synapcity',
    focus: ['Knowledge Management', 'Frontend Systems'],
    status: 'in-progress',
  },
  {
    id: 'moroccan-fintech',
    title: 'Moroccan Fintech',
    focus: ['Fintech', 'Compliance'],
    status: 'design',
  },
];

const filters: Array<Filter<DemoItem>> = [
  {
    id: 'focus',
    label: 'Focus area',
    getValue: (item) => item.focus,
  },
  {
    id: 'status',
    label: 'Status',
    getValue: (item) => item.status,
  },
];

const sortOptions: Array<SortOption<DemoItem>> = [
  {
    id: 'name',
    label: 'Name (A-Z)',
    compare: (a, b) => a.title.localeCompare(b.title),
  },
  {
    id: 'status',
    label: 'Status',
    compare: (a, b) => a.status.localeCompare(b.status),
  },
];

const views: Array<View<DemoItem>> = [
  {
    id: 'grid',
    label: 'Grid',
    renderIcon: () => <GridIcon className="size-4" />,
    render: (items) => (
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="border-border/30 rounded border p-3">
            <p className="type-card-title-sm">{item.title}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'list',
    label: 'List',
    renderIcon: () => <ListIcon className="size-4" />,
    render: (items) => (
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="type-body-sm border-border/30 rounded border px-3 py-2"
          >
            {item.title}
          </li>
        ))}
      </ul>
    ),
  },
];

const viewToggleOptions: Array<ViewToggleOption<'grid' | 'list'>> = [
  {
    id: 'grid',
    label: 'Grid',
    renderIcon: () => <GridIcon className="size-4" />,
  },
  {
    id: 'list',
    label: 'List',
    renderIcon: () => <ListIcon className="size-4" />,
  },
];

const sectionClass = 'border-border/30 rounded-xl border p-6 sm:p-8';

export default function FormsPlaygroundPage() {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );
  const [activeSortId, setActiveSortId] = useState(sortOptions[0].id);
  const [activeViewId, setActiveViewId] = useState<'grid' | 'list'>('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Compliance',
    'Architecture',
  ]);

  const availableTags = useMemo(
    () => [
      'Compliance',
      'Architecture',
      'Frontend',
      'Product',
      'Systems',
      'RLS',
    ],
    [],
  );

  const focusOptions = useMemo(
    () => createFilterOptions(demoItems, filters[0]),
    [],
  );

  const visibleItems = useMemo(() => {
    const base = demoItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );

    return [...base].sort(
      (a, b) =>
        sortOptions
          .find((option) => option.id === activeSortId)
          ?.compare(a, b) ?? 0,
    );
  }, [activeSortId, query]);

  const activeFilterItems = Object.entries(activeFilters)
    .filter(([, value]) => value && value !== 'all')
    .map(([id, value]) => ({
      id,
      label: `${id}: ${value}`,
      onRemove: () =>
        setActiveFilters((current) => ({ ...current, [id]: 'all' })),
    }));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className="type-eyebrow">Component Playground</p>
        <h1 className="type-display">Shared Forms</h1>
        <p className="type-body-sm text-muted-foreground max-w-2xl">
          Live previews for search, filter, sort, and view controls used by
          index pages.
        </p>
      </header>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">SearchForm</h2>
        <SearchForm
          query={query}
          onQueryChange={setQuery}
          placeholder="Search by title, tech, or focus..."
          inputWrapperClassName="sm:max-w-lg"
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">SearchControls</h2>
        <SearchControls
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder="Search controls demo..."
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">Controls (composed)</h2>
        <Controls
          items={demoItems}
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={(filterId, value) =>
            setActiveFilters((current) => ({ ...current, [filterId]: value }))
          }
          query={query}
          onQueryChange={setQuery}
          searchPlaceholder="Search projects..."
          activeSortId={activeSortId}
          onSortChange={setActiveSortId}
          sortOptions={sortOptions}
          activeViewId={activeViewId}
          onViewChange={(viewId) => setActiveViewId(viewId as 'grid' | 'list')}
          views={views}
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">Filter primitives</h2>
        <div className="space-y-4">
          <FilterGroup label="Focus area">
            {focusOptions.slice(0, 4).map((option) => (
              <FilterPill
                key={option.value}
                active={activeFilters.focus === option.value}
                count={option.count}
                onClick={() =>
                  setActiveFilters((current) => ({
                    ...current,
                    focus:
                      current.focus === option.value ? 'all' : option.value,
                  }))
                }
              >
                {option.label}
              </FilterPill>
            ))}
          </FilterGroup>

          <ControlField label="Focus filter" showLabel>
            <div className="text-muted-foreground text-sm">
              Wrap custom controls with a consistent field label.
            </div>
          </ControlField>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">DynamicTagSelector</h2>
        <DynamicTagSelector
          allTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          maxTags={6}
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">ActiveFiltersSummary</h2>
        <ActiveFiltersSummary
          activeItems={activeFilterItems}
          resultCount={visibleItems.length}
          searchQuery={query}
          filterSummary={
            activeFilterItems.length > 0
              ? `${activeFilterItems.length} active filters`
              : undefined
          }
          onClear={() => {
            setQuery('');
            setActiveFilters({});
          }}
        />
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">Sort + View toggles</h2>
        <div className="flex flex-wrap items-center gap-3">
          <SortSelect
            value={activeSortId}
            onChange={setActiveSortId}
            options={sortOptions.map((option) => ({
              id: option.id,
              label: option.label,
            }))}
          />

          <SortToggleResponsive
            activeSortId={activeSortId}
            onChange={setActiveSortId}
            sortOptions={sortOptions}
          />

          <ViewModeToggleResponsive
            activeViewId={activeViewId}
            onChange={(viewId) => setActiveViewId(viewId as 'grid' | 'list')}
            views={viewToggleOptions}
          />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="type-card-title mb-4">
          Rendered items (view toggle demo)
        </h2>
        {views.find((view) => view.id === activeViewId)?.render(visibleItems)}
      </section>
    </main>
  );
}
