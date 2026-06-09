import { BlogDetailPreviewUI } from "@repo/ui";

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
async function getAuthorPreviewBlog() {
    try {
        const res = await fetch(`${process.env.API_URL}/blog`, { cache: "no-store" });
        if (!res.ok) return null;
        const blogs = await res.json();
        return (blogs as any[]).find((b) => b.isVisible && b.isAuthorPreview) ?? null;
    } catch {
        return null;
    }
}
export async function BlogAuthorPreviewWrapper() {
    const blog = await getAuthorPreviewBlog();
    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();
    if (!blog) return null;
    return (
        <BlogDetailPreviewUI
            href={`/Blog/${blog.slug}`}
            sectionTitle="Digər bloqlar"
            image={toAbsUrl(blog.coverImage ?? "")}
            imageAlt={blog.coverImageAlt ?? ""}
            overlayBadge={blog.badge ?? ""}
            badge={blog.badge ?? ""}
            overlayTitle={stripHtml(blog.title ?? "")}
            title={stripHtml(blog.title ?? "")}
            description={stripHtml(blog.excerpt ?? "")}
            author={{
                name: blog.author?.name ?? "",
                avatar: toAbsUrl(blog.author?.avatar ?? ""),
                href: blog.author?.slug ? `/BlogAuthor/${blog.author.slug}` : undefined,
            }}
            date={blog.publishedAt ? formatDate(blog.publishedAt) : ""}
        />
    );
}