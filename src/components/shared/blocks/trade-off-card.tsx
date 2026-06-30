export interface TradeOffCardProps {
  title: string;
  optionA?: string;
  optionB?: string;
  chosen?: 'A' | 'B';
  rationale?: string;
  consequences?: string;
  revisitTrigger?: string;
  whatWeChose?: string;
  whatItCost?: string;
  whenWeReconsider?: string;
}

export function TradeOffCard({
  consequences,
  chosen = 'A',
  optionA,
  optionB,
  rationale,
  title,
  revisitTrigger,
  whatItCost,
  whatWeChose,
  whenWeReconsider,
}: TradeOffCardProps) {
  const selectedDirection = whatWeChose ?? optionA ?? '';
  const alternativeDirection = optionB;
  const cost = whatItCost ?? consequences ?? '';
  const reason = rationale ?? selectedDirection;
  const revisit = whenWeReconsider ?? revisitTrigger;

  return (
    <div className="border-border/40 mb-4 space-y-5 rounded-lg border p-6">
      <div className="space-y-1">
        <p className="type-caption font-medium">Tradeoff</p>
        <h3 className="type-card-title-sm">{title}</h3>
      </div>

      {alternativeDirection ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div
            data-chosen={chosen === 'A'}
            className="border-border/30 data-[chosen=true]:border-foreground/40 rounded-md border p-4"
          >
            <p className="type-caption mb-1 font-medium">Option A</p>
            <p className="type-body-sm">{selectedDirection}</p>
          </div>

          <div
            data-chosen={chosen === 'B'}
            className="border-border/30 data-[chosen=true]:border-foreground/40 rounded-md border p-4"
          >
            <p className="type-caption mb-1 font-medium">Option B</p>
            <p className="type-body-sm">{alternativeDirection}</p>
          </div>
        </div>
      ) : null}

      <div className="border-border/20 space-y-4 border-t pt-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <p className="type-caption mb-1 font-medium">Why this direction</p>
            <p className="type-body-sm">{reason}</p>
          </div>

          {cost ? (
            <div className="flex-1">
              <p className="type-caption mb-1 font-medium">What it cost</p>
              <p className="type-body-sm">{cost}</p>
            </div>
          ) : null}
        </div>
        {revisit && (
          <div>
            <p className="type-caption mb-1 font-medium">Revisit trigger</p>
            <p className="type-body-sm">{revisit}</p>
          </div>
        )}
      </div>
    </div>
  );
}
