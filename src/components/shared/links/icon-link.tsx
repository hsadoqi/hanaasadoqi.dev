'use client';

import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  breakpointQueries,
  collapseMap,
  type CollapseAt,
} from '@/lib/breakpoints';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

export function IconLink({
  className,
  href,
  label,
  icon,
  collapseAt,
  children,
  target,
  rel,
  variant = 'default',
  size = 'md',
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  collapseAt?: CollapseAt;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}) {
  const isCollapsed = useMediaQuery(
    collapseAt ? breakpointQueries[collapseAt] : '',
  );
  const showTooltip = !collapseAt || isCollapsed;
  const link = (
    <Link
      href={href}
      className={clsx(
        'focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center rounded-md font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        {
          'border-border bg-foreground text-accent hover:bg-muted hover:text-brand border':
            variant === 'default',
          'border-border bg-background text-accent hover:bg-muted hover:text-brand border':
            variant === 'outline',
          'text-foreground hover:bg-brand/40 bg-transparent':
            variant === 'ghost',
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-2 text-sm': size === 'md',
          'px-4 py-3 text-base': size === 'lg',
          'gap-2': !showTooltip,
        },
        className,
      )}
      target={target}
      rel={rel}
      aria-label={label}
    >
      {icon}
      {collapseAt ? (
        <span className={cn('sr-only', collapseMap[collapseAt])}>
          {children ?? label}
        </span>
      ) : (
        children
      )}
    </Link>
  );

  if (!showTooltip) return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
