'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

const clampIndex = (index: number, total: number) =>
  Math.min(Math.max(index, 0), Math.max(total - 1, 0));

export function useTimeline(total: number, initialIndex = -1) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [focusedIndex, setFocusedIndex] = useState(clampIndex(0, total));
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const hasAutoOpenedRef = useRef(initialIndex >= 0);
  const pendingScrollIndexRef = useRef<number | null>(null);
  const pendingFocusIndexRef = useRef<number | null>(null);

  const setIndex = useCallback(
    (nextIndex: number) => {
      const clamped = clampIndex(nextIndex, total);
      setActiveIndex((currentIndex) =>
        clamped === currentIndex ? currentIndex : clamped,
      );
      setFocusedIndex(clamped);
      pendingScrollIndexRef.current = clamped;
      pendingFocusIndexRef.current = clamped;
    },
    [total],
  );

  const goToIndex = useCallback((index: number) => setIndex(index), [setIndex]);
  const prev = useCallback(() => {
    if (activeIndex < 0) return;
    setIndex(activeIndex - 1);
  }, [activeIndex, setIndex]);
  const next = useCallback(
    () => setIndex(activeIndex < 0 ? 0 : activeIndex + 1),
    [activeIndex, setIndex],
  );

  const handleFocusIndex = useCallback(
    (index: number) => setFocusedIndex(clampIndex(index, total)),
    [total],
  );

  const handleTimelineKey = useCallback(
    (key: string) => {
      if (key === 'ArrowLeft' || key === 'ArrowUp') {
        if (activeIndex < 0) return true;
        setIndex(activeIndex - 1);
        return true;
      }

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        setIndex(activeIndex < 0 ? 0 : activeIndex + 1);
        return true;
      }

      if (key === 'Home') {
        setIndex(0);
        return true;
      }

      if (key === 'End') {
        setIndex(total - 1);
        return true;
      }

      if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
        setIndex(focusedIndex);
        return true;
      }

      return false;
    },
    [activeIndex, focusedIndex, setIndex, total],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const target = event.target;
      const isTimelineControl =
        target instanceof HTMLElement && target.closest('[data-timeline-dot]');

      if (!isTimelineControl) return;

      if (handleTimelineKey(event.key)) {
        event.preventDefault();
      }
    },
    [handleTimelineKey],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isActive =
          entry.isIntersecting && entry.intersectionRatio >= 0.45;

        if (isActive && !hasAutoOpenedRef.current && total > 0) {
          hasAutoOpenedRef.current = true;
          setActiveIndex(0);
          setFocusedIndex(0);
          pendingScrollIndexRef.current = 0;
        }
      },
      { threshold: [0, 0.45, 0.7] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [total]);

  useEffect(() => {
    const container = timelineContainerRef.current;
    const scrollIndex = pendingScrollIndexRef.current;

    if (!container || scrollIndex === null) return;

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
  }, [activeIndex, focusedIndex, prefersReducedMotion]);

  useEffect(() => {
    const container = timelineContainerRef.current;
    const focusIndex = pendingFocusIndexRef.current;

    if (!container || focusIndex === null) return;

    const buttons = Array.from(
      container.querySelectorAll<HTMLButtonElement>('[data-timeline-dot]'),
    );
    const focusButton = buttons[focusIndex];

    focusButton?.focus();
    pendingFocusIndexRef.current = null;
  }, [focusedIndex]);

  return {
    activeIndex,
    focusedIndex,
    sectionRef,
    timelineContainerRef,
    handleKeyDown,
    handleFocusIndex,
    prev,
    next,
    goToIndex,
  };
}
