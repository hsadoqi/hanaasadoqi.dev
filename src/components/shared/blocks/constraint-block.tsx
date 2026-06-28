export interface ConstraintBlockProps {
  title: string;
  description: string;
  impact: string[];
}

export function ConstraintBlock({
  title,
  description,
  impact,
}: ConstraintBlockProps) {
  return (
    <div className="border-border/30 mb-6 space-y-4 rounded-lg border p-6">
      <h3 className="text-foreground text-base font-semibold">{title}</h3>
      <p className="text-muted-foreground/70 text-sm">{description}</p>
      <div>
        <p className="text-muted-foreground/60 mb-2 text-xs font-medium">
          Affected:
        </p>
        <div className="flex flex-wrap gap-2">
          {impact.map((item, i) => (
            <span
              key={i}
              className="bg-muted/30 text-muted-foreground/70 rounded px-2 py-1 text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
