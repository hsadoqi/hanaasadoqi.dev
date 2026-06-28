'use client';

import { Grid, List } from 'lucide-react';

import { IndexToolbar } from './index-toolbar';

type SortOption = 'featured' | 'name-asc' | 'name-desc';
type ViewMode = 'grid' | 'list';

const sortOptions: Array<{ id: SortOption; label: string }> = [
  { id: 'featured', label: 'Featured first' },
  { id: 'name-asc', label: 'Name (A-Z)' },
  { id: 'name-desc', label: 'Name (Z-A)' },
];

const viewOptions = [
  {
    id: 'grid' as const,
    label: 'Grid view',
    renderIcon: () => <Grid className="h-5 w-5" />,
  },
  {
    id: 'list' as const,
    label: 'List view',
    renderIcon: () => <List className="h-5 w-5" />,
  },
];

type ProjectsToolbarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  allTags: string[];
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
};

export function ProjectsToolbar({
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagsChange,
  allTags,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ProjectsToolbarProps) {
  return (
    <IndexToolbar<ViewMode, SortOption>
      filter={{
        allValues: allTags,
        label: 'Filter by focus area',
        onChange: onTagsChange,
        selectedValues: selectedTags,
      }}
      search={{
        label: 'Search projects',
        onChange: onSearchChange,
        placeholder: 'Search by title, tech, or focus...',
        query: searchQuery,
      }}
      sort={{
        label: 'Sort',
        onChange: onSortChange,
        options: sortOptions,
        value: sortBy,
      }}
      view={{
        label: viewMode === 'grid' ? 'Grid view' : 'List view',
        onChange: onViewModeChange,
        renderLabel: (viewId) =>
          viewId === 'grid' ? 'Grid view' : 'List view',
        value: viewMode,
        views: viewOptions,
      }}
    />
  );
}
