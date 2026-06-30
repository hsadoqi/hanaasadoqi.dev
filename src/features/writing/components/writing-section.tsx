'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/section';
import { StatusBadge } from '@/components/shared/badges';
import { writingArticles } from '../data';

const MOBILE_INITIAL = 3;

const writingStatusVariant: Record<'Published' | 'Draft' | 'Planned', string> =
  {
    Published: 'live',
    Draft: 'draft',
    Planned: 'planned',
  };

export function WritingSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleArticles = showAll
    ? writingArticles
    : writingArticles.slice(0, MOBILE_INITIAL);
  const remaining = writingArticles.length - MOBILE_INITIAL;

  return (
    <Section
      id="writing"
      header={{
        eyebrow: 'Writing',
        title: 'Musings, but Tech',
        description: 'The fruit of many a night spent down rabbit holes. ',
      }}
    >
      <div className="space-y-0">
        {visibleArticles.map((article, index) => (
          <article
            key={article.id}
            className={`border-border/20 hover:border-border/40 hover:bg-background/40 space-y-4 rounded-md px-4 py-7 motion-safe:transition-all motion-safe:duration-200 sm:px-6 sm:py-8 ${
              index !== visibleArticles.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="type-card-title-sm hover:text-foreground flex-1 motion-safe:transition-colors motion-safe:duration-200 sm:text-lg">
                {article.title}
              </h3>
              <StatusBadge
                status={writingStatusVariant[article.status]}
                className="flex-shrink-0"
              >
                {article.status}
              </StatusBadge>
            </div>

            <p className="type-body-sm max-w-3xl">{article.summary}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-subtle-content bg-background/60 border-border/30 hover:border-border/60 hover:bg-background rounded-md border px-2.5 py-1 text-xs font-medium motion-safe:transition-all motion-safe:duration-200`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="border-border/30 type-body-sm hover:text-secondary-content hover:border-border/50 hover:bg-background/60 focus-visible:ring-ring focus-visible:ring-offset-background mt-8 w-full rounded-md border px-4 py-3 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200"
        >
          Show
        </button>
      )}

      {showAll && writingArticles.length > MOBILE_INITIAL && (
        <button
          onClick={() => setShowAll(false)}
          className="border-border/30 type-body-sm hover:text-secondary-content hover:border-border/50 hover:bg-background/60 focus-visible:ring-ring focus-visible:ring-offset-background mt-8 w-full rounded-md border px-4 py-3 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-all motion-safe:duration-200"
        >
          Show less
        </button>
      )}
    </Section>
  );
}
