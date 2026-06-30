'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HorizontalImageCarouselProps {
  images: Array<{ src: string; alt: string }>;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  className?: string;
  containerClassName?: string;
}

export function HorizontalImageCarousel({
  images,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
  className,
  containerClassName,
}: HorizontalImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageCount = images?.length ?? 0;

  useEffect(() => {
    if (!autoAdvance || isPaused || imageCount <= 1) return;

    const interval = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % imageCount);
    }, autoAdvanceInterval);

    return () => window.clearInterval(interval);
  }, [autoAdvance, autoAdvanceInterval, imageCount, isPaused]);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrent((previous) => (previous - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrent((previous) => (previous + 1) % images.length);
  };

  const goToSlide = (idx: number) => {
    setCurrent(idx);
  };

  return (
    <div
      ref={carouselRef}
      className={cn(
        'group relative overflow-hidden rounded-lg',
        containerClassName,
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) {
          setIsPaused(false);
        }
      }}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform ease-out motion-safe:duration-500"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((image, idx) => (
            <div key={idx} className={cn('min-w-full', className)}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 motion-safe:transition-all motion-safe:duration-300"
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 motion-safe:transition-all motion-safe:duration-300"
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 opacity-0 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                'rounded-full transition-all motion-safe:transition-all motion-safe:duration-300',
                idx === current
                  ? 'h-1.5 w-6 bg-white'
                  : 'h-1.5 w-1.5 bg-white/50 hover:bg-white/70',
              )}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 rounded bg-black/50 px-3 py-1.5 text-sm font-medium text-white opacity-0 backdrop-blur-sm group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
