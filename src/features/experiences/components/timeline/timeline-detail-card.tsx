import type { Experience } from '../../types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui';

export type ExperienceDetailCardProps = {
  slideDirection: 'left' | 'right' | 'none';
  current: Experience;
};

export const ExperienceDetailCard = ({
  slideDirection,
  current,
}: ExperienceDetailCardProps) => {
  const totalHighlights = 5;

  return (
    <div className="group flex justify-center px-4">
      <div
        className={`w-full max-w-2xl motion-safe:duration-300 ${
          slideDirection === 'none'
            ? 'motion-safe:animate-in motion-safe:fade-in'
            : 'motion-safe:animate-in motion-safe:slide-in-from-bottom-8 motion-safe:fade-in'
        }`}
        role="region"
        aria-live="polite"
        aria-label={`Details for ${current.company}`}
      >
        <div className="bg-background/60 border-border/40 hover:border-border/60 hover:bg-background/80 rounded-2xl border p-7 backdrop-blur-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] motion-safe:transition-all motion-safe:duration-200 sm:p-10">
          {/* Header - Reorganized for better hierarchy */}
          <div className="mb-8 space-y-5">
            {/* Company & Title on same line */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="space-y-2">
                <h3 className="text-foreground text-2xl font-semibold sm:text-3xl">
                  {current.company}
                </h3>
                <p className="text-secondary-content text-base font-medium">
                  {current.title}
                </p>
              </div>
              <div className="from-foreground to-brand flex flex-col items-start gap-2 bg-gradient-to-r bg-clip-text text-transparent sm:items-end sm:text-right">
                <p className="font-mono text-xs tracking-wider uppercase">
                  {current.period}
                </p>
                <p className="text-xs">{current.location}</p>
              </div>
            </div>
          </div>

          {/* Description with improved typography */}
          <p className="text-secondary-content mb-8 text-base leading-relaxed">
            {current.description}
          </p>

          {/* Highlights section with better styling */}
          {current.highlights && current.highlights.length > 0 && (
            <div className="border-border/30 border-t pt-8">
              <Collapsible defaultOpen={true}>
                <CollapsibleTrigger className="group hover:text-foreground motion-safe:transition-colors motion-safe:duration-200">
                  <p className="text-subtle-content text-xs font-semibold tracking-wider uppercase motion-safe:transition-colors">
                    Key highlights ({current.highlights.length})
                  </p>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="mt-5 space-y-3.5">
                    {current.highlights
                      .slice(0, totalHighlights)
                      .map((highlight, idx) => (
                        <li
                          key={idx}
                          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-4 text-secondary-content hover:text-foreground flex gap-3 text-sm leading-relaxed motion-safe:transition-colors motion-safe:duration-200"
                          style={{
                            animationDelay: `${idx * 50}ms`,
                            animationDuration: '300ms',
                          }}
                        >
                          <span className="text-brand/60 hover:text-brand mt-1 flex-shrink-0 motion-safe:transition-colors">
                            ✓
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
