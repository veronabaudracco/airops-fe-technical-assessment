import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stripPictographs = (value: string) =>
    value.replace(/\p{Extended_Pictographic}/gu, '').trim();
