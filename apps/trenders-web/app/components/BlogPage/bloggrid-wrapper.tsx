import { cookies } from "next/headers";
import { BlogGridUI } from "@repo/ui";
import type { BlogGridItem } from "@repo/ui";

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

function toAbsUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

const DATE_LOCALE_MAP: Record<string, string> = {
    az: "az-Latn-AZ",
    en: "en-US",
    ru: "ru-RU",
};

function formatDate(dateStr: string, locale: string) {
    const dateLocale = DATE_LOCALE_MAP[locale] || "en-US";
    return new Date(dateStr).toLocaleDateString(dateLocale, {
        month: "long", day: "numeric", year: "numeric",
    });
}

async function getBlogGridData(): Promise<{ blogs: any[]; settings: any }> {
    try {
        const [blogsRes, settingsRes] = await Promise.all([
            fetch(`${process.env.API_URL}/blog`, { cache: "no-store" }),
            fetch(`${process.env.API_URL}/blog/settings`, {
                cache: "no-store",
            }),
        ]);

        return {
            blogs: blogsRes.ok ? await blogsRes.json() : [],
            settings: settingsRes.ok ? await settingsRes.json() : {},
        };
    } catch {
        return {
            blogs: [],
            settings: {},
        };
    }
}

export async function BlogGridWrapper() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const { blogs, settings } = await getBlogGridData();
    const posts: BlogGridItem[] = blogs
        .filter((b) => b.isVisible && b.isGrid)
        .sort((a, b) => a.order - b.order)
        .map((b) => {
            const coverImage = t(b.coverImage, locale);
            return {
                id: b.id,
                image: toAbsUrl(coverImage),
                gif: b.gif ? toAbsUrl(b.gif) : undefined,
                imageAlt: t(b.coverImageAlt, locale) || t(b.title, locale),
                category: t(b.badge, locale),
                title: t(b.title, locale),
                excerpt: t(b.excerpt, locale),
                authorImage: toAbsUrl(b.author?.avatar ?? ""),
                authorImageAlt: t(b.author?.avatarAlt, locale) || t(b.author?.name, locale),
                authorName: t(b.author?.name, locale)
                    .replace(/<br\s*\/?>/gi, " ")
                    .replace(/\r\n|\r|\n/g, " ")
                    .replace(/\s+/g, " ")
                    .trim(),
                authorHref: b.author?.slug ? `/blogauthor/${b.author.slug}` : undefined,
                date: b.publishedAt ? formatDate(b.publishedAt, locale) : "",
                href: `/blog/${b.slug}`,
            };
        });

    if (posts.length === 0) return null;
    return (
        <BlogGridUI
            posts={posts}
            moreButtonText={t(settings.moreBlogsButtonText, locale)}
        />
    );
}