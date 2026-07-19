export function formatCNY(amount: number): string {
  return `¥${amount.toFixed(0)}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

/** 月销量格式化：1200 → "1.2k"，120 → "120" */
export function formatMonthlySales(count: number): string {
  if (count >= 1000) {
    const k = count / 1000;
    return `${k.toFixed(k >= 10 ? 0 : 1)}k`;
  }
  return String(count);
}

export function pluralize(count: number, noun: string): string {
  return `${count} ${noun}`;
}
