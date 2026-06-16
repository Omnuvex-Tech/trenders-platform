import { AboutTeamUI } from "@repo/ui";
import type { AboutTeamMember } from "@repo/ui";

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
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

async function getAboutTeamMembers(): Promise<any[]> {
    try {
        const res = await fetch(`${process.env.API_URL}/blog/authors/about-team`, { cache: "no-store" });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

export async function AboutTeamWrapper({ locale }: { locale?: string }) {
    const resolvedLocale = locale ?? "az";

    const [authors, s] = await Promise.all([
        getAboutTeamMembers(),
        getAboutSettings(),
    ]);

    if (authors.length === 0) return null;

    const members: AboutTeamMember[] = authors.map((a) => ({
        id: a.id,
        image: toAbsUrl(a.avatar ?? ""),
        imageAlt: t(a.avatarAlt, resolvedLocale) || t(a.name, resolvedLocale),
        name: t(a.name, resolvedLocale),
        role: t(a.role, resolvedLocale),
        href: a.slug ? `/BlogAuthor/${a.slug}` : "#",
    }));

    return (
        <AboutTeamUI
            title={t(s?.teamTitle, resolvedLocale, "İLHAM VERƏN KOMANDA")}
            description={t(s?.teamDescription, resolvedLocale)}
            ctaLabel={t(s?.teamCtaLabel, resolvedLocale, "Keçid edin →")}
            ctaHref={s?.teamCtaHref ?? "/OurTeam"}
            members={members}
        />
    );
}