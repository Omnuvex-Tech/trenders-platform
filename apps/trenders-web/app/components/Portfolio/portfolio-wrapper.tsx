import { PortfolioUI } from '@repo/ui';
import type { PortfolioItem } from '@repo/ui';

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

function stripHtml(html: string) {
    return (html ?? "").replace(/<[^>]*>/g, "").trim();
}

function toAbsUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

async function getPortfolios(locale: string): Promise<PortfolioItem[]> {
    try {
        const res = await fetch(`${process.env.API_URL}/portfolio/public`, {
            cache: 'no-store',
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.map((p: any) => ({
            id: p.id,
            image: toAbsUrl(p.coverImage),
            imageAlt: t(p.coverImageAlt, locale) || stripHtml(t(p.title, locale)),
            tags: p.tags,
            title: t(p.title, locale),
            slug: p.slug,
        }));
    } catch {
        return [];
    }
}

export async function PortfolioWrapper({ locale = "az" }: { locale?: string }) {
    const projects = await getPortfolios(locale);
    const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

    return (
        <PortfolioUI
            sectionTitle="Portfolio"
            projects={projects}
            showControls={true}
            dropdownLabel="Xidmətləri seçin"
            dropdownOptions={allTags}
        />
    );
}