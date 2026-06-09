import { BlogUI } from "@repo/ui";
import type { BlogPost } from "@repo/ui";

function toAbsUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.API_URL}${path}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("az-AZ", {
    month: "long", day: "numeric", year: "numeric",
  });
}

async function getHomeBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/blog/home`, { cache: "no-store" });
    if (!res.ok) return [];
    const blogs = await res.json();
    return (blogs as any[]).map((b) => ({
      id: b.id,
      image: toAbsUrl(b.coverImage ?? ""),
      imageAlt: b.coverImageAlt ?? "",
      category: b.category?.label ?? b.badge ?? "",
      title: b.title?.replace(/<[^>]*>/g, "") ?? "",
      excerpt: b.excerpt?.replace(/<[^>]*>/g, "") ?? "",
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

export async function BlogWrapper({ locale = "az" }: { locale?: string }) {
  const posts = await getHomeBlogs();
  if (posts.length === 0) return null;
  return (
    <BlogUI
      title="Bloglar"
      allPostsLabel="Bloglara keçid"
      allPostsHref="/Blog"
      posts={posts}
    />
  );
}