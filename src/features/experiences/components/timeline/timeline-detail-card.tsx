'use client';

import type { Experience } from '../../types';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
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
  const [areHighlightsOpen, setAreHighlightsOpen] = useState(false);

  const handleHighlightsKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (
      event.key !== 'Enter' &&
      event.key !== ' ' &&
      event.key !== 'Spacebar'
    ) {
      return;
    }

    event.preventDefault();
    setAreHighlightsOpen((isOpen) => !isOpen);
  };

  return (
    <div className="group flex justify-center px-4 pb-4">
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
        <div className="bg-background/60 border-border/40 hover:border-border/60 hover:bg-background/80 hover:shadow-elevation-2 rounded-2xl border p-7 backdrop-blur-sm motion-safe:transition-all motion-safe:duration-200 sm:p-10">
          <div className="mb-8 space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="space-y-2">
                <h3 className="type-panel-title">{current.company}</h3>
                <p className="type-body-sm font-medium sm:text-base">
                  {current.title}
                </p>
              </div>
              <div className="from-foreground to-brand flex flex-col items-start gap-2 bg-gradient-to-r bg-clip-text text-transparent sm:items-end sm:text-right">
                <p className="type-eyebrow font-mono">{current.period}</p>
                <p className="type-caption">{current.location}</p>
              </div>
            </div>
          </div>

          {/* Description with improved typography */}
          <p className="type-body mb-8">{current.description}</p>

          {current.highlights && current.highlights.length > 0 && (
            <div className="border-border/30 border-t pt-8">
              <Collapsible
                open={areHighlightsOpen}
                onOpenChange={setAreHighlightsOpen}
              >
                <CollapsibleTrigger
                  type="button"
                  aria-label={`Toggle key highlights for ${current.company}`}
                  onKeyDown={handleHighlightsKeyDown}
                  className="group focus-visible:ring-ring focus-visible:ring-offset-background hover:text-foreground flex w-full cursor-pointer items-center justify-between gap-4 rounded-md py-1 text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-200"
                >
                  <span className="type-eyebrow motion-safe:transition-colors">
                    Key highlights ({current.highlights.length})
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="text-muted-foreground size-4 shrink-0 group-data-[state=open]:rotate-180 motion-safe:transition-transform motion-safe:duration-200"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="mt-5 space-y-3.5">
                    {current.highlights
                      .slice(0, totalHighlights)
                      .map((highlight, idx) => (
                        <li
                          key={idx}
                          className="type-body-sm hover:text-foreground flex gap-3 motion-safe:transition-colors motion-safe:duration-200"
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
