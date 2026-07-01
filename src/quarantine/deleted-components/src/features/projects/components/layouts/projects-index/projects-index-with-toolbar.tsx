'use client';

import { useMemo } from 'react';

import {
  IndexView,
  type IndexViewFilter,
  type IndexViewSortOption,
  type IndexViewView,
} from '@/components/shared';
import { getProjectDisplay } from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import { ProjectsGrid } from '../projects-grid';
import { ProjectsList } from '../projects-list';

type ProjectsIndexWithToolbarProps = {
  projects: Project[];
};

export function ProjectsIndexWithToolbar({
  projects,
}: ProjectsIndexWithToolbarProps) {
  const filters = useMemo<Array<IndexViewFilter<Project>>>(
    () => [
      {
        id: 'focus',
        label: 'Focus area',
        getValue: (project) => getProjectDisplay(project).focus,
        maxOptions: 10,
        sortOptions: (a, b) =>
          b.count - a.count || a.label.localeCompare(b.label),
      },
    ],
    [],
  );

  const sortOptions = useMemo<Array<IndexViewSortOption<Project>>>(
    () => [
      {
        id: 'featured',
        label: 'Featured',
        compare: (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.title.localeCompare(b.title),
      },
      {
        id: 'name-asc',
        label: 'Name (A-Z)',
        compare: (a, b) => a.title.localeCompare(b.title),
      },
      {
        id: 'name-desc',
        label: 'Name (Z-A)',
        compare: (a, b) => b.title.localeCompare(a.title),
      },
    ],
    [],
  );

  const views = useMemo<Array<IndexViewView<Project>>>(
    () => [
      {
        id: 'grid',
        label: 'Grid',
        render: (items) => <ProjectsGrid projects={items} />,
      },
      {
        id: 'list',
        label: 'List',
        render: (items) => <ProjectsList projects={items} />,
      },
    ],
    [],
  );

  return (
    <IndexView
      defaultSortId="featured"
      defaultViewId="grid"
      description="Browse the complete portfolio of projects, organized by focus area. Each project links to detailed case studies that explore architectural decisions, constraints, and trade-offs."
      emptyState={{
        title: 'No projects found',
        description:
          'Try adjusting your search or filters. You can search by project name, description, or tags.',
      }}
      eyebrow="Portfolio"
      filters={filters}
      itemLabelPlural="projects"
      itemLabelSingular="project"
      items={projects}
      search={{
        label: 'Search projects',
        placeholder: 'Search by title, tech, or focus...',
        getText: (project) => {
          const display = getProjectDisplay(project);
          return [
            display.title,
            display.subtitle,
            display.status,
            ...display.tags,
            ...display.techStack,
          ];
        },
      }}
      sortOptions={sortOptions}
      title="Projects"
      views={views}
    />
  );
}
