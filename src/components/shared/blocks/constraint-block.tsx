export interface ConstraintBlockProps {
  title: string;
  description: string;
  impactSummary: string[];
}

export function ConstraintBlock({
  title,
  description,
  impactSummary,
}: ConstraintBlockProps) {
  return (
    <div className="border-border/30 mb-6 space-y-4 rounded-lg border p-6">
      <h3 className="type-card-title-sm">{title}</h3>
      <p className="type-body-sm">{description}</p>
      <div>
        <p className="type-caption mb-2 font-medium">Affected:</p>
        {impactSummary && (
          <div className="flex flex-wrap gap-2">
            {impactSummary.map((item, i) => (
              <span
                key={i}
                className="bg-muted/30 type-caption rounded px-2 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
