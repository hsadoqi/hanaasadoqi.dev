'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

import type { ConceptItem } from '../types';
import { SelectedConceptPanel } from './selected-concept-panel';

export function ConceptBrowser({ items }: { items: ConceptItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:items-start">
      <div className="space-y-1">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                'group border-border/30 flex w-full items-start gap-4 border-b py-4 text-left',
                'focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:outline-none',
              )}
              aria-pressed={isActive}
            >
              <span className="text-muted-foreground/40 mt-1 font-mono text-[11px] tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'font-heading text-foreground block origin-left text-2xl leading-[1.08] font-semibold tracking-[-0.01em]',
                  'group-hover:scale-[1.025] motion-safe:transition-transform motion-safe:duration-200 sm:text-3xl',
                  isActive && 'text-brand scale-[1.025]',
                )}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      <SelectedConceptPanel item={active} eyebrow="Selected lens" />
    </div>
  );
}
