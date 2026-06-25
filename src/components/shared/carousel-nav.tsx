'use client';

import React from 'react';

interface CarouselNavProps {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick?: (index: number) => void;
  layout?: 'desktop' | 'mobile' | 'both';
  className?: string;
}

export function CarouselNav({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  onDotClick,
  layout = 'both',
  className = '',
}: CarouselNavProps) {
  const showDesktop = layout === 'desktop' || layout === 'both';
  const showMobile = layout === 'mobile' || layout === 'both';

  const counter = `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalItems).padStart(2, '0')}`;

  return (
    <div className={className}>
      {/* Desktop Nav: Counter + Chevrons */}
      {showDesktop && (
        <div className="hidden items-center gap-4 md:flex">
          <p className="text-foreground/60 font-mono text-sm font-medium tabular-nums">
            {counter}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="border-border/50 text-foreground hover:border-border hover:bg-muted/30 disabled:hover:border-border/50 flex h-10 w-10 items-center justify-center rounded-lg border transition-colors disabled:opacity-25 disabled:hover:bg-transparent motion-safe:duration-200"
              aria-label="Previous project"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline
                  points="15 18 9 12 15 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={onNext}
              disabled={currentIndex === totalItems - 1}
              className="border-border/50 text-foreground hover:border-border hover:bg-muted/30 disabled:hover:border-border/50 flex h-10 w-10 items-center justify-center rounded-lg border transition-colors disabled:opacity-25 disabled:hover:bg-transparent motion-safe:duration-200"
              aria-label="Next project"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline
                  points="9 18 15 12 9 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Nav: Dots + Counter + Chevrons */}
      {showMobile && (
        <div className="flex flex-col items-center gap-3 md:hidden">
          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalItems }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onDotClick?.(idx)}
                className={`rounded-full transition-all motion-safe:duration-300 ${
                  idx === currentIndex
                    ? 'bg-foreground h-1 w-3'
                    : 'bg-foreground/30 hover:bg-foreground/50 h-1 w-1'
                }`}
                aria-label={`Go to project ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Counter + Chevrons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="text-foreground hover:bg-muted/30 flex h-9 w-9 items-center justify-center rounded transition-colors disabled:opacity-25 motion-safe:duration-200"
              aria-label="Previous project"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline
                  points="15 18 9 12 15 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="text-foreground/60 font-mono text-[11px] font-medium tabular-nums">
              {counter}
            </p>

            <button
              onClick={onNext}
              disabled={currentIndex === totalItems - 1}
              className="text-foreground hover:bg-muted/30 flex h-9 w-9 items-center justify-center rounded transition-colors disabled:opacity-25 motion-safe:duration-200"
              aria-label="Next project"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline
                  points="9 18 15 12 9 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
