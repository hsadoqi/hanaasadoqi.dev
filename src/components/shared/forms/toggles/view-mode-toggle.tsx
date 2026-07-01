import type { ReactNode } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChevronDown, GridIcon, ListIcon } from 'lucide-react';

export type ViewToggleOption<TViewId extends string = string> = {
  id: TViewId;
  label: string;
  renderIcon?: () => ReactNode;
};

type ViewModeToggleProps<TViewId extends string> = {
  activeViewId: TViewId;
  onChange: (viewId: TViewId) => void;
  views: Array<ViewToggleOption<TViewId>>;
};

export function ViewModeToggle<TViewId extends string>({
  activeViewId,
  onChange,
  views,
}: ViewModeToggleProps<TViewId>) {
  if (views.length <= 1) return null;

  return (
    <div className="border-border/40 bg-muted/20 flex w-fit flex-wrap gap-1 rounded-lg border p-1">
      <ToggleGroup
        type="single"
        value={activeViewId}
        orientation="horizontal"
        variant="outline"
        spacing={2}
      >
        {views.map((view) => (
          <ToggleGroupItem
            key={view.id}
            value={view.id}
            onClick={() => onChange(view.id)}
            variant={activeViewId === view.id ? 'default' : 'outline'}
            aria-label={view.label}
          >
            {view.renderIcon?.() ?? view.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

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

  const activeLabel = views.find((view) => view.id === activeViewId)?.label;

  return (
    <>
      <div className="hidden sm:block">
        <ViewModeToggle
          activeViewId={activeViewId}
          onChange={onChange}
          views={views}
        />
      </div>

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
