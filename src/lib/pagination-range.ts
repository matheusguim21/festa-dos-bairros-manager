export function generatePageRange(
  current: number,
  total: number,
): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i);
  }
  const pages: Array<number | "ellipsis"> = [];
  pages.push(0);
  if (current > 2) {
    pages.push("ellipsis");
  }
  const before = Math.max(current - 1, 1);
  const after = Math.min(current + 1, total - 2);
  for (let i = before; i <= after; i++) {
    pages.push(i);
  }
  if (current < total - 3) {
    pages.push("ellipsis");
  }
  pages.push(total - 1);
  return pages;
}
