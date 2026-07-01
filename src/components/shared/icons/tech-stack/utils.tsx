import { BaseIcon } from './icons';
import { techStackLibrary, TechStackIcon } from './library';

export const normalizeTechStackKey = (item: string) =>
  item
    .trim()
    .toLowerCase()
    .replace(/[\s._/]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

export const getTechStackIcon = (item: string) => {
  const key = normalizeTechStackKey(item);

  return techStackLibrary.find(
    (tech) =>
      normalizeTechStackKey(tech.id) === key ||
      normalizeTechStackKey(tech.name) === key ||
      tech.aliases?.some((alias) => normalizeTechStackKey(alias) === key),
  );
};

export const prepareIcons = (items: string[]): TechStackIcon[] =>
  items.flatMap((item) => {
    const iconObj = getTechStackIcon(item);
    const Icon = ({ className }: { className?: string }) => (
      <BaseIcon
        src={iconObj?.icon as unknown as string}
        className={className ?? 'size-4 object-contain'}
      />
    );

    const techStackIcon: TechStackIcon | undefined = iconObj && {
      ...iconObj,
      icon: Icon,
    };

    return techStackIcon ? [techStackIcon] : [];
  });
