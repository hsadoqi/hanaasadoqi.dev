'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageCarouselOnHoverProps {
  images: Array<{ src: string; alt: string }>;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function ImageCarouselOnHover({
  images,
  alt,
  className,
  containerClassName,
}: ImageCarouselOnHoverProps) {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((current - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((current + 1) % images.length);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-lg', containerClassName)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Image */}
      <div className={cn('bg-background relative w-full', className)}>
        <Image
          src={images[current].src}
          alt={images[current].alt || alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Hover Carousel Controls */}
      {images.length > 1 && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-between bg-black/30 p-4 transition-opacity duration-300',
            isHovering ? 'opacity-100' : 'opacity-0',
          )}
        >
          <button
            onClick={handlePrev}
            className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 motion-safe:transition-colors motion-safe:duration-200"
            aria-label="Previous image"
          >
            ←
          </button>

          <div className="flex flex-col items-center gap-2">
            <span className="rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white">
              {current + 1} / {images.length}
            </span>
            {images.length > 2 && (
              <div className="flex gap-1">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrent(idx);
                    }}
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-colors',
                      idx === current ? 'bg-white' : 'bg-white/50',
                    )}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 motion-safe:transition-colors motion-safe:duration-200"
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
