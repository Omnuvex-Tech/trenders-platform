import type { Language } from "@repo/types/types";

export const LOCALES = ["az", "en", "ru"] as const;

export type AppLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "az";

export const STATIC_LANGUAGES: Language[] = [
    {
        id: 1,
        name: "Azerbaijani",
        native_name: "Azerbaijani",
        code: "az",
        is_rtl: false,
        is_default_admin: true,
        is_default_site: true,
        is_required: true,
        sort_order: 1,
    },
    {
        id: 2,
        name: "English",
        native_name: "English",
        code: "en",
        is_rtl: false,
        is_default_admin: false,
        is_default_site: false,
        is_required: true,
        sort_order: 2,
    },
    {
        id: 3,
        name: "Russian",
        native_name: "Russian",
        code: "ru",
        is_rtl: false,
        is_default_admin: false,
        is_default_site: false,
        is_required: true,
        sort_order: 3,
    },
];

export function isSupportedLocale(locale: string): locale is AppLocale {
    return LOCALES.includes(locale as AppLocale);
}

export function resolveLocale(locale?: string | null): AppLocale {
    const candidate = locale ?? "";
    return isSupportedLocale(candidate) ? candidate : DEFAULT_LOCALE;
}
