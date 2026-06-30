import Image from 'next/image';
import React from 'react';
import { ShieldCheck } from 'lucide-react';

type TechStackIconProps = {
  className?: string;
};

const imageIconClassName = 'size-4 object-contain';

export const NextJSIcon = ({ className }: TechStackIconProps) => (
  <Image
    src="/icons/next.svg"
    alt=""
    width={18}
    height={18}
    className={className ?? `${imageIconClassName} dark:invert`}
  />
);

export const PostgreSQLIcon = ({ className }: TechStackIconProps) => (
  <Image
    src="/icons/postgresql.webp"
    alt=""
    width={18}
    height={18}
    className={className ?? imageIconClassName}
  />
);

export const TypeScriptIcon = ({ className }: TechStackIconProps) => (
  <span
    aria-hidden="true"
    className={
      className ??
      'inline-flex size-4 items-center justify-center rounded-[3px] bg-[#3178c6] text-[8px] leading-none font-bold text-white'
    }
  >
    TS
  </span>
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
    icon: TypeScriptIcon,
  },
  {
    id: 'rbac',
    name: 'RBAC',
    aliases: ['role-based-access-control'],
    icon: ShieldCheck,
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
