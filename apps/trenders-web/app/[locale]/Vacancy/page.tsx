import type { Language, Translation } from "@repo/types/types";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { config } from "@/config";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { VacancyWrapper } from "@/app/components/Vacancy/vacancy-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const langResponse = await api.get<Language[]>(
        config.endpoints.languages.list
    );

    if (!langResponse.success || !langResponse.data) {
        return (
            <div className="flex min-h-svh items-center justify-center py-8">
                <p className="text-destructive">{langResponse.message}</p>
            </div>
        );
    }

    if (!langResponse.data.some((l) => l.code === locale)) {
        notFound();
    }

    const translationResponse = await api.get<Translation[]>(
        config.endpoints.translations.list,
        { locale }
    );

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper
                locale={locale}
                languages={langResponse.data}
                initialTranslations={translationResponse.data ?? []}
            />
            <VacancyWrapper locale={locale} />
            <ContactWrapper locale={locale} />
        </div>
    );
}