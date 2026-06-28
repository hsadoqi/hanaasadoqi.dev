import { cn } from '@/lib/utils';
import { MarginLine } from './margin-line';
import { SectionHeader, type SectionHeaderProps } from './section-header';
import { SectionAlign, SectionJustify, SectionVariant } from '@/types';
import { alignMap, justifyMap } from './types';

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  variant?: SectionVariant;
  /** Fills the viewport height (`min-h-svh`). Implicitly enables flex layout. */
  fullScreen?: boolean;
  /** Horizontal alignment of children (cross-axis in column flex). Only applies when flex is active. */
  align?: SectionAlign;
  /** Vertical distribution of children (main-axis in column flex). Only applies when flex is active. */
  justify?: SectionJustify;
  showMarginLine?: boolean;
  marginLineText?: string;
  containerClassName?: string;
  header?: SectionHeaderProps;
};

export function Section({
  className,
  id,
  variant = 'default',
  fullScreen,
  align,
  justify,
  children,
  showMarginLine = false,
  marginLineText = '',
  containerClassName,
  header,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SectionProps) {
  const needsFlex = fullScreen || !!align || !!justify;
  const headerId = header?.id ?? (id && header ? `${id}-heading` : undefined);

  return (
    <section
      id={id}
      className={cn(
        'border-border/20 from-background via-background to-background border-b bg-gradient-to-b px-6 py-12 sm:px-8 sm:py-16 lg:px-12',
        id && 'scroll-mt-24',
        variant === 'surface' &&
          'bg-card/80 shadow-ring/5 rounded-3xl border shadow-sm',
        fullScreen && 'min-h-svh',
        needsFlex && 'flex flex-col',
        align && alignMap[align],
        justify && justifyMap[justify],
        className,
      )}
      aria-labelledby={ariaLabelledBy ?? headerId}
      {...props}
    >
      <div
        className={cn(
          'mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8',
          containerClassName,
        )}
      >
        {header ? (
          <SectionHeader
            {...header}
            id={headerId}
            className={cn('mb-12', header.className)}
          />
        ) : null}
        {children}
        {showMarginLine && <MarginLine text={marginLineText} />}
      </div>
    </section>
  );
}

export * from './section-header';
export * from './margin-line';
