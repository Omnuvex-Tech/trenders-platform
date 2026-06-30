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
            gif: p.gif ? toAbsUrl(p.gif) : undefined,
            imageAlt: t(p.coverImageAlt, locale) || stripHtml(t(p.title, locale)),
            tags: p.tags,
            title: t(p.title, locale),
            slug: p.slug,
        }));
    } catch {
        return [];
    }
}

interface PortfolioSettings {
    sectionTitle: string;
    dropdownLabel: string;
    moreButtonLabel: string;
}

async function getPortfolioSettings(locale: string): Promise<PortfolioSettings> {
    try {
        const res = await fetch(`${process.env.API_URL}/portfolio/settings`, {
            cache: 'no-store',
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        return {
            sectionTitle: stripHtml(t(data?.sectionTitle, locale, "Portfolio")),
            dropdownLabel: stripHtml(t(data?.dropdownLabel, locale, "Xidmətləri seçin")),
            moreButtonLabel: stripHtml(t(data?.moreButtonLabel, locale, "Daha çox Portfolio")),
        };
    } catch {
        return {
            sectionTitle: "Portfolio",
            dropdownLabel: "Xidmətləri seçin",
            moreButtonLabel: "Daha çox Portfolio",
        };
    }
}

export async function PortfolioWrapper({ locale = "az" }: { locale?: string }) {
    const [projects, settings] = await Promise.all([
        getPortfolios(locale),
        getPortfolioSettings(locale),
    ]);
    const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

    return (
        <PortfolioUI
            sectionTitle={settings.sectionTitle}
            projects={projects}
            showControls={true}
            dropdownLabel={settings.dropdownLabel}
            dropdownOptions={allTags}
            loadMoreLabel={settings.moreButtonLabel}
        />
    );
}