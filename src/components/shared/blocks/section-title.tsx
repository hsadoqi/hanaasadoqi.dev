export interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <div className="space-y-3 py-8 sm:py-10">
      <h2 className="type-section-title">{children}</h2>
      {subtitle && <p className="type-body-sm">{subtitle}</p>}
    </div>
  );
}
