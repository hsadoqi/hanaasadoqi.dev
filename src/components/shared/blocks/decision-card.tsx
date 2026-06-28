'use client';

import { useState } from 'react';

export interface DecisionCardProps {
  title: string;
  teaser: string;
  answer: string;
  alternatives?: string[];
}

export function DecisionCard({
  title,
  teaser,
  answer,
  alternatives,
}: DecisionCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-border/40 bg-background overflow-hidden rounded-lg border motion-safe:transition-colors motion-safe:duration-200">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="hover:bg-muted/20 focus-visible:ring-ring flex w-full items-start justify-between gap-4 p-6 text-left focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-200"
      >
        <span className="space-y-2">
          <span className="text-foreground block text-sm font-semibold sm:text-base">
            {title}
          </span>
          <span className="text-muted-foreground/70 block text-sm">
            {teaser}
          </span>
        </span>
        <span
          className="text-muted-foreground/50 flex-shrink-0 text-xl leading-none"
          aria-hidden="true"
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <DecisionDetails alternatives={alternatives} answer={answer} />
      )}
    </div>
  );
}

function DecisionDetails({
  alternatives,
  answer,
}: {
  alternatives?: string[];
  answer: string;
}) {
  return (
    <div className="border-border/20 text-muted-foreground/70 space-y-3 border-t px-6 pt-4 pb-6 text-sm">
      <p>{answer}</p>
      {alternatives?.length ? (
        <div>
          <p className="text-muted-foreground/60 mb-2 text-xs font-medium">
            We considered:
          </p>
          <ul className="space-y-1">
            {alternatives.map((alt, i) => (
              <li key={i} className="text-muted-foreground/60 ml-4 text-xs">
                • {alt}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
