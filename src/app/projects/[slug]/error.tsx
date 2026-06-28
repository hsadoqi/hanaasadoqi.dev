'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/shared';

export default function ProjectError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      eyebrow="Project error"
      title="This case study could not load."
      description="Try loading it again, or return to the project index if the problem continues."
      digest={error.digest}
      onRetry={unstable_retry}
    />
  );
}
