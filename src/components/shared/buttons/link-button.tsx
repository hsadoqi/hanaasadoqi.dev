import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { ExternalLink } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type BaseLinkButtonProps = VariantProps<typeof buttonVariants> & {
  href: React.ComponentProps<typeof Link>['href'] | string;
  className?: string;
  children: ReactNode;
  external?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  showExternalIcon?: boolean;
};

type LinkButtonProps = BaseLinkButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseLinkButtonProps>;

function isAnchorLink(href: BaseLinkButtonProps['href']) {
  return (
    typeof href === 'string' && (href.startsWith('#') || href.startsWith('/#'))
  );
}

function isExternalHref(href: BaseLinkButtonProps['href']) {
  return typeof href === 'string' && /^https?:\/\//.test(href);
}

export function LinkButton({
  href,
  className,
  variant,
  size,
  children,
  external,
  iconLeft,
  iconRight,
  showExternalIcon = true,
  target,
  rel,
  ...props
}: LinkButtonProps) {
  const shouldUseAnchor =
    isAnchorLink(href) || external || isExternalHref(href);

  const isExternal = external || isExternalHref(href);

  const content = (
    <>
      {iconLeft ? <span aria-hidden="true">{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span aria-hidden="true">{iconRight}</span> : null}
      {isExternal && showExternalIcon ? (
        <ExternalLink className="size-4" aria-hidden="true" />
      ) : null}
    </>
  );

  const sharedClassName = cn('inline-flex items-center gap-2', className);

  return (
    <Button asChild variant={variant} size={size} className={sharedClassName}>
      {shouldUseAnchor ? (
        <a
          {...props}
          href={typeof href === 'string' ? href : String(href)}
          target={target ?? (isExternal ? '_blank' : undefined)}
          rel={rel ?? (isExternal ? 'noreferrer noopener' : undefined)}
        >
          {content}
        </a>
      ) : (
        <Link
          {...props}
          href={href as React.ComponentProps<typeof Link>['href']}
        >
          {content}
        </Link>
      )}
    </Button>
  );
}
