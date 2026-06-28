export interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
}

export function MetricCard({
  label,
  value,
  unit,
  description,
}: MetricCardProps) {
  return (
    <div className="border-border/40 space-y-2 rounded-lg border p-6 text-center">
      <p className="text-muted-foreground/60 text-xs font-medium">{label}</p>
      <div className="flex items-baseline justify-center gap-1">
        <p className="text-foreground text-2xl font-semibold sm:text-3xl">
          {value}
        </p>
        {unit && <p className="text-muted-foreground/70 text-sm">{unit}</p>}
      </div>
      {description && (
        <p className="text-muted-foreground/50 text-xs">{description}</p>
      )}
    </div>
  );
}
