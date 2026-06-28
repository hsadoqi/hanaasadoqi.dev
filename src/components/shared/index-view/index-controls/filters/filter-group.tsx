import type { ReactNode } from 'react';

type FilterGroupProps = {
  children: ReactNode;
  label: string;
};

export function FilterGroup({ children, label }: FilterGroupProps) {
  return (
    <div>
      <p className="text-muted-foreground/70 mb-2 text-xs font-medium tracking-wider uppercase">
        {label}
      </p>
      <div className="border-border/40 bg-muted/20 flex flex-wrap gap-1 rounded-lg border p-1">
        {children}
      </div>
    </div>
  );
}
