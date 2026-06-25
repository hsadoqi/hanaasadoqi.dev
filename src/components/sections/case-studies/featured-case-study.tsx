'use client';

import { useState } from 'react';
import { FeaturedCaseStudy as FeaturedCaseStudyType } from '@/types/content';
import { Pill } from '@/components/shared/pill';

export function FeaturedCaseStudy({
  featured,
}: {
  featured: FeaturedCaseStudyType;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="group border-border/50 bg-card text-card-foreground hover:border-border focus-within:border-border relative flex h-full max-w-[min(84vw,520px)] min-w-[min(84vw,520px)] snap-start flex-col rounded-2xl border p-7 hover:shadow-xl hover:shadow-black/[0.06] motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out sm:max-w-[560px] sm:min-w-[560px] md:max-w-[640px] md:min-w-[640px] md:p-9 lg:max-w-[720px] lg:min-w-[720px]"
      aria-label={`Featured project: ${featured.title}`}
    >
      {/* Status + index */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <span
          className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide"
          data-status={featured.statusVariant}
        >
          <span
            className="size-1.5 rounded-full bg-current opacity-70"
            aria-hidden="true"
          />
          {featured.status}
        </span>
        <span className="text-muted-foreground/40 font-mono text-[11px] tabular-nums select-none">
          01
        </span>
      </div>

      {/* Title + subtitle */}
      <h3 className="text-foreground mb-1.5 text-2xl leading-snug font-semibold tracking-tight text-balance">
        {featured.title}
      </h3>
      <p className="text-muted-foreground/80 mb-7 text-sm leading-relaxed text-balance">
        {featured.subtitle}
      </p>

      {/* Two-column body */}
      <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Left */}
        <div className="space-y-5">
          <div>
            <p className="text-muted-foreground/50 mb-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
              The problem
            </p>
            <p className="text-muted-foreground line-clamp-4 text-[13px] leading-relaxed">
              {featured.problem}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground/50 mb-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
              The solution
            </p>
            <p className="text-muted-foreground line-clamp-4 text-[13px] leading-relaxed">
              {featured.solution}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-5">
          <div>
            <p className="text-muted-foreground/50 mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
              Key challenges
            </p>
            <ul className="space-y-2">
              {featured.challenges
                .slice(0, expanded ? undefined : 3)
                .map((c) => (
                  <li
                    key={c}
                    className="text-muted-foreground flex items-start gap-2 text-[13px] leading-relaxed"
                  >
                    <span
                      className="mt-[5px] size-1 shrink-0 rounded-full bg-current opacity-25"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              {featured.challenges.length > 3 && (
                <li>
                  <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="text-muted-foreground/45 hover:text-muted-foreground focus-visible:ring-ring rounded text-[13px] focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors"
                  >
                    {expanded
                      ? 'Show less'
                      : `+${featured.challenges.length - 3} more`}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer: tech + learnings + CTA */}
      <div className="border-border/30 mt-6 space-y-5 border-t pt-5">
        {/* Tech stack */}
        <div>
          <p className="text-muted-foreground/50 mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-2">
            {featured.techStack.map((tech) => (
              <Pill key={tech} variant="tech">
                {tech}
              </Pill>
            ))}
          </div>
        </div>

        {/* Learnings — collapsible */}
        <details className="group/details">
          <summary className="text-muted-foreground/50 hover:text-muted-foreground/80 focus-visible:ring-ring flex w-fit cursor-pointer list-none items-center gap-1.5 rounded text-[11px] font-semibold tracking-[0.12em] uppercase focus-visible:ring-1 focus-visible:outline-none motion-safe:transition-colors">
            <span
              className="inline-block group-open/details:rotate-90 motion-safe:transition-transform motion-safe:duration-200"
              aria-hidden="true"
            >
              ›
            </span>
            Key learnings
          </summary>
          <ul className="mt-3 space-y-2">
            {featured.learnings.map((l) => (
              <li
                key={l}
                className="text-muted-foreground flex items-start gap-2 text-[13px] leading-relaxed"
              >
                <span
                  className="mt-[5px] size-1 shrink-0 rounded-full bg-current opacity-25"
                  aria-hidden="true"
                />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  );
}
