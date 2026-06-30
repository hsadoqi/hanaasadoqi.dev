'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageGalleryGridProps {
  images: Array<{ src: string; alt: string }>;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ImageGalleryGrid({
  images,
  columns = 2,
  className,
}: ImageGalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns];

  return (
    <>
      {/* Gallery Grid */}
      <div className={cn(`grid ${gridColsClass} gap-4`, className)}>
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative overflow-hidden rounded-lg motion-safe:transition-transform motion-safe:duration-300 hover:motion-safe:scale-105"
            aria-label={`View image ${idx + 1}`}
          >
            <div className="bg-background relative aspect-square w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 motion-safe:transition-colors motion-safe:duration-200">
                <span className="text-2xl text-white opacity-0 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-200">
                  +
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="motion-safe:animate-in motion-safe:fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 motion-safe:duration-200"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-4 right-4 z-50 text-3xl text-white hover:text-white/70 motion-safe:transition-colors motion-safe:duration-200"
            aria-label="Close lightbox"
          >
            ×
          </button>

          <div className="motion-safe:animate-in motion-safe:zoom-in relative max-h-[90vh] w-full max-w-4xl motion-safe:duration-300">
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 90vw"
            />
          </div>

          {/* Navigation */}
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(
                  (selectedIndex - 1 + images.length) % images.length,
                );
              }}
              className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 motion-safe:transition-colors motion-safe:duration-200"
              aria-label="Previous image"
            >
              ←
            </button>

            <span className="rounded bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              {selectedIndex + 1} / {images.length}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((selectedIndex + 1) % images.length);
              }}
              className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 motion-safe:transition-colors motion-safe:duration-200"
              aria-label="Next image"
            >
              →
            </button>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(idx);
                }}
                className={cn(
                  'h-2 rounded-full transition-colors motion-safe:transition-colors motion-safe:duration-200',
                  idx === selectedIndex
                    ? 'w-6 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/70',
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
