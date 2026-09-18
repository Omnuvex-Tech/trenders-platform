import type { Translation } from "@repo/types/types";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, isSupportedLocale } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { OurTeamWrapper } from "@/app/components/OurTeam/ourteam-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { localizeHref } from "@/lib/localize-href";
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const teamPage = Math.max(1, Number(pageParam) || 1);
  try {
    const [metaRes, contactRes] = await Promise.all([
      fetch(`${process.env.API_URL}/page-meta/team`, { cache: "no-store" }),
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

      const canonicalPath = localizeHref("/team", locale);
    return {
      title: data?.seoTitle?.[locale] || "Komanda",
      description: data?.seoDescription?.[locale] || "",
      keywords: allKeywords || undefined,
      alternates: {
        canonical: `https://trenders.team${canonicalPath}${teamPage > 1 ? `?page=${teamPage}` : ""}`,
      },
    };
  } catch {
    return { title: "Komanda" };
  }
}

async function getPageSchema(locale: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/page-meta/team`, { cache: "no-store" });
    const data = await res.json();
    return data?.schema?.[locale] || null;
  } catch {
    return null;
  }
}

export default async function OurTeamPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { locale } = await params;

    if (!isSupportedLocale(locale)) {
        notFound();
    }

    const { page: pageParam } = await searchParams;
    const teamPage = Math.max(1, Number(pageParam) || 1);

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
            <OurTeamWrapper locale={locale} page={teamPage} />            <ContactWrapper locale={locale} />
        </div>
    );
}