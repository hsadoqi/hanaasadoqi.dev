'use client';

import { StatusBadge } from '@/components/shared/badges';
import { FeaturedBadge } from '@/components/shared/badges/featured-badge';
import { prepareIcons } from '@/components/shared/icons/tech-stack';
import { ProjectTagList } from '@/features/projects/components/shared/tag-list';
import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { TechStackIcons } from '@/components/shared/icons/tech-stack';

export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured }: ProjectCardProps) {
  const display = getProjectDisplay(project);
  const isFeatured = display.isFeaturedProject && featured;
  const techStackIcons = prepareIcons(project.techStack ?? []);
  const content = (
    <article
      className={`group inline-block w-full overflow-hidden rounded-lg border p-6 shadow-sm motion-safe:transition-all motion-safe:duration-200 ${display.link.isDisabled ? 'border-border/30 bg-card/40 opacity-75' : 'hover:border-border/70 hover:bg-card/80 focus-within:ring-ring focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'border-border/60 bg-card/80' : 'border-border/50 bg-card/60'} h-full`}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      <div className="flex h-full flex-col space-y-4">
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
          {display.meta && (
            <p className="type-caption text-muted-foreground">{display.meta}</p>
          )}
          <p className="type-body-sm">{display.subtitle}</p>
        </div>

        {/* Focus Areas */}
        <ProjectTagList tags={display.focus} limit={2} />

        {/* Tech Stack */}
        {/* <ProjectTagList
          tags={display.techStack}
          variant="tech"
          limit={3}
          className="pt-2"
        /> */}
        {display.caseStudyCount > 0 && (
          <div className="border-brand/20 bg-brand/5 text-brand inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
            <span aria-hidden="true">↳</span>
            {display.caseStudyCount}{' '}
            {display.caseStudyCount === 1 ? 'case study' : 'case studies'}
          </div>
        )}

        <div className="flex-1" />
        <div className="flex items-center justify-between gap-2">
          <span
            className={`type-caption inline-flex font-medium ${
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
          <TechStackIcons
            items={techStackIcons}
            className="opacity-70 transition-[opacity,scale] hover:scale-115 hover:opacity-100 motion-safe:duration-200 motion-safe:ease-linear"
          />
        </div>
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
