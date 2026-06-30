import Link from 'next/link';
import { loadCaseStudiesByProject } from '../../case-studies/lib/case-studies-loader';
import { getProjectShowSlugs, loadProjectBySlug } from '../lib/projects-loader';
import {
  CaseStudiesCarousel,
  type CaseStudyCard,
} from '../components/show/case-studies-carousel';
import { EmptyState, ErrorState } from '@/components/shared';
import type { BadgeColor } from '@/types';
import type { Project } from '@/types';

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
    return {
      title: data.title,
      description: data.subtitle,
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
  let relatedCaseStudies: CaseStudyCard[] = [];
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

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="border-border/40 border-b px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <div>
              <span className="type-eyebrow">{projectData.hero.eyebrow}</span>
              <h1 className="type-show-title mt-3">{projectData.title}</h1>
              <p className="type-body-lg mt-4 max-w-2xl">
                {projectData.subtitle}
              </p>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap gap-2">
              {projectData.hero.badges.map((badge, idx) => {
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
              {relatedCaseStudies.length > 0 && (
                <span className="border-brand/20 bg-brand/5 text-brand rounded border px-3 py-1 text-xs font-medium">
                  {relatedCaseStudies.length}{' '}
                  {relatedCaseStudies.length === 1
                    ? 'case study available'
                    : 'case studies available'}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="border-border/40 border-b px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl space-y-16">
          {(projectData.problem || projectData.solution) && (
            <div className="grid gap-4 md:grid-cols-2">
              {projectData.problem && (
                <div className="border-border/40 bg-background/50 rounded-lg border p-5">
                  <p className="type-eyebrow mb-3">Problem</p>
                  <p className="type-body-sm">{projectData.problem}</p>
                </div>
              )}
              {projectData.solution && (
                <div className="border-border/40 bg-background/50 rounded-lg border p-5">
                  <p className="type-eyebrow mb-3">Solution</p>
                  <p className="type-body-sm">{projectData.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Impact */}
          {projectData.impact && (
            <div className="space-y-6">
              <div>
                <h2 className="type-section-title">Impact & Vision</h2>
                <p className="type-body-sm mt-2">Why this matters</p>
              </div>
              <div className="max-w-none">
                <p className="type-body">{projectData.impact}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <CaseStudiesCarousel
              caseStudies={relatedCaseStudies}
              projectSlug={resolvedParams.slug}
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-border/40 border-t px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4 text-center">
            <p className="type-eyebrow">Back to portfolio</p>
            <Link
              href="/projects"
              className="type-body-sm inline-block font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all projects →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
