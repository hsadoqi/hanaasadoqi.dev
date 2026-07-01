'use client';

import { Section } from '@/components/layout/section';
import { CarouselNav } from '@/components/shared/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { experiences } from '../../data';
import { useTimeline } from '../../hooks/use-timeline';
import { ExperienceTimelineRail } from './experience-timeline-rail';
import { SelectedExperienceCard } from './selected-experience-card';

const total = experiences.length;
const timelineInstructionsId = 'experience-timeline-instructions';
const introPanelId = 'experience-intro-panel';
const roleNavLabels = {
  itemLabel: 'role',
  previousLabel: 'Previous role',
  nextLabel: 'Next role',
};

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

function MobileRoleCardNav({
  activeIndex,
  total,
  onPrevious,
  onNext,
}: {
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const hasSelection = total > 0 && activeIndex >= 0;
  const buttonClassName =
    'inline-flex size-8 items-center justify-center rounded-md text-foreground/60 transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35';

  return (
    <div
      className="flex shrink-0 items-center gap-1 md:hidden"
      aria-label="Role navigation"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasSelection || activeIndex === 0}
        className={buttonClassName}
        aria-label="Previous role"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
      </button>
      <p
        className="text-foreground/65 min-w-10 text-center font-mono text-xs font-medium tabular-nums"
        aria-live="polite"
      >
        {hasSelection ? `${activeIndex + 1} of ${total}` : 'Select'}
      </p>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasSelection || activeIndex === total - 1}
        className={buttonClassName}
        aria-label="Next role"
      >
        <ChevronRight aria-hidden="true" className="size-4" />
      </button>
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
  } = useTimeline(total, 0);

  const current = useMemo(() => experiences[activeIndex], [activeIndex]);

  const progressWidth = useMemo(() => {
    if (activeIndex < 0) return '0%';
    return `calc((100% - 4rem) * ${(activeIndex + 1) / total})`;
  }, [activeIndex]);

  return (
    <Section
      id="experience"
      header={{
        eyebrow: 'Professional',
        title: 'Work Experience',
        className: 'mb-8 sm:mb-10 lg:mb-12',
      }}
      className="overflow-hidden pt-10 pb-14 sm:pt-12 sm:pb-16 md:pt-20 md:pb-24 lg:pb-28"
      containerClassName="flex flex-col flex-1"
    >
      <div
        ref={sectionRef}
        className="flex size-full flex-1 flex-col gap-10 sm:gap-12"
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
            When focused on a role, use arrow keys to move between roles. Enter
            or Space selects the focused role. Home moves to the first role and
            End moves to the last role.
          </p>
          <div className="relative max-w-7xl" data-experience-timeline>
            <div
              className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent sm:w-16 lg:w-20"
              aria-hidden="true"
            />
            <div
              ref={timelineContainerRef}
              className="no-scrollbar flex flex-1 flex-col items-stretch justify-center overflow-x-auto overflow-y-hidden overscroll-x-contain py-4 pb-5 motion-safe:transition-all motion-safe:duration-500 sm:pb-8"
            >
              <ExperienceTimelineRail
                experiences={experiences}
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
              <SelectedExperienceCard
                key={activeIndex}
                current={current}
                slideDirection="none"
                headerAccessory={
                  <MobileRoleCardNav
                    activeIndex={activeIndex}
                    total={total}
                    onPrevious={prev}
                    onNext={next}
                  />
                }
              />
            ) : (
              <ExperienceIntroPanel />
            )}
          </div>
        </div>
        <div className="mt-8 hidden justify-center sm:mt-10 md:flex">
          <CarouselNav
            currentIndex={activeIndex}
            totalItems={total}
            onPrevious={prev}
            onNext={next}
            onDotClick={goToIndex}
            layout="desktop"
            {...roleNavLabels}
          />
        </div>
      </div>
    </Section>
  );
}
