'use client';

import { useMemo } from 'react';
import { ProjectsGrid } from '../projects-grid';
import { ProjectsList } from '../projects-list';
import { ProjectsCarousel } from '../../layouts/projects-carousel';
import {
  IndexView,
  type IndexViewFilter,
  type IndexViewSortOption,
  type IndexViewView,
} from '@/components/shared';
import { getProjectDisplay } from '@/features/projects/lib/project-display';
import type { Project } from '@/types';

type ProjectsIndexPageProps = {
  projects: Project[];
};

export function ProjectsIndexPage({ projects }: ProjectsIndexPageProps) {
  const filters = useMemo<Array<IndexViewFilter<Project>>>(
    () => [
      {
        id: 'status',
        label: 'Status',
        getValue: (project) => project.status.value,
        getLabel: formatStatusLabel,
      },
      {
        id: 'focus',
        label: 'Focus area',
        getValue: (project) => getProjectDisplay(project).tags,
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
        id: 'status',
        label: 'Status',
        compare: (a, b) =>
          formatStatusLabel(a.status.value).localeCompare(
            formatStatusLabel(b.status.value),
          ) || a.title.localeCompare(b.title),
      },
      {
        id: 'title',
        label: 'Title',
        compare: (a, b) => a.title.localeCompare(b.title),
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
      {
        id: 'carousel',
        label: 'Carousel',
        render: (items) => <ProjectsCarousel projects={items} />,
      },
    ],
    [],
  );

  return (
    <IndexView
      defaultSortId="featured"
      defaultViewId="grid"
      description="Deep dives into projects that shaped how I think about systems, architecture, and problem-solving."
      emptyState={{
        title: 'No projects found',
        description:
          'Try clearing the filters or searching for architecture, systems, content, payroll, or knowledge.',
      }}
      filters={filters}
      itemLabelPlural="projects"
      itemLabelSingular="project"
      items={projects}
      search={{
        placeholder: 'Search projects by title, tech, or focus...',
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

function formatStatusLabel(status: string) {
  return status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
