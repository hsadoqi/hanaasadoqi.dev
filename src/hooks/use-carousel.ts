'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from './use-media-query';

export function useCarousel(totalItems: number) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onScroll = () => {
      const children = Array.from(rail.children) as HTMLElement[];
      let closest = 0;
      let minDist = Infinity;

      children.forEach((child, index) => {
        const dist = Math.abs(
          child.getBoundingClientRect().left -
            rail.getBoundingClientRect().left,
        );

        if (dist < minDist) {
          minDist = dist;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    rail.addEventListener('scroll', onScroll, { passive: true });
    return () => rail.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      const rail = railRef.current;
      if (!rail) return;

      const clampedIndex = Math.min(Math.max(index, 0), totalItems - 1);
      const child = rail.children[clampedIndex] as HTMLElement | undefined;
      if (!child) return;

      rail.scrollTo({
        left: child.offsetLeft - rail.offsetLeft,
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
      });
      setActiveIndex(clampedIndex);
    },
    [prefersReducedMotion, totalItems],
  );

  const prev = useCallback(
    () => scrollTo(activeIndex - 1),
    [activeIndex, scrollTo],
  );

  const next = useCallback(
    () => scrollTo(activeIndex + 1),
    [activeIndex, scrollTo],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }

      if (event.key === 'Home') {
        event.preventDefault();
        scrollTo(0);
      }

      if (event.key === 'End') {
        event.preventDefault();
        scrollTo(totalItems - 1);
      }
    },
    [next, prev, scrollTo, totalItems],
  );

  return {
    activeIndex,
    handleKeyDown,
    next,
    prev,
    railRef,
    scrollTo,
    showLeftFade: activeIndex > 0,
    showRightFade: activeIndex < totalItems - 1,
  };
}
