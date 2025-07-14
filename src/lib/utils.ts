import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { enUS, zhCN, es, de } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const localeMap = {
  en: enUS,
  zh: zhCN,
  es: es,
  de: de,
}

export function formatDate(date: string, locale: string = 'en') {
  const dateObj = new Date(date)
  return format(dateObj, 'PPP', {
    locale: localeMap[locale as keyof typeof localeMap] || enUS
  })
}
