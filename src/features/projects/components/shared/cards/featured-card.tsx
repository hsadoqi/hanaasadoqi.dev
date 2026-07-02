'use client';

import { LinkButton } from '@/components';
import { prepareIcons, TechStackIcons } from '@/features/icons/tech-stack';
import ContentCardHeader from '@/features/projects/components/shared/cards/card-primitives/header';
import { getProjectDisplay } from '@/features/projects/lib/project-display';
import type { CaseStudy, Project } from '@/features/projects/types';
import { isDraftContent } from '@/lib/content/content-visibility';
import Link from 'next/link';

type FeaturedContent = Project | CaseStudy;
type FeaturedContentDisplay = ReturnType<typeof getProjectDisplay>;

export function FeaturedContentCard({ content }: { content: FeaturedContent }) {
  const studyId = content.title.toLowerCase().replace(/\s+/g, '-');
  const display = getProjectDisplay(content);
  const techStackIcons = prepareIcons(content.techStack ?? []);

  return (
    <article
      id={studyId}
      className="group border-border/40 bg-background/40 text-card-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:border-border/70 relative flex h-[min(76svh,660px)] min-h-[540px] max-w-[min(84vw,520px)] min-w-[min(84vw,520px)] snap-start flex-col rounded-2xl border p-7 backdrop-blur-sm motion-safe:transition-[box-shadow,border-color] motion-safe:duration-300 motion-safe:ease-out sm:max-w-[560px] sm:min-w-[560px] md:max-w-[640px] md:min-w-[640px] md:p-9 lg:max-w-[720px] lg:min-w-[720px]"
      aria-label={`Featured project: ${content.title}`}
    >
      <ContentCardHeader
        title={display.title}
        meta={display.meta}
        subtitle={display.subtitle}
        status={display.status}
        isFeatured
        showFeaturedBadge={false}
        titleClassName="type-panel-title"
        subtitleClassName="mb-4 text-balance"
        badgeTrailing={
          <TechStackIcons
            items={techStackIcons}
            className="opacity-70"
            showLabel={false}
          />
        }
      />

      <FeaturedContentDetails content={content} />

      <FeaturedContentFooter display={display} content={content} />
    </article>
  );
}

function FeaturedContentDetails({ content }: { content: FeaturedContent }) {
  return (
    <div className="relative min-h-0 flex-1">
      <div
        tabIndex={0}
        aria-label={`Details for ${content.title}`}
        className="no-scrollbar focus-visible:ring-ring h-full overflow-y-auto rounded-md pr-3 focus-visible:ring-2 focus-visible:outline-none"
      >
        <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 sm:gap-7">
          <div className="space-y-6">
            {content.problem && (
              <FeaturedContentDetailBlock
                label="The problem"
                text={content.problem}
              />
            )}
            {content.solution && (
              <FeaturedContentDetailBlock
                label="The solution"
                text={content.solution}
              />
            )}
          </div>

          <div className="space-y-6">
            <FeaturedContentDetailList
              items={content.challenges ?? []}
              label="Key challenges"
            />
            <FeaturedContentDetailList
              items={content.learnings ?? []}
              label="Key learnings"
            />
          </div>
        </div>
      </div>
      <div
        className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

export function FeaturedContentDetailBlock({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div>
      <p className="type-eyebrow mb-2">{label}</p>
      <p className="type-body-sm">{text}</p>
    </div>
  );
}

export function FeaturedContentDetailList({
  items,
  label,
}: {
  items: string[];
  label: string;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="type-eyebrow mb-2">{label}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="type-body-sm flex items-start gap-2">
            <span
              className="mt-[5px] size-1 shrink-0 rounded-full bg-current opacity-25"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FeaturedContentFooter({
  display,
  content,
}: {
  display: FeaturedContentDisplay;
  content: FeaturedContent;
}) {
  return (
    <footer className="border-border/30 mt-5 flex shrink-0 items-center justify-between space-y-5 border-t pt-5">
      <RelatedCaseStudiesLink
        display={display}
        projectSlug={content.slug}
        projectTitle={content.title}
      />
      <FeaturedContentCta display={display} content={content} />
    </footer>
  );
}

function RelatedCaseStudiesLink({
  display,
  projectTitle,
  projectSlug,
}: {
  display: FeaturedContentDisplay;
  projectTitle: string;
  projectSlug: string;
}) {
  return (
    <div className="flex flex-col items-end justify-center gap-2">
      {display.caseStudyCount > 0 && (
        <Link
          href={`/projects/${projectSlug}/#related-case-studies`}
          aria-label={`View related case studies for ${projectTitle}`}
        >
          <span className="border-brand/20 bg-brand/5 text-brand inline-flex items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium">
            <span aria-hidden="true">↳</span>
            {display.caseStudyCount}{' '}
            {display.caseStudyCount === 1 ? 'case study' : 'case studies'}
          </span>
        </Link>
      )}
    </div>
  );
}

function FeaturedContentCta({
  display,
  content,
}: {
  display: FeaturedContentDisplay;
  content: FeaturedContent;
}) {
  const isDraft = isDraftContent(content);

  if (display.link.isDisabled && !isDraft) {
    return (
      <span className="type-body-sm text-muted-foreground/50 ml-auto inline-flex w-fit items-center rounded font-medium">
        Coming
      </span>
    );
  }

  if (display.link.isExternal) {
    return (
      <a
        href={display.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="type-body-sm text-foreground hover:text-brand focus-visible:ring-ring inline-flex w-fit items-center gap-1 rounded font-medium focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors"
        aria-label={`${display.link.label} for ${content.title}`}
      >
        {display.link.label}
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <LinkButton
      href={display.link.href}
      className="type-body-sm text-foreground hover:text-brand focus-visible:ring-ring ml-auto inline-flex w-fit items-center rounded font-medium focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors"
      variant="ghost"
      aria-label={`Discover ${content.title}`}
      // iconRight={<span aria-hidden="true">→</span>}
    >
      Discover More
    </LinkButton>
  );
}
