import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(',')

  return decimal ? `${int},${decimal.padEnd(2, '0')}` : `${int},00`
}

export function getInitials(name: string | null | undefined) {
  if (name) {
    const names = name.trim().split(/\s+/)
    return names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : 'US'
  }
}
