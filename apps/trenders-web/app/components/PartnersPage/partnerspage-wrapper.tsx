import { PartnersPageUI } from "@repo/ui";
import type { PartnerPageItem } from "@repo/ui";

function toAbsUrl(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

async function getPartners(): Promise<{ title: string; partners: PartnerPageItem[] }> {
    try {
        const res = await fetch(`${process.env.API_URL}/partners`, {
            cache: "no-store",
        });
        if (!res.ok) return { title: "Partnyorlar", partners: [] };
        const data = await res.json();
        return {
            title: "Partnyorlar",
            partners: (data.partners as any[])
                .filter((p) => p.isVisible)
                .sort((a, b) => a.order - b.order)
                .map((p) => ({
                    id: p.id,
                    logo: toAbsUrl(p.image),
                    logoAlt: p.altText || p.name?.replace(/<[^>]*>/g, "") || "",
                    name: p.name,
                })),
        };
    } catch {
        return { title: "Partnyorlar", partners: [] };
    }
}

export async function PartnersPageWrapper() {
    const { title, partners } = await getPartners();
    return <PartnersPageUI title={title} partners={partners} />;
}