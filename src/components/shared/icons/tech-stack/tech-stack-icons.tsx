import { TooltipTrigger, TooltipContent, Tooltip } from '@/components/ui';
import type { TechStackIcon } from './library';

export function TechStackIcons({
  items,
  className,
  containerClassName,
  labelClassName,
  showLabel = true,
  showTooltip = true,
}: {
  items: TechStackIcon[];
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
  showTooltip?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <div className={containerClassName}>
      {showLabel && (
        <p className={labelClassName ?? 'type-eyebrow mb-2'}>Tech stack</p>
      )}
      <div
        className="border-border/30 bg-background flex items-center gap-0.5 rounded-md border p-2"
        aria-label={`Tech stack: ${items.map((item) => item.name).join(', ')}`}
      >
        {items.map((item) => {
          const IconComponent = item.icon as React.ComponentType<{
            className?: string;
          }>;

          const content = (
            <span
              key={item.id}
              role="img"
              aria-label={item.name}
              title={item.name}
              className="text-muted-foreground inline-flex size-8 items-center justify-center rounded-md"
            >
              <IconComponent className={className} />
            </span>
          );

          return showTooltip ? (
            <Tooltip key={item.id}>
              <TooltipTrigger>{content}</TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={4}
                className="bg-card text-card-foreground shadow-elevation-3 rounded-md px-2 py-1 text-xs font-medium"
              >
                {item.name}
              </TooltipContent>
            </Tooltip>
          ) : (
            content
          );
        })}
      </div>
    </div>
  );
}
