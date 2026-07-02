import Link from 'next/link';
import { type ReactNode } from 'react';

import { MDXContent } from '@/components/mdx';
import { RenderSection } from '@/components/shared/blocks/render-section';
import { ProjectLinkIcon } from '@/features/icons/project-icons';
import { cn } from '@/lib/utils';
import type { PresentationalSection } from '@/types';

type RenderableLink = {
  href: string;
  label: string;
  isExternal: boolean;
  isDisabled: boolean;
  kind?: string;
};

type ContentShowCard = {
  id: string;
  label: string;
  body: ReactNode;
  action?: ReactNode;
};

type ContentShowContentProps = {
  cards?: ContentShowCard[];
  cardColumns?: 2 | 3;
  children?: ReactNode;
  contentClassName?: string;
  linkItems?: RenderableLink[];
  mdx?: string;
  sectionClassName?: string;
  sections?: PresentationalSection[];
};

const cardGridColumns: Record<
  NonNullable<ContentShowContentProps['cardColumns']>,
  string
> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

export function ContentShowContent({
  cards = [],
  cardColumns = 2,
  children,
  contentClassName,
  linkItems = [],
  mdx,
  sectionClassName,
  sections = [],
}: ContentShowContentProps) {
  return (
    <section
      className={cn(
        'border-border/40 border-b px-6 py-16 sm:px-8 sm:py-24 lg:px-12',
        sectionClassName,
      )}
    >
      <div className={cn('mx-auto max-w-4xl space-y-12', contentClassName)}>
        {cards.length > 0 ? (
          <div className={cn('grid gap-4', cardGridColumns[cardColumns])}>
            {cards.map((card) => (
              <div
                key={card.id}
                className="border-border/40 bg-background/50 rounded-lg border p-5"
              >
                <p className="type-eyebrow mb-3">{card.label}</p>
                <div className="type-body-sm">{card.body}</div>
                {card.action}
              </div>
            ))}
          </div>
        ) : null}

        {children}

        {linkItems.length > 0 ? (
          <div className="space-y-3">
            <p className="type-eyebrow">Links</p>
            <div className="flex flex-wrap gap-2">
              {linkItems.map((item) => {
                const content = (
                  <span className="inline-flex items-center gap-2">
                    <ProjectLinkIcon kind={item.kind} label={item.label} />
                    <span>{item.label}</span>
                  </span>
                );

                if (item.isDisabled) {
                  return (
                    <span
                      key={`${item.kind}-${item.href}`}
                      className="border-border/30 bg-muted/30 text-muted-foreground inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium"
                      aria-disabled="true"
                    >
                      {content}
                    </span>
                  );
                }

                const sharedClassName =
                  'border-border/50 bg-background hover:border-border/80 hover:bg-muted/40 focus-visible:ring-ring inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

                return item.isExternal ? (
                  <a
                    key={`${item.kind}-${item.href}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={sharedClassName}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={`${item.kind}-${item.href}`}
                    href={item.href}
                    className={sharedClassName}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        {sections.map((section, idx) => (
          <RenderSection key={idx} section={section} />
        ))}

        {mdx ? (
          <div className="prose-portfolio space-y-10">
            <MDXContent code={mdx} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export type { ContentShowCard };
