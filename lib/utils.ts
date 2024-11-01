import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateString(dateString: string) {
  
  const dateFormatter = Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'full',
    timeZone: 'EAT',
  })

  return dateFormatter.format(new Date(dateString))
}

export function formatCurrency(amount: number) {
  const formatter = Intl.NumberFormat("en-US", {
    currency: "KSH",
    style: "currency",
    maximumFractionDigits: 0,
  })

  return formatter.format(amount)
}

export function hideCenterDigits(input: string): string {
  // Check if it's an email
  if (input.includes("@")) {
      const [local, domain] = input.split("@");
      if (local.length <= 2) return `${local}***@${domain}`; // Short local part
      return `${local[0]}${'*'.repeat(local.length - 2)}${local.slice(-1)}@${domain}`;
  }

  // For other strings (e.g., phone numbers)
  const length = input.length;
  if (length <= 4) return input; // Too short to hide
  const visibleChars = 3; // Number of characters to keep visible on each end
  const hiddenPartLength = length - 2 * visibleChars;

  return input.slice(0, visibleChars) + '*'.repeat(hiddenPartLength) + input.slice(-visibleChars);
}