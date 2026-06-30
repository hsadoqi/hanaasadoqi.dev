export interface ReflectionBlockProps {
  title: string;
  insight: string;
  transferable?: string;
}

export function ReflectionBlock({
  title,
  insight,
  transferable,
}: ReflectionBlockProps) {
  return (
    <div className="border-border/30 bg-muted/10 mb-4 space-y-3 rounded-lg border p-6">
      <p className="type-body-sm italic">{title}</p>
      <p className="type-body text-foreground">{insight}</p>
      {transferable && (
        <p className="type-caption border-border/20 border-t pt-2">
          Transfer: {transferable}
        </p>
      )}
    </div>
  );
}
