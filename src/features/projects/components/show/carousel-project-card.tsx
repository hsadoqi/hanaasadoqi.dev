import type { CaseStudy, Project } from '@/types';
import { StatusBadge } from '@/components/shared/badges';
import { ProjectTagList } from '@/features/projects/components/shared/tag-list';
import { getProjectDisplay } from '@/features/projects/lib/project-display';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project | CaseStudy;
  index?: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const studyId = project.title.toLowerCase().replace(/\s+/g, '-');
  const display = getProjectDisplay(project);
  const relatedItems = getRelatedItems(project);
  const displayIndex =
    typeof index === 'number' ? String(index + 1).padStart(2, '0') : undefined;
  const leadCopy = display.subtitle ?? project.subtitle ?? project.problem;
  const shouldShowProblem = project.problem && project.problem !== leadCopy;
  const projectHref = `/projects/${project.slug}`;

  return (
    <article
      id={studyId}
      className={cn(
        'group card-base shadow-elevation-1 hover:shadow-elevation-2 hover:border-border/60 relative flex h-[500px] max-w-[min(76vw,300px)] min-w-[min(76vw,300px)] snap-start flex-col overflow-hidden rounded-xl border p-6 motion-safe:transition-all motion-safe:ease-out hover:motion-safe:-translate-y-1 sm:max-w-[300px] sm:min-w-[300px] md:h-[520px] md:max-w-[320px] md:min-w-[320px] md:p-7 lg:max-w-[340px] lg:min-w-[340px]',
        project.featured && 'border-foreground/15 bg-background/60',
      )}
      aria-label={`Project: ${project.title}`}
    >
      <ProjectCardHeader
        meta={display.meta}
        index={displayIndex}
        status={display.status}
        title={project.title}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-5">
        {leadCopy && (
          <p className="text-primary-content line-clamp-3 text-sm leading-6 text-pretty">
            {leadCopy}
          </p>
        )}

        <div className="grid gap-5">
          {shouldShowProblem && (
            <ProjectCardTextBlock
              label="Problem"
              text={project.problem ?? ''}
              clampClassName="line-clamp-3"
            />
          )}
          {project.role && (
            <ProjectCardTextBlock
              label="My role"
              text={project.role}
              clampClassName="line-clamp-2"
            />
          )}
        </div>

        {project.tags.length > 0 && (
          <div>
            <p className="type-eyebrow mb-3">Focus</p>
            <ProjectTagList tags={project.tags} limit={3} />
          </div>
        )}

        {project.proof && (
          <div className="border-border/40 border-l-2 pl-3">
            <p className="type-body-sm line-clamp-2 italic">{project.proof}</p>
          </div>
        )}

        {relatedItems.length > 0 && <RelatedContentList items={relatedItems} />}

        <div className="mt-auto">
          <ProjectCardFooter href={projectHref} title={project.title} />
        </div>
      </div>
    </article>
  );
}

function ProjectCardFooter({ href, title }: { href: string; title: string }) {
  const className =
    'type-caption text-foreground/60 hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded font-medium focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-200';

  return (
    <footer className="border-border/30 flex shrink-0 border-t pt-4">
      <Link href={href} className={className} aria-label={`Discover ${title}`}>
        Discover
        <span
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </footer>
  );
}

function ProjectCardHeader({
  index,
  meta,
  status,
  title,
}: {
  index?: string;
  meta?: string;
  status: Project['status']['value'];
  title: string;
}) {
  return (
    <header className="relative mb-5 flex shrink-0 flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={status} />
        {index && (
          <span className="text-subtle-content font-mono text-[11px] tabular-nums select-none">
            {index}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="type-card-title-sm line-clamp-2">{title}</h3>
        {meta && <p className="type-caption">{meta}</p>}
      </div>
    </header>
  );
}

function ProjectCardTextBlock({
  clampClassName,
  label,
  text,
}: {
  clampClassName: string;
  label: string;
  text: string;
}) {
  return (
    <div>
      <p className="type-eyebrow mb-2">{label}</p>
      <p className={cn('type-body-sm', clampClassName)}>{text}</p>
    </div>
  );
}

function RelatedContentList({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const visibleItems = items.slice(0, 2);

  return (
    <nav
      aria-label="Related content"
      className="border-border/30 border-t pt-4"
    >
      <p className="type-eyebrow mb-3">Related</p>
      <ul className="grid gap-2">
        {visibleItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-secondary-content hover:text-foreground focus-visible:ring-ring flex items-start justify-between gap-3 rounded py-1 text-sm leading-5 focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors"
            >
              <span className="line-clamp-1">{item.label}</span>
              <span
                aria-hidden="true"
                className="text-tertiary-content mt-0.5 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function getRelatedItems(
  project: Project | CaseStudy,
): { href: string; label: string }[] {
  if (!('caseStudies' in project) || !project.caseStudies) return [];

  return project.caseStudies.map((caseStudy) => ({
    href: `/projects/${project.slug}/${caseStudy.slug}`,
    label: caseStudy.title,
  }));
}
