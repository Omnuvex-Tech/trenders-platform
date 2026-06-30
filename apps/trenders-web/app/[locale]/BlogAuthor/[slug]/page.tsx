import { cookies } from "next/headers";
import { BlogAuthorHeroWrapper } from "@/app/components/BlogAuthor/blogauthorhero-wrapper";
import { BlogAuthorPreviewWrapper } from "@/app/components/BlogAuthor/blogauthorpreview-wrapper";
import { BlogAuthorListWrapper } from "@/app/components/BlogAuthor/blogauthorsearch-wrapper";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, resolveLocale } from "@/config/locales";
import type { Translation } from "@repo/types/types";

function stripHtml(html: string): string {
  return html?.replace(/<[^>]*>/g, "").trim() ?? "";
}

async function getAuthor(slug: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/blog/authors/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

  try {
    const [author, contactRes] = await Promise.all([
      getAuthor(slug),
      fetch(`${process.env.API_URL}/contact`, { cache: "no-store" }),
    ]);

    if (!author) return { title: "Author" };

    const contact = contactRes.ok ? await contactRes.json() : null;

    const contactTags: string[] = [];
    if (Array.isArray(contact?.tags)) {
      contact.tags.forEach((tag: any) => {
        const val = typeof tag === "object" ? (tag[locale] || tag.az || "") : tag;
        if (val) contactTags.push(val);
      });
    }

    const name = typeof author.name === "object"
      ? (author.name[locale] || author.name.az || "")
      : (author.name || "");

    const manualKeywords = author.seoKeywords?.[locale] || "";
    const allKeywords = [
      ...manualKeywords.split(",").map((k: string) => k.trim()).filter(Boolean),
      ...contactTags,
    ].join(", ");

    return {
      title: author.seoTitle?.[locale] || stripHtml(name) || "Author",
      description: author.seoDescription?.[locale] || stripHtml(
        typeof author.bio === "object" ? (author.bio[locale] || author.bio.az || "") : (author.bio || "")
      ) || "",
      keywords: allKeywords || undefined,
    };
  } catch {
    return { title: "Author" };
  }
}
export default async function BlogAuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

    const [author, translationResponse] = await Promise.all([
        getAuthor(slug),
        api.get<Translation[]>(config.endpoints.translations.list, { locale }),
    ]);

    const jsonLd = author?.schema?.[locale];

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
            <BlogAuthorHeroWrapper authorSlug={slug} />
            <BlogAuthorPreviewWrapper />
            <BlogAuthorListWrapper />
            <ContactWrapper locale={locale} />
        </div>
    );
}