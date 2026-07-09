import { AboutStoryUI } from "@repo/ui";

type LocalizedString = Record<string, string>;

function getLocalizedValue(obj: LocalizedString | any, lang: string): string {
  if (!obj) return "";
  return obj[lang] || obj["az"] || "";
}

function toAbsUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.API_URL}${path}`;
}

async function getAboutSettings() {
  try {
    const res = await fetch(`${process.env.API_URL}/about/settings`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export async function AboutStoryWrapper({ locale = "az" }: { locale?: string }) {
  const s = await getAboutSettings();
  if (!s) return null;

  const blocks = Array.isArray(s.storyBlocks) ? s.storyBlocks : [];
  if (blocks.length === 0) return null;

  return (
    <AboutStoryUI
      blocks={blocks.map((b: any) => ({
        title: getLocalizedValue(b.title, locale),
        paragraphs: Array.isArray(b.paragraphs)
          ? b.paragraphs.map((p: any) => getLocalizedValue(p, locale)).filter(Boolean)
          : [],
        image: b.image ? toAbsUrl(b.image) : undefined,
        imageAlt: getLocalizedValue(b.imageAlt, locale),
      }))}
    />
  );
}