'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { ConceptItem } from '../../types';
import { ConceptMeta } from '../concept-meta';

export function ConceptGlossary({ items }: { items: ConceptItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-border/40 border-border/40 overflow-hidden rounded-xl border">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <article key={item.title} className="divide-border/30 divide-y">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="hover:bg-muted/20 focus-visible:ring-ring flex w-full items-center justify-between gap-6 p-5 text-left focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors sm:p-6"
              aria-expanded={isOpen}
            >
              <span className="flex items-start gap-4">
                <span className="text-muted-foreground/40 mt-1 font-mono text-[11px] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-heading text-foreground text-xl leading-tight font-semibold tracking-[-0.01em] sm:text-2xl">
                  {item.title}
                </span>
              </span>
              <span
                className={cn(
                  'text-muted-foreground motion-safe:transition-transform motion-safe:duration-200',
                  isOpen && 'rotate-45',
                )}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            {isOpen && (
              <div className="grid gap-5 px-5 pb-6 sm:grid-cols-[1fr_0.75fr] sm:px-6">
                <p className="text-muted-foreground text-sm leading-7">
                  {item.description}
                </p>
                <ConceptMeta item={item} />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
