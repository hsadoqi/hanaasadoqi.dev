import type { ImagePropsType } from '@/types';

import { ImageFrame } from './image-frame';

type ImageCollageContainerProps = {
  images: ImagePropsType[];
  padding?: number;
  height?: number | string;
  variant?: 'side' | 'stack';
  'aria-label'?: string;
};

const getMinHeight = (height: number | string) =>
  typeof height === 'number' ? `${height}px` : undefined;

export function ImageCollageContainer({
  images,
  padding = 20,
  height = 420,
  variant = 'side',
  'aria-label': ariaLabel = 'Interface artifacts',
}: ImageCollageContainerProps) {
  const validImages = images.filter(
    (image) => typeof image.src !== 'string' || image.src.trim().length > 0,
  );
  const [primary, ...details] = validImages;

  if (!primary) {
    return null;
  }

  const isSidePanel = variant === 'side';

  return (
    <aside
      className={
        isSidePanel
          ? 'border-border/50 bg-muted/20 max-w-full min-w-0 border-t lg:border-t-0 lg:border-l'
          : 'border-border/50 bg-muted/20 max-w-full min-w-0 rounded-xl border'
      }
      style={{ minHeight: getMinHeight(height) }}
      aria-label={ariaLabel}
    >
      <div className="flex h-full min-w-0 flex-col gap-3" style={{ padding }}>
        <ImageFrame
          src={primary.src}
          alt={primary.alt}
          caption={primary.caption}
          priority={isSidePanel}
          aspectRatio="video"
          showCaption
          className="bg-white"
          imageClassName={primary.imageClassName ?? 'object-contain p-3'}
          sizes={
            isSidePanel
              ? '(min-width: 1024px) 520px, 92vw'
              : '(min-width: 1024px) 420px, 92vw'
          }
        />

        {details.length > 0 ? (
          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            {details
              .slice(0, 2)
              .map(
                (image, index) =>
                  typeof image.src === 'string' && (
                    <ImageFrame
                      key={`${image.src}-${index}`}
                      src={image.src}
                      alt={image.alt}
                      caption={image.caption}
                      aspectRatio="video"
                      className="bg-white"
                      imageClassName={
                        image.imageClassName ?? 'object-cover object-left-top'
                      }
                      sizes="(min-width: 1024px) 220px, 46vw"
                    />
                  ),
              )}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
