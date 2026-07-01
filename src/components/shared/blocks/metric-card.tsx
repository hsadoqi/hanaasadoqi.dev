import { CardBase } from '@/components/cards/card-base';

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
    <CardBase
      variant="standard"
      size="md"
      responsive="default"
      className="space-y-2 text-center"
    >
      <p className="type-caption font-medium">{label}</p>
      <div className="flex items-baseline justify-center gap-1">
        <p className="type-panel-title">{value}</p>
        {unit && <p className="type-body-sm">{unit}</p>}
      </div>
      {description && (
        <p className="type-caption text-secondary-content">{description}</p>
      )}
    </CardBase>
  );
}
