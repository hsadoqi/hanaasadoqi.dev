'use client';
import { useMemo } from 'react';
import type { ConceptItem } from '../../types';
import { ConceptReceiptList } from '../concept-meta';

export function ConceptProofRanking({ items }: { items: ConceptItem[] }) {
  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        const availableA = a.receipts.filter(
          (receipt) => receipt.status === 'available',
        ).length;
        const availableB = b.receipts.filter(
          (receipt) => receipt.status === 'available',
        ).length;

        return (
          availableB * 3 +
          b.receipts.length -
          (availableA * 3 + a.receipts.length)
        );
      }),
    [items],
  );

  return (
    <div className="space-y-6">
      <div className="border-border/40 bg-muted/20 rounded-xl border p-5 sm:p-6">
        <p className="text-muted-foreground max-w-2xl text-sm leading-7">
          This version only becomes impressive when the proof column contains
          real links. Until then, it is useful as a pressure test: anything
          without a receipt may not deserve to be a standalone principle.
        </p>
      </div>

      <div className="grid gap-4">
        {sortedItems.map((item, index) => (
          <article
            key={item.title}
            className="border-border/40 grid gap-5 rounded-xl border p-5 sm:grid-cols-[1fr_300px] sm:p-6"
          >
            <div>
              <p className="text-muted-foreground/40 font-mono text-[11px] tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-heading text-foreground mt-2 text-2xl leading-tight font-semibold tracking-[-0.01em]">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7">
                {item.example}
              </p>
            </div>
            <ConceptReceiptList receipts={item.receipts} />
          </article>
        ))}
      </div>
    </div>
  );
}
