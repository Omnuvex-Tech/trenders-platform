import { cookies } from "next/headers";
import { BlogDetailHeroUI } from "@repo/ui";

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

async function getPreviewBlog() {
    try {
        const res = await fetch(`${process.env.API_URL}/blog/public`, { cache: "no-store" });
        if (!res.ok) return null;
        const blogs = await res.json();
        return (blogs as any[]).find((b) => b.isPreview) ?? null;
    } catch {
        return null;
    }
}

export async function BlogPostPreviewWrapper() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const blog = await getPreviewBlog();
    if (!blog) return null;

    const coverImage = t(blog.coverImage, locale);

    return (
        <BlogDetailHeroUI
            href={`/Blog/${blog.slug}`}
            image={toAbsUrl(coverImage)}
            gif={blog.gif ? toAbsUrl(blog.gif) : undefined}
            imageAlt={t(blog.coverImageAlt, locale)}
            overlayBadge={t(blog.badge, locale)}
            overlayTitle={t(blog.title, locale)}
            badge={t(blog.badge, locale)}
            title={t(blog.title, locale)}
            description={t(blog.excerpt, locale)}
            author={{
                name: t(blog.author?.name, locale),
                avatar: toAbsUrl(blog.author?.avatar ?? ""),
                href: blog.author?.slug ? `/BlogAuthor/${blog.author.slug}` : undefined,
            }}
            date={blog.publishedAt ? formatDate(blog.publishedAt) : ""}
        />
    );
}