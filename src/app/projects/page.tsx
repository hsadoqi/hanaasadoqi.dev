import type { Metadata } from 'next';

import { loadAllProjects } from '@/features/projects/lib';
import { ProjectsIndex } from '@/features/projects/components/views/projects-index';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore project work, related case studies, architecture decisions, and implementation notes.',
};

export default async function ProjectsPage() {
  const projects = await loadAllProjects();

  return <ProjectsIndex projects={projects} />;
}
