import { cookies } from "next/headers";
import { BlogDetailPreviewUI } from "@repo/ui";

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

async function getAuthorPreviewData() {
    try {
        const [blogRes, settingsRes] = await Promise.all([
            fetch(`${process.env.API_URL}/blog`, { cache: "no-store" }),
            fetch(`${process.env.API_URL}/blog/author-settings`, { cache: "no-store" }),
        ]);
        const blogs = blogRes.ok ? await blogRes.json() : [];
        const blog = (blogs as any[]).find((b) => b.isVisible && b.isAuthorPreview) ?? null;
        const settings = settingsRes.ok ? await settingsRes.json() : null;
        return { blog, settings };
    } catch {
        return { blog: null, settings: null };
    }
}
export async function BlogAuthorPreviewWrapper() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const { blog, settings } = await getAuthorPreviewData();
    if (!blog) return null;

    const sectionTitle = t(settings?.otherBlogsTitle, locale, "Digər bloqlar");

    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

    return (
        <BlogDetailPreviewUI
            href={`/Blog/${blog.slug}`}
            sectionTitle={sectionTitle}
            image={toAbsUrl(t(blog.coverImage, locale))}
            imageAlt={t(blog.coverImageAlt, locale)}
            overlayBadge={t(blog.badge, locale)}
            badge={t(blog.badge, locale)}
            overlayTitle={stripHtml(t(blog.title, locale))}
            title={stripHtml(t(blog.title, locale))}
            description={stripHtml(t(blog.excerpt, locale))}
            author={{
                name: t(blog.author?.name, locale),
                avatar: toAbsUrl(blog.author?.avatar ?? ""),
                href: blog.author?.slug ? `/BlogAuthor/${blog.author.slug}` : undefined,
            }}
            date={blog.publishedAt ? formatDate(blog.publishedAt) : ""}
        />
    );
}