import Link from 'next/link';
import {
  loadAllCaseStudies,
  loadCaseStudyBySlug,
} from '../lib/case-studies-loader';
import { loadProjectBySlug } from '../../projects/lib/projects-loader';
import { EmptyState, ErrorState } from '@/components/shared';
import type { BadgeColor, CaseStudy, Project } from '@/types';

// Import the rendering components from the old case study page
import { DiagramPlaceholder } from '@/components/shared/blocks';
import { RenderSection } from '@/components/shared/blocks/render-section';

export const dynamicParams = false;

export async function generateStaticParams() {
  const caseStudies = await loadAllCaseStudies();

  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.project_slug,
    caseStudySlug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; caseStudySlug: string }>;
}) {
  try {
    const resolvedParams = await params;
    const data = await loadCaseStudyBySlug(resolvedParams.caseStudySlug);
    return {
      title: data.title,
      description: data.subtitle,
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

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="border-border/40 border-b px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {/* Back to project link */}
          <div className="mb-8">
            <Link
              href={`/projects/${resolvedParams.slug}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to {projectData?.title}
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-muted-foreground/50 font-mono text-xs tracking-widest uppercase">
                {data.hero.eyebrow}
              </span>
              <h1 className="text-foreground mt-2 text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
                {data.title}
              </h1>
              <p className="text-muted-foreground/80 mt-4 max-w-2xl text-base sm:text-lg">
                {data.subtitle}
              </p>
            </div>

            {/* Status badges */}
            <div className="inline-flex gap-2">
              {data.hero.badges.map((badge, idx) => {
                const colorMap: Record<BadgeColor, string> = {
                  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
                  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                  muted: 'bg-muted/30 text-muted-foreground/70',
                };
                return (
                  <span
                    key={idx}
                    className={`rounded px-3 py-1 text-xs font-medium ${colorMap[badge.color]}`}
                  >
                    {badge.text}
                  </span>
                );
              })}
            </div>

            {/* Hero image placeholder */}
            <DiagramPlaceholder
              label={data.hero.image.label ?? ''}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="border-border/40 border-b px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {data.sections.map((section, idx) => (
            <RenderSection key={idx} section={section} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground/50 font-mono text-xs tracking-widest uppercase">
              Back to project
            </p>
            <Link
              href={`/projects/${resolvedParams.slug}`}
              className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View {projectData?.title} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
