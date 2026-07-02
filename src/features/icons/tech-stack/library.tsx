import { ShieldCheck } from 'lucide-react';

import {
  NextJSIcon,
  PostgreSQLIcon,
  TailwindIcon,
  StorybookIcon,
  NestJSIcon,
  PrismaIcon,
  ZodIcon,
  VercelIcon,
  ReactIcon,
  TypescriptIcon,
} from './icons';

type TechStackIcon = {
  id: string;
  name: string;
  aliases?: string[];
  icon: React.ComponentType<{ className?: string }>;
};

export type { TechStackIcon };

export const techStackLibrary: TechStackIcon[] = [
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
