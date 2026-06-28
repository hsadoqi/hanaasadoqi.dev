export interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
}

export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote className="border-border/40 my-8 space-y-3 border-l-2 py-4 pl-6">
      <p className="text-foreground/90 text-base leading-relaxed italic sm:text-lg">
        {children}
      </p>
      {attribution && (
        <footer className="text-muted-foreground/60 text-xs">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}
