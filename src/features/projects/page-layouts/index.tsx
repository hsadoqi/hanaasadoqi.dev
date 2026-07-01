import { ProjectsIndex } from '../components';
import { loadAllProjects } from '../lib';

export default async function ProjectsPage() {
  const projects = await loadAllProjects();

  return <ProjectsIndex projects={projects} />;
}
