import { AboutHeroUI } from "@repo/ui";

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

export async function AboutHeroWrapper() {
  const s = await getAboutSettings();
  if (!s) return null;
  const paragraphs: string[] = Array.isArray(s.heroParagraphs) ? s.heroParagraphs : [];
  if (!s.heroTitle && paragraphs.length === 0) return null;
  return (
    <AboutHeroUI
      heroImage={toAbsUrl(s.heroImage ?? "")}
      heroImageAlt={s.heroImageAlt ?? ""}
      badge={s.heroBadge ?? ""}
      title={s.heroTitle ?? ""}
      paragraphs={paragraphs}
    />
  );
}