// 'use client';

// import Link from 'next/link';
// import { useMemo } from 'react';
// import {
//   IndexView,
//   type IndexViewFilter,
//   type IndexViewSortOption,
//   type IndexViewView,
// } from '@/components/shared';
// import { StatusBadge } from '@/components/shared/badges';
// import type { CaseStudy } from '@/types';
// import { formatContentMeta } from '@/lib/content-meta';

// type CaseStudiesIndexProps = {
//   caseStudies: CaseStudy[];
//   projects: CaseStudyIndexProject[];
// };

// type CaseStudyIndexProject = {
//   slug: string;
//   title: string;
// };

// export function CaseStudiesIndex({
//   caseStudies,
//   projects,
// }: CaseStudiesIndexProps) {
//   const projectLabels = useMemo(
//     () => new Map(projects.map((project) => [project.slug, project.title])),
//     [projects],
//   );

//   const filters = useMemo<Array<IndexViewFilter<CaseStudy>>>(
//     () => [
//       {
//         id: 'project',
//         label: 'Project',
//         getValue: (caseStudy) => caseStudy.project_slug,
//         getLabel: (projectSlug) =>
//           projectLabels.get(projectSlug) ?? projectSlug,
//       },
//       {
//         id: 'status',
//         label: 'Status',
//         getValue: (caseStudy) => caseStudy.status.value,
//         getLabel: formatStatusLabel,
//       },
//       {
//         id: 'topic',
//         label: 'Focus area',
//         getValue: (caseStudy) => caseStudy.tags,
//         maxOptions: 10,
//         sortOptions: (a, b) =>
//           b.count - a.count || a.label.localeCompare(b.label),
//       },
//     ],
//     [projectLabels],
//   );

//   const sortOptions = useMemo<Array<IndexViewSortOption<CaseStudy>>>(
//     () => [
//       {
//         id: 'featured',
//         label: 'Featured',
//         compare: (a, b) =>
//           Number(b.featured) - Number(a.featured) ||
//           a.title.localeCompare(b.title),
//       },
//       {
//         id: 'project',
//         label: 'Project',
//         compare: (a, b) =>
//           (projectLabels.get(a.project_slug) ?? a.project_slug).localeCompare(
//             projectLabels.get(b.project_slug) ?? b.project_slug,
//           ) || a.title.localeCompare(b.title),
//       },
//       {
//         id: 'status',
//         label: 'Status',
//         compare: (a, b) =>
//           formatStatusLabel(a.status.value).localeCompare(
//             formatStatusLabel(b.status.value),
//           ) || a.title.localeCompare(b.title),
//       },
//       {
//         id: 'title',
//         label: 'Title',
//         compare: (a, b) => a.title.localeCompare(b.title),
//       },
//     ],
//     [projectLabels],
//   );

//   const views = useMemo<Array<IndexViewView<CaseStudy>>>(
//     () => [
//       {
//         id: 'grid',
//         label: 'Grid',
//         render: (items) => (
//           <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//             {items.map((caseStudy) => (
//               <CaseStudyCard
//                 key={caseStudy.slug}
//                 caseStudy={caseStudy}
//                 projectLabel={
//                   projectLabels.get(caseStudy.project_slug) ??
//                   caseStudy.project_slug
//                 }
//               />
//             ))}
//           </div>
//         ),
//       },
//     ],
//     [projectLabels],
//   );

//   return (
//     <IndexView
//       defaultSortId="featured"
//       defaultViewId="grid"
//       description="Browse the detailed studies behind the project summaries: architecture decisions, constraints, trade-offs, and what changed during the build."
//       emptyState={{
//         title: 'No case studies found',
//         description:
//           'Try clearing the filters or searching for architecture, permissions, payroll, graph, or workflow.',
//       }}
//       eyebrow="Case Studies"
//       filters={filters}
//       itemLabelPlural="studies"
//       itemLabelSingular="study"
//       items={caseStudies}
//       search={{
//         placeholder: 'Search by project, status, topic, or decision...',
//         getText: (caseStudy) => [
//           caseStudy.title,
//           caseStudy.subtitle,
//           caseStudy.description ?? '',
//           caseStudy.project_slug,
//           projectLabels.get(caseStudy.project_slug) ?? '',
//           caseStudy.status.value,
//           ...caseStudy.tags,
//         ],
//       }}
//       sortOptions={sortOptions}
//       title="Technical decisions across real projects"
//       views={views}
//     />
//   );
// }

// function CaseStudyCard({
//   caseStudy,
//   projectLabel,
// }: {
//   caseStudy: CaseStudy;
//   projectLabel: string;
// }) {
//   const href = `/projects/${caseStudy.project_slug}/${caseStudy.slug}`;
//   const isComingSoon = caseStudy.isComingSoon;

//   const content = (
//     <article className="flex h-full flex-col gap-5">
//       <div className="flex items-start justify-between gap-4">
//         <StatusBadge status={caseStudy.status.value}>
//           {caseStudy.status.value}
//         </StatusBadge>
//         <span className="type-meta uppercase">{projectLabel}</span>
//       </div>

//       <div>
//         <h2 className="type-card-title group-hover:text-foreground/80">
//           {caseStudy.title}
//         </h2>
//         {formatContentMeta(caseStudy) && (
//           <p className="type-caption text-muted-foreground mt-2">
//             {formatContentMeta(caseStudy)}
//           </p>
//         )}
//         <p className="type-body-sm mt-3 line-clamp-3">{caseStudy.subtitle}</p>
//       </div>

//       <div className="mt-auto flex flex-wrap gap-2">
//         {caseStudy.tags.slice(0, 4).map((tag) => (
//           <span
//             key={tag}
//             className="border-border/40 type-caption rounded-full border px-2.5 py-1"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       <span className="type-body-sm text-foreground/60 group-hover:text-foreground mt-1 font-medium">
//         {isComingSoon ? (
//           'Coming soon'
//         ) : (
//           <>
//             View case study <span aria-hidden="true">→</span>
//           </>
//         )}
//       </span>
//     </article>
//   );

//   if (isComingSoon) {
//     return (
//       <div className="border-border/30 bg-background block rounded-lg border p-6 opacity-75">
//         {content}
//       </div>
//     );
//   }

//   return (
//     <Link
//       href={href}
//       className="group border-border/40 bg-background hover:border-border/70 hover:bg-muted/20 focus-visible:ring-ring block rounded-lg border p-6 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
//     >
//       {content}
//     </Link>
//   );
// }

// function formatStatusLabel(status: string) {
//   return status
//     .split('-')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// }
'use client';

import {
  IndexView,
  type IndexViewFilter,
  type IndexViewSortOption,
  type IndexViewView,
} from '@/components/shared';
import { StatusBadge } from '@/components/shared/badges';
import type { CaseStudy } from '@/types';
import Link from 'next/link';
import { useMemo } from 'react';

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
        render: (items) => (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((caseStudy) => (
              <CaseStudyCard
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
      description="Browse the detailed studies behind the project summaries: architecture decisions, constraints, trade-offs, and what changed during the build."
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

function CaseStudyCard({
  caseStudy,
  projectLabel,
}: {
  caseStudy: CaseStudy;
  projectLabel: string;
}) {
  const href = `/projects/${caseStudy.project_slug}/${caseStudy.slug}`;

  return (
    <Link
      href={href}
      className="group border-border/40 bg-background hover:border-border/70 hover:bg-muted/20 focus-visible:ring-ring block rounded-lg border p-6 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <article className="flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <StatusBadge status={caseStudy.status.value}>
            {caseStudy.status.value}
          </StatusBadge>
          <span className="type-meta uppercase">{projectLabel}</span>
        </div>

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

        <div className="mt-auto flex flex-wrap gap-2">
          {caseStudy.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="border-border/40 type-caption rounded-full border px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="type-body-sm text-foreground/60 group-hover:text-foreground mt-1 font-medium">
          View case study <span aria-hidden="true">→</span>
        </span>
      </article>
    </Link>
  );
}

function formatStatusLabel(status: string) {
  return status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
