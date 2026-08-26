'use client'

import { usePathname } from 'next/navigation'

const SUPPORTED_LOCALES = ['en', 'ru'] as const
const DEFAULT_LOCALE = 'az'

export function useLocaleFromPath(): string {
  const pathname = usePathname()
  const firstSegment = pathname?.split('/')[1] || ''
  return (SUPPORTED_LOCALES as readonly string[]).includes(firstSegment)
    ? firstSegment
    : DEFAULT_LOCALE
}

export function localePrefix(locale: string): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`
}