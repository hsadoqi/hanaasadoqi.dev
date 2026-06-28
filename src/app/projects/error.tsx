'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/shared';

export default function ProjectsError({
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
      eyebrow="Projects error"
      title="This project could not load."
      description="Try loading it again."
      digest={error.digest}
      onRetry={unstable_retry}
    />
  );
}
