import Link from 'next/link';
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { LinkButton } from '@/components/shared/buttons/link-button';
import { cn } from '@/lib/utils';

import { MaskedIcon, type IconProps } from './icon-primitives';
import { GitHubIcon } from './social-icons';

type SvgIconProps = ComponentProps<'svg'>;

const iconSizeClassName = 'size-4 shrink-0';
const defaultHeroIconClassName = 'size-5 sm:size-6 shrink-0';

export const LiveSiteIcon = ({ className, ...props }: IconProps) => (
  <MaskedIcon
    src="/icons/globe.svg"
    className={cn(iconSizeClassName, className)}
    {...props}
  />
);

export const RepositoryIcon = ({ className, ...props }: IconProps) => (
  <GitHubIcon className={cn(iconSizeClassName, className)} {...props} />
);

export const FrontendRepoIcon = RepositoryIcon;
export const BackendRepoIcon = RepositoryIcon;

export const DesignSystemIcon = ({ className, ...props }: IconProps) => (
  <MaskedIcon
    src="/icons/design-system.svg"
    className={cn(iconSizeClassName, className)}
    {...props}
  />
);

export const DemoIcon = ({ className, ...props }: IconProps) => (
  <MaskedIcon
    src="/icons/window.svg"
    className={cn(iconSizeClassName, className)}
    {...props}
  />
);

export function DemoVideoIcon({ className, ...props }: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(iconSizeClassName, className)}
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9.5 15 12l-5 2.5z" />
    </svg>
  );
}

export const BlogIcon = ({ className, ...props }: IconProps) => (
  <MaskedIcon
    src="/icons/file.svg"
    className={cn(iconSizeClassName, className)}
    {...props}
  />
);

export const WritingIcon = BlogIcon;
export const ArticleIcon = BlogIcon;
export const DocsIcon = BlogIcon;

export const DesignIcon = DesignSystemIcon;
export const ProjectGitHubIcon = RepositoryIcon;
export const ProjectDesignIcon = DesignSystemIcon;

type ProjectLinkIconKind =
  | 'live'
  | 'launch'
  | 'website'
  | 'site'
  | 'repo'
  | 'repository'
  | 'github'
  | 'frontend'
  | 'backend'
  | 'design-system'
  | 'designsystem'
  | 'design'
  | 'demo'
  | 'video'
  | 'tutorial'
  | 'blog'
  | 'article'
  | 'docs'
  | 'writing';

type ProjectLinkIconComponent = ComponentType<{ className?: string }>;

const projectLinkIconMap: Record<string, ProjectLinkIconComponent> = {
  live: LiveSiteIcon,
  launch: LiveSiteIcon,
  website: LiveSiteIcon,
  site: LiveSiteIcon,
  repo: RepositoryIcon,
  repository: RepositoryIcon,
  github: RepositoryIcon,
  frontend: FrontendRepoIcon,
  backend: BackendRepoIcon,
  'design-system': DesignSystemIcon,
  designsystem: DesignSystemIcon,
  design: DesignSystemIcon,
  demo: DemoIcon,
  video: DemoVideoIcon,
  tutorial: DemoVideoIcon,
  blog: BlogIcon,
  article: BlogIcon,
  docs: DocsIcon,
  writing: WritingIcon,
};

const normalizeProjectLinkKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s._/]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

const resolveProjectLinkIconKey = (
  kind?: ProjectLinkIconKind | string,
  label?: string,
) => {
  const candidates = [kind, label]
    .filter(Boolean)
    .map((value) => normalizeProjectLinkKey(value as string));

  for (const candidate of candidates) {
    if (projectLinkIconMap[candidate]) {
      return candidate;
    }
  }

  const normalizedLabel = label ? normalizeProjectLinkKey(label) : '';

  if (
    normalizedLabel.includes('frontend') &&
    normalizedLabel.includes('github')
  ) {
    return 'frontend';
  }

  if (
    normalizedLabel.includes('backend') &&
    normalizedLabel.includes('github')
  ) {
    return 'backend';
  }

  if (
    normalizedLabel.includes('design') &&
    normalizedLabel.includes('system')
  ) {
    return 'design-system';
  }

  if (
    normalizedLabel.includes('live') ||
    normalizedLabel.includes('launch') ||
    normalizedLabel.includes('website') ||
    normalizedLabel.includes('site')
  ) {
    return 'live';
  }

  if (
    normalizedLabel.includes('demo') ||
    normalizedLabel.includes('tutorial') ||
    normalizedLabel.includes('video')
  ) {
    return normalizedLabel.includes('video') ? 'video' : 'demo';
  }

  if (
    normalizedLabel.includes('blog') ||
    normalizedLabel.includes('article') ||
    normalizedLabel.includes('writing') ||
    normalizedLabel.includes('docs')
  ) {
    return 'blog';
  }

  if (
    normalizedLabel.includes('github') ||
    normalizedLabel.includes('repo') ||
    normalizedLabel.includes('repository') ||
    normalizedLabel.includes('source')
  ) {
    return 'repo';
  }

  return undefined;
};

export function ProjectLinkIcon({
  children,
  kind,
  label,
  className,
  iconClassName,
  ...props
}: IconProps & {
  children?: ReactNode;
  kind?: ProjectLinkIconKind | string;
  label?: string;
  iconClassName?: string;
}) {
  const resolvedKey = resolveProjectLinkIconKey(kind, label);
  const Icon = resolvedKey ? projectLinkIconMap[resolvedKey] : undefined;
  const resolvedIconClassName = iconClassName ?? iconSizeClassName;

  return (
    <span
      aria-hidden="true"
      className={cn(
        'text-muted-foreground inline-flex shrink-0 items-center justify-center',
        className,
      )}
      {...props}
    >
      {children ?? (Icon ? <Icon className={resolvedIconClassName} /> : null)}
    </span>
  );
}

export type ProjectIconItem = {
  kind?: ProjectLinkIconKind | string;
  label: string;
  href?: string;
  external?: boolean;
};

export const ProjectIcons = ({
  items,
  className,
  iconClassName = defaultHeroIconClassName,
}: {
  items: ProjectIconItem[];
  className?: string;
  iconClassName?: string;
}) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {items.map((item) => {
        const icon = (
          <ProjectLinkIcon
            kind={item.kind}
            label={item.label}
            iconClassName={iconClassName}
          />
        );

        if (!item.href) {
          return <span key={item.label}>{icon}</span>;
        }

        return item.external ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {icon}
          </a>
        ) : (
          <LinkButton
            variant="ghost"
            size="icon-lg"
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className="inline-flex items-center justify-center rounded-md hover:scale-125 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-linear"
          >
            {icon}
          </LinkButton>
        );
      })}
    </div>
  );
};
