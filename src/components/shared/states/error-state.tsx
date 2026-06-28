import { AlertTriangle } from 'lucide-react';
import { StateView, type StateViewAction } from './state-view';

export interface ErrorStateProps {
  action?: StateViewAction;
  eyebrow?: string;
  title?: string;
  description?: string;
  digest?: string;
  onRetry?: () => void;
}

export function ErrorState({
  action,
  description = 'Try again, or return to the previous page if the problem continues.',
  digest,
  eyebrow = 'Something went wrong',
  onRetry,
  title = 'This view could not load.',
}: ErrorStateProps) {
  return (
    <StateView
      title={title}
      actions={action ? [action] : undefined}
      description={description}
      eyebrow={eyebrow}
      icon={
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
          <AlertTriangle aria-hidden="true" className="h-6 w-6" />
        </span>
      }
    >
      {digest ? (
        <p className="text-muted-foreground/50 mt-3 font-mono text-[11px]">
          Error ID: {digest}
        </p>
      ) : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          Try again
        </button>
      ) : null}
    </StateView>
  );
}
