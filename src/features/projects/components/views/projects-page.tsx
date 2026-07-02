import { loadAllProjects } from '../../lib';
import { ProjectsIndex } from './projects-index';

export default async function ProjectsPage() {
  const projects = await loadAllProjects();

  return <ProjectsIndex projects={projects} />;
}
