'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const buttonClassName =
    'inline-flex size-9 items-center justify-center rounded-md text-foreground/60 transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40';

  return (
    <div className={className}>
      {showDesktop && (
        <div className="hidden items-center gap-4 md:flex">
          <p
            className="text-foreground/60 font-mono text-sm font-medium tabular-nums"
            aria-live="polite"
          >
            {counter}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className={buttonClassName}
              aria-label="Previous slide"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={currentIndex === totalItems - 1}
              className={buttonClassName}
              aria-label="Next slide"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      )}

      {showMobile && (
        <div className="flex items-center justify-center gap-1 md:hidden">
          {Array.from({ length: totalItems }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onDotClick?.(idx)}
              className="focus-visible:ring-ring flex size-8 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === currentIndex ? 'true' : undefined}
            >
              <span
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  idx === currentIndex
                    ? 'bg-foreground w-5'
                    : 'bg-foreground/30 w-1.5',
                )}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
