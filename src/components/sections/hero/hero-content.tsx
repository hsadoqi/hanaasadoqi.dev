import { heroSocialLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { HeroHeadlinePart } from './hero-layout';
import { ProjectIcons } from '@/features/icons/project-icons';

export const HeroContent = ({
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
      <div className="hero-enter hero-enter-delay-3 flex items-center gap-4 sm:gap-6">
        {/* <SocialMediaIcons iconClass="text-foreground hover:text-brand motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-linear opacity-50 group-hover/button:opacity-100" /> */}
        <ProjectIcons
          items={heroSocialLinks} iconClassName="size-7 sm:size-8 shrink-0 text-muted-foreground hover:text-brand motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-linear opacity-50 group-hover/button:opacity-100"
        />
      </div>
    </div>
  );
};
