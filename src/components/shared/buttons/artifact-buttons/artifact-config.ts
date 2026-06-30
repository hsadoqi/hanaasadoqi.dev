import {
  BookOpen,
  ExternalLink,
  FileText,
  GitBranch as Github,
  Layout,
  PlayCircle,
  Presentation,
} from 'lucide-react';

export const artifactConfig = {
  'live-site': {
    icon: ExternalLink,
    label: 'Live Site',
  },
  github: {
    icon: Github,
    label: 'GitHub',
  },
  storybook: {
    icon: Layout,
    label: 'Storybook',
  },
  video: {
    icon: PlayCircle,
    label: 'Demo Video',
  },
  figma: {
    icon: FileText,
    label: 'Figma',
  },
  documentation: {
    icon: BookOpen,
    label: 'Documentation',
  },
  'case-study': {
    icon: FileText,
    label: 'Case Study',
  },
  'blog-post': {
    icon: FileText,
    label: 'Article',
  },
  presentation: {
    icon: Presentation,
    label: 'Presentation',
  },
  'api-docs': {
    icon: BookOpen,
    label: 'API Docs',
  },
} as const;
