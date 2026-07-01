import type { CSSProperties, ComponentProps } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { AspectRatio, ImagePropsType } from '@/types';

const aspectRatios = {
  video: '16 / 9',
  square: '1 / 1',
  portrait: '3 / 4',
  custom: 'auto',
} as const satisfies Record<AspectRatio, string>;

export interface ImageFrameProps extends ImagePropsType {
  imageProps?: Omit<ComponentProps<typeof Image>, 'src' | 'alt'>;
  frameClassName?: string;
  style?: CSSProperties;
  showCaption?: boolean;
}

export function ImageFrame({
  src,
  alt,
  caption,
  priority = false,
  aspectRatio = 'custom',
  placeholder = 'empty',
  onError,
  className: frameClassName = '',
  imageClassName = '',
  sizes = '(max-width: 1024px) 80vw, 520px',
  imageProps = {},
  style,
  showCaption = false,
}: ImageFrameProps) {
  if (typeof src === 'string' && src.trim().length === 0) {
    return null;
  }

  const loading = priority ? ('eager' as const) : ('lazy' as const);
  const aspectRatioValue = aspectRatios[aspectRatio];
  const blurDataURL =
    placeholder === 'blur'
      ? typeof src === 'string'
        ? src
        : 'default' in src
          ? src.default.blurDataURL
          : src.blurDataURL
      : undefined;

  return (
    <figure
      className={cn(
        'border-border/60 bg-card max-w-full min-w-0 overflow-hidden rounded-lg border shadow-sm shadow-black/[0.03]',
        frameClassName,
      )}
      style={style}
      data-testid="image-frame"
    >
      <div
        className="relative min-h-0 w-full overflow-hidden"
        style={
          aspectRatioValue === 'auto'
            ? undefined
            : { aspectRatio: aspectRatioValue }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          loading={loading}
          priority={priority}
          sizes={sizes}
          placeholder={placeholder === 'blur' ? 'blur' : undefined}
          blurDataURL={blurDataURL}
          onError={onError}
          {...imageProps}
          className={cn('h-full w-full object-cover', imageClassName)}
        />
      </div>
      {showCaption && caption ? (
        <figcaption className="border-border/50 type-caption border-t px-3 py-2">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
