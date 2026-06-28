import { EmptyState } from '@/components/shared';

export default function NotFound() {
  return (
    <EmptyState
      eyebrow="Page not found"
      title="This page does not exist."
      description="The page may have moved, or the URL may be incorrect."
      action={{ href: '/', label: 'Return home →' }}
    />
  );
}
