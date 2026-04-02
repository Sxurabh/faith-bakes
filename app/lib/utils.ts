export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
