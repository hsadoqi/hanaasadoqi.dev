'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

type CardMediaProps = {
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
};

export function CardMedia({
  src,
  alt,
  className,
  imageClassName,
}: CardMediaProps) {
  if (!src) return null;

  return (
    <div className={cn('w-full overflow-hidden rounded', className)}>
      <Image
        src={src}
        alt={alt ?? ''}
        width={1200}
        height={800}
        className={cn('h-auto w-full object-cover', imageClassName)}
      />
    </div>
  );
}
