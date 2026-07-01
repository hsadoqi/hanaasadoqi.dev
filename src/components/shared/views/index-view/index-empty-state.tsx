type IndexEmptyStateProps = {
  description: string;
  onReset: () => void;
  resetLabel?: string;
  title: string;
};

export function IndexEmptyState({
  description,
  onReset,
  resetLabel = 'Reset filters',
  title,
}: IndexEmptyStateProps) {
  return (
    <div className="border-border/40 bg-muted/10 rounded-lg border px-6 py-12 text-center">
      <h2 className="text-foreground text-lg font-semibold">{title}</h2>
      <p className="text-muted-foreground/70 mt-2 text-sm">{description}</p>
      <button
        type="button"
        onClick={onReset}
        className="text-foreground/70 hover:text-foreground focus-visible:ring-ring mt-5 rounded px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
      >
        {resetLabel}
      </button>
    </div>
  );
}
