
import type { Translation } from "@repo/types/types";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, isSupportedLocale } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { VacancyDetailWrapper } from "@/app/components/VacancyDetail/vacancydetail-wrapper";

async function getVacancy(slug: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/vacancy/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  try {
    const [vacancy, contactRes] = await Promise.all([
      getVacancy(slug),
      fetch(`${process.env.API_URL}/contact`, { cache: "no-store" }),
    ]);

    if (!vacancy) return { title: "Vakansiya" };

    const contact = contactRes.ok ? await contactRes.json() : null;

const contactTags: string[] = [];
    if (Array.isArray(contact?.tags)) {
      contact.tags.forEach((tag: any) => {
        const raw = typeof tag === "object" ? (tag[locale] || tag.az || "") : tag;
        const val = typeof raw === "string" ? raw.replace(/^#+/, "").trim() : raw;
        if (val) contactTags.push(val);
      });
    }

    const manualKeywords = vacancy.seoKeywords?.[locale] || "";
    const allKeywords = [
      ...manualKeywords.split(",").map((k: string) => k.trim()).filter(Boolean),
      ...contactTags,
    ].join(", ");

    return {
      title: vacancy.seoTitle?.[locale] || vacancy.title?.[locale] || vacancy.title?.az,
      description: vacancy.seoDescription?.[locale] || "",
      keywords: allKeywords || undefined,
    };
  } catch {
    return { title: "Vakansiya" };
  }
}

export default async function VacancyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const [vacancy, translationResponse] = await Promise.all([
    getVacancy(slug),
    api.get<Translation[]>(config.endpoints.translations.list, { locale }),
  ]);

  const jsonLd = vacancy?.schema?.[locale];

  return (
    <div className="flex min-h-svh w-full flex-col items-start justify-start">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
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