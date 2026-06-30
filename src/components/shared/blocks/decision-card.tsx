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
          <span className="type-card-title-sm block">{title}</span>
          <span className="type-body-sm block">{teaser}</span>
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
    <div className="border-border/20 type-body-sm space-y-3 border-t px-6 pt-4 pb-6">
      <p>{answer}</p>
      {alternatives?.length ? (
        <div>
          <p className="type-caption mb-2 font-medium">We considered:</p>
          <ul className="space-y-1">
            {alternatives.map((alt, i) => (
              <li key={i} className="type-caption ml-4">
                • {alt}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
