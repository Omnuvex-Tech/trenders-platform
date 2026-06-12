import { cookies } from "next/headers";
import { notFound } from 'next/navigation';
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { PortfolioDetailHeroUI } from '@repo/ui';
import { PortfolioDetailStepsUI } from '@repo/ui';
import { PortfolioDetailServiceUI } from '@repo/ui';
import { PortfolioDetailStrategyUI } from '@repo/ui';
import { PortfolioDetailOverlayUI } from '@repo/ui';
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

function toAbsUrl(path: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${process.env.API_URL}${path}`;
}

function toAbsUrls(images: string[]) {
    return (images ?? []).map(toAbsUrl);
}

async function getPortfolio(slug: string) {
    try {
        const res = await fetch(`${process.env.API_URL}/portfolio/slug/${slug}`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

function renderSection(section: any, index: number, locale: string) {
    switch (section.type) {
        case 'hero': {
            const images = toAbsUrls(section.images ?? []);
            return (
                <PortfolioDetailHeroUI
                    key={index}
                    heroImage={images[0] ?? ''}
                    heroImageAlt={section.imagesAlt ?? ''}
                    number={section.number ?? ''}
                    title={t(section.title, locale)}
                    description={t(section.description, locale)}
                    imagesAlt={section.imagesAlt ?? ''}
                    galleryImages={images.slice(1).map((src) => ({
                        src,
                        alt: section.imagesAlt ?? '',
                    }))}
                />
            );
        }
        case 'steps': {
            return (
                <PortfolioDetailStepsUI
                    key={index}
                    description={t(section.description, locale)}
                    steps={(section.steps ?? []).map((s: any) => ({
                        ...s,
                        label: t(s.label, locale),
                    }))}
                />
            );
        }
        case 'service': {
            return (
                <PortfolioDetailServiceUI
                    key={index}
                    badge={t(section.badge, locale)}
                    bigNumber={section.bigNumber ?? ''}
                    title={t(section.title, locale)}
                    descriptions={(section.descriptions ?? []).map((d: any) => t(d, locale))}
                    items={(section.items ?? []).map((item: any) => ({
                        number: item.number,
                        title: t(item.title, locale),
                        images: toAbsUrls(item.images ?? []),
                        imagesAlt: item.imagesAlt ?? '',
                    }))}
                />
            );
        }
        case 'strategy': {
            return (
                <PortfolioDetailStrategyUI
                    key={index}
                    badge={t(section.badge, locale)}
                    title={t(section.title, locale)}
                    quote={t(section.quote, locale)}
                    mainImage={toAbsUrl(section.mainImage ?? '')}
                    quoteImage={toAbsUrl(section.quoteImage ?? '')}
                    quoteImageAlt={section.quoteImageAlt ?? ''}
                    smallImages={toAbsUrls(section.smallImages ?? ['', '']) as [string, string]}
                    smallImagesAlt={section.smallImagesAlt ?? ''}
                    descriptions={(section.descriptions ?? []).map((d: any) => t(d, locale))}
                />
            );
        }
        case 'overlay': {
            return (
                <PortfolioDetailOverlayUI
                    key={index}
                    badge={t(section.badge, locale)}
                    title={t(section.title, locale)}
                    image={toAbsUrl(section.image ?? '')}
                    imageAlt={section.imageAlt ?? ''}
                    descriptions={(section.descriptions ?? []).map((d: any) => t(d, locale))}
                />
            );
        }
        default:
            return null;
    }
}

export default async function PortfolioDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const [portfolio, langResponse, translationResponse] = await Promise.all([
        getPortfolio(slug),
        api.get<Language[]>(config.endpoints.languages.list),
        api.get<Translation[]>(config.endpoints.translations.list, { locale }),
    ]);

    if (!portfolio) notFound();

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper
                locale={locale}
                languages={langResponse.data ?? []}
                initialTranslations={translationResponse.data ?? []}
            />
            {(portfolio.sections ?? [])
                .filter((section: any) => section.isVisible !== false)
                .map((section: any, i: number) =>
                    renderSection(section, i, locale)
                )}
            <ContactWrapper locale={locale} />
        </div>
    );
}