import { cn } from '@/lib/utils';
import Link from 'next/link';
import { socialMediaIcons } from '@/components/shared/icons';
import { Button } from '@/components/ui';

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
        'relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-evenly gap-12 overflow-hidden px-6 py-14 sm:px-8 sm:py-16 md:px-12 md:py-24',
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

      <div className="hero-enter hero-enter-delay-3 relative z-10 flex w-full max-w-[calc(100vw-3rem)] justify-end pt-3 pl-20 md:justify-center sm:pt-0 sm:pl-0 md:max-w-none">
        <HeroCta cta={cta} />
      </div>
    </section>
  );
};

const HeroContent = ({
  greeting,
  headlineParts,
  supportingLine,
}: {
  greeting: string;
  headlineParts: HeroHeadlinePart[];
  supportingLine?: string;
}) => {
  return (
    <div className="relative z-10 w-full max-w-[calc(100vw-3rem)] min-w-0 md:max-w-none">
      <p className="hero-enter type-eyebrow mb-10 sm:mb-12">{greeting}</p>
      <h1
        className="hero-enter hero-enter-delay-1 font-heading text-foreground max-w-[calc(100vw-3rem)] text-[2.25rem] leading-[1.06] font-semibold tracking-tight text-wrap sm:text-5xl sm:text-balance md:max-w-6xl md:text-6xl lg:text-7xl"
        id="hero-heading"
      >
        {headlineParts.map((part, i) => {
          const lineClassName = cn('max-w-full text-wrap', {
            'from-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent':
              part.highlight,
          });

          return (
            <span key={`${part.text}-${i}`} className="block">
              {part.mobileLines ? (
                <span className="block sm:hidden">
                  {part.mobileLines.map((line) => (
                    <span key={line} className={cn('block', lineClassName)}>
                      {line}
                    </span>
                  ))}
                </span>
              ) : null}
              <span
                className={cn(lineClassName, {
                  'hidden sm:block': part.mobileLines,
                  block: !part.mobileLines,
                })}
              >
                {part.text}
              </span>
            </span>
          );
        })}
      </h1>

      {supportingLine ? (
        <p className="hero-enter hero-enter-delay-2 type-body-lg mt-8 mb-6 max-w-[18rem] text-pretty sm:mt-10 sm:max-w-2xl">
          {supportingLine}
        </p>
      ) : null}

      <div
        className="hero-enter hero-enter-delay-2 flex w-full gap-2"
        aria-label="Social links"
      >
        {socialMediaIcons.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              aria-label={item.label}
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:bg-muted hover:text-brand size-10 transition-colors duration-300 ease-linear hover:motion-safe:-translate-y-0.5 focus-visible:motion-safe:-translate-y-0.5 sm:size-12"
              asChild
            >
              <Link href={item.href}>
                <Icon className="size-5 sm:size-6" />
                <span className="sr-only">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export const HeroCta = ({ cta }: { cta: string }) => {
  return (
    <Link
      href="#projects"
      className="group type-eyebrow text-foreground hover:text-brand focus-visible:text-brand inline-flex max-w-full items-center gap-3 rounded-sm whitespace-nowrap outline-offset-4 active:translate-y-px motion-safe:transition-all motion-safe:duration-200 md:flex-col md:gap-2 md:text-sm"
    >
      <span>{cta}</span>
      <span className="group-hover:translate-y-1 group-focus-visible:translate-y-1 motion-safe:transition-transform motion-safe:duration-200">
        ↓
      </span>
    </Link>
  );
};
