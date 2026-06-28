export interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <div className="space-y-3 py-10 sm:py-12">
      <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
        {children}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground/70 text-sm">{subtitle}</p>
      )}
    </div>
  );
}
