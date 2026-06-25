export * from './section-header';
import { cn } from '@/lib/utils';
import { MarginLine } from '@/components/shared/margin-line';
import {
  SectionVariant,
  SectionAlign,
  SectionJustify,
  alignMap,
  justifyMap,
} from './types';

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
  ...props
}: SectionProps) {
  const needsFlex = fullScreen || !!align || !!justify;

  return (
    <section
      id={id}
      className={cn(
        'border-border/50 py-16 sm:py-20',
        variant === 'surface' &&
          'bg-card/80 shadow-ring/5 rounded-3xl border shadow-sm',
        fullScreen && 'min-h-svh',
        needsFlex && 'flex flex-col',
        align && alignMap[align],
        justify && justifyMap[justify],
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8',
          containerClassName,
        )}
      >
        {children}
        {showMarginLine && <MarginLine text={marginLineText} />}
      </div>
    </section>
  );
}
