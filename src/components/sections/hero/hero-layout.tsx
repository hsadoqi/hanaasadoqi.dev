import { cn } from '@/lib/utils';
import Link from 'next/link';

export const HeroLayout = ({
  greeting,
  headlineParts,
  identities,
  cta,
  className,
}: {
  greeting: string;
  headlineParts: string[];
  identities: string[];
  cta: string;
  className?: string;
}) => {
  return (
    <div
      id="hero"
      className={cn(
        'relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-16 md:px-12 md:py-24',
        className,
      )}
    >
      {/* Subtle background accent shapes */}
      <div className="bg-foreground/3 pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
      <div className="bg-foreground/3 pointer-events-none absolute -right-40 -bottom-40 h-80 w-80 rounded-full blur-3xl" />

      <HeroContent greeting={greeting} headlineParts={headlineParts} />

      <div className="relative z-10 flex flex-col items-end justify-between gap-8 md:flex-row md:gap-12">
        {/* Identities - Right aligned, vertical stack */}
        <div className="space-y-3 md:ml-auto md:text-right">
          {identities.map((line, i) => (
            <p
              key={i}
              className="text-secondary-content hover:text-foreground text-sm leading-relaxed motion-safe:transition-colors motion-safe:duration-200 md:text-base"
            >
              {line}
            </p>
          ))}
        </div>

        {/* CTA - Bottom right */}
        <HeroCta cta={cta} />
      </div>
    </div>
  );
};

const HeroContent = ({
  greeting,
  headlineParts,
}: {
  greeting: string;
  headlineParts: string[];
}) => {
  return (
    <div className="relative z-10">
      {/* Greeting */}
      <p className="text-subtle-content mb-16 text-xs font-semibold tracking-widest uppercase">
        {greeting}
      </p>

      {/* Headline with brand color gradient on "side quests" */}
      <h1 className="text-foreground max-w-6xl text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
        {headlineParts.map((line, i) => {
          const isBrandHighlight =
            line.toLowerCase().includes('side') ||
            line.toLowerCase().includes('quest');
          return (
            <span
              key={i}
              className={`block ${
                isBrandHighlight
                  ? 'from-foreground to-brand bg-gradient-to-r bg-clip-text text-transparent'
                  : ''
              }`}
            >
              {line}
            </span>
          );
        })}
      </h1>
    </div>
  );
};

export const HeroCta = ({ cta }: { cta: string }) => {
  return (
    <Link
      href="#case-studies"
      className="group text-foreground hover:text-brand inline-flex flex-col items-center gap-2 text-xs font-medium tracking-widest uppercase motion-safe:transition-colors motion-safe:duration-200 md:text-sm"
    >
      <span>{cta}</span>
      <span className="group-hover:translate-y-1 motion-safe:transition-transform motion-safe:duration-200">
        ↓
      </span>
    </Link>
  );
};
