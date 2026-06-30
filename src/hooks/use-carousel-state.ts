'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

export function useCarouselState(totalItems: number) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(totalItems > 0 ? 0 : -1);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(totalItems > 1);

  const updateState = useCallback(() => {
    if (!api || totalItems <= 0) {
      setActiveIndex(totalItems > 0 ? 0 : -1);
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    setActiveIndex(Math.min(api.selectedScrollSnap(), totalItems - 1));
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api, totalItems]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateState);

    if (!api) {
      return () => window.cancelAnimationFrame(frame);
    }

    api.on('select', updateState);
    api.on('reInit', updateState);

    return () => {
      window.cancelAnimationFrame(frame);
      api.off('select', updateState);
      api.off('reInit', updateState);
    };
  }, [api, updateState]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!api || totalItems <= 0) return;

      api.scrollTo(Math.min(Math.max(index, 0), totalItems - 1));
    },
    [api, totalItems],
  );

  const prev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const next = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return {
    activeIndex,
    canScrollNext,
    canScrollPrev,
    next,
    prev,
    scrollTo,
    setApi,
    showLeftFade: canScrollPrev,
    showRightFade: canScrollNext,
  };
}
