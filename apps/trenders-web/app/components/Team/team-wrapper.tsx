import { TeamUI } from "@repo/ui";
import type { TeamMember } from "@repo/ui";

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

async function getHomeTeamMembers(locale: string): Promise<TeamMember[]> {
  try {
    const res = await fetch(`${API}/blog/authors/about-team`, { cache: "no-store" });
    if (!res.ok) return [];
    const authors = await res.json();
    return (authors as any[]).slice(0, 3).map((a) => ({
      id: a.id,
      name: t(a.name, locale),
      role: t(a.role, locale),
      image: toAbsUrl(a.avatar ?? ""),
      imageAlt: t(a.avatarAlt, locale) || t(a.name, locale),
      href: a.slug ? `/${locale}/team/${a.slug}` : "#",
    }));
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

export async function TeamWrapper({ locale = "az" }: { locale?: string }) {
  const [members, home] = await Promise.all([
    getHomeTeamMembers(locale),
    getHomeSettings(),
  ]);

  return (
    <TeamUI
      title={t(home?.teamTitle, locale, "İlham Verən Komanda")}
      members={members}
      featuredImage={toAbsUrl(home?.teamImage || "") || "/images/team2.jpg"}
      goHref={home?.teamBtnLink || "/team"}
      goLabel={t(home?.teamBtnText, locale, "Keçid edin")}
      goNewTab={home?.teamBtnNewTab ?? false}
    />
  );
}