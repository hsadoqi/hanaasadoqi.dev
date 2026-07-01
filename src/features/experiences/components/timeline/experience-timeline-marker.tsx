import { cn } from '@/lib/utils';
import { Experience } from '../../types';

export type ExperienceTimelineMarkerProps = {
  experience: Experience;
  isActive: boolean;
  isAbove: boolean;
  isFocused: boolean;
  onClick: () => void;
  onFocus: () => void;
};

const ACTIVE_SLOT_WIDTH =
  'w-[min(16rem,calc(100vw-8rem))] sm:w-[32rem] lg:w-[40rem]';
const INACTIVE_SLOT_WIDTH = 'w-44 sm:w-52';
const ACTIVE_DOT_CLASS =
  'bg-foreground ring-background ring-offset-background ring-2 ring-offset-[3px] motion-safe:transition-all motion-safe:duration-300 scale-125';
const INACTIVE_DOT_CLASS =
  'bg-border/70 group-hover:bg-foreground/70 group-focus-within:bg-foreground/70 group-hover:scale-125 group-focus-within:scale-125 motion-safe:transition-all motion-safe:duration-300';
const ACTIVE_LABEL_CLASS = 'text-foreground';
const INACTIVE_LABEL_CLASS =
  'text-muted-foreground/75 group-hover:text-foreground group-focus-within:text-foreground motion-safe:transition-colors motion-safe:duration-300';
const ACTIVE_SUBTITLE_CLASS =
  'text-foreground/90 font-semibold tracking-widest uppercase';
const INACTIVE_SUBTITLE_CLASS = 'text-muted-foreground/65';

export const ExperienceTimelineMarker = ({
  experience,
  isActive,
  isAbove,
  isFocused,
  onClick,
  onFocus,
}: ExperienceTimelineMarkerProps) => {
  const slotWidth = isActive ? ACTIVE_SLOT_WIDTH : INACTIVE_SLOT_WIDTH;
  const dotClassName = isActive ? ACTIVE_DOT_CLASS : INACTIVE_DOT_CLASS;
  const labelClassName = isActive ? ACTIVE_LABEL_CLASS : INACTIVE_LABEL_CLASS;
  const subtitleClassName = isActive
    ? ACTIVE_SUBTITLE_CLASS
    : INACTIVE_SUBTITLE_CLASS;
  const titleClassName = isActive
    ? 'block scale-100 opacity-100'
    : 'block opacity-70 transition-[opacity,color] duration-300 group-hover:opacity-100 group-focus-within:opacity-100';

  return (
    <div
      className={cn(
        `group group-hover:text-foreground relative flex h-full min-h-[6rem] shrink-0 cursor-pointer items-center justify-center transition-all duration-300 sm:min-h-[7rem] ${slotWidth}`,
      )}
    >
      <div
        className={`absolute top-1/2 left-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[transform,background,width,color,scale] duration-300 ease-linear ${isActive && 'from-foreground to-brand bg-gradient-to-r'} ${dotClassName}`}
        aria-hidden="true"
      />

      <button
        data-timeline-dot
        type="button"
        onClick={onClick}
        onFocus={onFocus}
        tabIndex={isFocused ? 0 : -1}
        className="focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:shadow-foreground/15 absolute inset-0 z-20 rounded-lg focus-visible:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200"
        aria-label={`${experience.company} — ${experience.title}, ${experience.period}. Press Enter or Space to reveal details.`}
        aria-current={isActive ? 'step' : undefined}
      >
        <div
          className={`absolute top-1/2 left-1/2 z-20 -translate-x-1/2 transition-[transform] duration-300 ${isAbove ? '-translate-y-[calc(100%+1rem)]' : 'translate-y-[1rem]'}`}
        >
          <div
            className={`group-hover:text-foreground flex flex-col gap-1 px-2 text-center whitespace-nowrap transition-all duration-300 ${labelClassName}`}
          >
            <span className="text-xs leading-snug font-semibold sm:text-sm">
              {experience.company}
            </span>
            <span
              className={`text-[10px] leading-snug whitespace-nowrap transition-[transform,opacity,scale] delay-200 duration-500 sm:text-xs ${subtitleClassName} ${titleClassName} text-foreground`}
            >
              {experience.title}
            </span>
            <span
              className={`font-mono text-[9px] leading-snug tracking-wider sm:text-[10px] ${isActive ? 'text-muted-foreground/60' : 'text-muted-foreground/55'}`}
            >
              {experience.period}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};
