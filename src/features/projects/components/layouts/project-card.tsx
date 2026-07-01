'use client';

import { PillList } from '@/components/shared/display/badges';
import { CardMedia } from '@/components/shared/display';
import { prepareIcons } from '@/components/shared/icons/tech-stack';
import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import Link from 'next/link';
import type { ReactNode } from 'react';
import ProjectCardHeader from '@/features/projects/components/shared/project-card-primitives/header';
import ProjectCardFooter from '@/features/projects/components/shared/project-card-primitives/footer';

export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  mediaSrc?: string;
  layout?: 'default' | 'imageFirst' | 'split';
}

export function ProjectCard({
  project,
  featured,
  mediaSrc,
  layout = 'default',
}: ProjectCardProps) {
  const display = getProjectDisplay(project);
  const isFeatured = display.isFeaturedProject && featured;
  const techStackIcons = prepareIcons(project.techStack ?? []);
  const content = (
    <article
      className={`group inline-block w-full overflow-hidden rounded-lg border p-6 shadow-sm motion-safe:transition-all motion-safe:duration-200 ${display.link.isDisabled ? 'border-border/30 bg-card/40 opacity-75' : 'hover:border-border/70 hover:bg-card/80 focus-within:ring-ring focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'border-border/60 bg-card/80' : 'border-border/50 bg-card/60'} h-full`}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      <div
        className={`flex h-full flex-col space-y-4 ${layout === 'split' ? 'md:flex-row md:space-y-0 md:space-x-6' : ''}`}
      >
        {layout === 'imageFirst' && mediaSrc ? (
          <CardMedia src={mediaSrc} alt={display.title} className="mb-4" />
        ) : null}
        <ProjectCardHeader
          title={display.title}
          meta={display.meta}
          subtitle={display.subtitle}
          status={display.status}
          isFeatured={isFeatured}
          techSlot={null}
        />

        {/* Focus Areas */}
        <PillList items={display.focus} limit={2} />

        {display.caseStudyCount > 0 && (
          <div className="border-brand/20 bg-brand/5 text-brand inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
            <span aria-hidden="true">↳</span>
            {display.caseStudyCount}{' '}
            {display.caseStudyCount === 1 ? 'case study' : 'case studies'}
          </div>
        )}

        <div className="flex-1" />
        <ProjectCardFooter
          linkLabel={display.link.label}
          linkDisabled={display.link.isDisabled}
          linkExternal={display.link.isExternal}
          techItems={techStackIcons}
          linkClassName={
            display.link.isDisabled ? undefined : 'group-hover:text-foreground'
          }
          techClassName="transition-[opacity,scale] hover:scale-115 hover:opacity-100 motion-safe:duration-200 motion-safe:ease-linear"
        />
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
