'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  label?: string;
  className?: string;
  containerClassName?: string;
}

export function BeforeAfterSlider({
  before,
  after,
  label,
  className,
  containerClassName,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
      setPosition(Math.max(0, Math.min(100, newPosition)));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const newPosition = ((touch.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'group relative cursor-col-resize overflow-hidden rounded-lg',
        containerClassName,
      )}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
    >
      <div className={cn('bg-background relative w-full', className)}>
        <Image
          src={after.src}
          alt={after.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div
        className={cn('absolute inset-0 overflow-hidden', className)}
        style={{ width: `${position}%` }}
      >
        <div
          className="relative h-full w-full"
          style={{ width: `${100 / (position / 100)}%` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 cursor-col-resize bg-white group-hover:w-1.5 motion-safe:transition-all motion-safe:duration-200"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg">
          <div className="flex gap-1">
            <div className="h-4 w-0.5 bg-black/30" />
            <div className="h-4 w-0.5 bg-black/30" />
          </div>
        </div>
      </div>

      {/* Labels */}
      {label && (
        <>
          <div className="absolute top-4 left-4 rounded bg-black/50 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            Before
          </div>
          <div className="absolute top-4 right-4 rounded bg-black/50 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            After
          </div>
        </>
      )}
    </div>
  );
}
