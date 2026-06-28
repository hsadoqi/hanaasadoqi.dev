'use client';

import React from 'react';

export type PillVariant = 'default' | 'tech' | 'status' | 'focus';

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: PillVariant;
  status?: 'in-progress' | 'completed' | 'planned';
}

export function Pill({
  children,
  variant = 'default',
  status,
  className,
  ...props
}: PillProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-[0.12em] uppercase transition-colors motion-safe:duration-200';

  const variantStyles: Record<PillVariant, string> = {
    default: 'bg-muted/30 border border-border/40 text-foreground/80',
    tech: 'bg-muted/30 border border-border/40 text-foreground/80',
    status: status
      ? `status-badge-${status}`
      : 'bg-muted/30 border border-border/40 text-foreground/80',
    focus: 'bg-muted/30 border border-border/40 text-foreground/80',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className || ''}`;

  return (
    <div className={combinedClassName.trim()} data-status={status} {...props}>
      {children}
    </div>
  );
}
