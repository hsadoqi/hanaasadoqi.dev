import { cn } from '@/lib/utils';

import { MaskedIcon, type IconProps, imageClassName } from './icon-primitives';

export const GitHubIcon = ({ className, ...props }: IconProps) => (
  <MaskedIcon
    src="/icons/github.svg"
    className={cn(imageClassName, className)}
    {...props}
  />
);

export const LinkedInIcon = ({ className, ...props }: IconProps) => (
  <MaskedIcon
    src="/icons/linkedin.svg"
    className={cn(imageClassName, className)}
    {...props}
  />
);

export const MailIcon = ({ className, ...props }: IconProps) => (
  <MaskedIcon
    src="/icons/mail.svg"
    className={cn(imageClassName, className)}
    {...props}
  />
);

export const XIcon = ({ className, ...props }: IconProps) => (
  <MaskedIcon
    src="/icons/x.svg"
    className={cn(imageClassName, className)}
    {...props}
  />
);

export const DownloadIcon = ({ className, ...props }: IconProps) => (
  <MaskedIcon
    src="/icons/download.svg"
    className={cn(imageClassName, className)}
    {...props}
  />
);
