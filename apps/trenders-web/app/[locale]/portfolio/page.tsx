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
    const res = await fetch(`${process.env.API_URL}/page-meta/portfolio`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      title: data?.seoTitle?.[locale] || "Portfolio",
      description: data?.seoDescription?.[locale] || "",
      keywords: data?.seoKeywords?.[locale] || "",
    };
  } catch {
    return { title: "Portfolio" };
  }
}

export default async function PortfolioPage() {
    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

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
            <PortfolioWrapper locale={locale} />
            <ContactWrapper locale={locale} />
        </div>
    );
}