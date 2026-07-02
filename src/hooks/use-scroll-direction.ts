'use client';

import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down';

export function useScrollDirection({
  hideThreshold = 80,
  upDelta = 4,
}: {
  hideThreshold?: number;
  upDelta?: number;
} = {}) {
  const [direction, setDirection] = useState<ScrollDirection>('up');
  const [isNearTop, setIsNearTop] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    function update() {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      setIsNearTop(currentY <= hideThreshold);

      if (currentY <= hideThreshold) {
        setDirection('up');
      } else if (delta > 0) {
        setDirection('down');
      } else if (delta < -upDelta) {
        setDirection('up');
      }

      lastY = currentY;
      frame = 0;
    }

    function handleScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [hideThreshold, upDelta]);

  return {
    direction,
    isNearTop,
    shouldHide: direction === 'down' && !isNearTop,
  };
}
