import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
    case 'success':
      return 'text-success-600 bg-success-50';
    case 'running':
    case 'in_progress':
      return 'text-primary-600 bg-primary-50';
    case 'error':
    case 'failed':
      return 'text-danger-600 bg-danger-50';
    case 'warning':
      return 'text-warning-600 bg-warning-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent':
      return 'text-danger-600 bg-danger-50';
    case 'high':
      return 'text-warning-600 bg-warning-50';
    case 'medium':
      return 'text-primary-600 bg-primary-50';
    case 'low':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}