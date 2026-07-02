'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], enabled = true) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const [hasReachedSections, setHasReachedSections] = useState(false);

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    let frame = 0;
    function updateReachedState() {
      setHasReachedSections(window.scrollY > sections[0].offsetTop - 180);
      frame = 0;
    }

    function handleScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateReachedState);
    }

    const visibleSections = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        if (visibleSections.size === 0) {
          const nearest = sections.reduce((current, section) => {
            const sectionTop = Math.abs(section.getBoundingClientRect().top);
            const currentTop = Math.abs(current.getBoundingClientRect().top);

            return sectionTop < currentTop ? section : current;
          }, sections[0]);

          setActiveId(nearest.id);
          setHasReachedSections(window.scrollY > sections[0].offsetTop - 180);
          return;
        }

        const [nextActiveId] = [...visibleSections.entries()].sort(
          (a, b) => b[1] - a[1],
        )[0];

        setActiveId(nextActiveId);
        setHasReachedSections(true);
      },
      {
        rootMargin: '-28% 0px -52% 0px',
        threshold: [0.08, 0.2, 0.4, 0.6, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, sectionIds]);

  return {
    activeId: sectionIds.includes(activeId) ? activeId : (sectionIds[0] ?? ''),
    hasReachedSections,
  };
}
