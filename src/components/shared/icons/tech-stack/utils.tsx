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

    return iconObj ? [iconObj] : [];
  });
