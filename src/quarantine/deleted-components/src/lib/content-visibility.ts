import type { BaseDataItem } from '@/types';

type ContentVisibility = BaseDataItem['visibility'];

export const DEFAULT_CONTENT_VISIBILITY = 'public' satisfies ContentVisibility;
export const SHOW_DRAFT_CONTENT = process.env.NODE_ENV !== 'production';

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
  return isPublicContent(item) || (SHOW_DRAFT_CONTENT && isDraftContent(item));
}

export function isRoutableContent(item: Pick<BaseDataItem, 'visibility'>) {
  return ['public', 'hidden', 'draft'].includes(getContentVisibility(item));
}

export function isPublicContent(item: Pick<BaseDataItem, 'visibility'>) {
  return getContentVisibility(item) === 'public';
}

export function shouldRenderContent(item: Pick<BaseDataItem, 'visibility'>) {
  return (
    isPublicContent(item) ||
    isHiddenContent(item) ||
    (SHOW_DRAFT_CONTENT && isDraftContent(item))
  );
}

export function shouldIndexContent(item: Pick<BaseDataItem, 'visibility'>) {
  return isPublicContent(item);
}
