import Link from 'next/link';
import { type VariantProps } from 'class-variance-authority';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type LinkButtonProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

export function LinkButton({
  href,
  className,
  variant,
  size,
  children,
  ...props
}: LinkButtonProps) {
  if (typeof href === 'string' && href.startsWith('#')) {
    return (
      <Button asChild variant={variant} size={size} className={cn(className)}>
        <a {...props} href={href}>
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link {...props} href={href}>
        {children}
      </Link>
    </Button>
  );
}
