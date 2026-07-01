'use client';

import type { Experience } from '../../types';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui';

export type ExperienceDetailCardProps = {
  slideDirection: 'left' | 'right' | 'none';
  current: Experience;
  headerAccessory?: ReactNode;
};

export const ExperienceDetailCard = ({
  slideDirection,
  current,
  headerAccessory,
}: ExperienceDetailCardProps) => {
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const hasSignals = current.signals.length > 0;
  const hasStack = current.stack.length > 0;

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
              <div className="flex items-start justify-between gap-4 sm:block">
                <div className="space-y-2">
                  <h3 className="type-panel-title">{current.company}</h3>
                  <p className="type-body-sm font-medium sm:text-base">
                    {current.title}
                  </p>
                </div>
                {headerAccessory ? headerAccessory : null}
              </div>
              <div className="from-foreground to-brand flex flex-col items-start gap-2 bg-gradient-to-r bg-clip-text text-transparent sm:items-end sm:text-right">
                <p className="type-eyebrow font-mono">{current.period}</p>
                <p className="type-caption">{current.location}</p>
              </div>
            </div>
          </div>

          {/* Description with improved typography */}
          <div className="mb-8 space-y-5">
            <p className="type-body">{current.description}</p>

            {(hasSignals || hasStack) && (
              <div className="border-border/30 space-y-5 border-t pt-5">
                {hasSignals && (
                  <dl className="grid gap-4 sm:grid-cols-3">
                    {current.signals.map((signal) => (
                      <div key={signal.label} className="space-y-1.5">
                        <dt className="type-meta text-muted-foreground/55">
                          {signal.label}
                        </dt>
                        <dd className="type-body-sm text-foreground/80">
                          {signal.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {hasStack && (
                  <div className="flex flex-wrap gap-2">
                    {current.stack.map((item) => (
                      <span
                        key={item}
                        className="border-border/35 bg-background/35 text-muted-foreground/75 rounded-md border px-2.5 py-1 font-mono text-[10px] leading-none"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {current.highlights && current.highlights.length > 0 && (
            <div className="border-border/30 border-t pt-6">
              <Collapsible
                open={isEvidenceOpen}
                onOpenChange={setIsEvidenceOpen}
              >
                <CollapsibleTrigger
                  type="button"
                  aria-label={`Toggle supporting evidence for ${current.company}`}
                  className="group focus-visible:ring-ring focus-visible:ring-offset-background hover:text-foreground flex w-full cursor-pointer items-center justify-between gap-4 rounded-md py-1 text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-200"
                >
                  <span className="type-eyebrow motion-safe:transition-colors">
                    Supporting evidence ({current.highlights.length})
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="text-muted-foreground size-4 shrink-0 group-data-[state=open]:rotate-180 motion-safe:transition-transform motion-safe:duration-200"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="mt-5 space-y-3.5">
                    {current.highlights.map((highlight, idx) => (
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
