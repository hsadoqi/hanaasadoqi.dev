'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button, buttonVariants } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  breakpointQueries,
  collapseMap,
  type CollapseAt,
} from '@/lib/breakpoints';
import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';

type IconButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    icon: React.ReactNode;
    label: string;
    collapseAt?: CollapseAt;
    asChild?: boolean;
  };

export function IconButton({
  icon,
  label,
  collapseAt,
  className,
  variant = 'ghost',
  size,
  children,
  ...props
}: IconButtonProps) {
  const hasCollapsibleLabel = !!collapseAt;
  const resolvedSize = size ?? (hasCollapsibleLabel ? 'default' : 'icon');
  const isCollapsed = useMediaQuery(
    collapseAt ? breakpointQueries[collapseAt] : '',
  );
  const showTooltip = !collapseAt || isCollapsed;

  const button = (
    <Button
      variant={variant}
      size={resolvedSize}
      aria-label={label}
      className={cn(hasCollapsibleLabel && 'gap-2', className)}
      {...props}
    >
      {icon}
      {hasCollapsibleLabel && (
        <span className={cn('sr-only', collapseMap[collapseAt])}>
          {children ?? label}
        </span>
      )}
    </Button>
  );

  if (!showTooltip) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
