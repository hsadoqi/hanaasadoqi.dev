'use client';

import { useMemo } from 'react';

import {
  IndexView,
  type IndexViewFilter,
  type IndexViewSortOption,
  type IndexViewView,
} from '@/components/shared';
import type { CaseStudy } from '@/types';
import { GridIcon, ListIcon } from 'lucide-react';
import { CaseStudyIndexListItem } from '../layouts/case-index-list-item';
import { CaseStudyIndexCard } from '../shared/case-index-card';
import { formatStatusLabel } from '../shared/case-index-meta';

type CaseStudiesIndexProps = {
  caseStudies: CaseStudy[];
  projects: CaseStudyIndexProject[];
};

type CaseStudyIndexProject = {
  slug: string;
  title: string;
};

export function CaseStudiesIndex({
  caseStudies,
  projects,
}: CaseStudiesIndexProps) {
  const projectLabels = useMemo(
    () => new Map(projects.map((project) => [project.slug, project.title])),
    [projects],
  );

  const filters = useMemo<Array<IndexViewFilter<CaseStudy>>>(
    () => [
      {
        id: 'project',
        label: 'Project',
        getValue: (caseStudy) => caseStudy.project_slug,
        getLabel: (projectSlug) =>
          projectLabels.get(projectSlug) ?? projectSlug,
      },
      {
        id: 'status',
        label: 'Status',
        getValue: (caseStudy) => caseStudy.status.value,
        getLabel: formatStatusLabel,
      },
      {
        id: 'topic',
        label: 'Focus area',
        getValue: (caseStudy) => caseStudy.tags,
        maxOptions: 10,
        sortOptions: (a, b) =>
          b.count - a.count || a.label.localeCompare(b.label),
      },
    ],
    [projectLabels],
  );

  const sortOptions = useMemo<Array<IndexViewSortOption<CaseStudy>>>(
    () => [
      {
        id: 'featured',
        label: 'Featured',
        compare: (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.title.localeCompare(b.title),
      },
      {
        id: 'project',
        label: 'Project',
        compare: (a, b) =>
          (projectLabels.get(a.project_slug) ?? a.project_slug).localeCompare(
            projectLabels.get(b.project_slug) ?? b.project_slug,
          ) || a.title.localeCompare(b.title),
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
    [projectLabels],
  );

  const views = useMemo<Array<IndexViewView<CaseStudy>>>(
    () => [
      {
        id: 'grid',
        label: 'Grid',
        renderIcon: () => <GridIcon className="size-4" />,
        render: (items) => (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((caseStudy) => (
              <CaseStudyIndexCard
                key={caseStudy.slug}
                caseStudy={caseStudy}
                projectLabel={
                  projectLabels.get(caseStudy.project_slug) ??
                  caseStudy.project_slug
                }
              />
            ))}
          </div>
        ),
      },
      {
        id: 'list',
        label: 'List',
        renderIcon: () => <ListIcon className="size-4" />,
        render: (items) => (
          <div className="border-border/30 overflow-hidden rounded-lg border">
            {items.map((caseStudy) => (
              <CaseStudyIndexListItem
                key={caseStudy.slug}
                caseStudy={caseStudy}
                projectLabel={
                  projectLabels.get(caseStudy.project_slug) ??
                  caseStudy.project_slug
                }
              />
            ))}
          </div>
        ),
      },
    ],
    [projectLabels],
  );

  return (
    <IndexView
      defaultSortId="featured"
      defaultViewId="grid"
      emptyState={{
        title: 'No case studies found',
        description:
          'Try clearing the filters or searching for architecture, permissions, payroll, graph, or workflow.',
      }}
      eyebrow="Deep Dives"
      filters={filters}
      itemLabelPlural="studies"
      itemLabelSingular="study"
      items={caseStudies}
      search={{
        placeholder: 'Search by project, status, topic, or decision...',
        getText: (caseStudy) => [
          caseStudy.title,
          caseStudy.subtitle,
          caseStudy.description ?? '',
          caseStudy.project_slug,
          projectLabels.get(caseStudy.project_slug) ?? '',
          caseStudy.status.value,
          ...caseStudy.tags,
        ],
      }}
      sortOptions={sortOptions}
      title="Case Studies"
      views={views}
    />
  );
}
