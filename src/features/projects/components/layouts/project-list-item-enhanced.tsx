'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/shared/badges';
import { ProjectTagList } from '@/features/projects/components/shared/tag-list';
import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import type { Project } from '@/types';

export interface ProjectListItemEnhancedProps {
  project: Project;
  featured?: boolean;
  showCaseStudyBadge?: boolean;
  caseStudyCount?: number;
  onCaseStudyClick?: () => void;
}

export function ProjectListItemEnhanced({
  project,
  featured,
  showCaseStudyBadge = true,
  caseStudyCount = 0,
  onCaseStudyClick,
}: ProjectListItemEnhancedProps) {
  const display = getProjectDisplay(project);
  const isFeatured = display.isFeaturedProject && featured;
  const hasCaseStudies = showCaseStudyBadge && caseStudyCount > 0;

  const content = (
    <div
      className={`border-border/30 group flex flex-col gap-4 border-b px-6 py-5 motion-safe:transition-all motion-safe:duration-200 sm:flex-row sm:items-center ${display.link.isDisabled ? 'bg-muted/10 opacity-75' : 'hover:bg-muted/20 focus-within:ring-ring focus-within:ring-offset-background focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'bg-muted/10' : 'bg-background'}`}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <StatusBadge status={display.status}>{display.status}</StatusBadge>
          <h3
            className={`type-card-title-sm truncate motion-safe:transition-colors ${
              !display.link.isDisabled ? 'group-hover:text-foreground/80' : ''
            }`}
          >
            {display.title}
          </h3>
        </div>
        <p className="type-body-sm line-clamp-2">{display.subtitle}</p>

        {/* Case Study Badge */}
        {hasCaseStudies && (
          <div className="text-brand/80 flex items-center gap-2 pt-1 text-sm">
            <span>📖</span>
            <span className="font-medium">
              {caseStudyCount} case stud{caseStudyCount === 1 ? 'y' : 'ies'}{' '}
              available
            </span>
          </div>
        )}
      </div>

      <ProjectTagList
        tags={display.tags}
        limit={2}
        className="hidden flex-shrink-0 sm:flex"
        overflowLabel="count"
      />

      <div className="flex flex-shrink-0 items-center gap-2">
        {hasCaseStudies && (
          <button
            onClick={onCaseStudyClick}
            className={`type-caption text-brand hover:text-brand/80 hidden font-medium motion-safe:transition-colors motion-safe:duration-200 sm:inline-flex ${
              display.link.isDisabled ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={display.link.isDisabled}
          >
            → Read Study
          </button>
        )}

        <span
          className={`type-caption font-medium ${
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
