'use client';

import { memo } from 'react';
import Link from 'next/link';
import { StatusBadge } from '../../status-badge';
import { CaseStudyTags } from '../../artifacts/case-study-tags';
import { default as DefinitionItem } from '../../artifacts/case-study-artifact-item';
import { ImageCollageContainer } from '../../artifacts/case-study-artifact-collage';
import { STYLING_UTILS, SPACING } from '../../../constants';
import { cn } from '@/lib/utils';
import { CaseStudy } from '@/types';

type CaseStudyPreviewProps = {
  data: CaseStudy;
  imagesEnabled?: boolean;
  imagePlacement?: 'side' | 'stack';
  number?: string;
};

function CaseStudyPreviewCardComponent({
  data,
  imagesEnabled = true,
  imagePlacement = 'side',
  number = '01',
}: CaseStudyPreviewProps) {
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
  const metadata = [
    { label: 'Project', value: projectSlug },
    { label: 'Scope', value: description },
  ];
  const caseStudyLink = `/projects/${projectSlug}/${slug}`;

  const showImages = imagesEnabled && !!images?.length;
  const usesSideImage = showImages && imagePlacement === 'side';
  const imagePanel =
    showImages && images ? (
      <ImageCollageContainer
        images={images}
        variant={imagePlacement}
        height={usesSideImage ? 360 : 300}
        padding={usesSideImage ? 10 : 8}
      />
    ) : null;

  return (
    <article
      className={cn(
        STYLING_UTILS.card,
        STYLING_UTILS.borderRadius.lg,
        STYLING_UTILS.shadow,
        'grid max-w-full min-w-0 overflow-hidden',
        { 'lg:grid-cols-[0.9fr_1.1fr]': usesSideImage },
      )}
    >
      <div
        className={`flex min-w-0 flex-col justify-between gap-8 ${SPACING.cardPadding}`}
      >
        <div>
          <div className="mb-5">
            <StatusBadge
              status={status.value}
              number={number}
              variant="primary"
            />
          </div>

          <h3 className="text-foreground text-2xl leading-tight font-semibold tracking-tight text-balance break-words">
            {title}
          </h3>
          <p className="text-muted-foreground mt-3 text-sm leading-7 break-words">
            {subtitle}
          </p>

          <dl className="border-border/50 mt-7 grid gap-4 border-t pt-6 sm:grid-cols-2">
            {metadata.map((item) => (
              <DefinitionItem
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </dl>

          {!usesSideImage && imagePanel ? (
            <div className="mt-7">{imagePanel}</div>
          ) : null}
        </div>

        <div className="flex flex-col items-start">
          <CaseStudyTags tags={tags} />
          <Link
            href={caseStudyLink}
            className="text-primary focus:ring-primary/50 mt-6 ml-auto inline-flex rounded px-2 py-1 text-sm font-medium transition-colors hover:underline focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label={`View ${title} case study`}
          >
            View case study
          </Link>
        </div>
      </div>

      {usesSideImage ? imagePanel : null}
    </article>
  );
}

export const CaseStudyPreviewCard = memo(CaseStudyPreviewCardComponent);
