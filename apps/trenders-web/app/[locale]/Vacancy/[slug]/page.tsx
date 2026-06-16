import type { Translation } from "@repo/types/types";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, isSupportedLocale } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { VacancyDetailWrapper } from "@/app/components/VacancyDetail/vacancydetail-wrapper";

export default async function VacancyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

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
      <VacancyDetailWrapper slug={slug} locale={locale} />
      <ContactWrapper locale={locale} />
    </div>
  );
}
