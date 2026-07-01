'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FeaturedBadge } from '@/components/shared/badges/featured-badge';
import { StatusBadge } from '@/components/shared/badges';
import { ProjectTagList } from '@/features/projects/components/shared/tag-list';
import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import { ImageGalleryGrid } from '@/components/shared/images/image-gallery-grid';

export interface ProjectCardImageFirstProps {
  project: Project;
  featured?: boolean;
  imageLayout?: 'hero' | 'gallery';
}

export function ProjectCardImageFirst({
  project,
  featured,
  imageLayout = 'hero',
}: ProjectCardImageFirstProps) {
  const display = getProjectDisplay(project);
  const isFeatured = display.isFeaturedProject && featured;
  const images = project.images || [];
  const primaryImage = images[0];
  const secondaryImages = images.slice(1, 3);

  const content = (
    <article
      className={`group inline-block w-full overflow-hidden rounded-lg border shadow-sm motion-safe:transition-all motion-safe:duration-200 ${display.link.isDisabled ? 'border-border/30 bg-card/40 opacity-75' : 'hover:border-border/70 focus-within:ring-ring focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'border-border/60 bg-card/80' : 'border-border/50 bg-card/60'}`}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      {/* Hero Image */}
      {primaryImage && (
        <div className="bg-background relative h-48 overflow-hidden">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt || display.title}
            fill
            className="object-cover group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

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

        {/* Secondary Images Grid */}
        {imageLayout === 'gallery' && secondaryImages.length > 0 && (
          <div className="border-border/30 mt-4 border-t pt-4">
            <p className="type-caption text-muted-foreground mb-3">
              Additional visuals
            </p>
            <ImageGalleryGrid
              images={secondaryImages}
              columns={2}
              className="aspect-video"
            />
          </div>
        )}

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
              ? 'text-subtle-content'
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
