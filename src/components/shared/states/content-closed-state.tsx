import { Lock } from 'lucide-react';
import type { ReactNode } from 'react';
import { StateView, type StateViewAction } from './state-view';

type ContentClosedStateProps = {
  contentType: 'project' | 'case study';
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: StateViewAction[];
  children?: ReactNode;
};

export function ContentClosedState({
  actions,
  children,
  contentType,
  description,
  eyebrow = 'Coming soon',
  title,
}: ContentClosedStateProps) {
  return (
    <StateView
      actions={
        actions ?? [
          { href: '/projects', label: 'View published work →' },
          { href: '/', label: 'Back home', variant: 'secondary' },
        ]
      }
      description={
        description ??
        `This ${contentType} is still being written and is not part of the published portfolio yet.`
      }
      eyebrow={eyebrow}
      icon={
        <span className="border-border/50 bg-background text-muted-foreground shadow-elevation-1 inline-flex h-12 w-12 items-center justify-center rounded-full border">
          <Lock aria-hidden="true" className="h-5 w-5" />
        </span>
      }
      title={title}
    >
      {children}
    </StateView>
  );
}
