import { cookies } from "next/headers";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { BlogSectionWrapper } from "@/app/components/BlogPage/bloghero-wrapper";
import { BlogListWrapper } from "@/app/components/BlogPage/bloglist-wrapper";
import { BlogPostPreviewWrapper } from "@/app/components/BlogPage/blogpostpreview-wrapper";
import { BlogGridWrapper } from "@/app/components/BlogPage/bloggrid-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, resolveLocale } from "@/config/locales";
import type { Translation } from "@repo/types/types";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);
  try {
    const res = await fetch(`${process.env.API_URL}/page-meta/blog`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      title: data?.seoTitle?.[locale] || "Blog",
      description: data?.seoDescription?.[locale] || "",
      keywords: data?.seoKeywords?.[locale] || "",
    };
  } catch {
    return { title: "Blog" };
  }
}
export default async function BlogPage() {
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
            <BlogSectionWrapper />
            <BlogListWrapper />
            <BlogPostPreviewWrapper />
            <BlogGridWrapper />
            <ContactWrapper locale={locale} />
        </div>
    );
}
