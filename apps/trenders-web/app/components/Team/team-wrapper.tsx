import { TeamUI } from "@repo/ui";
import type { TeamMember } from "@repo/ui";

function toAbsUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

async function getHomeTeamMembers(): Promise<TeamMember[]> {
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
                name: a.name ?? "",
                role: a.role ?? "",
                image: toAbsUrl(a.avatar ?? ""),
                imageAlt: a.avatarAlt ?? a.name ?? "",
                href: a.slug ? `/BlogAuthor/${a.slug}` : "#",
            }));
    } catch {
        return [];
    }
}

export async function TeamWrapper({ locale = "az" }: { locale?: string }) {
    const members = await getHomeTeamMembers();

    return (
        <TeamUI
            title="İlham Verən Komanda"
            members={members}
            featuredImage="/images/team2.jpg"
        />
    );
}