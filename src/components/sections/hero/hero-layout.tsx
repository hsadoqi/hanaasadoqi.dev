import { cn } from '@/lib/utils';
import { HeroContent } from './hero-content';
import { HeroCta } from './hero-cta';

export type HeroHeadlinePart = {
  text: string;
  mobileLines?: string[];
  highlight?: boolean;
};

export const HeroLayout = ({
  greeting,
  headlineParts,
  supportingLine,
  cta,
  className,
}: {
  greeting: string;
  headlineParts: HeroHeadlinePart[];
  supportingLine?: string;
  cta: string;
  className?: string;
}) => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className={cn(
        'relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-evenly gap-12 overflow-hidden px-6 py-14 sm:gap-14 sm:px-8 sm:py-20 md:px-12',
        className,
      )}
    >
      <div className="bg-foreground/3 pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
      <div className="bg-foreground/3 pointer-events-none absolute -right-40 -bottom-40 h-80 w-80 rounded-full blur-3xl" />
      <div className="hero-texture pointer-events-none absolute inset-0" />

      <HeroContent
        greeting={greeting}
        headlineParts={headlineParts}
        supportingLine={supportingLine}
      />

      <div className="hero-enter hero-enter-delay-3 relative z-10 flex w-full max-w-[calc(100vw-3rem)] justify-end pt-3 pl-20 sm:pt-0 sm:pl-0 md:max-w-none md:justify-center">
        <HeroCta cta={cta} />
      </div>
    </section>
  );
};
