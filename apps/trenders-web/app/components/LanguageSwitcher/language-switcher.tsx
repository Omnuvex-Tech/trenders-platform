"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Language, Translation } from "@repo/types/types";
import { LanguageSwitcher as LanguageSwitcherUI } from "@repo/ui";
import { api } from "@/lib/api";
import { config } from "@/config";

const LanguageSwitcher = ({
    languages,
    initialTranslations,
    locale,                    // ← prop kimi al
}: {
    languages: Language[];
    initialTranslations: Translation[];
    locale: string;            // ← prop kimi al
}) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = useCallback((nextLocale: string) => {
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length === 0) {
            router.push(`/${nextLocale}`);
        } else {
            segments[0] = nextLocale;
            router.push(`/${segments.join("/")}`);
        }
    }, [pathname, router]);

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