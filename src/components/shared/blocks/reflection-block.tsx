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
      <p className="text-muted-foreground/60 text-sm italic">{title}</p>
      <p className="text-foreground text-base leading-relaxed">{insight}</p>
      {transferable && (
        <p className="text-muted-foreground/60 border-border/20 border-t pt-2 text-xs">
          Transfer: {transferable}
        </p>
      )}
    </div>
  );
}
