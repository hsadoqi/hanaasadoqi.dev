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

export interface ProjectListItemProps {
  project: Project;
  featured?: boolean;
}

export function ProjectListItem({ project, featured }: ProjectListItemProps) {
  const display = getProjectDisplay(project);
  const isFeatured = display.isFeaturedProject && featured;
  const content = (
    <div
      className={`border-border/30 group flex flex-col gap-4 border-b px-6 py-5 motion-safe:transition-all motion-safe:duration-200 sm:flex-row sm:items-center ${display.link.isDisabled ? 'bg-muted/10 opacity-75' : 'hover:bg-muted/20 focus-within:ring-ring focus-within:ring-offset-background focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'bg-muted/10' : 'bg-background'} `}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <StatusBadge status={display.status}>{display.status}</StatusBadge>
          <h3
            className={`text-foreground truncate text-base font-semibold motion-safe:transition-colors ${
              !display.link.isDisabled ? 'group-hover:text-foreground/80' : ''
            }`}
          >
            {display.title}
          </h3>
        </div>
        <p className="text-muted-foreground/70 line-clamp-2 text-sm leading-relaxed">
          {display.subtitle}
        </p>
      </div>

      <ProjectTagList
        tags={display.tags}
        limit={2}
        className="hidden flex-shrink-0 sm:flex"
        overflowLabel="count"
      />

      <span
        className={`text-xs font-medium sm:w-32 sm:text-right ${
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
