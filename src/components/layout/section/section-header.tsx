import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn('space-y-4', className)}>
      {eyebrow ? (
        <p className="text-muted-foreground text-sm font-medium tracking-[0.25em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground max-w-2xl text-base leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
