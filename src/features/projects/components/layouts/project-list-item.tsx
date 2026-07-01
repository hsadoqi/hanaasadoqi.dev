'use client';

import { StatusBadge } from '@/components/shared/badges';
import { ProjectTagList } from '@/features/projects/components/shared/tag-list';
import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import Link from 'next/link';
import type { ReactNode } from 'react';

export interface ProjectListItemProps {
  project: Project;
  featured?: boolean;
}

export function ProjectListItem({ project, featured }: ProjectListItemProps) {
  const display = getProjectDisplay(project);
  const isFeatured = display.isFeaturedProject && featured;
  const content = (
    <div
      className={`border-border/30 group flex flex-col gap-3 border-b px-6 py-5 motion-safe:transition-all motion-safe:duration-200 lg:flex-row lg:items-center lg:gap-4 ${display.link.isDisabled ? 'bg-muted/10 opacity-75' : 'hover:bg-muted/20 focus-within:ring-ring focus-within:ring-offset-background focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'bg-muted/10' : 'bg-background'} `}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap justify-between gap-2 sm:items-center sm:gap-3">
          <div className="flex items-center gap-2">
            <h3
              className={`type-card-title-sm motion-safe:transition-colors ${
                !display.link.isDisabled ? 'group-hover:text-foreground/80' : ''
              }`}
            >
              {display.title}
            </h3>
            {display.caseStudyCount > 0 && (
              <span className="border-brand/20 bg-brand/5 text-brand inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium">
                {display.caseStudyCount}{' '}
                {display.caseStudyCount === 1 ? 'study' : 'studies'}
              </span>
            )}
          </div>
          <StatusBadge status={display.status}>{display.status}</StatusBadge>
        </div>
        {display.meta && (
          <p className="type-caption text-muted-foreground">{display.meta}</p>
        )}
        <p className="type-body-sm line-clamp-2">{display.subtitle}</p>
      </div>

      <ProjectTagList
        tags={display.tags}
        limit={2}
        className="hidden flex-shrink-0 lg:flex"
        overflowLabel="count"
      />

      <span
        className={`type-caption font-medium lg:w-32 lg:text-right ${
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
  );

  return (
    <ProjectListItemLink link={display.link}>{content}</ProjectListItemLink>
  );
}

function ProjectListItemLink({
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
        className="focus-visible:ring-ring block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={link.href}
      className="focus-visible:ring-ring block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}
