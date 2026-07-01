'use client';

import { PillList } from '@/components/shared/display/badges';
import { StatusBadge } from '@/components/shared/display/badges';
import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import Link from 'next/link';
import type { ReactNode } from 'react';
import ProjectCardHeader from '@/features/projects/components/shared/project-card-primitives/header';
import ProjectCardFooter from '@/features/projects/components/shared/project-card-primitives/footer';

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
          <div className="flex min-w-0 items-start gap-2">
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
            {display.caseStudyCount > 0 && (
              <span className="border-brand/20 bg-brand/5 text-brand inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium">
                {display.caseStudyCount}{' '}
                {display.caseStudyCount === 1 ? 'study' : 'studies'}
              </span>
            )}
          </div>
          <StatusBadge status={display.status}>{display.status}</StatusBadge>
        </div>
      </div>

      <PillList
        items={display.tags}
        limit={2}
        className="hidden flex-shrink-0 lg:flex"
        overflowLabel="count"
      />

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
