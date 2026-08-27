import type { Translation } from "@repo/types/types";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, isSupportedLocale } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { PrivacyPolicyWrapper } from "@/app/components/PrivacyPolicy/PrivacyPolicy-wrapper";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  try {
    const metaRes = await fetch(`${process.env.API_URL}/page-meta/privacy`, { cache: "no-store" });
    const data = await metaRes.json();

    return {
      title: data?.seoTitle?.[locale] || "Məxfilik Siyasəti",
      description: data?.seoDescription?.[locale] || "",
      keywords: data?.seoKeywords?.[locale] || undefined,
    };
  } catch {
    return { title: "Məxfilik Siyasəti" };
  }
}

async function getPageSchema(locale: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/page-meta/privacy`, { cache: "no-store" });
    const data = await res.json();
    return data?.schema?.[locale] || null;
  } catch {
    return null;
  }
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const [translationResponse, schema] = await Promise.all([
    api.get<Translation[]>(config.endpoints.translations.list, { locale }),
    getPageSchema(locale),
  ]);

  return (
    <div className="flex min-h-svh w-full flex-col items-start justify-start">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <NavbarWrapper
        locale={locale}
        languages={STATIC_LANGUAGES}
        initialTranslations={translationResponse.data ?? []}
      />
      <PrivacyPolicyWrapper locale={locale} />
    </div>
  );
}