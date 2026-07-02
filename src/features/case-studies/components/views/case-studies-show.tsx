import Link from 'next/link';
import {
  loadCaseStudyBySlug,
  loadRoutableCaseStudies,
} from '../../lib/case-studies-loader';
import { loadProjectBySlug } from '../../../projects/lib/projects-loader';
import {
  ContentClosedState,
  EmptyState,
  ErrorState,
} from '@/components/shared';
import { formatContentMeta } from '@/lib/content/content-meta';
import {
  shouldIndexContent,
  shouldRenderContent,
} from '@/lib/content/content-visibility';
import type { CaseStudy, Project } from '@/types';
import {
  ContentShowContent,
  type ContentShowCard,
  ContentShowHero,
} from '@/components/shared/display/views/show-view';

import { DiagramPlaceholder } from '@/components/shared/blocks';

export const dynamicParams = false;

export async function generateStaticParams() {
  const caseStudies = await loadRoutableCaseStudies();

  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.project_slug,
    caseStudySlug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; caseStudySlug: string };
}) {
  try {
    const data = await loadCaseStudyBySlug(params.caseStudySlug);
    const isIndexable = shouldIndexContent(data);

    return {
      title: shouldRenderContent(data) ? data.title : `${data.title} - Soon`,
      description: shouldRenderContent(data)
        ? data.subtitle
        : 'This case study is still being prepared.',
      robots: isIndexable
        ? undefined
        : {
            index: false,
            follow: false,
          },
    };
  } catch {
    return { title: 'Case Study Not Found' };
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; caseStudySlug: string }>;
}) {
  const resolvedParams = await params;
  let data: CaseStudy | null = null;
  let projectData: Project | null = null;
  let error: string | null = null;
  let belongsToProject = true;

  try {
    data = await loadCaseStudyBySlug(resolvedParams.caseStudySlug);
    // Verify it belongs to this project
    if (data?.project_slug && data.project_slug !== resolvedParams.slug) {
      belongsToProject = false;
    } else {
      projectData = await loadProjectBySlug(resolvedParams.slug);
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  if (error) {
    return (
      <ErrorState
        title="Case study not found"
        description={error}
        action={{
          href: `/projects/${resolvedParams.slug}`,
          label: 'Back to project →',
        }}
      />
    );
  }

  if (!belongsToProject) {
    return (
      <EmptyState
        eyebrow="404"
        title="Case study not found"
        description="This case study doesn't belong to the specified project."
        action={{
          href: `/projects/${resolvedParams.slug}`,
          label: 'Back to project →',
        }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        eyebrow="404"
        title="Case study not found"
        description="Sorry, the page you're looking for doesn't exist."
        action={{
          href: `/projects/${resolvedParams.slug}`,
          label: 'Back to project →',
        }}
      />
    );
  }

  if (!shouldRenderContent(data)) {
    return (
      <ContentClosedState
        contentType="case study"
        title={`${data.title} is not published yet`}
        description="This case study is still being written, so the draft content is intentionally hidden from the public portfolio."
        actions={[
          {
            href: projectData
              ? `/projects/${resolvedParams.slug}`
              : '/projects',
            label: projectData
              ? `Back to ${projectData.title} →`
              : 'View projects →',
          },
          { href: '/', label: 'Back home', variant: 'secondary' },
        ]}
      />
    );
  }

  const contentCards: ContentShowCard[] = [
    ...(data.problem
      ? [{ id: 'problem', label: 'Problem', body: data.problem }]
      : []),
    ...(data.solution
      ? [{ id: 'approach', label: 'Approach', body: data.solution }]
      : []),
    ...(projectData
      ? [
          {
            id: 'project-context',
            label: 'Project context',
            body: projectData.subtitle,
            action: (
              <Link
                href={`/projects/${resolvedParams.slug}`}
                className="type-caption text-foreground hover:text-brand mt-4 inline-flex font-medium motion-safe:transition-colors"
              >
                View project <span aria-hidden="true">→</span>
              </Link>
            ),
          },
        ]
      : []),
  ];

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="border-border/40 border-b px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {/* Back to project link */}
          <div className="mb-8">
            <Link
              href={`/projects/${resolvedParams.slug}`}
              className="type-body-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to {projectData?.title}
            </Link>
          </div>

          <div className="space-y-6">
            <ContentShowHero
              eyebrow={data.hero.eyebrow}
              title={data.title}
              subtitle={data.subtitle}
              meta={formatContentMeta(data)}
              badges={data.hero.badges}
              extraBadge={
                projectData ? (
                  <span className="border-brand/20 bg-brand/5 text-brand rounded border px-3 py-1 text-xs font-medium">
                    Part of {projectData.title}
                  </span>
                ) : null
              }
            />

            <DiagramPlaceholder
              label={data.hero.image.label ?? ''}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <ContentShowContent
        cards={contentCards}
        cardColumns={3}
        linkItems={data.linkItems}
        mdx={data.mdx}
        sections={data.sections}
      />

      {/* CTA Section */}
      <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4 text-center">
            <p className="type-eyebrow">Back to project</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/projects/${resolvedParams.slug}`}
                className="type-body-sm inline-block font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View {projectData?.title} →
              </Link>
              <Link
                href="/case-studies"
                className="type-body-sm text-muted-foreground hover:text-foreground inline-block font-medium"
              >
                All case studies →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
