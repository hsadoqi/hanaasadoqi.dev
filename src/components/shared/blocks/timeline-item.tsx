export interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
}

export function TimelineItem({ date, title, description }: TimelineItemProps) {
  return (
    <div className="border-border/30 flex gap-6 border-b py-6 last:border-b-0">
      <div className="w-24 flex-shrink-0">
        <p className="text-muted-foreground/50 font-mono text-xs">{date}</p>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-foreground mb-1 text-base font-semibold">
          {title}
        </h4>
        <p className="text-muted-foreground/70 text-sm">{description}</p>
      </div>
    </div>
  );
}
