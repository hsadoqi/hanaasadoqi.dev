import { EmptyState } from '@/components/shared';

export default function ProjectNotFound() {
  return (
    <EmptyState
      eyebrow="Project not found"
      title="This case study is not available."
      description="It may still be in draft or not part of the published project index."
      action={{ href: '/projects', label: 'View all projects →' }}
    />
  );
}
