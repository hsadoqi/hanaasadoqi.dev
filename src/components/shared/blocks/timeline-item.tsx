export interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
}

export function TimelineItem({ date, title, description }: TimelineItemProps) {
  return (
    <div className="border-border/30 flex gap-6 border-b py-6 last:border-b-0">
      <div className="w-24 flex-shrink-0">
        <p className="type-meta">{date}</p>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="type-card-title-sm mb-1">{title}</h4>
        <p className="type-body-sm">{description}</p>
      </div>
    </div>
  );
}
