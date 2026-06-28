'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/shared';

export default function CaseStudyError({
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
      eyebrow="Case Study error"
      title="This case study could not load."
      description="Try loading it again, or return to the case study index if the problem continues."
      digest={error.digest}
      onRetry={unstable_retry}
    />
  );
}
