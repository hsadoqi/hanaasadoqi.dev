import type { BaseDataItem } from '@/types';

type ContentVisibility = BaseDataItem['visibility'];

export const DEFAULT_CONTENT_VISIBILITY = 'public' satisfies ContentVisibility;

export function getContentVisibility(item: Pick<BaseDataItem, 'visibility'>) {
  return item.visibility ?? DEFAULT_CONTENT_VISIBILITY;
}

export function isDraftContent(item: Pick<BaseDataItem, 'visibility'>) {
  return getContentVisibility(item) === 'draft';
}

export function isHiddenContent(item: Pick<BaseDataItem, 'visibility'>) {
  return getContentVisibility(item) === 'hidden';
}

export function isListedContent(item: Pick<BaseDataItem, 'visibility'>) {
  return !isHiddenContent(item);
}

export function isRoutableContent(item: Pick<BaseDataItem, 'visibility'>) {
  return !isDraftContent(item);
}

export function isPublicContent(item: Pick<BaseDataItem, 'visibility'>) {
  return getContentVisibility(item) === 'public';
}
