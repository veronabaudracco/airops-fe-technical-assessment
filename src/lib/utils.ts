import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  isToday,
  isYesterday,
  differenceInCalendarDays,
} from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parses a string containing pictographic characters (e.g. emojis),
 * extracting the leading pictograph (if any) and the remaining text.
 */
export const parsePictographicText = (
  value: string
): { pictograph: string; text: string } => {
  const pictographRegex = /^\p{Extended_Pictographic}/u;

  const match = value.match(pictographRegex);
  const pictograph = match ? match[0] : '';

  const text = value
    .replace(/\p{Extended_Pictographic}/gu, '')
    .trim();

  return { pictograph, text };
};

/**
 * Returns a "Last Updated" label from a unix timestamp (seconds).
 * UX rules:
 * - Today (0 days)
 * - Yesterday (1 day)
 * - 2 Days Ago (2 days)
 * - This Week (3–6 days)
 * - X Days Ago (7+ days)
 */
export const getLastUpdatedLabel = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';

  const daysAgo = differenceInCalendarDays(new Date(), date);

  if (daysAgo === 2) return '2 Days Ago';
  if (daysAgo >= 3 && daysAgo <= 6) return 'This Week';

  return `${daysAgo} Days Ago`;
};