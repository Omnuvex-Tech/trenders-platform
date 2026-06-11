import { AboutHeroUI } from "@repo/ui";

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

export async function AboutHeroWrapper({ locale = "az" }: { locale?: string }) {
  const s = await getAboutSettings();
  if (!s) return null;

  const title = getLocalizedValue(s.heroTitle, locale);
  const paragraphs: string[] = Array.isArray(s.heroParagraphs)
    ? s.heroParagraphs.map((p: any) => getLocalizedValue(p, locale)).filter(Boolean)
    : [];

  if (!title && paragraphs.length === 0) return null;

  return (
    <AboutHeroUI
      heroImage={toAbsUrl(s.heroImage ?? "")}
      heroImageAlt={getLocalizedValue(s.heroImageAlt, locale)}
      badge={getLocalizedValue(s.heroBadge, locale)}
      title={title}
      paragraphs={paragraphs}
    />
  );
}