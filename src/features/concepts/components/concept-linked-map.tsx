'use client';

import { useState } from 'react';
import type { ConceptGroup, ConceptItem } from '../types';
import { cn } from '@/lib/utils';
import { ConceptTags } from './concept-meta';

export function ConceptLinkedMap({
  groups,
  items,
}: {
  groups: ConceptGroup[];
  items: ConceptItem[];
}) {
  const [activeGroup, setActiveGroup] = useState(groups[0]?.name ?? '');
  const group = groups.find((item) => item.name === activeGroup) ?? groups[0];
  const relatedItems = items.filter((item) =>
    group?.concepts.includes(item.title),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="space-y-3">
        {groups.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActiveGroup(item.name)}
            className={cn(
              'border-border/40 w-full rounded-xl border p-4 text-left motion-safe:transition-all motion-safe:duration-200',
              'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
              item.name === activeGroup
                ? 'bg-muted/30 text-foreground'
                : 'text-muted-foreground hover:border-border hover:bg-muted/20 hover:text-foreground',
            )}
          >
            <span className="block text-sm font-semibold">{item.name}</span>
            <span className="mt-2 block text-xs leading-6 opacity-75">
              {item.description}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.18em] uppercase">
            Concepts connected to {group?.name}
          </p>
          <h3 className="font-heading text-foreground mt-2 text-3xl leading-tight font-semibold tracking-[-0.01em]">
            Principles become useful when they point somewhere.
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {relatedItems.map((item) => (
            <article
              key={item.title}
              className="border-border/40 hover:border-border rounded-xl border p-5 motion-safe:transition-colors"
            >
              <h4 className="font-heading text-foreground text-xl leading-snug font-semibold tracking-[-0.01em]">
                {item.title}
              </h4>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                {item.example}
              </p>
              <div className="mt-4">
                <ConceptTags label="Writing hooks" items={item.writing} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
