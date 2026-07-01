import { formatContentMeta } from '@/lib/content/content-meta';
import type { Project } from '@/types';
import { type CaseStudyCard } from '../../components/show/case-studies-carousel';
import { ContentShowHero } from '@/components/shared/views/show-view/content-show-hero';

export const ProjectMeta = ({
  project,
  relatedCaseStudies,
}: {
  project: Project | null;
  relatedCaseStudies?: CaseStudyCard[];
}) => {
  if (!project) return null;
  return (
    <section className="border-border/40 border-b px-6 pt-16 pb-4 sm:px-8 sm:pt-24 sm:pb-12 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <ContentShowHero
          eyebrow={project.hero.eyebrow}
          title={project.title}
          subtitle={project.subtitle}
          meta={formatContentMeta(project)}
          badges={project.hero.badges}
          extraBadge={
            relatedCaseStudies && relatedCaseStudies.length > 0 ? (
              <span className="border-brand/20 bg-brand/5 text-brand rounded border px-3 py-1 text-xs font-medium">
                {relatedCaseStudies.length}{' '}
                {relatedCaseStudies.length === 1
                  ? 'case study available'
                  : 'case studies available'}
              </span>
            ) : null
          }
        />
      </div>
    </section>
  );
};
