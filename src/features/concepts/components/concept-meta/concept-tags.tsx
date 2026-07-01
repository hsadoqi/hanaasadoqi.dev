export function ConceptMetaTags({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div>
      <p className="text-muted-foreground/50 mb-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="border-border/50 text-muted-foreground rounded-full border px-2.5 py-1 text-[11px] leading-none"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
