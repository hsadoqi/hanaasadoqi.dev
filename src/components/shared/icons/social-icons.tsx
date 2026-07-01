import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { BaseIcon } from './tech-stack/icons';

type IconProps = ComponentProps<'svg'>;

export const GitHubIcon = ({ className, ...props }: IconProps) => (
  <BaseIcon
    src="/icons/github.svg"
    className={cn('size-4 shrink-0', className)}
    {...props}
  />
);

export const LinkedInIcon = ({ className, ...props }: IconProps) => (
  <BaseIcon
    src="/icons/linkedin.svg"
    className={cn('size-4 shrink-0', className)}
    {...props}
  />
);

export const MailIcon = ({ className, ...props }: IconProps) => (
  <BaseIcon
    src="/icons/mail.svg"
    className={cn('size-4 shrink-0', className)}
    {...props}
  />
);

export const XIcon = ({ className, ...props }: IconProps) => (
  <BaseIcon
    src="/icons/x.svg"
    className={cn('size-4 shrink-0', className)}
    {...props}
  />
);

export const DownloadIcon = ({ className, ...props }: IconProps) => (
  <BaseIcon
    src="/icons/download.svg"
    className={cn('size-4 shrink-0', className)}
    {...props}
  />
);
