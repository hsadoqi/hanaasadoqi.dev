import type { CaseStudy, Project } from '@/types';
import { StatusBadge } from '@/components/shared/badges';
import { ProjectTagList } from '@/features/projects/components/shared/tag-list';
import { getProjectDisplay } from '@/features/projects/lib/project-display';

interface ProjectCardProps {
  project: Project | CaseStudy;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const displayIndex = String(index + 2).padStart(2, '0');
  const studyId = project.title.toLowerCase().replace(/\s+/g, '-');
  const display = getProjectDisplay(project);

  return (
    <article
      id={studyId}
      className="group border-border/40 bg-background/40 text-card-foreground shadow-elevation-1 hover:shadow-elevation-2 hover:border-border/60 relative flex h-full max-w-[min(76vw,300px)] min-w-[min(76vw,300px)] snap-start flex-col rounded-xl border p-6 backdrop-blur-sm motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:motion-safe:-translate-y-1 sm:max-w-[300px] sm:min-w-[300px] md:max-w-[320px] md:min-w-[320px] md:p-7 lg:max-w-[340px] lg:min-w-[340px]"
      aria-label={`Project: ${project.title}`}
    >
      {/* Status + index */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <StatusBadge status={project.status.value}>
          {project.status.value}
        </StatusBadge>
        <span className="text-muted-foreground/40 font-mono text-[11px] tabular-nums select-none">
          {displayIndex}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-foreground mb-3 text-base leading-snug font-semibold tracking-tight text-balance">
        {project.title}
      </h3>

      {/* Problem */}
      <div className="mb-4">
        <p className="text-muted-foreground/50 mb-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
          Problem
        </p>
        <p className="text-muted-foreground line-clamp-4 text-[13px] leading-relaxed">
          {project.problem}
        </p>
      </div>

      {/* Role */}
      <div className="mb-5">
        <p className="text-muted-foreground/50 mb-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
          My role
        </p>
        <p className="text-muted-foreground line-clamp-3 text-[13px] leading-relaxed">
          {project.role}
        </p>
      </div>

      {/* Focus tags */}
      <ProjectTagList tags={project.tags} className="mb-5" />

      {/* Proof / context */}
      <div className="border-border/40 mb-5 border-l-2 pl-3">
        <p className="text-muted-foreground/65 text-[13px] leading-relaxed italic">
          {project.proof}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        {display.link.isDisabled ? (
          <span className="text-muted-foreground/50 inline-flex text-[13px] font-medium">
            {display.link.label}
          </span>
        ) : (
          <a
            href={display.link.href}
            target={display.link.isExternal ? '_blank' : undefined}
            rel={display.link.isExternal ? 'noopener noreferrer' : undefined}
            className="text-foreground/60 hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded text-[13px] font-medium focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-200"
            aria-label={`${display.link.label} for ${project.title}`}
          >
            {display.link.label}
            <span
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
            >
              {display.link.isExternal ? '↗' : '→'}
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
