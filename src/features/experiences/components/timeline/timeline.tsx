'use client';

import { useMemo } from 'react';
import { experiences } from '../../data';
import { Section } from '@/components/layout/section';
import { CarouselNav } from '@/features/projects/components/shared/carousel-nav';
import { ExperienceDetailCard } from './timeline-detail-card';
import { useTimeline } from '../../hooks/use-timeline';
import { TimelineContainer } from './timeline-container';

const total = experiences.length;
const timelineInstructionsId = 'experience-timeline-instructions';
const introPanelId = 'experience-intro-panel';

function ExperienceIntroPanel() {
  return (
    <div
      id={introPanelId}
      className="mx-auto flex min-h-[7rem] w-full max-w-2xl flex-col items-center justify-center px-4 pb-4 sm:min-h-[9rem]"
    >
      <p className="border-brand/15 bg-brand/5 text-brand type-meta rounded-md border px-4 py-2 font-mono font-semibold">
        Select a role
      </p>
    </div>
  );
}

export function ExperienceSection() {
  const {
    activeIndex,
    focusedIndex,
    sectionRef,
    timelineContainerRef,
    handleKeyDown,
    handleFocusIndex,
    prev,
    next,
    goToIndex,
  } = useTimeline(total, -1);

  const current = useMemo(() => experiences[activeIndex], [activeIndex]);

  const progressWidth = useMemo(() => {
    if (activeIndex < 0) return '0%';
    return `calc((100% - 4rem) * ${(activeIndex + 1) / total})`;
  }, [activeIndex]);

  return (
    <Section
      id="experience"
      header={{
        eyebrow: 'Work Experience',
        title: '',
      }}
      className="flex flex-1 flex-col items-center justify-evenly overflow-hidden sm:gap-10 lg:gap-12"
      containerClassName="flex flex-col flex-1"
    >
      <div
        ref={sectionRef}
        className="flex size-full flex-1 flex-col justify-evenly"
      >
        <div
          role="region"
          aria-label="Experience carousel"
          aria-roledescription="carousel"
          aria-describedby={`${timelineInstructionsId} ${
            activeIndex < 0 ? introPanelId : ''
          }`.trim()}
          onKeyDown={handleKeyDown}
          className="focus-visible:ring-ring focus-visible:shadow-foreground/15 flex flex-col items-stretch justify-center rounded-md focus-visible:shadow-lg focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset motion-safe:transition-all motion-safe:duration-200"
        >
          <p id={timelineInstructionsId} className="sr-only">
            When this section is visible, use arrow keys to select and reveal
            roles. When focused on a role, Enter or Space also selects it. Home
            moves to the first role and End moves to the last role.
          </p>
          <div className="relative max-w-7xl">
            <div
              className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent sm:w-16 lg:w-20"
              aria-hidden="true"
            />
            <div
              ref={timelineContainerRef}
              className="no-scrollbar flex flex-1 flex-col items-stretch justify-center overflow-x-auto overflow-y-hidden overscroll-x-contain py-4 pb-10 motion-safe:transition-all motion-safe:duration-500"
            >
              <TimelineContainer
                activeIndex={activeIndex}
                focusedIndex={focusedIndex}
                onFocusIndex={handleFocusIndex}
                onClick={goToIndex}
                progressWidth={progressWidth}
              />
            </div>
            <div
              className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent sm:w-16 lg:w-20"
              aria-hidden="true"
            />
          </div>

          <div className="motion-safe:transition-[min-height] motion-safe:duration-300">
            {activeIndex >= 0 && current ? (
              <ExperienceDetailCard
                key={activeIndex}
                current={current}
                slideDirection="none"
              />
            ) : (
              <ExperienceIntroPanel />
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-center sm:mt-10">
          <CarouselNav
            currentIndex={activeIndex}
            totalItems={total}
            onPrevious={prev}
            onNext={next}
            onDotClick={goToIndex}
            layout="both"
          />
        </div>
      </div>
    </Section>
  );
}
