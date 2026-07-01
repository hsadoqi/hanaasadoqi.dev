import Image from 'next/image';
import React from 'react';
import { ShieldCheck } from 'lucide-react';

type TechStackIconProps = {
  src: string;
  className?: string;
};

const imageIconClassName = 'size-4 object-contain';
const BaseIcon = ({ src, className }: TechStackIconProps) => (
  <Image
    src={src}
    alt=""
    width={18}
    height={18}
    className={className ?? imageIconClassName}
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

export const TypescriptIcon = ({ className }: TechStackIconProps) => (
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
export const techStack: TechStackIcon[] = [
  {
    id: 'next',
    name: 'Next.js',
    aliases: ['next.js', 'nextjs', 'next-js'],
    icon: NextJSIcon,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    aliases: ['postgresql'],
    icon: PostgreSQLIcon,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    aliases: ['ts'],
    icon: TypescriptIcon,
  },
  {
    id: 'rbac',
    name: 'RBAC',
    aliases: ['role-based-access-control'],
    icon: ShieldCheck,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    aliases: ['tailwindcss', 'tailwind-css'],
    icon: TailwindIcon,
  },
  {
    id: 'storybook',
    name: 'Storybook',
    aliases: ['storybook.js', 'storybookjs'],
    icon: StorybookIcon,
  },
  {
    id: 'nest',
    name: 'NestJS',
    aliases: ['nestjs', 'nest-js'],
    icon: NestJSIcon,
  },
  {
    id: 'prisma',
    name: 'Prisma',
    aliases: ['prisma', 'prisma.io'],
    icon: PrismaIcon,
  },
  {
    id: 'zod',
    name: 'Zod',
    aliases: ['zod', 'zod.io'],
    icon: ZodIcon,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    aliases: ['vercel', 'vercel.com'],
    icon: VercelIcon,
  },
  {
    id: 'react',
    name: 'React',
    aliases: ['reactjs', 'react.js'],
    icon: ReactIcon,
  },
];

export type TechStackIcon = {
  id: string;
  name: string;
  aliases?: string[];
  icon: React.ComponentType<TechStackIconProps>;
};

const normalizeTechStackKey = (item: string) =>
  item
    .trim()
    .toLowerCase()
    .replace(/[\s._/]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

export const getTechStackIcon = (item: string) => {
  const key = normalizeTechStackKey(item);

  return techStack.find(
    (tech) =>
      normalizeTechStackKey(tech.id) === key ||
      normalizeTechStackKey(tech.name) === key ||
      tech.aliases?.some((alias) => normalizeTechStackKey(alias) === key),
  );
};

export const prepareIcons = (items: string[]): TechStackIcon[] =>
  items.flatMap((item) => {
    const icon = getTechStackIcon(item);

    return icon ? [icon] : [];
  });
