import type { Metadata } from 'next';

import { Section } from '@/components/layout/section';
import { ProjectsIndexWithToolbar } from '@/features/projects/components/layouts/projects-index/projects-index-with-toolbar';
import { loadAllProjects } from '@/features/projects/lib';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore project work, related case studies, architecture decisions, and implementation notes.',
};

export default async function ProjectsPage() {
  const projects = await loadAllProjects();

  return (
    <Section id="projects" containerClassName="max-w-6xl">
      <ProjectsIndexWithToolbar projects={projects} />
    </Section>
  );
}
