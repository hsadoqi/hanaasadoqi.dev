'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { featured, studies } from '@/data/projects-data';
import { FeaturedCaseStudy } from './featured-case-study';
import { CaseStudyCard } from './case-study-card';
import { Section, SectionHeader } from '@/components/layout/section';
import { CarouselNav } from '@/components/shared/carousel-nav';
import '@/styles/status.css';

const allProjects = [featured, ...studies];
const total = allProjects.length;
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

export function CaseStudiesSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  // Sync active index from scroll position
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onScroll = () => {
      const children = Array.from(rail.children) as HTMLElement[];
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(
          child.getBoundingClientRect().left -
            rail.getBoundingClientRect().left,
        );
        if (dist < minDist) {
          minDist = dist;
          closest = i;
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
      const child = rail.children[index] as HTMLElement;
      if (!child) return;
      const left = child.offsetLeft - rail.offsetLeft;
      rail.scrollTo({
        left,
        behavior: prefersReducedMotion ? 'instant' : 'smooth',
      });
      setActiveIndex(index);
    },
    [prefersReducedMotion],
  );

  const prev = useCallback(
    () => scrollTo(Math.max(0, activeIndex - 1)),
    [activeIndex, scrollTo],
  );
  const next = useCallback(
    () => scrollTo(Math.min(total - 1, activeIndex + 1)),
    [activeIndex, scrollTo],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        scrollTo(0);
      }
      if (e.key === 'End') {
        e.preventDefault();
        scrollTo(total - 1);
      }
    },
    [prev, next, scrollTo],
  );

  return (
    <Section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="overflow-hidden border-t py-20 sm:py-28"
    >
      {/* Header with Navigation — desktop */}
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          id="case-studies-heading"
          eyebrow="Case Studies"
          title="Featured Work"
          description="Some solved problems. Others created new ones..."
        />
        <div className="hidden sm:block">
          <CarouselNav
            currentIndex={activeIndex}
            totalItems={total}
            onPrevious={prev}
            onNext={next}
            layout="desktop"
          />
        </div>
      </div>

      {/* Carousel rail */}
      <div
        role="region"
        aria-label="Projects carousel"
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        <div
          ref={railRef}
          className="flex snap-x snap-mandatory scroll-px-6 [scrollbar-width:none] gap-3 overflow-x-auto scroll-smooth px-6 pb-3 [-webkit-overflow-scrolling:touch] sm:scroll-px-8 sm:gap-4 sm:px-8 lg:scroll-px-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
          aria-live="polite"
        >
          {/* Featured card */}
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`1 of ${total}: ${featured.title} (featured)`}
            className="flex-none"
          >
            <FeaturedCaseStudy featured={featured} />
          </div>

          {/* Secondary cards */}
          {studies.map((study, i) => (
            <div
              key={study.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 2} of ${total}: ${study.title}`}
              className="flex-none"
            >
              <CaseStudyCard study={study} index={i} />
            </div>
          ))}

          {/* Trailing spacer so last card can snap cleanly */}
          <div
            className="w-6 flex-none shrink-0 sm:w-8 lg:w-12"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Navigation — mobile (below rail) */}
      <div className="mt-6 px-6 sm:hidden">
        <CarouselNav
          currentIndex={activeIndex}
          totalItems={total}
          onPrevious={prev}
          onNext={next}
          onDotClick={scrollTo}
          layout="mobile"
          className="flex justify-center"
        />
      </div>
    </Section>
  );
}
