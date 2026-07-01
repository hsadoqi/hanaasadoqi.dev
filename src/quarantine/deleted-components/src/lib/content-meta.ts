import type { BaseDataItem } from '@/types';

type ContentDateFields = Pick<BaseDataItem, 'dates'>;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatContentDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

export function getContentDateMeta(item: ContentDateFields) {
  if (item.dates?.published) {
    return {
      label: 'Published',
      value: formatContentDate(item.dates.published),
    };
  }

  if (item.dates?.updated) {
    return {
      label: 'Updated',
      value: formatContentDate(item.dates.updated),
    };
  }

  if (item.dates?.started) {
    return {
      label: 'Started',
      value: formatContentDate(item.dates.started),
    };
  }

  if (item.dates?.year) {
    return {
      label: 'Year',
      value: String(item.dates.year),
    };
  }

  return null;
}

export function formatContentMeta(item: BaseDataItem) {
  const date = getContentDateMeta(item);
  const parts = [
    date ? `${date.label} ${date.value}` : null,
    item.readingTime?.text ?? null,
  ].filter((part): part is string => Boolean(part));

  return parts.join(' · ');
}
