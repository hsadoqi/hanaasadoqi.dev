'use client';

import type { ReactNode } from 'react';

import { DynamicTagSelector } from '../index-controls/filters/dynamic-tag-selector';
import { ControlField } from '../index-controls/control-field';
import { SearchForm } from '../index-controls/filters';
import { SortSelect } from '../index-controls/filters/sort-select';
import {
  ViewModeToggle,
  type ViewToggleOption,
} from '../index-controls/toggles/view-mode-toggle';

type IndexToolbarFilter = {
  allValues: string[];
  label: string;
  onChange: (values: string[]) => void;
  selectedValues: string[];
  summaryLabel?: string;
};

export type IndexToolbarProps<
  TViewId extends string,
  TSortId extends string,
> = {
  filter?: IndexToolbarFilter;
  search: {
    label: string;
    onChange: (query: string) => void;
    placeholder?: string;
    query: string;
  };
  sort: {
    label: string;
    onChange: (sortId: TSortId) => void;
    options: Array<{
      id: TSortId;
      label: string;
    }>;
    value: TSortId;
  };
  view: {
    label: string;
    onChange: (viewId: TViewId) => void;
    renderLabel?: (viewId: TViewId) => ReactNode;
    value: TViewId;
    views: Array<ViewToggleOption<TViewId>>;
  };
};

export function IndexToolbar<TViewId extends string, TSortId extends string>({
  filter,
  search,
  sort,
  view,
}: IndexToolbarProps<TViewId, TSortId>) {
  const hasActiveFilters =
    Boolean(search.query) || Boolean(filter?.selectedValues.length);

  function handleClearFilters() {
    search.onChange('');
    filter?.onChange([]);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <ControlField
          className="flex max-w-2xl flex-1"
          label={search.label}
          showLabel={false}
        >
          <SearchForm
            value={search.query}
            placeholder={search.placeholder}
            onChange={(event) => search.onChange(event.target.value)}
            onSubmit={(event) => event.preventDefault()}
            className="flex w-full items-center"
          />
        </ControlField>

        <div className="flex items-center gap-2">
          <ViewModeToggle
            activeViewId={view.value}
            onChange={(viewId) => view.onChange(viewId as TViewId)}
            views={view.views}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {filter ? (
          <ControlField
            className="max-w-2xl flex-1"
            label={filter.label}
            showLabel={false}
          >
            <DynamicTagSelector
              allTags={filter.allValues}
              selectedTags={filter.selectedValues}
              onTagsChange={filter.onChange}
            />
          </ControlField>
        ) : null}

        <div className="flex items-end gap-2">
          <ControlField label={sort.label} showLabel={false}>
            <SortSelect
              value={sort.value}
              onChange={sort.onChange}
              options={sort.options}
            />
          </ControlField>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:bg-card/70 hover:text-foreground focus-visible:ring-ring inline-flex h-10 items-center rounded-md border border-transparent px-3 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
