import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export type SectionMarkerVariant = 'rail' | 'divider' | 'caption';
export type SectionMarkerTone = 'default' | 'muted' | 'accent';

export type SectionMarkerProps = {
  text?: ReactNode;
  children?: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  variant?: SectionMarkerVariant;
  tone?: SectionMarkerTone;
  className?: string;
  lineClassName?: string;
  contentClassName?: string;
  showLine?: boolean;
  contentPosition?: 'before' | 'after';
  compact?: boolean;
};

export function SectionMarker({
  text,
  children,
  orientation,
  variant = 'rail',
  tone = 'default',
  className,
  lineClassName,
  contentClassName,
  showLine = true,
  contentPosition = 'after',
  compact = false,
}: SectionMarkerProps) {
  const resolvedOrientation =
    orientation ?? (variant === 'divider' ? 'horizontal' : 'vertical');
  const isVertical = resolvedOrientation === 'vertical';
  const content = children ?? text;
  const hasContent =
    content !== undefined && content !== null && content !== '';

  const toneClasses = {
    default: 'bg-brand group-hover:bg-foreground',
    muted: 'bg-border/70 group-hover:bg-foreground',
    accent: 'bg-accent group-hover:bg-foreground',
  }[tone];

  const contentElement = hasContent ? (
    <div
      className={cn(
        'font-sans text-xs tracking-[0.3em] uppercase transition-colors',
        isVertical
          ? 'writing-mode-vertical-rl text-muted-foreground group-hover:text-brand rotate-180'
          : 'text-muted-foreground group-hover:text-brand whitespace-nowrap',
        variant === 'divider' &&
          !isVertical &&
          'text-[0.65rem] tracking-[0.35em]',
        compact && 'text-[0.6rem]',
        contentClassName,
      )}
    >
      {content}
    </div>
  ) : null;

  return (
    <div
      className={cn(
        'group hidden md:flex',
        variant === 'divider'
          ? 'w-full items-center gap-3 py-2'
          : isVertical
            ? 'flex-col items-center justify-end gap-6 self-stretch pb-2'
            : 'flex-row items-center justify-start gap-4 self-stretch pt-2',
        compact && 'gap-2 py-1',
        className,
      )}
    >
      {contentPosition === 'before' && contentElement}
      {showLine ? (
        <div
          className={cn(
            toneClasses,
            'transition-colors',
            isVertical ? 'w-px flex-1' : 'h-px flex-1',
            variant === 'divider' && !isVertical && 'w-full',
            lineClassName,
          )}
        />
      ) : null}
      {contentPosition === 'after' && contentElement}
    </div>
  );
}
