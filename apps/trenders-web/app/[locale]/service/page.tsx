import type { Translation } from "@repo/types/types";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, isSupportedLocale } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ServicesWrapper } from "@/app/components/Service/service-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  try {
    const [metaRes, contactRes] = await Promise.all([
      fetch(`${process.env.API_URL}/page-meta/services`, { cache: "no-store" }),
      fetch(`${process.env.API_URL}/contact`, { cache: "no-store" }),
    ]);

    const data = await metaRes.json();
    const contact = contactRes.ok ? await contactRes.json() : null;

    const contactTags: string[] = [];
    if (Array.isArray(contact?.tags)) {
      contact.tags.forEach((tag: any) => {
        const val = typeof tag === "object" ? (tag[locale] || tag.az || "") : tag;
        if (val) contactTags.push(val);
      });
    }

    const manualKeywords = data?.seoKeywords?.[locale] || "";
    const allKeywords = [
      ...manualKeywords.split(",").map((k: string) => k.trim()).filter(Boolean),
      ...contactTags,
    ].join(", ");

    return {
      title: data?.seoTitle?.[locale] || "Xidmətlər",
      description: data?.seoDescription?.[locale] || "",
      keywords: allKeywords || undefined,
    };
  } catch {
    return { title: "Xidmətlər" };
  }
}

async function getPageSchema(locale: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/page-meta/services`, { cache: "no-store" });
    const data = await res.json();
    return data?.schema?.[locale] || null;
  } catch {
    return null;
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <ServicesWrapper locale={locale} />
            <ContactWrapper locale={locale} />
        </div>
    );
}