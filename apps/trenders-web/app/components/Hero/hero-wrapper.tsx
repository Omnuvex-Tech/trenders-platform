import { HeroClient } from "./hero-client";
import { localizeHref } from "@/lib/localize-href";

type LocalizedString = Record<string, string>;

function getLoc(obj: LocalizedString | string | undefined, lang: string): string {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj["az"] || "";
}

function toAbsUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.API_URL}${path}`;
}

async function getServices() {
  try {
    const res = await fetch(`${process.env.API_URL}/services`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return (data as any[]).filter(s => s.isVisible).sort((a, b) => a.order - b.order);
  } catch { return []; }
}

async function getHeroSettings() {
  try {
    const res = await fetch(`${process.env.API_URL}/hero`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

interface HeroWrapperProps {
  locale?: string;
}

export async function HeroWrapper({ locale = "az" }: HeroWrapperProps) {
  const [services, hero] = await Promise.all([getServices(), getHeroSettings()]);

 const baseCards = services.map((s: any) => ({
    label: getLoc(s.title, locale),
    image: toAbsUrl(s.homeCoverImage || s.image || ""),
    hoverMedia: toAbsUrl(s.homeGif || ""),
    slug: s.slug,
  }));
  
  return (
    <HeroClient
      locale={locale}
      baseCards={baseCards}
      title={getLoc(hero?.title, locale)}
      description={getLoc(hero?.description, locale)}
      primaryBtnText={getLoc(hero?.primaryBtnText, locale)}
      primaryBtnLink={localizeHref(hero?.primaryBtnLink, locale)}
      primaryBtnNewTab={hero?.primaryBtnNewTab ?? false}
      secondaryBtnText={getLoc(hero?.secondaryBtnText, locale)}
          secondaryBtnLink={localizeHref(hero?.secondaryBtnLink ?? "/service", locale)}
      secondaryBtnNewTab={hero?.secondaryBtnNewTab ?? false}
    />
  );
}