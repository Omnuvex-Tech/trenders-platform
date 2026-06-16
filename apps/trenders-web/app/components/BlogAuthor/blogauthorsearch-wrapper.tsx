// blog-author-list-wrapper.tsx
import { cookies } from "next/headers";
import { BlogAuthorListUI } from "@repo/ui";
import type { BlogListItems, BlogCategories } from "@repo/ui";

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
    if (!dateStr) return "";
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "long", day: "numeric", year: "numeric",
        });
    } catch { return ""; }
}

async function getAuthorListData() {
    try {
        const [blogsRes, catsRes] = await Promise.all([
            fetch(`${process.env.API_URL}/blog/author-list`, { cache: "no-store" }),
            fetch(`${process.env.API_URL}/blog/categories`, { cache: "no-store" }),
        ]);
        return {
            blogs: blogsRes.ok ? await blogsRes.json() : [],
            cats: catsRes.ok ? await catsRes.json() : [],
        };
    } catch {
        return { blogs: [], cats: [] };
    }
}

export async function BlogAuthorListWrapper() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const { blogs, cats } = await getAuthorListData();
    const stripHtml = (html: string) => html ? html.replace(/<[^>]*>/g, "").trim() : "";

    const safeBlogs = Array.isArray(blogs) ? blogs : [];
    const safeCats = Array.isArray(cats) ? cats : [];

    const posts: BlogListItems[] = safeBlogs.map((b: any) => ({
        id: b.id,
        image: toAbsUrl(t(b.coverImage, locale)),
        imageAlt: t(b.coverImageAlt, locale),
        badge: t(b.badge, locale),
        title: stripHtml(t(b.title, locale)),
        author: {
            name: t(b.author?.name, locale),
            avatar: toAbsUrl(b.author?.avatar ?? ""),
            avatarAlt: t(b.author?.avatarAlt, locale),
            href: b.author?.slug ? `/BlogAuthor/${b.author.slug}` : undefined,
        },
        date: b.publishedAt ? formatDate(b.publishedAt) : "",
        href: `/Blog/${b.slug}`,
    }));

    const categories: BlogCategories[] = safeCats.map((c: any) => ({
        id: c.id,
        label: t(c.label, locale),
        href: `/Blog?category=${c.slug}`,
    }));

    if (posts.length === 0 && categories.length === 0) return null;

    return (
        <BlogAuthorListUI
            posts={posts}
            categories={categories}
            searchPlaceholder="Axtarış ..."
            categoriesTitle="KATEQORİYALAR"
        />
    );
}