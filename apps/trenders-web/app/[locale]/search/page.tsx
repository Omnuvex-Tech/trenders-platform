import type { Translation } from "@repo/types/types";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { SearchResultsUI } from "@repo/ui";

const LABELS: Record<string, { found: string; noResults: string }> = {
    az: { found: "Tapıldı", noResults: "Nəticə tapılmadı" },
    en: { found: "Found", noResults: "No results found" },
    ru: { found: "Найдено", noResults: "Результаты не найдены" },
};

async function getSearchResults(q: string, locale: string) {
    try {
        const res = await fetch(
            `${process.env.API_URL}/search?q=${encodeURIComponent(q)}&locale=${locale}`,
            { cache: "no-store" }
        );
        if (!res.ok) return { total: 0, results: [] };
        return await res.json();
    } catch {
        return { total: 0, results: [] };
    }
}

export default async function SearchPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ q?: string }>;
}) {
    const { locale } = await params;
    const { q = "" } = await searchParams;

    const [{ total, results }, translationResponse] = await Promise.all([
        getSearchResults(q, locale),
        api.get<Translation[]>(config.endpoints.translations.list, { locale }),
    ]);

  const labels: { found: string; noResults: string } = LABELS[locale] ?? LABELS.az!;

    return (
        <div className="flex min-h-svh w-full flex-col items-center justify-start pt-0 pb-8">
            <NavbarWrapper
                locale={locale}
                languages={STATIC_LANGUAGES}
                initialTranslations={translationResponse.data ?? []}
            />
            <SearchResultsUI
                query={q}
                total={total}
                results={results}
                foundLabel={labels.found}
                noResultsLabel={labels.noResults}
            />
        </div>
    );
}