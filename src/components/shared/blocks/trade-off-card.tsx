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
      <h3 className="text-foreground text-base font-semibold">{title}</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-foreground/60 mb-1 text-xs font-medium">
            We chose
          </p>
          <p className="text-muted-foreground/80 text-sm">{whatWeChose}</p>
        </div>
        <div>
          <p className="text-foreground/60 mb-1 text-xs font-medium">
            What it cost
          </p>
          <p className="text-muted-foreground/80 text-sm">{whatItCost}</p>
        </div>
      </div>

      {whenWeReconsider && (
        <div className="border-border/20 border-t pt-2">
          <p className="text-foreground/60 mb-1 text-xs font-medium">
            We might reconsider if...
          </p>
          <p className="text-muted-foreground/70 text-sm">{whenWeReconsider}</p>
        </div>
      )}
    </div>
  );
}
