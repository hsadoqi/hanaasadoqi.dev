export interface GalleryItem {
  label: string;
  caption?: string;
}

export interface GalleryGridProps {
  items: GalleryItem[];
  columns?: 2 | 3;
}

const smColsClass: Record<2 | 3, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
};

export function GalleryGrid({ items, columns = 2 }: GalleryGridProps) {
  return (
    <div className={`grid grid-cols-1 ${smColsClass[columns]} my-8 gap-6`}>
      {items.map((item, i) => (
        <div key={i} className="space-y-2">
          <div className="bg-muted/30 border-border/30 flex aspect-square w-full items-center justify-center rounded-lg border">
            <p className="text-muted-foreground/40 text-center font-mono text-xs">
              {item.label}
            </p>
          </div>
          {item.caption && (
            <p className="text-muted-foreground/60 text-xs">{item.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}
