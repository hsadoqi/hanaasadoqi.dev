'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

const clampIndex = (index: number, total: number) =>
  Math.min(Math.max(index, 0), Math.max(total - 1, 0));

export function useTimeline(total: number, initialIndex = -1) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const prefersReducedMotion = usePrefersReducedMotion();
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollIndexRef = useRef<number | null>(null);

  const setIndex = useCallback(
    (nextIndex: number) => {
      const clamped = clampIndex(nextIndex, total);
      setActiveIndex((currentIndex) =>
        clamped === currentIndex ? currentIndex : clamped,
      );
      pendingScrollIndexRef.current = clamped;
    },
    [total],
  );

  const goToIndex = useCallback((index: number) => setIndex(index), [setIndex]);
  const prev = useCallback(
    () => setIndex(activeIndex - 1),
    [activeIndex, setIndex],
  );
  const next = useCallback(
    () => setIndex(activeIndex + 1),
    [activeIndex, setIndex],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
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
        goToIndex(0);
      }

      if (event.key === 'End') {
        event.preventDefault();
        goToIndex(total - 1);
      }
    },
    [goToIndex, next, prev, total],
  );

  useEffect(() => {
    const container = timelineContainerRef.current;
    const scrollIndex = pendingScrollIndexRef.current;

    if (!container || activeIndex < 0 || scrollIndex === null) return;

    const buttons = Array.from(
      container.querySelectorAll<HTMLButtonElement>('[data-timeline-dot]'),
    );
    const activeButton = buttons[scrollIndex];

    if (!activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    const offset =
      buttonRect.left -
      containerRect.left -
      containerRect.width / 2 +
      buttonRect.width / 2;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const nextScrollLeft = Math.max(
      0,
      Math.min(container.scrollLeft + offset, maxScrollLeft),
    );

    container.scrollTo({
      left: nextScrollLeft,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    pendingScrollIndexRef.current = null;
  }, [activeIndex, prefersReducedMotion]);

  return {
    activeIndex,
    timelineContainerRef,
    handleKeyDown,
    prev,
    next,
    goToIndex,
  };
}
