'use client';

import { projects } from '@/features/projects/data';
import { ProjectCard as CarouselProjectCard } from '../show/carousel-project-card';
import { Section } from '@/components/layout/section';
import { CarouselNav } from '@/features/projects/components/shared/carousel-nav';
import { useCarousel } from '@/hooks/use-carousel';

export function FeaturedWorkSection() {
  const featured = projects.filter((project) => project.featured);
  const other = projects.filter((project) => !project.featured);
  const allProjects = [...featured, ...other];
  const total = allProjects.length;
  const {
    activeIndex,
    handleKeyDown,
    next,
    prev,
    railRef,
    scrollTo,
    showLeftFade,
    showRightFade,
  } = useCarousel(total);

  return (
    <Section
      id="projects"
      header={{
        eyebrow: 'Projects',
        title: 'Featured Work',
        description:
          'Not everything ships. But everything gets thought through. Like, a lot.',
        ctaLinks: [
          {
            label: 'View All',
            link: '/projects',
            variant: 'ghost',
          },
        ],
      }}
      className="overflow-hidden"
    >
      {/* Header with Navigation — desktop */}
      <div className="mb-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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
        className="border-border/20 bg-background/35 focus-visible:ring-ring relative rounded-2xl border py-5 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        {/* Left fade — visible when not at start */}
        {showLeftFade && (
          <div
            className="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent opacity-100 motion-safe:transition-opacity motion-safe:duration-300 sm:w-16 lg:w-20"
            aria-hidden="true"
          />
        )}

        <div
          ref={railRef}
          className="flex snap-x snap-mandatory scroll-px-6 [scrollbar-width:none] gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth px-6 pb-3 [-webkit-overflow-scrolling:touch] sm:scroll-px-8 sm:gap-4 sm:px-8 lg:scroll-px-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
          aria-live="polite"
        >
          {allProjects.map((project, i) => (
            <div
              key={project.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}: ${project.title}`}
              className="flex-none"
            >
              <CarouselProjectCard project={project} />
            </div>
          ))}

          {/* Trailing spacer so last card can snap cleanly */}
          <div
            className="w-1 flex-none shrink-0 sm:w-2 lg:w-4"
            aria-hidden="true"
          />
        </div>

        {/* Right fade — visible when not at end */}
        {showRightFade && (
          <div
            className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-gradient-to-l to-transparent opacity-100 motion-safe:transition-opacity motion-safe:duration-300 sm:w-16 lg:w-20"
            aria-hidden="true"
          />
        )}
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

export { FeaturedWorkSection as ProjectsSection };
