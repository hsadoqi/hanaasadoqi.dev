'use client';

import { ProjectCard } from './project-card';
import { CarouselNav } from '@/features/projects/components/shared/carousel-nav';
import { useCarousel } from '@/hooks/use-carousel';
import type { Project } from '@/types';

export interface ProjectsCarouselProps {
  projects: Project[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const {
    activeIndex,
    handleKeyDown,
    next,
    prev,
    railRef,
    showLeftFade,
    showRightFade,
  } = useCarousel(projects.length);

  return (
    <div className="space-y-8">
      {/* Carousel */}
      <div
        role="region"
        aria-label="Projects carousel"
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="focus-visible:ring-ring relative focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        {showLeftFade && (
          <div className="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent motion-safe:transition-opacity motion-safe:duration-300 sm:w-16 lg:w-20" />
        )}

        <div
          ref={railRef}
          className="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth px-0 pb-3 [&::-webkit-scrollbar]:hidden"
          aria-live="polite"
        >
          {projects.map((project, i) => (
            <div
              key={project.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${projects.length}: ${project.title}`}
              className="w-full flex-none snap-start sm:w-[520px]"
            >
              <ProjectCard project={project} featured={project.featured} />
            </div>
          ))}
        </div>

        {showRightFade && (
          <div className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-gradient-to-l to-transparent motion-safe:transition-opacity motion-safe:duration-300 sm:w-16 lg:w-20" />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <CarouselNav
          currentIndex={activeIndex}
          totalItems={projects.length}
          onPrevious={prev}
          onNext={next}
          layout="desktop"
        />
      </div>
    </div>
  );
}
