import { BlogDetailHeroUI } from "@repo/ui";

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
    const res = await fetch(`${process.env.API_URL}/blog/public`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const blogs = await res.json();
    return (blogs as any[]).find((b) => b.isPreview) ?? null;
  } catch {
    return null;
  }
}

export async function BlogPostPreviewWrapper() {
  const blog = await getPreviewBlog();
  if (!blog) return null;

  return (
    <BlogDetailHeroUI
      href={`/Blog/${blog.slug}`}
      image={toAbsUrl(blog.coverImage ?? "")}
      imageAlt={blog.coverImageAlt ?? ""}
      overlayBadge={blog.badge ?? ""}
      overlayTitle={blog.title ?? ""}
      badge={blog.badge ?? ""}
      title={blog.title ?? ""}
      description={blog.excerpt ?? ""}
     author={{
        name: blog.author?.name ?? "",
        avatar: toAbsUrl(blog.author?.avatar ?? ""),
        href: blog.author?.slug ? `/BlogAuthor/${blog.author.slug}` : undefined,
      }}
      date={blog.publishedAt ? formatDate(blog.publishedAt) : ""}
    />
  );
}