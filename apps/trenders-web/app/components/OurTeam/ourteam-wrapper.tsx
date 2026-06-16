import { cookies } from "next/headers";
import { OurTeamUI } from "@repo/ui";
import type { OurTeamMember } from "@repo/ui";

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

async function getOurTeamSettings() {
    try {
        const res = await fetch(`${process.env.API_URL}/blog/our-team-settings`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

async function getOurTeamMembers(): Promise<OurTeamMember[]> {
    try {
        const res = await fetch(`${process.env.API_URL}/blog/authors/our-team`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        const authors = await res.json();
        return (authors as any[]).map((a) => ({
            id: a.id,
            image: toAbsUrl(a.avatar ?? ""),
            imageAlt: a.avatarAlt ?? a.name ?? "",
            name: a.name ?? "",
            role: a.role ?? "",
            href: a.slug ? `/BlogAuthor/${a.slug}` : "#",
        }));
    } catch {
        return [];
    }
}

export async function OurTeamWrapper({ locale }: { locale?: string }) {
    const cookieStore = await cookies();
    const resolvedLocale = locale ?? cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const [settings, members] = await Promise.all([
        getOurTeamSettings(),
        getOurTeamMembers(),
    ]);

    if (members.length === 0) return null;

    const titleHtml = t(settings?.title, resolvedLocale, "Komandamız");
    const descriptionHtml = t(settings?.description, resolvedLocale, "");

    const resolvedMembers: OurTeamMember[] = members.map((m: any) => ({
        ...m,
        imageAlt: t(m.imageAlt, resolvedLocale) || t(m.name, resolvedLocale),
        name: t(m.name, resolvedLocale),
        role: t(m.role, resolvedLocale),
    }));

    return (
        <OurTeamUI
            title={titleHtml}
            descriptionHtml={descriptionHtml}
            members={resolvedMembers}
        />
    );
}