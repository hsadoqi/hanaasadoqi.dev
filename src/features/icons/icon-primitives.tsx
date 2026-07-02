import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type IconProps = ComponentProps<'span'>;

export const imageClassName = 'size-5 shrink-0 object-contain';

export const MaskedIcon = ({
  src,
  className,
  style,
  ...props
}: IconProps & { src: string }) => (
  <span
    aria-hidden="true"
    className={cn(
      'inline-flex shrink-0 items-center justify-center bg-current align-middle leading-none',
      imageClassName,
      className,
    )}
    style={{
      mask: `url(${src}) center / contain no-repeat`,
      WebkitMask: `url(${src}) center / contain no-repeat`,
      ...style,
    }}
    {...props}
  />
);
