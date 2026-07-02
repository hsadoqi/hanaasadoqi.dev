'use client';

import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ProjectCardHeader, ProjectCardFooter } from './cards';
import { ProjectChipRail } from './project-chip-rail';

export interface ProjectListItemProps {
  project: Project;
  featured?: boolean;
}

export function ProjectListItem({ project, featured }: ProjectListItemProps) {
  const display = getProjectDisplay(project);
  const isFeatured = display.isFeaturedProject && featured;
  const content = (
    <div
      className={`border-border/30 group flex flex-col gap-3 border-b px-6 py-5 motion-safe:transition-all motion-safe:duration-200 lg:flex-row lg:items-start lg:gap-4 ${display.link.isDisabled ? 'bg-muted/10 opacity-75' : 'hover:bg-muted/20 focus-within:ring-ring focus-within:ring-offset-background focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'bg-muted/10' : 'bg-background'} `}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      <div className="min-w-0 flex-1 space-y-3">
        <ProjectCardHeader
          title={display.title}
          meta={display.meta}
          subtitle={display.subtitle}
          status={display.status}
          showBadges={false}
          titleClassName={
            !display.link.isDisabled ? 'group-hover:text-foreground/80' : ''
          }
          subtitleClassName="line-clamp-2"
        />

        <ProjectChipRail
          status={display.status}
          isFeatured={isFeatured}
          caseStudyCount={display.caseStudyCount}
          tags={display.tags}
          compactCaseStudyLabel
        />
      </div>

      <ProjectCardFooter
        linkLabel={display.link.label}
        linkDisabled={display.link.isDisabled}
        linkExternal={display.link.isExternal}
        className="lg:w-32 lg:justify-end lg:text-right"
        linkClassName={
          display.link.isDisabled ? undefined : 'group-hover:text-foreground'
        }
      />
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
