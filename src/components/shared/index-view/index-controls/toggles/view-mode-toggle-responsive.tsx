'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, GridIcon, ListIcon } from 'lucide-react';
import { ViewModeToggle, type ViewToggleOption } from './view-mode-toggle';

type ViewModeToggleResponsiveProps<TViewId extends string> = {
  activeViewId: TViewId;
  onChange: (viewId: TViewId) => void;
  views: Array<ViewToggleOption<TViewId>>;
};

export function ViewModeToggleResponsive<TViewId extends string>({
  activeViewId,
  onChange,
  views,
}: ViewModeToggleResponsiveProps<TViewId>) {
  if (views.length <= 1) return null;

  const activeLabel = views.find((v) => v.id === activeViewId)?.label;

  return (
    <>
      {/* Desktop: Toggle group */}
      <div className="hidden sm:block">
        <ViewModeToggle
          activeViewId={activeViewId}
          onChange={onChange}
          views={views}
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
              <span className="font-medium">
                {activeLabel === 'Grid' ? (
                  <GridIcon className="size-3" />
                ) : (
                  <ListIcon className="size-3" />
                )}
              </span>
              <ChevronDown className="size-3" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={activeViewId}
              onValueChange={(value) => onChange(value as TViewId)}
            >
              {views.map((view) => (
                <DropdownMenuRadioItem key={view.id} value={view.id}>
                  {view.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
