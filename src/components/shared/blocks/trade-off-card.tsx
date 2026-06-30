export interface TradeOffCardProps {
  title: string;
  whatWeChose: string;
  whatItCost: string;
  whenWeReconsider?: string;
}

export function TradeOffCard({
  title,
  whatWeChose,
  whatItCost,
  whenWeReconsider,
}: TradeOffCardProps) {
  return (
    <div className="border-border/40 mb-4 space-y-4 rounded-lg border p-6">
      <h3 className="type-card-title-sm">{title}</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="type-caption mb-1 font-medium">We chose</p>
          <p className="type-body-sm">{whatWeChose}</p>
        </div>
        <div>
          <p className="type-caption mb-1 font-medium">What it cost</p>
          <p className="type-body-sm">{whatItCost}</p>
        </div>
      </div>

      {whenWeReconsider && (
        <div className="border-border/20 border-t pt-2">
          <p className="type-caption mb-1 font-medium">
            We might reconsider if...
          </p>
          <p className="type-body-sm">{whenWeReconsider}</p>
        </div>
      )}
    </div>
  );
}
