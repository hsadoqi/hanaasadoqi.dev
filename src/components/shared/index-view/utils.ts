export function getInitialId<T extends { id: string }>(
  items: T[],
  preferredId?: string,
) {
  if (preferredId && items.some((item) => item.id === preferredId)) {
    return preferredId;
  }

  return items[0]?.id ?? '';
}
