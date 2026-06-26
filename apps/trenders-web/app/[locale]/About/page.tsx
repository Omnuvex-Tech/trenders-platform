import type { Translation } from "@repo/types/types";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, isSupportedLocale } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { AboutHeroWrapper } from "@/app/components/About/abouthero-wrapper";
import { AboutStoryWrapper } from "@/app/components/About/aboutstory-wrapper";
import { AboutTeamWrapper } from "@/app/components/About/aboutteam-wrapper";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  try {
    const res = await fetch(`${process.env.API_URL}/page-meta/about`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      title: data?.seoTitle?.[locale] || "Haqqımızda",
      description: data?.seoDescription?.[locale] || "",
      keywords: data?.seoKeywords?.[locale] || "",
    };
  } catch {
    return { title: "Haqqımızda" };
  }
}


export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <AboutHeroWrapper locale={locale} />
            <AboutStoryWrapper locale={locale} />
            <AboutTeamWrapper locale={locale} />
            <ContactWrapper locale={locale} />
        </div>
    );
}
