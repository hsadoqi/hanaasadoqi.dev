export interface DiagramPlaceholderProps {
  label: string;
  height?: number;
  caption?: string;
}

export function DiagramPlaceholder({
  label,
  height = 400,
  caption,
}: DiagramPlaceholderProps) {
  return (
    <div className="my-8 space-y-2">
      <div
        className="bg-muted/30 border-border/30 flex w-full items-center justify-center rounded-lg border"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <p className="text-muted-foreground/40 font-mono text-sm">{label}</p>
        </div>
      </div>
      {caption && (
        <p className="text-muted-foreground/50 text-xs italic">{caption}</p>
      )}
    </div>
  );
}
