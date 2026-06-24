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

export function IconLink({
  className,
  href,
  label,
  icon,
  collapseAt,
  children,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  collapseAt?: CollapseAt;
  children?: React.ReactNode;
  className?: string;
}) {
  const isCollapsed = useMediaQuery(
    collapseAt ? breakpointQueries[collapseAt] : '',
  );
  const showTooltip = !collapseAt || isCollapsed;
  const link = (
    <Link
      href={href}
      className={cn(
        'border-border bg-background text-foreground hover:bg-muted focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
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
