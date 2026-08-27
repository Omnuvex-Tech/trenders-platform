import { AboutQuoteUI } from "@repo/ui";
import { localizeHref } from "@/lib/localize-href";

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

function toAbsUrl(path?: string | null) {
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

export async function AboutQuoteWrapper({ locale }: { locale?: string }) {
    const resolvedLocale = locale ?? "az";
    const s = await getAboutSettings();

    if (!s || !s.quoteImage) return null;

    const author = s.quoteAuthor;

    return (
        <AboutQuoteUI
            image={toAbsUrl(s.quoteImage)}
            imageAlt={t(s.quoteImageAlt, resolvedLocale)}
            title={t(s.quoteTitle, resolvedLocale)}
            description={t(s.quoteDescription, resolvedLocale)}
            authorName={author ? t(author.name, resolvedLocale) : ""}
            authorRole={author ? t(author.role, resolvedLocale) : ""}
            authorHref={author?.slug ? localizeHref(`/blogauthor/${author.slug}`, resolvedLocale) : "#"}
        />
    );
}