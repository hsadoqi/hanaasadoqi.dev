'use client';

import { useMemo } from 'react';
import { BookOpenIcon, ListIcon } from 'lucide-react';

import {
  IndexView,
  StatusBadge,
  type IndexViewFilter,
  type IndexViewSortOption,
  type IndexViewView,
} from '@/components/shared';
import type { WritingArticle } from '../types';

const writingStatusVariant: Record<WritingArticle['status'], string> = {
  Published: 'live',
  Draft: 'draft',
  Planned: 'planned',
};

function WritingArticleCard({ article }: { article: WritingArticle }) {
  return (
    <article className="border-border/30 hover:border-border/60 bg-card text-card-foreground rounded-lg border p-5 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <h2 className="type-card-title-sm text-foreground">{article.title}</h2>
        <StatusBadge
          status={writingStatusVariant[article.status]}
          className="shrink-0"
        >
          {article.status}
        </StatusBadge>
      </div>
      <p className="type-body-sm mt-3">{article.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="border-border/40 text-muted-foreground rounded-md border px-2.5 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function WritingArticleListItem({ article }: { article: WritingArticle }) {
  return (
    <article className="border-border/30 border-b p-5 last:border-b-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-foreground text-base font-semibold">
            {article.title}
          </h2>
          <p className="type-body-sm mt-2 max-w-3xl">{article.summary}</p>
        </div>
        <StatusBadge
          status={writingStatusVariant[article.status]}
          className="w-fit shrink-0"
        >
          {article.status}
        </StatusBadge>
      </div>
    </article>
  );
}

export function WritingIndex({ articles }: { articles: WritingArticle[] }) {
  const filters = useMemo<Array<IndexViewFilter<WritingArticle>>>(
    () => [
      {
        id: 'status',
        label: 'Status',
        getValue: (article) => article.status,
      },
      {
        id: 'topic',
        label: 'Topic',
        getValue: (article) => article.tags,
        maxOptions: 10,
        sortOptions: (a, b) =>
          b.count - a.count || a.label.localeCompare(b.label),
      },
    ],
    [],
  );

  const sortOptions = useMemo<Array<IndexViewSortOption<WritingArticle>>>(
    () => [
      {
        id: 'status',
        label: 'Status',
        compare: (a, b) =>
          a.status.localeCompare(b.status) || a.title.localeCompare(b.title),
      },
      {
        id: 'title-asc',
        label: 'Title (A-Z)',
        compare: (a, b) => a.title.localeCompare(b.title),
      },
      {
        id: 'title-desc',
        label: 'Title (Z-A)',
        compare: (a, b) => b.title.localeCompare(a.title),
      },
    ],
    [],
  );

  const views = useMemo<Array<IndexViewView<WritingArticle>>>(
    () => [
      {
        id: 'grid',
        label: 'Grid',
        renderIcon: () => <BookOpenIcon className="size-4" />,
        render: (items) => (
          <div className="grid gap-5 md:grid-cols-2">
            {items.map((article) => (
              <WritingArticleCard key={article.id} article={article} />
            ))}
          </div>
        ),
      },
      {
        id: 'list',
        label: 'List',
        renderIcon: () => <ListIcon className="size-4" />,
        render: (items) => (
          <div className="border-border/30 overflow-hidden rounded-lg border">
            {items.map((article) => (
              <WritingArticleListItem key={article.id} article={article} />
            ))}
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <IndexView
      defaultSortId="status"
      defaultViewId="grid"
      emptyState={{
        title: 'No writing found',
        description:
          'Try adjusting your search or filters. You can search by title, summary, status, or topic.',
      }}
      eyebrow="Notes"
      filters={filters}
      itemLabelPlural="articles"
      itemLabelSingular="article"
      items={articles}
      search={{
        label: 'Search writing',
        placeholder: 'Search by title, status, or topic...',
        getText: (article) => [
          article.title,
          article.summary,
          article.status,
          ...article.tags,
        ],
      }}
      sortOptions={sortOptions}
      title="Writing"
      views={views}
    />
  );
}
