'use client';

import { ProjectCard } from './project-card';
import type { Project } from '@/types';

export interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          featured={project.featured}
        />
      ))}
    </div>
  );
}
