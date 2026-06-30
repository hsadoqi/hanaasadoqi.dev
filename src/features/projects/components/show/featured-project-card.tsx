'use client';

import Link from 'next/link';
import type { CaseStudy, Project } from '@/features/projects/types';
import { StatusBadge } from '@/components/shared/badges';
import { ProjectTagList } from '@/features/projects/components/shared/tag-list';
import { getProjectDisplay } from '@/features/projects/lib/project-display';

export function FeaturedProjectCard({
  featured,
}: {
  featured: CaseStudy | Project;
}) {
  const studyId = featured.title.toLowerCase().replace(/\s+/g, '-');
  const display = getProjectDisplay(featured);

  return (
    <article
      id={studyId}
      className="group border-border/40 bg-background/40 text-card-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:border-border/70 relative flex h-[min(76svh,660px)] min-h-[540px] max-w-[min(84vw,520px)] min-w-[min(84vw,520px)] snap-start flex-col rounded-2xl border p-7 backdrop-blur-sm motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:motion-safe:-translate-y-1.5 sm:max-w-[560px] sm:min-w-[560px] md:max-w-[640px] md:min-w-[640px] md:p-9 lg:max-w-[720px] lg:min-w-[720px]"
      aria-label={`Featured project: ${featured.title}`}
    >
      <header className="shrink-0">
        <div className="mb-5 flex items-center justify-between gap-3">
          <StatusBadge status={featured.status.value}>
            {featured.status.value}
          </StatusBadge>
          <div className="flex items-center gap-2">
            {display.caseStudyCount > 0 && (
              <span className="border-brand/20 bg-brand/5 text-brand inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
                <span aria-hidden="true">↳</span>
                {display.caseStudyCount}{' '}
                {display.caseStudyCount === 1 ? 'case study' : 'case studies'}
              </span>
            )}
            <span className="type-meta select-none">01</span>
          </div>
        </div>

        <h3 className="type-panel-title mb-2">{featured.title}</h3>
        <p className="type-body-sm mb-6 text-balance">{featured.subtitle}</p>
      </header>

      <div className="relative min-h-0 flex-1">
        <div
          tabIndex={0}
          aria-label={`Details for ${featured.title}`}
          className="no-scrollbar focus-visible:ring-ring h-full overflow-y-auto rounded-md pr-3 focus-visible:ring-2 focus-visible:outline-none"
        >
          <div className="grid grid-cols-1 gap-5 pb-6 sm:grid-cols-2">
            <div className="space-y-5">
              {featured.problem && (
                <div>
                  <p className="type-eyebrow mb-2">The problem</p>
                  <p className="type-body-sm">{featured.problem}</p>
                </div>
              )}
              {featured.solution && (
                <div>
                  <p className="type-eyebrow mb-2">The solution</p>
                  <p className="type-body-sm">{featured.solution}</p>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {(featured.challenges?.length ?? 0) > 0 && (
                <div>
                  <p className="type-eyebrow mb-2">Key challenges</p>
                  <ul className="space-y-2">
                    {(featured.challenges ?? []).map((c) => (
                      <li
                        key={c}
                        className="type-body-sm flex items-start gap-2"
                      >
                        <span
                          className="mt-[5px] size-1 shrink-0 rounded-full bg-current opacity-25"
                          aria-hidden="true"
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(featured.learnings?.length ?? 0) > 0 && (
                <div>
                  <p className="type-eyebrow mb-2">Key learnings</p>
                  <ul className="space-y-2">
                    {(featured.learnings ?? []).map((l) => (
                      <li
                        key={l}
                        className="type-body-sm flex items-start gap-2"
                      >
                        <span
                          className="mt-[5px] size-1 shrink-0 rounded-full bg-current opacity-25"
                          aria-hidden="true"
                        />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent"
          aria-hidden="true"
        />
      </div>

      <footer className="border-border/30 mt-5 shrink-0 space-y-5 border-t pt-5">
        <div>
          <p className="type-eyebrow mb-2">Tech stack</p>
          <ProjectTagList tags={featured.techStack ?? []} variant="tech" />
        </div>

        {!display.link.isDisabled && display.link.isExternal && (
          <a
            href={display.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="type-body-sm text-foreground hover:text-brand focus-visible:ring-ring inline-flex w-fit items-center gap-1 rounded font-medium focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors"
            aria-label={`${display.link.label} for ${featured.title}`}
          >
            {display.link.label}
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {!display.link.isDisabled && !display.link.isExternal && (
          <Link
            href={display.link.href}
            className="type-body-sm text-foreground hover:text-brand focus-visible:ring-ring inline-flex w-fit items-center gap-1 rounded font-medium focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors"
            aria-label={`${display.link.label} for ${featured.title}`}
          >
            {display.link.label}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </footer>
    </article>
  );
}
