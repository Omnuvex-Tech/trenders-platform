import { TeamUI } from "@repo/ui";
import type { TeamMember } from "@repo/ui";

function toAbsUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

async function getHomeTeamMembers(locale: string): Promise<TeamMember[]> {
    try {
        const res = await fetch(`${process.env.API_URL}/blog/authors/about-team`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        const authors = await res.json();
        return (authors as any[])
            .slice(0, 3)
            .map((a) => ({
                id: a.id,
                name: typeof a.name === "string" ? a.name : (a.name?.[locale] ?? a.name?.az ?? a.name?.en ?? ""),
                role: typeof a.role === "string" ? a.role : (a.role?.[locale] ?? a.role?.az ?? a.role?.en ?? ""),
                image: toAbsUrl(a.avatar ?? ""),
                imageAlt: typeof a.avatarAlt === "string" ? a.avatarAlt : (a.avatarAlt?.[locale] ?? a.name?.[locale] ?? ""),
                href: a.slug ? `/BlogAuthor/${a.slug}` : "#",
            }));
    } catch {
        return [];
    }
}

export async function TeamWrapper({ locale = "az" }: { locale?: string }) {
    const members = await getHomeTeamMembers(locale);

    return (
        <TeamUI
            title="İlham Verən Komanda"
            members={members}
            featuredImage="/images/team2.jpg"
        />
    );
}