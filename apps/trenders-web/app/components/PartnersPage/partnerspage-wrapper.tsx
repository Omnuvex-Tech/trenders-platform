import { PartnersPageUI } from "@repo/ui";
import type { PartnerPageItem } from "@repo/ui";

type LocalizedString = Record<string, string>;

function toAbsUrl(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

function stripHtml(html: string): string {
    return (html ?? "").replace(/<[^>]*>/g, "").trim();
}

async function getPartners(locale: string): Promise<{ title: string; partners: PartnerPageItem[] }> {
    try {
        const res = await fetch(`${process.env.API_URL}/partners`, {
            cache: "no-store",
        });
        if (!res.ok) return { title: "Partnyorlar", partners: [] };
        const data = await res.json();
        return {
            title: stripHtml(t(data.title, locale,)),
            partners: (data.partners as any[])
                .filter((p) => p.isVisible)
                .sort((a, b) => a.order - b.order)
                .map((p) => ({
                    id: p.id,
                    logo: toAbsUrl(p.image),
                    logoAlt: stripHtml(t(p.altText, locale)) || stripHtml(t(p.name, locale)),
                    name: stripHtml(t(p.name, locale)),
                })),
        };
    } catch {
        return { title: "Partnyorlar", partners: [] };
    }
}

export async function PartnersPageWrapper({ locale = "az" }: { locale?: string }) {
    const { title, partners } = await getPartners(locale);
    return <PartnersPageUI title={title} partners={partners} />;
}