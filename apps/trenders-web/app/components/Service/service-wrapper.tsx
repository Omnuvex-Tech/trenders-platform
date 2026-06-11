import { ServicesUI } from "@repo/ui";
import type { Service } from "@repo/ui";

type LocalizedString = Record<string, string>;

function toAbsUrl(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

function getLoc(obj: LocalizedString | any, lang: string): string {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj["az"] || "";
}

async function getServices(): Promise<any[]> {
    try {
        const res = await fetch(`${process.env.API_URL}/services`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        const data = await res.json();
        return (data as any[])
            .filter((s) => s.isVisible)
            .sort((a, b) => a.order - b.order);
    } catch {
        return [];
    }
}

interface ServicesWrapperProps {
    locale?: string;
}

export async function ServicesWrapper({ locale = "az" }: ServicesWrapperProps) {
    const raw = await getServices();
    if (raw.length === 0) return null;

    const services: Service[] = raw.map((s) => ({
        id: s.id,
        number: s.number ?? "",
        title: getLoc(s.title, locale),
        imageAlt: getLoc(s.imageAlt, locale),
        description: getLoc(s.description, locale),
        image: toAbsUrl(s.image ?? ""),
        gif: s.gif ? toAbsUrl(s.gif) : undefined,
        badge: getLoc(s.badge, locale),
        imageDescription: getLoc(s.description, locale),
        items: (s.features ?? []).map((f: any) => ({
            label: getLoc(f.label, locale),
        })),
        portfolioHref: s.portfolioButtonLink || "#",
        portfolioNewTab: s.portfolioButtonNewTab ?? false,
        portfolioLabel: getLoc(s.portfolioButtonText, locale) || "Portfolio",
        detailHref: s.detailButtonLink || `/${locale}/service/${s.slug}`,
        detailNewTab: s.detailButtonNewTab ?? false,
        detailLabel: getLoc(s.detailButtonText, locale) || "DAHA ƏTRAFLI",
    }));

    return <ServicesUI title="" services={services} />;
}