import { BlogAuthorListUI } from "@repo/ui";
import type { BlogListItems, BlogCategories } from "@repo/ui";

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
  const { blogs, cats } = await getAuthorListData();
  const stripHtml = (html: string) => html ? html.replace(/<[^>]*>/g, "").trim() : "";

  const safeBlogs = Array.isArray(blogs) ? blogs : [];
  const safeCats = Array.isArray(cats) ? cats : [];

  const posts: BlogListItems[] = safeBlogs.map((b: any) => ({
    id: b.id,
    image: toAbsUrl(b.coverImage ?? ""),
    imageAlt: b.coverImageAlt ?? "",
    badge: b.badge ?? "",
    title: stripHtml(b.title ?? ""),
    author: {
      name: b.author?.name ?? "",
      avatar: toAbsUrl(b.author?.avatar ?? ""),
      avatarAlt: b.author?.avatarAlt ?? "",
      href: b.author?.slug ? `/BlogAuthor/${b.author.slug}` : undefined,
    },
    date: b.publishedAt ? formatDate(b.publishedAt) : "",
    href: `/Blog/${b.slug}`,
  }));

  const categories: BlogCategories[] = safeCats.map((c: any) => ({
    id: c.id,
    label: c.label,
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