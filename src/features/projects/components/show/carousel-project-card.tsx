import type { CaseStudy, Project } from '@/types';
import { StatusBadge } from '@/components/shared/badges';
import { ProjectTagList } from '@/features/projects/components/shared/tag-list';
import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import { caseStudies } from '@/features/case-studies/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project | CaseStudy;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const studyId = project.title.toLowerCase().replace(/\s+/g, '-');
  const display = getProjectDisplay(project);
  const relatedItems = getRelatedItems(project);
  const leadCopy = project.subtitle ?? project.problem;
  const shouldShowProblem = project.problem && project.problem !== leadCopy;

  return (
    <article
      id={studyId}
      className={cn(
        'group border-border/40 bg-background/40 text-card-foreground shadow-elevation-1 hover:shadow-elevation-2 hover:border-border/60 relative flex h-[min(70svh,560px)] min-h-[430px] max-w-[min(76vw,300px)] min-w-[min(76vw,300px)] snap-start flex-col overflow-hidden rounded-xl border p-6 backdrop-blur-sm motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:motion-safe:-translate-y-1 sm:max-w-[300px] sm:min-w-[300px] md:max-w-[320px] md:min-w-[320px] md:p-7 lg:max-w-[340px] lg:min-w-[340px]',
        project.featured && 'border-foreground/15 bg-background/55',
      )}
      aria-label={`Project: ${project.title}`}
    >
      <ProjectCardHeader
        meta={display.meta}
        status={project.status.value}
        title={project.title}
      />

      <div className="relative min-h-0 flex-1">
        <div
          tabIndex={0}
          aria-label={`Details for ${project.title}`}
          className="no-scrollbar focus-visible:ring-ring h-full space-y-5 overflow-y-auto rounded-md pr-3 focus-visible:ring-2 focus-visible:outline-none"
        >
          {leadCopy && (
            <p className="text-primary-content text-sm leading-6">{leadCopy}</p>
          )}

          {shouldShowProblem && (
            <div className="border-border/30 border-t pt-5">
              <p className="type-eyebrow mb-2">Problem</p>
              <p className="type-body-sm">{project.problem}</p>
            </div>
          )}
          {project.role && (
            <div className="border-border/30 border-t pt-5">
              <p className="type-eyebrow mb-2">My role</p>
              <p className="type-body-sm">{project.role}</p>
            </div>
          )}
          {project.tags.length > 0 && (
            <div className="border-border/30 border-t pt-5">
              <p className="type-eyebrow mb-3">Focus</p>
              <ProjectTagList tags={project.tags} limit={4} />
            </div>
          )}
          {project.proof && (
            <div className="border-border/40 bg-muted/20 rounded-lg border p-3">
              <p className="type-eyebrow mb-2">Proof</p>
              <p className="type-body-sm italic">{project.proof}</p>
            </div>
          )}
          {relatedItems.length > 0 && (
            <RelatedContentList items={relatedItems} />
          )}
          <div aria-hidden="true" className="h-4" />
        </div>
        <div
          className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent"
          aria-hidden="true"
        />
      </div>
      <ProjectCardFooter
        link={{
          href: `/projects/${project.slug}`,
          label: 'Discover more',
          isExternal: false,
          isDisabled: false,
        }}
        title={project.title}
      />
    </article>
  );
}

function ProjectCardFooter({
  link,
  title,
}: {
  link: ProjectLink;
  title: string;
}) {
  return (
    <footer className="border-border/30 mt-5 shrink-0 border-t pt-4">
      {link.isDisabled ? (
        <span className="type-caption inline-flex font-medium">
          {link.label}
        </span>
      ) : (
        <Link
          href={link.href}
          target={link.isExternal ? '_blank' : undefined}
          rel={link.isExternal ? 'noopener noreferrer' : undefined}
          className="type-caption text-foreground/60 hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded font-medium focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-200"
          aria-label={`${link.label} for ${title}`}
        >
          {link.label}
          <span
            aria-hidden="true"
            className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
          >
            {link.isExternal ? '↗' : '→'}
          </span>
        </Link>
      )}
    </footer>
  );
}

function ProjectCardHeader({
  meta,
  status,
  title,
}: {
  meta?: string;
  status: Project['status']['value'];
  title: string;
}) {
  return (
    <header className="relative flex shrink-0 flex-col">
      <div className="mb-4 flex items-center justify-between gap-3">
        <StatusBadge status={status}>{status}</StatusBadge>
      </div>
      <h3 className="type-card-title-sm mb-2">{title}</h3>
      {meta && <p className="type-caption mb-4">{meta}</p>}
    </header>
  );
}

function RelatedContentList({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav
      aria-label="Related content"
      className="border-border/35 bg-background/50 rounded-lg border p-3"
    >
      <p className="type-eyebrow mb-3">Related</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-secondary-content hover:text-foreground focus-visible:ring-ring flex items-start justify-between gap-3 rounded py-1 text-sm leading-5 focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors"
            >
              <span>{item.label}</span>
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
  if (!('relatedCaseStudies' in project)) return [];

  if (project.caseStudies && project.caseStudies.length > 0) {
    return project.caseStudies.map((caseStudy) => ({
      href: `/projects/${project.slug}/${caseStudy.slug}`,
      label: caseStudy.title,
    }));
  }

  return project.relatedCaseStudies
    .map((slug) => {
      const caseStudy = caseStudies.find((study) => study.slug === slug);

      if (!caseStudy) return null;

      return {
        href: `/projects/${project.slug}/${slug}`,
        label: caseStudy.title,
      };
    })
    .filter((item): item is { href: string; label: string } => item !== null);
}
