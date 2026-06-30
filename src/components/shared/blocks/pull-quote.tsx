export interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
}

export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote className="border-border/40 my-8 space-y-3 border-l-2 py-4 pl-6">
      <p className="type-body-lg text-foreground/90 italic">{children}</p>
      {attribution && <footer className="type-caption">— {attribution}</footer>}
    </blockquote>
  );
}
