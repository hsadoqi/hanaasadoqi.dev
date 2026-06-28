'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/shared';

export default function CaseStudiesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="Case studies failed to load"
      description="Something went wrong while loading the case-study index."
      onRetry={reset}
    />
  );
}
