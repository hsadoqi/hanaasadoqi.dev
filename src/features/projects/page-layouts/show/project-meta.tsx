import { formatContentMeta } from '@/lib/content-meta';
import type { BadgeColor, Project } from '@/types';
import { type CaseStudyCard } from '../../components/show/case-studies-carousel';

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
        <div className="space-y-6">
          <div>
            <span className="type-eyebrow">{project.hero.eyebrow}</span>
            <h1 className="type-show-title mt-3">{project.title}</h1>
            {formatContentMeta(project) && (
              <p className="type-caption mt-3">{formatContentMeta(project)}</p>
            )}
            <p className="type-body-lg mt-4 max-w-2xl">{project.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.hero.badges.map((badge, idx) => {
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
            {relatedCaseStudies && relatedCaseStudies.length > 0 && (
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
  );
};
