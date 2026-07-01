import type { CSSProperties } from 'react';

export type ImageLayoutPreset =
  | 'featured-detail'
  | 'staggered-top'
  | 'staggered-bottom';

type LayoutConfig = {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  heightRatio: number;
  widthRatio?: number;
  offsetTop?: number;
  offsetRight?: number;
  offsetLeft?: number;
  offsetBottom?: number;
  scale?: number;
  objectPosition?: string;
};

export const layoutPresets: Record<ImageLayoutPreset, LayoutConfig[]> = {
  'featured-detail': [
    {
      position: 'top-left',
      heightRatio: 0.7,
      widthRatio: 1,
      offsetTop: 0,
      offsetLeft: 0,
      objectPosition: 'object-left-top',
    },
    {
      position: 'bottom-right',
      heightRatio: 0.58,
      widthRatio: 0.78,
      offsetRight: 0,
      offsetBottom: 0,
      scale: 1.12,
      objectPosition: 'object-right-top',
    },
  ],
  'staggered-top': [
    {
      position: 'top-left',
      heightRatio: 0.5,
      widthRatio: 0.76,
      offsetTop: 0,
      offsetLeft: 0,
      objectPosition: 'object-left-top',
    },
    {
      position: 'top-right',
      heightRatio: 0.46,
      widthRatio: 0.68,
      offsetTop: 64,
      offsetRight: 0,
      objectPosition: 'object-left-top',
    },
  ],
  'staggered-bottom': [
    {
      position: 'top-left',
      heightRatio: 0.5,
      widthRatio: 0.76,
      offsetTop: 0,
      offsetLeft: 0,
      objectPosition: 'object-left-top',
    },
    {
      position: 'top-right',
      heightRatio: 0.46,
      widthRatio: 0.68,
      offsetTop: 64,
      offsetRight: 0,
      objectPosition: 'object-left-top',
    },
    {
      position: 'bottom-left',
      heightRatio: 0.42,
      widthRatio: 0.72,
      offsetBottom: 0,
      offsetLeft: 32,
      objectPosition: 'object-left-top',
    },
  ],
};

interface LayoutClasses {
  frameClassName: string;
  imageClassName: string;
  style: CSSProperties;
}

const positionClassByCorner: Record<LayoutConfig['position'], string> = {
  'top-left': 'absolute',
  'top-right': 'absolute',
  'bottom-left': 'absolute',
  'bottom-right': 'absolute',
};

const getPositionStyle = (config: LayoutConfig): CSSProperties => {
  const style: CSSProperties = {};

  if (config.position.includes('top')) {
    style.top = config.offsetTop ?? 0;
  }
  if (config.position.includes('bottom')) {
    style.bottom = config.offsetBottom ?? 0;
  }
  if (config.position.includes('left')) {
    style.left = config.offsetLeft ?? 0;
  }
  if (config.position.includes('right')) {
    style.right = config.offsetRight ?? 0;
  }

  return style;
};

export const getLayoutClasses = (
  preset: ImageLayoutPreset,
  imageIndex: number,
  containerHeight: number,
): LayoutClasses | null => {
  const config = layoutPresets[preset]?.[imageIndex];
  if (!config) return null;

  return {
    frameClassName: positionClassByCorner[config.position],
    imageClassName: config.objectPosition ?? 'object-left-top',
    style: {
      ...getPositionStyle(config),
      height: Math.round(containerHeight * config.heightRatio),
      width:
        config.widthRatio !== undefined
          ? `${Math.round(config.widthRatio * 100)}%`
          : '100%',
      transform: config.scale ? `scale(${config.scale})` : undefined,
      transformOrigin: config.position.replace('-', ' '),
    },
  };
};
