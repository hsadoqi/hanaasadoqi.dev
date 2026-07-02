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
import { GridIcon, ListIcon } from 'lucide-react';
import { ProjectsGrid } from '../layouts/projects-grid';
import { ProjectsList } from '../layouts/projects-list';

type ProjectsIndexProps = {
  projects: Project[];
};

export function ProjectsIndex({ projects }: ProjectsIndexProps) {
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
        renderIcon: () => <GridIcon className="size-4" />,
        render: (items) => <ProjectsGrid projects={items} />,
      },
      {
        id: 'list',
        label: 'List',
        renderIcon: () => <ListIcon className="size-4" />,
        render: (items) => <ProjectsList projects={items} />,
      },
    ],
    [],
  );

  return (
    <IndexView
      defaultSortId="featured"
      defaultViewId="grid"
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
