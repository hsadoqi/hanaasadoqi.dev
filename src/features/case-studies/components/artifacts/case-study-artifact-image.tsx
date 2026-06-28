import React from 'react';
import Image from 'next/image';

import { ASPECT_RATIOS, STYLING_UTILS } from '../../constants';
import type { ImagePropsType } from '../../types';

interface ImageFrameProps extends ImagePropsType {
  imageProps?: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>;
  frameClassName?: string;
  style?: React.CSSProperties;
  showCaption?: boolean;
}

export default function CaseStudyArtifactImage({
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
  const loading = priority ? ('eager' as const) : ('lazy' as const);
  const aspectRatioValue = ASPECT_RATIOS[aspectRatio];
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
      className={`${STYLING_UTILS.card} ${STYLING_UTILS.borderRadius.sm} ${STYLING_UTILS.shadow} max-w-full min-w-0 overflow-hidden ${frameClassName}`}
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
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      </div>
      {showCaption && caption && (
        <figcaption className="border-border/50 text-muted-foreground border-t px-3 py-2 text-[11px] leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export { CaseStudyArtifactImage };
