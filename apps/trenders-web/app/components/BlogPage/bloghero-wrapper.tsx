import { BlogSectionUI } from "@repo/ui";
import type { BlogItem } from "@repo/ui";

function toAbsUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.API_URL}${path}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr)
    .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    .toUpperCase();
}

function stripHtml(html: string) {
  return (html ?? "").replace(/<[^>]*>/g, "").trim();
}

function mapBlogItem(b: any): BlogItem {
  return {
    id: b.id,
    image: toAbsUrl(b.coverImage ?? ""),
    imageAlt: b.coverImageAlt ?? "",
    badge: b.badge ?? "",
    title: b.title ?? "",
    description: b.excerpt ?? "",
    date: b.publishedAt ? formatDate(b.publishedAt) : "",
    href: `/Blog/${b.slug}`,
  };
}

async function getBlogSectionData() {
  try {
    const [featuredRes, settingsRes] = await Promise.all([
      fetch(`${process.env.API_URL}/blog/featured`, { cache: "no-store" }),
      fetch(`${process.env.API_URL}/blog/settings`, { cache: "no-store" }),
    ]);

    const featured = featuredRes.ok ? await featuredRes.json() : { main: null, side: [] };
    const settings = settingsRes.ok ? await settingsRes.json() : {};

    return {
      featured: featured.main ?? null,
      side: featured.side ?? [],
      settings,
    };
  } catch {
    return { featured: null, side: [], settings: {} };
  }
}

export async function BlogSectionWrapper() {
  const { featured, side, settings } = await getBlogSectionData();

  console.log("BLOG FEATURED:", JSON.stringify(featured, null, 2));
  console.log("BLOG SETTINGS:", JSON.stringify(settings, null, 2));
  
  if (!featured) return null;

  return (
    <BlogSectionUI
      title={settings.pageTitle || "Bloglar"}
      portfolioHref={settings.buttonLink || "/blog"}
      portfolioLabel={settings.buttonText || "Portfolio"}
      portfolioNewTab={settings.buttonNewTab ?? false}
      featuredPost={mapBlogItem(featured)}
      sidePosts={side.map(mapBlogItem)}
      quote={
        settings.quoteText
          ? {
              text: settings.quoteText,
              image: settings.quoteImage ? toAbsUrl(settings.quoteImage) : undefined,
              imageAlt: settings.quoteImageAlt ?? "",
            }
          : null
      }
    />
  );
}