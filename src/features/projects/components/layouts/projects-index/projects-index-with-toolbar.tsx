'use client';

import { useMemo } from 'react';

import { getProjectDisplay } from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import { useProjectsFilter } from '@/hooks/use-projects-filter';
import { ProjectsToolbar } from '@/components/shared/index-view/index-toolbar/projects-toolbar';
import { ProjectsGrid } from '../projects-grid';
import { ProjectsList } from '../projects-list';

type ProjectsIndexWithToolbarProps = {
  projects: Project[];
};

export function ProjectsIndexWithToolbar({
  projects,
}: ProjectsIndexWithToolbarProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    allTags,
    filteredItems,
    resultCount,
    clearFilters,
  } = useProjectsFilter<Project>({
    items: projects,
    getTitle: (project) => project.title,
    getDescription: (project) => getProjectDisplay(project).subtitle || '',
    getTags: (project) => getProjectDisplay(project).tags || [],
    getFeatured: (project) => project.featured,
    getSearchText: (project) => {
      const display = getProjectDisplay(project);

      return [
        display.title,
        display.subtitle,
        display.status,
        ...display.tags,
        ...display.techStack,
      ];
    },
  });

  const emptyState = useMemo(
    () => ({
      title: 'No projects found',
      description:
        'Try adjusting your search or filters. You can search by project name, description, or tags.',
    }),
    [],
  );
  const hasActiveControls = Boolean(searchQuery) || selectedTags.length > 0;

  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-4">
        <p className="text-muted-foreground text-sm font-medium tracking-[0.25em] uppercase">
          Projects
        </p>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Project work, systems thinking, and the case studies behind them.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base leading-8">
          Browse the projects, filter by focus area, and jump directly into the
          most relevant case study when one is available.
        </p>
      </header>

      <section
        aria-labelledby="projects-browser-heading"
        className="border-border/30 bg-card/20 -mx-6 border-y px-6 py-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
      >
        <div className="mx-auto max-w-6xl space-y-7">
          <div className="flex flex-col gap-4 border-b border-border/20 pb-6">
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
                Browse
              </p>
              <h2
                id="projects-browser-heading"
                className="text-foreground mt-1 text-xl font-semibold tracking-tight"
              >
                {resultCount} project{resultCount === 1 ? '' : 's'}
              </h2>
            </div>

            <ProjectsToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              allTags={allTags}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {filteredItems.length > 0 ? (
            <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
              {viewMode === 'grid' ? (
                <ProjectsGrid projects={filteredItems} />
              ) : (
                <ProjectsList projects={filteredItems} />
              )}
            </div>
          ) : (
            <div className="border-border/20 bg-background/40 flex flex-col items-center justify-center rounded-lg border p-12 text-center backdrop-blur-sm">
              <h3 className="text-foreground mb-2 text-lg font-semibold">
                {emptyState.title}
              </h3>
              <p className="text-secondary-content mb-4 max-w-sm text-sm">
                {emptyState.description}
              </p>
              {hasActiveControls ? (
                <button
                  onClick={clearFilters}
                  className="text-accent hover:text-accent/80 text-sm font-medium motion-safe:transition-colors"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
