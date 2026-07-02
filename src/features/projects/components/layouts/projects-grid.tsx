'use client';

import { ProjectCard } from '../shared/cards/project-card';
import type { Project } from '@/types';

export interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {projects.map((project) => (
        <div key={project.slug} className="mb-6 break-inside-avoid">
          <ProjectCard project={project} featured={project.featured} />
        </div>
      ))}
    </div>
  );
}
