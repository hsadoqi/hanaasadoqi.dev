import { LinkButton } from '@/components/shared';
import { ButtonVariant } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Cta } from '@/types';
import React from 'react';

export type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  id?: string;
  headingClassName?: string;
  ctaLinks?: Cta[];
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  id,
  headingClassName,
  ctaLinks,
}: SectionHeaderProps) {
  return (
    <div
      id={id}
      className={cn(
        'flex w-full flex-1 flex-col gap-4',
        {
          'sm:flex-row sm:items-end sm:justify-between':
            ctaLinks && ctaLinks?.length > 0,
        },
        className,
      )}
    >
      <span className="flex flex-col gap-2 text-left">
        {eyebrow ? <p className="type-eyebrow mb-1">{eyebrow}</p> : null}
        <h2 className={cn('type-section-title', headingClassName)}>{title}</h2>
        {description ? (
          <p className="type-body max-w-2xl">{description}</p>
        ) : null}
      </span>
      {ctaLinks &&
        ctaLinks.map(
          (cta) =>
            cta.link && (
              <LinkButton
                key={cta.link}
                href={cta.link}
                variant={cta.variant as ButtonVariant}
                className="w-fit"
              >
                {cta.label}
              </LinkButton>
            ),
        )}
    </div>
  );
}
