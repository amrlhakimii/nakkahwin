export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getDateBefore(dateStr: string, months: number): Date {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() - months);
  return d;
}

export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
