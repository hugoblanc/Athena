export function isOlderThanAWeek(date: Date): boolean {
  const now = new Date();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return now.getTime() - date.getTime() > oneWeek;
}
