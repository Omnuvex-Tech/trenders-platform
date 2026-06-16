import { cookies } from "next/headers";
import { BlogListUI } from "@repo/ui";
import type { BlogListItem, BlogCategory, FeaturedBlog } from "@repo/ui";

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
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
    });
}

async function getBlogListData() {
    try {
        const [blogsRes, catsRes] = await Promise.all([
            fetch(`${process.env.API_URL}/blog`, { cache: "no-store" }),
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

export async function BlogListWrapper() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const { blogs, cats } = await getBlogListData();

    const mapPost = (b: any): BlogListItem => {
        const coverImage = t(b.coverImage, locale);
        return {
            id: b.id,
            image: toAbsUrl(coverImage),
            imageAlt: t(b.coverImageAlt, locale),
            badge: t(b.badge, locale),
            title: t(b.title, locale),
            categorySlug: b.category?.slug ?? "",
            categoryLabel: t(b.category?.label, locale),
            author: {
                name: t(b.author?.name, locale),
                avatar: toAbsUrl(b.author?.avatar ?? ""),
                avatarAlt: t(b.author?.avatarAlt, locale) || t(b.author?.name, locale),
                href: b.author?.slug ? `/BlogAuthor/${b.author.slug}` : undefined,
            },
            date: b.publishedAt ? formatDate(b.publishedAt) : "",
            href: `/Blog/${b.slug}`,
        };
    };

    const posts: BlogListItem[] = blogs
        .filter((b: any) => b.isVisible && b.isGrid)
        .sort((a: any, b: any) => a.order - b.order)
        .map(mapPost);

    const allPosts: BlogListItem[] = blogs
        .filter((b: any) => b.isVisible)
        .sort((a: any, b: any) => a.order - b.order)
        .map(mapPost);

    const categories: BlogCategory[] = cats.map((c: any) => ({
        id: c.id,
        label: t(c.label, locale),
        slug: c.slug,
        href: `/Blog?category=${c.slug}`,
    }));

    const pickOfWeek = blogs.find((b: any) => b.isVisible && b.isPickOfWeek);
    const featuredBlog: FeaturedBlog | undefined = pickOfWeek
        ? {
            image: toAbsUrl(t(pickOfWeek.coverImage, locale)),
            imageAlt: t(pickOfWeek.coverImageAlt, locale),
            badge: t(pickOfWeek.badge, locale),
            title: t(pickOfWeek.title, locale),
            date: pickOfWeek.publishedAt ? formatDate(pickOfWeek.publishedAt) : "",
            href: `/Blog/${pickOfWeek.slug}`,
        }
        : undefined;

    return (
        <BlogListUI
            posts={posts}
            allPosts={allPosts}
            categories={categories}
            featuredBlog={featuredBlog}
            searchPlaceholder="Axtarış ..."
            categoriesTitle="KATEQORİYALAR"
            featuredBlogTitle="Həftənin seçilmiş blogu"
        />
    );
}