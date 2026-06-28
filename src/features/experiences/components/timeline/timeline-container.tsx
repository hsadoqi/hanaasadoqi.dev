import React from 'react';
import { experiences } from '../../data';
import { ExperienceLabel } from './timeline-label';

type TimelineContainerProps = {
  activeIndex: number;
  onClick: (index: number) => void;
  progressWidth: string;
};

export const TimelineContainer = React.forwardRef<
  HTMLDivElement,
  TimelineContainerProps
>(function TimelineContainer({ activeIndex, onClick, progressWidth }, ref) {
  return (
    <div
      ref={ref}
      className="relative mx-auto min-w-max px-32 py-6 sm:py-7 lg:py-8"
    >
      {/* Background track */}
      <div
        className="bg-border/20 pointer-events-none absolute top-1/2 right-12 left-12 h-0.5 -translate-y-1/2"
        aria-hidden="true"
      />

      {/* Active progress line */}
      <div
        className="from-foreground/60 to-brand/30 pointer-events-none absolute top-1/2 left-12 h-0.5 -translate-y-1/2 bg-gradient-to-r motion-safe:transition-all motion-safe:duration-500"
        style={{ width: progressWidth }}
        aria-hidden="true"
      />

      <div className="relative flex min-h-[6rem] items-stretch sm:min-h-[5rem]">
        {experiences.map((experience, index) => (
          <ExperienceLabel
            key={`${experience.company}-${index}`}
            isAbove={index % 2 === 0}
            isActive={activeIndex === index}
            onClick={() => onClick(index)}
            experience={experience}
          />
        ))}
      </div>
    </div>
  );
});

TimelineContainer.displayName = 'TimelineContainer';
