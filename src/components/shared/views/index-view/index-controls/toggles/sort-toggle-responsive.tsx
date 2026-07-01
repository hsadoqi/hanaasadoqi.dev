'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, SortAscIcon } from 'lucide-react';
import type { IndexViewSortOption } from '../../types';
import { SortToggle } from './sort-toggle';

type SortToggleResponsiveProps<T> = {
  activeSortId: string;
  onChange: (sortId: string) => void;
  sortOptions: Array<IndexViewSortOption<T>>;
};

export function SortToggleResponsive<T>({
  activeSortId,
  onChange,
  sortOptions,
}: SortToggleResponsiveProps<T>) {
  if (sortOptions.length === 0) return null;

  const activeLabel = sortOptions.find((o) => o.id === activeSortId)?.label;

  return (
    <>
      {/* Desktop: Toggle group */}
      <div className="hidden sm:block">
        <SortToggle
          activeSortId={activeSortId}
          onChange={onChange}
          sortOptions={sortOptions}
        />
      </div>

      {/* Mobile: Dropdown */}
      <div className="block sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="border-border/40 bg-background text-muted-foreground hover:bg-background/90 active:bg-background/80 hover:text-foreground focus-visible:ring-ring inline-flex h-8 items-center gap-1.5 rounded-sm border px-3 text-xs focus-visible:ring-2 focus-visible:outline-none"
            >
              <SortAscIcon className="size-3" />
              <span className="font-medium">{activeLabel}</span>
              <ChevronDown className="size-3" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={activeSortId}
              onValueChange={onChange}
            >
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
