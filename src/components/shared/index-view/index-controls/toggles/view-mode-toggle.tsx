import type { ReactNode } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

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
