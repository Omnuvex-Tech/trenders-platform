import { cookies } from "next/headers";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, resolveLocale } from "@/config/locales";
import type { Translation } from "@repo/types/types";
import { PortfolioWrapper } from "@/app/components/Portfolio/portfolio-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);
  try {
    const [metaRes, contactRes] = await Promise.all([
      fetch(`${process.env.API_URL}/page-meta/portfolio`, { cache: "no-store" }),
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
      title: data?.seoTitle?.[locale] || "Portfolio",
      description: data?.seoDescription?.[locale] || "",
      keywords: allKeywords || undefined,
    };
  } catch {
    return { title: "Portfolio" };
  }
}

async function getPageSchema(locale: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/page-meta/portfolio`, { cache: "no-store" });
    const data = await res.json();
    return data?.schema?.[locale] || null;
  } catch {
    return null;
  }
}

export default async function PortfolioPage() {
    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

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
            <PortfolioWrapper locale={locale} />
            <ContactWrapper locale={locale} />
        </div>
    );
}