import type { Translation } from "@repo/types/types";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, isSupportedLocale } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { VacancyWrapper } from "@/app/components/Vacancy/vacancy-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  try {
    const res = await fetch(`${process.env.API_URL}/page-meta/vacancy`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      title: data?.seoTitle?.[locale] || "Vakansiya",
      description: data?.seoDescription?.[locale] || "",
      keywords: data?.seoKeywords?.[locale] || "",
    };
  } catch {
    return { title: "Vakansiya" };
  }
}

export default async function VacancyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    if (!isSupportedLocale(locale)) {
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
                languages={STATIC_LANGUAGES}
                initialTranslations={translationResponse.data ?? []}
            />
            <VacancyWrapper locale={locale} />
            <ContactWrapper locale={locale} />
        </div>
    );
}