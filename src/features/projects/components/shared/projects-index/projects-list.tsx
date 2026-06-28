'use client';

import type { Project } from '@/types';
import { ProjectListItem } from './project-list-item';

export interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="border-border/30 overflow-hidden rounded-lg border">
      {projects.map((project) => {
        return (
          <ProjectListItem
            key={project.slug}
            project={project}
            featured={project.featured}
          />
        );
      })}
    </div>
  );
}
