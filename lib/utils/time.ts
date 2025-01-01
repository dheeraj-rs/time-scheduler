import { format as dateFnsFormat } from 'date-fns';

export function isTimeConflict(
  slot1: { start: Date; end: Date },
  slot2: { start: Date; end: Date }
): boolean {
  return (
    (slot1.start >= slot2.start && slot1.start < slot2.end) ||
    (slot1.end > slot2.start && slot1.end <= slot2.end) ||
    (slot1.start <= slot2.start && slot1.end >= slot2.end)
  )
}

export function isBreakTime(time: Date): boolean {
  const hours = time.getHours()
  return (hours >= 12 && hours < 13) || (hours >= 18 && hours < 19)
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toUpperCase()
}

export function formatTimeRange(start: Date, end: Date): string {
  return `${formatTime(start)} - ${formatTime(end)}`
}

export const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateFnsFormat(dateObj, 'dd/MM/yyyy');
};