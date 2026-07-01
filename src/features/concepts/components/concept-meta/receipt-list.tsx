import type { ConceptReceipt } from '../../types';

export function ConceptReceiptList({
  receipts,
}: {
  receipts: ConceptReceipt[];
}) {
  return (
    <div>
      <p className="text-muted-foreground/50 mb-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
        Proof of concept
      </p>
      <div className="space-y-2">
        {receipts.map((receipt) => {
          const content = (
            <>
              <span className="text-foreground/75 text-xs font-medium">
                {receipt.label}
              </span>
              <span className="text-muted-foreground/50 text-[11px]">
                {receipt.type} · {receipt.status}
              </span>
            </>
          );

          if (receipt.href) {
            return (
              <a
                key={receipt.label}
                href={receipt.href}
                className="border-border/40 hover:border-border block rounded-lg border px-3 py-2 motion-safe:transition-colors"
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={receipt.label}
              className="border-border/40 rounded-lg border px-3 py-2"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
