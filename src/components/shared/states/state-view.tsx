import type { ReactNode } from 'react';
import Link from 'next/link';

type StateViewActionBase = {
  label: string;
  variant?: 'primary' | 'secondary';
};

export type StateViewAction =
  | (StateViewActionBase & {
      href: string;
      onClick?: never;
    })
  | (StateViewActionBase & {
      href?: never;
      onClick: () => void;
    });

export interface StateViewProps {
  actions?: StateViewAction[];
  children?: ReactNode;
  description?: string;
  eyebrow?: string;
  icon?: ReactNode;
  title: string;
}

const actionClasses = {
  primary:
    'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
  secondary: 'text-muted-foreground/70 hover:text-muted-foreground',
};

export function StateView({
  actions = [],
  children,
  description,
  eyebrow,
  icon,
  title,
}: StateViewProps) {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-6">
      <div className="max-w-sm text-center">
        {icon ? <div className="mb-6 flex justify-center">{icon}</div> : null}
        {eyebrow ? (
          <p className="text-muted-foreground/50 font-mono text-xs tracking-widest uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-foreground mt-2 text-2xl font-bold">{title}</h1>
        {description ? (
          <p className="text-muted-foreground/80 mt-3 text-sm leading-relaxed">
            {description}
          </p>
        ) : null}
        {children}
        {actions.length ? (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {actions.map((action) => {
              const className = `inline-block text-sm font-medium ${
                actionClasses[action.variant ?? 'primary']
              }`;

              if (action.href) {
                return (
                  <Link
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    className={className}
                  >
                    {action.label}
                  </Link>
                );
              }

              return (
                <button
                  key={`button-${action.label}`}
                  type="button"
                  onClick={action.onClick}
                  className={className}
                >
                  {action.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </main>
  );
}
