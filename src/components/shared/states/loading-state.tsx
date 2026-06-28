import { StateView } from './state-view';

export interface LoadingStateProps {
  eyebrow?: string;
  title?: string;
}

export function LoadingState({
  eyebrow = 'Loading',
  title = 'Preparing the page',
}: LoadingStateProps) {
  return (
    <StateView eyebrow={eyebrow} title={title}>
      <div
        className="bg-muted/40 mt-6 h-1 overflow-hidden rounded-full"
        aria-hidden="true"
      >
        <div className="h-full w-1/3 rounded-full bg-blue-600 motion-safe:animate-pulse dark:bg-blue-400" />
      </div>
    </StateView>
  );
}
