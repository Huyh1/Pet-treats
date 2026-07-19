import dayjs from 'dayjs';

// 金额格式化（分 → 元，保留两位 + 千分位）
export function formatMoney(value?: number | string): string {
  if (value === null || value === undefined || value === '') return '¥0.00';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (Number.isNaN(num)) return '¥0.00';
  return `¥${num.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// 日期时间格式化
export function formatDateTime(value?: string | number | Date | null): string {
  if (!value) return '-';
  const d = dayjs(value);
  if (!d.isValid()) return '-';
  return d.format('YYYY-MM-DD HH:mm:ss');
}

// 日期格式化
export function formatDate(value?: string | number | Date | null): string {
  if (!value) return '-';
  const d = dayjs(value);
  if (!d.isValid()) return '-';
  return d.format('YYYY-MM-DD');
}

// 简化金额（图表轴用，不带千分位）
export function formatAxisMoney(value?: number): string {
  if (value === null || value === undefined) return '0';
  if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
  return String(value);
}
