'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { FeaturedBadge } from '@/components/shared/badges/featured-badge';
import { StatusBadge } from '@/components/shared/badges';
import { ProjectTagList } from '@/features/projects/components/shared/tag-list';
import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import { BeforeAfterSlider } from '@/components/shared/visual/before-after-slider';

export interface ProjectCardImageSplitProps {
  project: Project;
  featured?: boolean;
  splitLabel?: string;
}

export function ProjectCardImageSplit({
  project,
  featured,
  splitLabel = 'Before / After',
}: ProjectCardImageSplitProps) {
  const display = getProjectDisplay(project);
  const isFeatured = display.isFeaturedProject && featured;
  const images = project.images || [];

  // Need at least 2 images for before/after
  const beforeImage = images[0];
  const afterImage = images[1];
  const hasBeforeAfter = beforeImage && afterImage;

  if (!hasBeforeAfter) {
    // Fallback to standard card if not enough images
    return (
      <article
        className={`group inline-block w-full overflow-hidden rounded-lg border p-6 shadow-sm motion-safe:transition-all motion-safe:duration-200 ${display.link.isDisabled ? 'border-border/30 bg-card/40 opacity-75' : 'hover:border-border/70 hover:bg-card/80 focus-within:ring-ring focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'border-border/60 bg-card/80' : 'border-border/50 bg-card/60'}`}
        aria-label={`${display.title}: ${display.link.label}`}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <StatusBadge status={display.status}>{display.status}</StatusBadge>
            {isFeatured && <FeaturedBadge status={display.status} />}
          </div>

          <div className="space-y-2">
            <h3 className="type-card-title-sm">{display.title}</h3>
            <p className="type-body-sm">{display.subtitle}</p>
          </div>

          <ProjectTagList tags={display.focus} limit={2} />

          <ProjectTagList
            tags={display.techStack}
            variant="tech"
            limit={3}
            className="pt-2"
          />

          <span className="type-caption text-foreground/60 inline-flex font-medium">
            {display.link.label}
            {!display.link.isDisabled && <span className="ml-1">→</span>}
          </span>
        </div>
      </article>
    );
  }

  const content = (
    <article
      className={`group inline-block w-full overflow-hidden rounded-lg border shadow-sm motion-safe:transition-all motion-safe:duration-200 ${display.link.isDisabled ? 'border-border/30 bg-card/40 opacity-75' : 'hover:border-border/70 focus-within:ring-ring focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'border-border/60 bg-card/80' : 'border-border/50 bg-card/60'}`}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      {/* Before/After Slider */}
      <div className="relative">
        <BeforeAfterSlider
          before={beforeImage}
          after={afterImage}
          label={splitLabel}
          containerClassName="w-full"
          className="relative h-48 w-full"
        />
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <StatusBadge status={display.status}>{display.status}</StatusBadge>
          {isFeatured && <FeaturedBadge status={display.status} />}
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h3
            className={`type-card-title-sm motion-safe:transition-colors ${
              !display.link.isDisabled ? 'group-hover:text-foreground/80' : ''
            }`}
          >
            {display.title}
          </h3>
          <p className="type-body-sm">{display.subtitle}</p>
        </div>

        {/* Impact Badge */}
        <div className="text-brand/80 pt-2 text-sm font-medium">
          ✨ See the difference
        </div>

        {/* Focus Areas */}
        <ProjectTagList tags={display.focus} limit={2} />

        {/* Tech Stack */}
        <ProjectTagList
          tags={display.techStack}
          variant="tech"
          limit={3}
          className="pt-2"
        />

        <span
          className={`type-caption inline-flex font-medium motion-safe:transition-colors motion-safe:duration-200 ${
            display.link.isDisabled
              ? 'text-muted-foreground/50'
              : 'text-foreground/60 group-hover:text-foreground'
          }`}
        >
          {display.link.label}
          {!display.link.isDisabled && (
            <span aria-hidden="true" className="ml-1">
              {display.link.isExternal ? '↗' : '→'}
            </span>
          )}
        </span>
      </div>
    </article>
  );

  return <ProjectCardLink link={display.link}>{content}</ProjectCardLink>;
}

function ProjectCardLink({
  children,
  link,
}: {
  children: ReactNode;
  link: ProjectLink;
}) {
  if (link.isDisabled) return children;

  if (link.isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:ring-ring block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className="focus-visible:ring-ring block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}
