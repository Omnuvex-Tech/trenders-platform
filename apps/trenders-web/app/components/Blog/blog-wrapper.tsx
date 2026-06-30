import { cookies } from "next/headers";
import { BlogUI } from "@repo/ui";
import type { BlogPost } from "@repo/ui";

const API = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
  if (!obj) return fallback;
  if (typeof obj === "string") return obj;
  return obj[locale] || obj["az"] || fallback;
}

function toAbsUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API}${path}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("az-AZ", {
    month: "long", day: "numeric", year: "numeric",
  });
}

async function getHomeBlogs(): Promise<any[]> {
  try {
    const res = await fetch(`${API}/blog/home`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function getHomeSettings() {
  try {
    const res = await fetch(`${API}/home`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function BlogWrapper({ locale }: { locale?: string }) {
  const cookieStore = await cookies();
  const resolvedLocale = locale ?? cookieStore.get("NEXT_LOCALE")?.value ?? "az";

  const [blogs, home] = await Promise.all([
    getHomeBlogs(),
    getHomeSettings(),
  ]);

  if (blogs.length === 0) return null;

  const posts: BlogPost[] = blogs.map((b) => ({
    id: b.id,
    image: toAbsUrl(t(b.coverImage, resolvedLocale)),
    imageAlt: t(b.coverImageAlt, resolvedLocale),
    category: t(b.category?.label, resolvedLocale) || t(b.badge, resolvedLocale),
    title: t(b.title, resolvedLocale).replace(/<[^>]*>/g, ""),
    excerpt: t(b.excerpt, resolvedLocale).replace(/<[^>]*>/g, ""),
    authorImage: toAbsUrl(b.author?.avatar ?? ""),
    authorImageAlt: t(b.author?.avatarAlt, resolvedLocale) || t(b.author?.name, resolvedLocale),
    authorName: t(b.author?.name, resolvedLocale),
    authorHref: b.author?.slug ? `/${resolvedLocale}/BlogAuthor/${b.author.slug}` : undefined,
    date: b.publishedAt ? formatDate(b.publishedAt) : "",
    href: `/${resolvedLocale}/Blog/${b.slug}`,
  }));

  return (
    <BlogUI
      title={t(home?.blogsTitle, resolvedLocale )}
      allPostsLabel={t(home?.blogsBtnText, resolvedLocale)}
      allPostsHref={home?.blogsBtnLink || `/${resolvedLocale}/blog`}
      allPostsNewTab={home?.blogsBtnNewTab ?? false}
      posts={posts}
    />
  );
}