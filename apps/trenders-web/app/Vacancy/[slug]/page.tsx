import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { VacancyDetailWrapper } from "@/app/components/VacancyDetail/vacancydetail-wrapper";

export default async function VacancyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const langResponse = await api.get<Language[]>(config.endpoints.languages.list);
  const translationResponse = await api.get<Translation[]>(
    config.endpoints.translations.list,
    { locale: "az" }
  );

  return (
    <div className="flex min-h-svh w-full flex-col items-start justify-start">
      <NavbarWrapper
        locale="az"
        languages={langResponse.data ?? []}
        initialTranslations={translationResponse.data ?? []}
      />
      <VacancyDetailWrapper slug={slug} />
      <ContactWrapper />
    </div>
  );
}