import { cn } from '@/lib';
import Image from 'next/image';

export type TechStackIconProps = {
  src?: string;
  alt?: string;
  className?: string;
};

const imageIconClassName = 'h-6 w-6 object-cover';

export const BaseIcon = ({ src, alt, className }: TechStackIconProps) =>
  !!src && (
    <Image
      src={src}
      alt={alt || ''}
      width={24}
      height={24}
      className={cn(imageIconClassName, className)}
    />
  );

const StorybookIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/storybook.svg"
    className={cn(imageIconClassName, className)}
  />
);

const TailwindIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/tailwind.svg"
    className={cn(imageIconClassName, className)}
  />
);

const NextJSIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/next.svg"
    className={cn(imageIconClassName, className)}
  />
);

const PostgreSQLIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/postgresql.webp"
    className={cn(imageIconClassName, className)}
  />
);

const TypescriptIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/typescript.svg"
    className={cn(imageIconClassName, className)}
  />
);

const NestJSIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/nest.svg"
    className={cn(imageIconClassName, className)}
  />
);

const PrismaIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/prisma.svg"
    className={cn(imageIconClassName, className)}
  />
);

const ZodIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/zod.svg"
    className={cn(imageIconClassName, className)}
  />
);

const VercelIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/vercel.svg"
    className={cn(imageIconClassName, className)}
  />
);

const ReactIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/react.svg"
    className={cn(imageIconClassName, className)}
  />
);

const GitHubIcon = ({ className }: TechStackIconProps) => (
  <BaseIcon
    src="/icons/github.svg"
    className={cn(imageIconClassName, className)}
  />
);

export {
  GitHubIcon,
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
