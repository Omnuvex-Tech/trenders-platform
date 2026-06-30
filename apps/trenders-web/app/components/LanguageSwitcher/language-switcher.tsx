"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Language, Translation } from "@repo/types/types";
import { LanguageSwitcher as LanguageSwitcherUI } from "@repo/ui";
import { api } from "@/lib/api";
import { config } from "@/config";
import { LOCALES } from "@/config/locales";
import { useLocaleStore } from "@/store/locale.store";

const LanguageSwitcher = ({
    languages,
    initialTranslations,
    locale,
}: {
    languages: Language[];
    initialTranslations: Translation[];
    locale: string;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const { setLocale } = useLocaleStore();

    const handleLocaleChange = useCallback((nextLocale: string) => {
        setLocale(nextLocale);

        const currentPath = pathname ?? "/";
        const segments = currentPath.split("/").filter(Boolean);
        const firstSegment = segments[0] ?? "";

        if (segments.length > 0 && LOCALES.includes(firstSegment as (typeof LOCALES)[number])) {
            segments[0] = nextLocale;
        } else {
            segments.unshift(nextLocale);
        }

        router.push(`/${segments.join("/")}`);
    }, [pathname, router, setLocale]);

    const fetchTranslations = useCallback(async (locale: string): Promise<Translation[]> => {
        const response = await api.get<Translation[]>(config.endpoints.translations.list, { locale });
        return response.success && response.data ? response.data : [];
    }, []);

    return (
        <LanguageSwitcherUI
            languages={languages}
            initialTranslations={initialTranslations}
            defLang={config.project.defLang}
            fetchTranslations={fetchTranslations}
            locale={locale}
            variant="desktop"
            onLocaleChange={handleLocaleChange}
        />
    );
};

export { LanguageSwitcher };