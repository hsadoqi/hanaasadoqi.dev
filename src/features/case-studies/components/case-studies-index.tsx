'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import {
  IndexView,
  type IndexViewFilter,
  type IndexViewSortOption,
  type IndexViewView,
} from '@/components/shared';
import { StatusBadge } from '@/components/shared/display/badges';
import type { CaseStudy } from '@/types';
import { GridIcon, ListIcon } from 'lucide-react';

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

function CaseStudyIndexCard({
  caseStudy,
  projectLabel,
}: {
  caseStudy: CaseStudy;
  projectLabel: string;
}) {
  return (
    <CaseStudyIndexLink
      caseStudy={caseStudy}
      className="group border-border/40 bg-background hover:border-border/70 hover:bg-muted/20 focus-visible:ring-ring block h-full rounded-lg border p-6 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <article className="flex h-full flex-col gap-5">
        <CaseStudyIndexMeta caseStudy={caseStudy} projectLabel={projectLabel} />

        <div>
          <h2 className="type-card-title group-hover:text-foreground/80">
            {caseStudy.title}
          </h2>
          {caseStudy.readingTime && (
            <p className="type-caption text-muted-foreground mt-2">
              {caseStudy.readingTime.text}
            </p>
          )}
          <p className="type-body-sm mt-3 line-clamp-3">{caseStudy.subtitle}</p>
        </div>

        <CaseStudyTopicList tags={caseStudy.tags} />

        <span className="type-body-sm text-foreground/60 group-hover:text-foreground mt-auto ml-auto font-medium">
          View <span aria-hidden="true">-&gt;</span>
        </span>
      </article>
    </CaseStudyIndexLink>
  );
}

function CaseStudyIndexListItem({
  caseStudy,
  projectLabel,
}: {
  caseStudy: CaseStudy;
  projectLabel: string;
}) {
  return (
    <CaseStudyIndexLink
      caseStudy={caseStudy}
      className="group border-border/30 hover:bg-muted/20 focus-visible:ring-ring block border-b p-5 transition-colors last:border-b-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <article className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        <div className="min-w-0 space-y-3">
          <CaseStudyIndexMeta
            caseStudy={caseStudy}
            projectLabel={projectLabel}
          />
          <div>
            <h2 className="type-card-title-sm group-hover:text-foreground/80">
              {caseStudy.title}
            </h2>
            <p className="type-body-sm mt-2 line-clamp-2">
              {caseStudy.subtitle}
            </p>
          </div>
          <CaseStudyTopicList tags={caseStudy.tags} />
        </div>

        <span className="type-caption text-muted-foreground group-hover:text-foreground font-medium whitespace-nowrap">
          View <span aria-hidden="true">-&gt;</span>
        </span>
      </article>
    </CaseStudyIndexLink>
  );
}

function CaseStudyIndexMeta({
  caseStudy,
  projectLabel,
}: {
  caseStudy: CaseStudy;
  projectLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="type-meta text-muted-foreground uppercase">
        {projectLabel}
      </span>
      <StatusBadge status={caseStudy.status.value}>
        {formatStatusLabel(caseStudy.status.value)}
      </StatusBadge>
    </div>
  );
}

function CaseStudyTopicList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, 4).map((tag) => (
        <span
          key={tag}
          className="border-border/40 type-caption rounded-full border px-2.5 py-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function CaseStudyIndexLink({
  caseStudy,
  children,
  className,
}: {
  caseStudy: CaseStudy;
  children: ReactNode;
  className: string;
}) {
  return (
    <Link
      href={`/projects/${caseStudy.project_slug}/${caseStudy.slug}`}
      className={className}
    >
      {children}
    </Link>
  );
}

function formatStatusLabel(status: string) {
  return status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
