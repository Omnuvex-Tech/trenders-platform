import { BlogGridUI } from "@repo/ui";
import type { BlogGridItem } from "@repo/ui";

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

async function getBlogGridData(): Promise<BlogGridItem[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/blog`, { cache: "no-store" });
    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();
    if (!res.ok) return [];
    const blogs = await res.json();
    return (blogs as any[])
      .filter((b) => b.isVisible && b.isGrid)
      .sort((a, b) => a.order - b.order)
      .map((b) => ({
        id: b.id,
        image: toAbsUrl(b.coverImage ?? ""),
        imageAlt: b.coverImageAlt || stripHtml(b.title ?? ""),
        category: b.badge ?? "",
        title: b.title ?? "",
        excerpt: b.excerpt ?? "",
        authorImage: toAbsUrl(b.author?.avatar ?? ""),
        authorImageAlt: b.author?.name ?? "",
        authorName: b.author?.name ?? "",
        authorHref: b.author?.slug ? `/BlogAuthor/${b.author.slug}` : undefined,
        date: b.publishedAt ? formatDate(b.publishedAt) : "",
        href: `/Blog/${b.slug}`,
      }));
  } catch {
    return [];
  }
}

export async function BlogGridWrapper() {
  const posts = await getBlogGridData();
  if (posts.length === 0) return null;
  return <BlogGridUI posts={posts} />;
}