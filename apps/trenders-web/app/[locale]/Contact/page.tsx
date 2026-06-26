import { cookies } from "next/headers";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, resolveLocale } from "@/config/locales";
import type { Translation } from "@repo/types/types";
import { ContactPageWrapper } from "@/app/components/ContactPage/contactpage-wrapper";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);
  try {
    const [metaRes, contactRes] = await Promise.all([
      fetch(`${process.env.API_URL}/page-meta/contact`, { cache: "no-store" }),
      fetch(`${process.env.API_URL}/contact`, { cache: "no-store" }),
    ]);

    const meta = await metaRes.json();
    const contact = contactRes.ok ? await contactRes.json() : null;

    const contactTags: string[] = [];
    if (Array.isArray(contact?.tags)) {
      contact.tags.forEach((tag: any) => {
        const val = typeof tag === "object"
          ? (tag[locale] || tag.az || "")
          : tag;
        if (val) contactTags.push(val);
      });
    }

    const manualKeywords = meta?.seoKeywords?.[locale] || "";
    const allKeywords = [
      ...manualKeywords.split(",").map((k: string) => k.trim()).filter(Boolean),
      ...contactTags,
    ].join(", ");

    return {
      title: meta?.seoTitle?.[locale] || "Əlaqə",
      description: meta?.seoDescription?.[locale] || "",
      keywords: allKeywords || undefined,
    };
  } catch {
    return { title: "Əlaqə" };
  }
}

export default async function ContactPage() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

  const translationResponse = await api.get<Translation[]>(
    config.endpoints.translations.list,
    { locale },
  );

  return (
    <div className="flex min-h-svh w-full flex-col items-start justify-start">
      <NavbarWrapper
        locale={locale}
        languages={STATIC_LANGUAGES}
        initialTranslations={translationResponse.data ?? []}
      />
      <ContactPageWrapper locale={locale} />
    </div>
  );
}