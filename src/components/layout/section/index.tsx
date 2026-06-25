export * from './section-wrapper';
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
  eyebrow,
}: React.HTMLAttributes<HTMLElement> & {
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
  eyebrow?: string;
}) {
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
    >
      <div
        className={cn(
          'mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8',
          containerClassName,
        )}
      >
        <div className="space-y-10">
          {eyebrow && (
            <p className="text-muted-foreground hover:text-brand/80 pl-2 text-sm font-medium tracking-[0.25em] uppercase transition-colors">
              {eyebrow}
            </p>
          )}
          {children}
        </div>
        {showMarginLine && <MarginLine text={marginLineText} />}
      </div>
    </section>
  );
}
