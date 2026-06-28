import type { ReactNode } from 'react';
import { StateView, type StateViewAction } from './state-view';
import { Inbox } from 'lucide-react';

export type EmptyStateAction = StateViewAction;

export interface EmptyStateProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: EmptyStateAction;
  children?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({
  action,
  children,
  description,
  eyebrow,
  icon,
  title,
}: EmptyStateProps) {
  return (
    <StateView
      actions={action ? [{ ...action, variant: 'primary' }] : undefined}
      description={description}
      eyebrow={eyebrow}
      icon={
        icon ?? (
          <span className="bg-muted/40 text-muted-foreground inline-flex h-12 w-12 items-center justify-center rounded-full">
            <Inbox aria-hidden="true" className="h-6 w-6" />
          </span>
        )
      }
      title={title}
    >
      {children}
    </StateView>
  );
}
