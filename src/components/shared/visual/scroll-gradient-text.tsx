'use client';

import { useRef, useEffect } from 'react';
import { useScrollGradient } from '@/hooks/use-scroll-gradient';
import { cn } from '@/lib/utils';

interface ScrollGradientTextProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ScrollGradientText({
  children,
  className,
  id = 'hero-content',
}: ScrollGradientTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const scrollProgress = useScrollGradient(id);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        '--scroll-ratio',
        `${scrollProgress}`,
      );
    }
  }, [scrollProgress]);

  return (
    <span
      ref={containerRef}
      className={cn(
        'text-scroll-mix motion-safe:transition-colors motion-safe:duration-300',
        className,
      )}
    >
      {children}
    </span>
  );
}
