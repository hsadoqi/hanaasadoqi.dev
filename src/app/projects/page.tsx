import type { Metadata } from 'next';

import { ProjectsIndex } from '@/features/projects/components/layouts/projects-index/projects-index';
import { loadAllProjects } from '@/features/projects/lib';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore project work, related case studies, architecture decisions, and implementation notes.',
};

export default async function ProjectsPage() {
  const projects = await loadAllProjects();

  return <ProjectsIndex projects={projects} />;
}
