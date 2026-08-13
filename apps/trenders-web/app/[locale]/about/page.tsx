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
    const [metaRes, contactRes] = await Promise.all([
      fetch(`${process.env.API_URL}/page-meta/about`, { cache: "no-store" }),
      fetch(`${process.env.API_URL}/contact`, { cache: "no-store" }),
    ]);

    const data = await metaRes.json();
    const contact = contactRes.ok ? await contactRes.json() : null;

const contactTags: string[] = [];
    if (Array.isArray(contact?.tags)) {
      contact.tags.forEach((tag: any) => {
        const raw = typeof tag === "object" ? (tag[locale] || tag.az || "") : tag;
        const val = typeof raw === "string" ? raw.replace(/^#+/, "").trim() : raw;
        if (val) contactTags.push(val);
      });
    }

    const manualKeywords = data?.seoKeywords?.[locale] || "";
    const allKeywords = [
      ...manualKeywords.split(",").map((k: string) => k.trim()).filter(Boolean),
      ...contactTags,
    ].join(", ");

    return {
      title: data?.seoTitle?.[locale] || "Haqqımızda",
      description: data?.seoDescription?.[locale] || "",
      keywords: allKeywords || undefined,
    };
  } catch {
    return { title: "Haqqımızda" };
  }
}

async function getPageSchema(locale: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/page-meta/about`, { cache: "no-store" });
    const data = await res.json();
    return data?.schema?.[locale] || null;
  } catch {
    return null;
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <AboutHeroWrapper locale={locale} />
            <AboutStoryWrapper locale={locale} />
            <AboutTeamWrapper locale={locale} />
            <ContactWrapper locale={locale} />
        </div>
    );
}