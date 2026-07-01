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
import type { Project } from '@/types';
import { loadCaseStudiesByProject } from '../../../case-studies/lib/case-studies-loader';
import { type RelatedCaseStudyCard } from '../../components/show/case-studies-carousel';
import {
  getProjectShowSlugs,
  loadProjectBySlug,
} from '../../lib/projects-loader';
import { ProjectCta, RelatedCaseStudies } from './project-cta';
import { ProjectMeta } from './project-meta';
import { ProjectShowContent } from './project-show-content';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectShowSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const resolvedParams = await params;
    const data = await loadProjectBySlug(resolvedParams.slug);
    const isIndexable = shouldIndexContent(data);

    return {
      title: shouldRenderContent(data) ? data.title : `${data.title} - Soon`,
      description: shouldRenderContent(data)
        ? data.subtitle
        : 'This project write-up is still being prepared.',
      robots: isIndexable
        ? undefined
        : {
            index: false,
            follow: false,
          },
    };
  } catch {
    return { title: 'Project Not Found' };
  }
}

export default async function ProjectShowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let projectData: Project | null = null;
  let relatedCaseStudies: RelatedCaseStudyCard[] = [];
  let error: string | null = null;

  try {
    projectData = await loadProjectBySlug(resolvedParams.slug);
    const caseStudies = await loadCaseStudiesByProject(resolvedParams.slug);
    relatedCaseStudies = caseStudies.map((cs) => ({
      slug: cs.slug,
      title: cs.title,
      subtitle: cs.subtitle,
      status: cs.status.value,
      tags: cs.tags,
      meta: formatContentMeta(cs),
      isComingSoon: cs.isComingSoon,
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  if (error) {
    return (
      <ErrorState
        title="Project not found"
        description={error}
        action={{ href: '/projects', label: 'View all projects →' }}
      />
    );
  }

  if (!projectData) {
    return (
      <EmptyState
        eyebrow="404"
        title="Project not found"
        description="Sorry, the page you're looking for doesn't exist."
        action={{ href: '/projects', label: 'View all projects →' }}
      />
    );
  }

  if (!shouldRenderContent(projectData)) {
    return (
      <ContentClosedState
        contentType="project"
        title={`${projectData.title} is not published yet`}
        description="This project write-up is still being prepared, so the draft content is intentionally hidden from the public portfolio."
        actions={[
          { href: '/projects', label: 'View published projects →' },
          { href: '/', label: 'Back home', variant: 'secondary' },
        ]}
      />
    );
  }

  return (
    <main className="bg-background min-h-screen">
      <ProjectMeta
        project={projectData}
        relatedCaseStudies={relatedCaseStudies}
      />

      <ProjectShowContent
        problem={projectData.problem}
        solution={projectData.solution}
        impactSummary={projectData.impactSummary}
        mdx={projectData.mdx}
      />

      {relatedCaseStudies.length > 0 && (
        <RelatedCaseStudies
          relatedCaseStudies={relatedCaseStudies}
          projectSlug={resolvedParams.slug}
        />
      )}

      <ProjectCta />
    </main>
  );
}

export { ProjectCta, ProjectMeta, ProjectShowContent, ProjectShowPage };
