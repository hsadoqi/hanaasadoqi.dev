'use client';

import { Section } from '@/components/layout/section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { CarouselNav } from '@/features/projects/components/shared/carousel-nav';
import { projects } from '@/features/projects/data';
import { useCarouselState } from '@/hooks/use-carousel-state';
import Link from 'next/link';
import { FeaturedProjectCard } from '../show/featured-project-card';

export function FeaturedWorkSection() {
  const featured = projects.filter((project) => project.featured);
  const other = projects.filter((project) => !project.featured);
  const allProjects = [...featured, ...other];
  const total = allProjects.length;
  const {
    activeIndex,
    next,
    prev,
    scrollTo,
    setApi,
    showLeftFade,
    showRightFade,
  } = useCarouselState(total);

  if (total === 0) {
    return (
      <Section
        id="projects"
        header={{
          eyebrow: 'Projects',
          title: 'Featured Work',
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
        <div className="border-border/35 bg-background/45 shadow-elevation-1 rounded-xl border p-6 sm:p-8">
          <p className="type-eyebrow mb-3">In progress</p>
          <p className="type-body max-w-2xl">
            I am still writing the project pages, so unfinished work is hidden
            from the public portfolio for now.
          </p>
          <Link
            href="/"
            className="type-caption text-foreground/60 hover:text-foreground mt-5 inline-flex font-medium motion-safe:transition-colors"
          >
            Back to home <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="projects"
      header={{
        eyebrow: 'Projects',
        title: 'Featured Work',
        description:
          'Selected systems, product workflows, and case studies shaped by careful front-end and product engineering.',
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
      <p id="projects-carousel-instructions" className="sr-only">
        Use horizontal scrolling, arrow keys, or carousel controls to browse
        featured work.
      </p>

      <div className="mb-5 hidden justify-end md:flex">
        <CarouselNav
          currentIndex={activeIndex}
          totalItems={total}
          onPrevious={prev}
          onNext={next}
          layout="desktop"
        />
      </div>

      <Carousel
        enableWheelScroll
        setApi={setApi}
        opts={{ align: 'start', containScroll: 'trimSnaps' }}
        aria-label="Projects carousel"
        aria-describedby="projects-carousel-instructions"
        tabIndex={0}
        className="focus-visible:ring-ring relative -mx-4 py-2 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset sm:-mx-8 lg:-mx-10"
      >
        {showLeftFade && (
          <div
            className="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent opacity-100 motion-safe:transition-opacity motion-safe:duration-300 sm:w-16 lg:w-20"
            aria-hidden="true"
          />
        )}

        <CarouselContent
          className="ml-0 gap-3 px-8 pb-3 sm:gap-4 sm:px-10 lg:px-12"
          aria-live="polite"
        >
          {allProjects.map((project, i) => (
            <CarouselItem
              key={project.title}
              aria-label={`${i + 1} of ${total}: ${project.title}`}
              className="basis-auto pl-0"
            >
              <FeaturedProjectCard featured={project} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {showRightFade && (
          <div
            className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-gradient-to-l to-transparent opacity-100 motion-safe:transition-opacity motion-safe:duration-300 sm:w-16 lg:w-20"
            aria-hidden="true"
          />
        )}
      </Carousel>

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
