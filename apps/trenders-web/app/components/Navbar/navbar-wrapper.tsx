import { LanguageSwitcher } from "@/app/components/LanguageSwitcher/language-switcher";
import type { Language, Translation } from "@repo/types/types";
import Link from "next/link";
import { NavbarClient } from "./navbar-client";

type LocalizedString = Record<string, string>;

function toAbsUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    return obj[locale] || obj["az"] || fallback;
}

async function getNavbarData() {
    try {
        const res = await fetch(`${process.env.API_URL}/navbar-settings`, { cache: "no-store" });
        if (!res.ok) return null;
        return await res.json();
    } catch { return null; }
}

async function getServiceSuggestions(locale: string) {
    try {
        const res = await fetch(`${process.env.API_URL}/services/public`, { cache: "no-store" });
        if (!res.ok) return [];
        const services = await res.json();
        return (Array.isArray(services) ? services : []).map((s: any) => ({
            title: t(s.title, locale).replace(/<[^>]*>/g, "").trim(),
            url: `/services/${s.slug ?? s.id}`,
            breadcrumb: "Xidmətlər",
            excerpt: "",
        }));
    } catch { return []; }
}

interface NavbarProps {
    languages: Language[];
    locale: string;
    initialTranslations: Translation[];
}

export async function NavbarWrapper({ locale, languages, initialTranslations }: NavbarProps) {
    const [data, defaultSuggestions] = await Promise.all([
        getNavbarData(),
        getServiceSuggestions(locale),
    ]);

    const links = data?.links
        ? [...data.links]
            .filter((l: any) => l.isVisible)
            .sort((a: any, b: any) => a.order - b.order)
            .map((l: any) => ({
                label: t(l.label, locale),
                href: l.href,
                openInNewTab: l.openInNewTab,
            }))
        : [];

    const logoAlt = t(data?.logoImageAlt, locale, "Logo");

    const logo = (
        <Link href="/">
            {data?.logoImage ? (
                <img
                    src={toAbsUrl(data.logoImage)}
                    alt={logoAlt}
                    width={200}
                    height={45}
                />
            ) : (
                <img
                    src="/images/logo-svg.svg"
                    alt={logoAlt}
                    width={147}
                    height={45}
                />
            )}
        </Link>
    );

    return (
        <NavbarClient
            logo={logo}
            links={links}
            showSearch={data?.showSearch ?? true}
            showLang={data?.showLang ?? true}
            defaultSuggestions={defaultSuggestions}
            langSlot={
                <LanguageSwitcher
                    languages={languages}
                    initialTranslations={initialTranslations}
                    locale={locale}
                />
            }
        />
    );
}