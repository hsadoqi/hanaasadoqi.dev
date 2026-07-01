import type { ReactNode } from 'react';

type ControlFieldProps = {
  children: ReactNode;
  className?: string;
  label: string;
  showLabel?: boolean;
};

export function ControlField({
  children,
  className,
  label,
  showLabel = true,
}: ControlFieldProps) {
  return (
    <div className={className}>
      {showLabel && (
        <span className="text-foreground mb-2 block text-sm font-medium">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
