import type { IndexViewView } from './types';
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group';

type ViewModeToggleProps<T> = {
  activeViewId: string;
  onChange: (viewId: string) => void;
  views: Array<IndexViewView<T>>;
};

export function ViewModeToggle<T>({
  activeViewId,
  onChange,
  views,
}: ViewModeToggleProps<T>) {
  if (views.length <= 1) return null;

  return (
    <div className="border-border/40 bg-muted/20 flex w-fit flex-wrap gap-1 rounded-lg border p-1">
      <ToggleGroup
        type="single"
        orientation={'horizontal'}
        variant={'outline'}
        spacing={2}
      >
        {views.map((view) => (
          <ToggleGroupItem
            key={view.id}
            value={view.label}
            onClick={() => onChange(view.id)}
            variant={activeViewId === view.id ? 'default' : 'outline'}
          />
        ))}
      </ToggleGroup>
    </div>
  );
  // return (
  //   <div className="border-border/40 bg-muted/20 flex w-fit flex-wrap gap-1 rounded-lg border p-1">
  //     {views.map((view) => (
  //       <FilterPill
  //         key={view.id}
  //         active={activeViewId === view.id}
  //         onClick={() => onChange(view.id)}
  //       >
  //         {view.label}
  //       </FilterPill>
  //     ))}
  //   </div>
  // );
}
