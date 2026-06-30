'use client';

import { ProjectCard } from './project-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { CarouselNav } from '@/features/projects/components/shared/carousel-nav';
import { useCarouselState } from '@/hooks/use-carousel-state';
import type { Project } from '@/types';

export interface ProjectsCarouselProps {
  projects: Project[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const { activeIndex, next, prev, setApi, showLeftFade, showRightFade } =
    useCarouselState(projects.length);

  return (
    <div className="space-y-8">
      <Carousel
        enableWheelScroll
        setApi={setApi}
        opts={{ align: 'start', containScroll: 'trimSnaps' }}
        aria-label="Projects carousel"
        tabIndex={0}
        className="focus-visible:ring-ring relative focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        {showLeftFade && (
          <div className="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent motion-safe:transition-opacity motion-safe:duration-300 sm:w-16 lg:w-20" />
        )}

        <CarouselContent className="ml-0 gap-6 pb-3" aria-live="polite">
          {projects.map((project, i) => (
            <CarouselItem
              key={project.slug}
              aria-label={`${i + 1} of ${projects.length}: ${project.title}`}
              className="basis-full pl-0 sm:basis-[520px]"
            >
              <ProjectCard project={project} featured={project.featured} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {showRightFade && (
          <div className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-gradient-to-l to-transparent motion-safe:transition-opacity motion-safe:duration-300 sm:w-16 lg:w-20" />
        )}
      </Carousel>

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
