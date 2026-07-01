import { X } from 'lucide-react';

type ActiveFilterItem = {
  id: string;
  label: string;
  onRemove: () => void;
};

type ActiveFiltersSummaryProps = {
  activeItems?: ActiveFilterItem[];
  filterSummary?: string;
  onClear: () => void;
  resultCount?: number;
  searchQuery?: string;
};

export function ActiveFiltersSummary({
  activeItems = [],
  filterSummary,
  onClear,
  resultCount,
  searchQuery,
}: ActiveFiltersSummaryProps) {
  return (
    <div className="bg-background/50 border-border/30 flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-2">
        <div className="text-secondary-content text-sm">
          Showing {resultCount ?? '?'} result{resultCount !== 1 ? 's' : ''}
          {searchQuery ? ` for "${searchQuery}"` : ''}
          {filterSummary ? ` with ${filterSummary}` : ''}
        </div>

        {activeItems.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {activeItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onRemove}
                className="bg-border/20 text-foreground hover:bg-border/30 inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium motion-safe:transition-colors"
              >
                <span className="truncate">{item.label}</span>
                <X aria-hidden="true" className="size-3.5 shrink-0" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onClear}
        className="text-secondary-content hover:bg-background/80 hover:text-foreground inline-flex shrink-0 items-center gap-1.5 self-start rounded px-2 py-1 text-sm font-medium motion-safe:transition-all sm:self-center"
        aria-label="Clear filters"
      >
        <X aria-hidden="true" className="size-4" />
        Clear
      </button>
    </div>
  );
}
