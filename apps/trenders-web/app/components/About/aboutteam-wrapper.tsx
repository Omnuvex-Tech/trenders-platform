import { AboutTeamUI } from "@repo/ui";
import type { AboutTeamMember } from "@repo/ui";

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

async function getAboutTeamMembers(): Promise<AboutTeamMember[]> {
    try {
        const res = await fetch(`${process.env.API_URL}/blog/authors/about-team`, { cache: "no-store" });
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

export async function AboutTeamWrapper() {
    const [members, s] = await Promise.all([
        getAboutTeamMembers(),
        getAboutSettings(),
    ]);
    if (members.length === 0) return null;
    return (
        <AboutTeamUI
            title={s?.teamTitle ? <>{s.teamTitle}</> : <>İLHAM VERƏN KOMANDA</>}
            description={s?.teamDescription ?? ""}
            ctaLabel={s?.teamCtaLabel ?? "Keçid edin →"}
            ctaHref={s?.teamCtaHref ?? "/OurTeam"}
            members={members}
        />
    );
}