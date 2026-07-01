import { cn } from '@/lib';
import Image from 'next/image';

export type TechStackIconProps = {
  src?: string;
  alt?: string;
  className?: string;
};

const imageIconClassName = 'h-4 w-4 object-contain';

export const BaseIcon = ({ src, alt, className }: TechStackIconProps) =>
  !!src && (
    <Image
      src={src}
      alt={alt || ''}
      width={20}
      height={20}
      className={cn(className, imageIconClassName)}
    />
  );

const StorybookIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/storybook.svg" className={className} />
);

const TailwindIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/tailwind.svg" className={className} />
);

const NextJSIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/next.svg" className={className} />
);

const PostgreSQLIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/postgresql.webp" className={className} />
);

const TypescriptIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/typescript.svg" className={className} />
);

const NestJSIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/nest.svg" className={className} />
);

const PrismaIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/prisma.svg" className={className} />
);

const ZodIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/zod.svg" className={className} />
);

const VercelIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/vercel.svg" className={className} />
);

const ReactIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon src="/icons/react.svg" className={className} />
);

export {
  StorybookIcon,
  TailwindIcon,
  NextJSIcon,
  PostgreSQLIcon,
  TypescriptIcon,
  NestJSIcon,
  PrismaIcon,
  ZodIcon,
  VercelIcon,
  ReactIcon,
};
