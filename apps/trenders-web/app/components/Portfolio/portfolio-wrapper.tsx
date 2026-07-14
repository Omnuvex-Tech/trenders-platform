import { PortfolioUI } from '@repo/ui';
import type { PortfolioItem, PortfolioCategory } from '@repo/ui';

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

function decodeHtmlEntities(text: string) {
    return (text ?? "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
}

function stripHtml(html: string) {
    return decodeHtmlEntities((html ?? "").replace(/<[^>]*>/g, "")).trim();
}

function toAbsUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

async function getPortfolios(locale: string): Promise<PortfolioItem[]> {
    try {
        const res = await fetch(`${process.env.API_URL}/portfolio/public`, {
            next: { revalidate: 10 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.map((p: any) => {
            const categories: PortfolioCategory[] = (p.services ?? []).map((ps: any) => ({
                title: stripHtml(t(ps.service?.title, locale)),
                coverImage: toAbsUrl(ps.coverImage),
                imageAlt: t(ps.coverImageAlt, locale) || stripHtml(t(p.title, locale)),
            }));
            return {
                id: p.id,
                image: toAbsUrl(p.coverImage),
                gif: p.gif ? toAbsUrl(p.gif) : undefined,
                imageAlt: t(p.coverImageAlt, locale) || stripHtml(t(p.title, locale)),
                categories,
                title: t(p.title, locale),
                slug: p.slug,
            };
        });
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
            next: { revalidate: 10 },
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
    const allCategories = Array.from(
        new Set(projects.flatMap(p => p.categories.map(c => c.title)))
    ).filter(Boolean);

    return (
        <PortfolioUI
            sectionTitle={settings.sectionTitle}
            projects={projects}
            showControls={true}
            dropdownLabel={settings.dropdownLabel}
            dropdownOptions={allCategories}
            loadMoreLabel={settings.moreButtonLabel}
        />
    );
}