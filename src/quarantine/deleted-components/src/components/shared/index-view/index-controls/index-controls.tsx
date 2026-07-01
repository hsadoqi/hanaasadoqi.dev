import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ALL_FILTER_VALUE, createFilterOptions } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import type { IndexViewFilter } from '../types';
import { SearchForm } from './filters';

type IndexControlsProps<T> = {
  activeFilters: Record<string, string>;
  filters: Array<IndexViewFilter<T>>;
  items: T[];
  onFilterChange: (filterId: string, value: string) => void;
  onQueryChange: (query: string) => void;
  query: string;
  searchPlaceholder: string;
};

export function IndexControls<T>({
  onQueryChange,
  query,
  searchPlaceholder,
}: IndexControlsProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <SearchForm
        className="w-full"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={searchPlaceholder}
        inputWrapperClassName="sm:max-w-md"
      />
    </div>
  );
}

type FocusFilterPillProps<T> = Pick<
  IndexControlsProps<T>,
  'filters' | 'activeFilters' | 'onFilterChange' | 'items'
>;

export function FocusFilterPill<T>({
  filters,
  activeFilters,
  onFilterChange,
  items,
}: FocusFilterPillProps<T>) {
  return (
    <div className="-mx-1 overflow-x-auto pb-1">
      <div className="flex min-w-max items-center gap-2 px-1">
        {filters.map((filter) => {
          const options = createFilterOptions(items, filter);
          const activeValue = activeFilters[filter.id] ?? ALL_FILTER_VALUE;
          const activeLabel =
            activeValue === ALL_FILTER_VALUE
              ? 'All'
              : (options.find((o) => o.value === activeValue)?.label ?? 'All');
          const isFiltered = activeValue !== ALL_FILTER_VALUE;

          return (
            <DropdownMenu key={filter.id}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'border-border/40 bg-background text-muted-foreground hover:bg-background/90 active:bg-background/80 hover:text-foreground focus-visible:ring-ring inline-flex h-8 items-center gap-1.5 rounded-sm border px-3 text-xs focus-visible:ring-2 focus-visible:outline-none',
                    // 'focus-visible:ring-ring border-border/40 inline-flex h-8 items-center gap-1.5 rounded-sm border px-3 text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none',
                    isFiltered
                      ? 'border-foreground/25 bg-foreground/6 text-foreground'
                      : 'bg-background text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span className="text-muted-foreground/55 font-mono text-[9px] tracking-[0.16em] text-wrap break-words uppercase">
                    {filter.label}
                  </span>
                  <span className="max-w-28 truncate font-medium sm:max-w-none">
                    {activeLabel}
                  </span>
                  <ChevronDown className="size-3" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel className="font-medium">
                  {filter.label}
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={activeValue}
                  onValueChange={(value) => onFilterChange(filter.id, value)}
                >
                  <DropdownMenuRadioItem value={ALL_FILTER_VALUE}>
                    All
                  </DropdownMenuRadioItem>
                  {options.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
    </div>
  );
}
