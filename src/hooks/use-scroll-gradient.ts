'use client';

import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';

export function useScrollGradient(id: string) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScrollUpdate = () => {
      const scrollElement = document.getElementById(id);
      if (!scrollElement) return;
      const scrollBottom = scrollElement.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (viewportHeight - scrollBottom) / viewportHeight),
      );
      setScrollProgress(progress);
    };

    handleScrollUpdate();

    const unsubscribe = scrollY.on('change', handleScrollUpdate);
    return () => unsubscribe();
  }, [id, scrollY]);

  return scrollProgress;
}
