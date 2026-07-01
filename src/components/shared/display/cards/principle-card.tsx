interface PrincipleCardProps {
  title: string;
  description: string;
  businessContext: string;
  variant?: 'featured' | 'secondary';
  index?: number;
  onSelect?: () => void;
}

export function PrincipleCard({
  title,
  description,
  businessContext,
  variant = 'secondary',
  index,
  onSelect,
}: PrincipleCardProps) {
  const isFeatured = variant === 'featured';
  const indexLabel =
    index !== undefined ? String(index).padStart(2, '0') : undefined;
  const principleId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <article
      key={principleId}
      id={principleId}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={onSelect ? `Expand: ${title}` : undefined}
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (event) =>
              (event.key === 'Enter' || event.key === ' ') && onSelect()
          : undefined
      }
      className={`group focus-visible:ring-ring focus-visible:ring-offset-background relative flex flex-col rounded-xl border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200 ${onSelect ? 'cursor-pointer' : ''} ${
        isFeatured
          ? 'border-border/50 bg-muted/30 hover:border-border/70 hover:bg-muted/40 h-full p-7 sm:p-8'
          : 'border-border/40 bg-background hover:border-border/60 hover:bg-muted/20 p-5 sm:p-6'
      } `}
    >
      {indexLabel ? (
        <span
          className="text-muted-foreground/25 absolute top-5 right-5 font-mono text-[11px] tabular-nums select-none"
          aria-hidden="true"
        >
          {indexLabel}
        </span>
      ) : null}

      <div className={`flex flex-col gap-2 ${isFeatured ? 'flex-1' : ''}`}>
        <h3
          className={`text-foreground pr-8 leading-snug font-semibold tracking-tight ${isFeatured ? 'text-xl sm:text-2xl' : 'text-[15px] sm:text-base'} `}
        >
          {title}
        </h3>
        <p
          className={`text-muted-foreground leading-relaxed ${isFeatured ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'} `}
        >
          {description}
        </p>
      </div>

      <div
        className={`border-border/30 border-t ${isFeatured ? 'mt-7 pt-5' : 'mt-5 pt-4'}`}
      >
        <p
          className={`text-muted-foreground/50 leading-relaxed ${isFeatured ? 'text-xs sm:text-[13px]' : 'text-[11px] sm:text-xs'} `}
        >
          {businessContext}
        </p>
      </div>
    </article>
  );
}
