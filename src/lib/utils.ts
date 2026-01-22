import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns';

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
 * Formats a timestamp to a human-readable "last updated" string
 */
export const formatLastUpdated = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} Days Ago`;
  
  return formatDistanceToNow(date, { addSuffix: true });
};
