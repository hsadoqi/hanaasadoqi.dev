import React from 'react';
import type { Experience } from '../../types';
import { ExperienceLabel } from './timeline-label';

type TimelineContainerProps = {
  experiences: Experience[];
  activeIndex: number;
  focusedIndex: number;
  onClick: (index: number) => void;
  onFocusIndex: (index: number) => void;
  progressWidth: string;
};

export const TimelineContainer = React.forwardRef<
  HTMLDivElement,
  TimelineContainerProps
>(function TimelineContainer(
  {
    experiences,
    activeIndex,
    focusedIndex,
    onClick,
    onFocusIndex,
    progressWidth,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className="relative mx-auto min-w-max px-32 py-6 sm:py-7 lg:py-8"
    >
      {/* Background track */}
      <div
        className="from-border/15 via-border/70 to-border/15 pointer-events-none absolute top-1/2 right-12 left-12 h-px -translate-y-1/2 bg-gradient-to-r"
        aria-hidden="true"
      />

      {/* Active progress line */}
      <div
        className="from-foreground/75 to-brand/30 pointer-events-none absolute top-1/2 left-12 h-0.5 -translate-y-1/2 bg-gradient-to-r motion-safe:transition-all motion-safe:duration-500"
        style={{ width: progressWidth }}
        aria-hidden="true"
      />

      <div className="relative flex min-h-[6rem] items-stretch sm:min-h-[7rem]">
        {experiences.map((experience, index) => (
          <ExperienceLabel
            key={`${experience.company}-${index}`}
            isAbove={index % 2 === 0}
            isActive={activeIndex === index}
            isFocused={focusedIndex === index}
            onClick={() => onClick(index)}
            onFocus={() => onFocusIndex(index)}
            experience={experience}
          />
        ))}
      </div>
    </div>
  );
});

TimelineContainer.displayName = 'TimelineContainer';
