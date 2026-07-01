'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StatusBadge } from '../status-badge';
import { CaseStudyTags } from '../artifacts/case-study-tags';
import { cn } from '@/lib/utils';
import type { CaseStudy } from '@/types';

type CaseStudyPreviewCardEnhancedProps = {
  data: CaseStudy;
  number?: string;
  showImage?: boolean;
};

function CaseStudyPreviewCardEnhancedComponent({
  data,
  number = '01',
  showImage = true,
}: CaseStudyPreviewCardEnhancedProps) {
  const {
    slug,
    title,
    subtitle,
    description,
    project_slug: projectSlug,
    status,
    tags,
    images,
  } = data;

  const caseStudyLink = `/projects/${projectSlug}/${slug}`;
  const primaryImage = showImage && images?.[0];

  return (
    <Link
      href={caseStudyLink}
      className="group block motion-safe:transition-all motion-safe:duration-300"
    >
      <article
        className={cn(
          'bg-card/50 border-border/30 flex flex-col overflow-hidden rounded-lg border motion-safe:transition-all motion-safe:duration-300',
          'hover:border-brand/50 hover:bg-card/80 group-hover:shadow-lg hover:shadow-lg',
          'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4',
        )}
      >
        {/* Image Section */}
        {primaryImage && (
          <div className="bg-foreground/5 relative h-40 w-full overflow-hidden">
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt || title}
              fill
              className="object-cover group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col justify-between gap-4 p-4">
          {/* Header */}
          <div>
            <div className="mb-3">
              <StatusBadge
                status={status.value}
                number={number}
                variant="primary"
              />
            </div>
            <h3 className="type-card-title group-hover:text-brand break-words motion-safe:transition-colors">
              {title}
            </h3>
            <p className="type-body-sm text-foreground/70 mt-2 break-words">
              {subtitle}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="type-caption text-foreground/60">Project:</span>
              <span className="type-caption text-foreground font-medium">
                {projectSlug}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="type-caption text-foreground/60">Scope:</span>
              <span className="type-caption text-foreground line-clamp-1 font-medium">
                {description}
              </span>
            </div>
          </div>

          {/* Tags and CTA */}
          <div className="border-border/20 flex flex-col gap-3 border-t pt-3">
            <div className="line-clamp-2">
              <CaseStudyTags tags={tags} />
            </div>
            <div className="flex items-center justify-between">
              <span className="type-caption text-brand/60 group-hover:text-brand motion-safe:transition-colors">
                📖 Case Study
              </span>
              <span className="text-brand/60 group-hover:text-brand motion-safe:transition-colors">
                →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export const CaseStudyPreviewCardEnhanced = memo(
  CaseStudyPreviewCardEnhancedComponent,
);
