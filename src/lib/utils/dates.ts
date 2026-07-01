export type DateRange = {
  from?: Date;
  to?: Date;
};

export function isWithinDateRange(date: Date | undefined, range: DateRange) {
  if (!date) return false;
  if (range.from && date < range.from) return false;
  if (range.to && date > range.to) return false;

  return true;
}
