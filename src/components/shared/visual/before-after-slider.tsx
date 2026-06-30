'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

type BeforeAfterImage = {
  src: string;
  alt: string;
  label?: string;
};

type BeforeAfterSliderProps = {
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  label?: string;
  initialValue?: number;
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  showLabels?: boolean;
};

export function BeforeAfterSlider({
  before,
  after,
  label,
  initialValue = 50,
  className,
  containerClassName,
  imageClassName,
  showLabels = true,
}: BeforeAfterSliderProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div
      className={cn(
        'border-border/40 bg-background relative aspect-video overflow-hidden rounded-xl border',
        containerClassName,
        className,
      )}
    >
      <Image
        src={after.src}
        alt={after.alt}
        fill
        priority={false}
        className={cn('object-cover', imageClassName)}
        sizes="(max-width: 768px) 100vw, 768px"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          priority={false}
          className={cn('object-cover', imageClassName)}
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {showLabels ? (
        <>
          <span className="bg-background/80 text-foreground absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
            {before.label ?? 'Before'}
          </span>
          <span className="bg-background/80 text-foreground absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
            {after.label ?? 'After'}
          </span>
        </>
      ) : null}

      <div
        aria-hidden="true"
        className="bg-foreground/80 pointer-events-none absolute top-0 bottom-0 w-px"
        style={{ left: `${value}%` }}
      >
        <div className="border-border/50 bg-background/90 absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border shadow-sm backdrop-blur">
          <div className="flex gap-1">
            <span className="bg-foreground/40 h-4 w-0.5 rounded-full" />
            <span className="bg-foreground/40 h-4 w-0.5 rounded-full" />
          </div>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-label={label ?? 'Compare before and after images'}
        className="absolute inset-0 z-10 h-full w-full cursor-col-resize opacity-0"
      />
    </div>
  );
}
