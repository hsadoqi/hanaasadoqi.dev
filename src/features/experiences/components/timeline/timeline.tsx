'use client';

import { useMemo } from 'react';
import { experiences } from '../../data';
import { Section } from '@/components/layout/section';
import { CarouselNav } from '@/features/projects/components/shared/carousel-nav';
import { ExperienceDetailCard } from './timeline-detail-card';
import {
  KeyboardShortcutsHint,
  MobileScrollHint,
} from './timeline-scroll-hint';
import { useTimeline } from '../../hooks/use-timeline';
import { TimelineContainer } from './timeline-container';

const total = experiences.length;

export function ExperienceSection() {
  const {
    activeIndex,
    timelineContainerRef,
    handleKeyDown,
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
        title: 'Experience',
      }}
      className="flex flex-1 flex-col items-center justify-evenly overflow-hidden sm:gap-10 lg:gap-12"
      justify="center"
      align="center"
      fullScreen
      containerClassName="flex flex-col flex-1"
    >
      <div className="flex size-full max-w-5xl flex-1 flex-col">
        <div
          role="region"
          aria-label="Experience carousel"
          aria-roledescription="carousel"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="focus-visible:ring-ring focus-visible:shadow-foreground/15 flex flex-col items-stretch justify-center rounded-md focus-visible:shadow-lg focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset motion-safe:transition-all motion-safe:duration-200"
        >
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
                onClick={goToIndex}
                progressWidth={progressWidth}
              />
            </div>
            <div
              className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent sm:w-16 lg:w-20"
              aria-hidden="true"
            />
          </div>

          {activeIndex < 0 ? (
            <>
              <MobileScrollHint />
              <KeyboardShortcutsHint />
            </>
          ) : null}

          {activeIndex >= 0 && current ? (
            <ExperienceDetailCard
              key={activeIndex}
              current={current}
              slideDirection="none"
            />
          ) : null}
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
