import { cookies } from "next/headers";
import { BlogSectionUI } from "@repo/ui";
import type { BlogItem } from "@repo/ui";

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

function formatDate(dateStr: string) {
    return new Date(dateStr)
        .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        .toUpperCase();
}

function mapBlogItem(b: any, locale: string): BlogItem {
    const coverImage = t(b.coverImage, locale);
    return {
        id: b.id,
        image: toAbsUrl(coverImage),
        gif: b.gif ? toAbsUrl(b.gif) : undefined,
        imageAlt: t(b.coverImageAlt, locale),
        badge: t(b.badge, locale),
        title: t(b.title, locale),
        description: t(b.excerpt, locale),
        date: b.publishedAt ? formatDate(b.publishedAt) : "",
        href: `/Blog/${b.slug}`,
    };
}

async function getBlogSectionData() {
    try {
        const [featuredRes, settingsRes] = await Promise.all([
            fetch(`${process.env.API_URL}/blog/featured`, { cache: "no-store" }),
            fetch(`${process.env.API_URL}/blog/settings`, { cache: "no-store" }),
        ]);
        const featured = featuredRes.ok ? await featuredRes.json() : { main: null, side: [] };
        const settings = settingsRes.ok ? await settingsRes.json() : {};
        return { featured: featured.main ?? null, side: featured.side ?? [], settings };
    } catch {
        return { featured: null, side: [], settings: {} };
    }
}

export async function BlogSectionWrapper() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const { featured, side, settings } = await getBlogSectionData();

    if (!featured) return null;

    const quoteImage = t(settings.quoteImage, locale);

    return (
        <BlogSectionUI
            title={t(settings.pageTitle, locale)}
            portfolioHref={settings.buttonLink || "/blog"}
            portfolioLabel={t(settings.buttonText, locale, "Portfolio")}
            portfolioNewTab={settings.buttonNewTab ?? false}
            featuredPost={mapBlogItem(featured, locale)}
            sidePosts={side.map((b: any) => mapBlogItem(b, locale))}
            quote={
                settings.quoteText
                    ? {
                        text: t(settings.quoteText, locale),
                        image: quoteImage ? toAbsUrl(quoteImage) : undefined,
                        imageAlt: t(settings.quoteImageAlt, locale),
                    }
                    : null
            }
        />
    );
}