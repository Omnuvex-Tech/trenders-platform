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
import { STATIC_LANGUAGES, resolveLocale } from "@/config/locales";
import type { Translation } from "@repo/types/types";

type LocalizedString = Record<string, string>;
type LocalizedImages = Record<string, string[]>;

const LANG_PRIORITY = ["az", "en", "ru"];

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

function resolveLocalizedImages(images: LocalizedImages | string[] | any, locale: string): string[] {
    if (Array.isArray(images)) return images; 
    if (!images || typeof images !== "object") return [];
    const own = images[locale];
    if (Array.isArray(own) && own.length > 0) return own;
    for (const l of LANG_PRIORITY) {
        const arr = images[l];
        if (Array.isArray(arr) && arr.length > 0) return arr;
    }
    return [];
}

function resolveLocalizedImage(image: LocalizedImages | string | any, locale: string): string {
    if (typeof image === "string") return image; 
    return resolveLocalizedImages(image, locale)[0] ?? "";
}

function toAbsUrl(path: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${process.env.API_URL}${path}`;
}

function toAbsUrls(images: string[]) {
    if (!Array.isArray(images)) return [];
    return images.map(toAbsUrl);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
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
            const images = toAbsUrls(resolveLocalizedImages(section.images, locale));
            const imagesAlt = t(section.imagesAlt, locale);
            return (
                <PortfolioDetailHeroUI
                    key={index}
                    heroImage={images[0] ?? ''}
                    heroImageAlt={imagesAlt}
                    number={section.number ?? ''}
                    title={t(section.title, locale)}
                    description={t(section.description, locale)}
                    imagesAlt={imagesAlt}
                    galleryImages={images.slice(1).map((src) => ({
                        src,
                        alt: imagesAlt,
                    }))}
                    contactLabel={t(section.contactLabel, locale)}
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
                        images: toAbsUrls(resolveLocalizedImages(item.images, locale)),
                        imagesAlt: t(item.imagesAlt, locale),
                    }))}
                />
            );
        }
       case 'strategy': {
            const quoteImages = toAbsUrls(resolveLocalizedImages(section.quoteImages, locale));
            const smallImages = toAbsUrls(resolveLocalizedImages(section.images, locale));
            const quoteImagesAlt = t(section.quoteImagesAlt, locale);
            const smallImagesAlt = t(section.imagesAlt, locale);
            return (
                <PortfolioDetailStrategyUI
                    key={index}
                    badge={t(section.badge, locale)}
                    title={t(section.title, locale)}
                    quote={t(section.quote, locale)}
                    mainImage={toAbsUrl(resolveLocalizedImage(section.mainImage, locale))}
                    quoteImage={quoteImages[0] ?? ''}
                    quoteImageAlt={quoteImagesAlt}
                    smallImages={[smallImages[0] ?? '', smallImages[1] ?? ''] as [string, string]}
                    smallImagesAlt={smallImagesAlt}
                    descriptions={(section.descriptions ?? []).map((d: any) => t(d, locale))}
                    contactLabel={t(section.contactLabel, locale)}
                />
            );
        }
        case 'overlay': {
            const overlayImages = toAbsUrls(resolveLocalizedImages(section.images, locale));
            return (
                <PortfolioDetailOverlayUI
                    key={index}
                    badge={t(section.badge, locale)}
                    title={t(section.title, locale)}
                    image={overlayImages[0] ?? ''}
                    imageAlt={t(section.imagesAlt, locale)}
                    descriptions={(section.descriptions ?? []).map((d: any) => t(d, locale))}
                />
            );
        }
        default:
            return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

    try {
        const [portfolio, contactRes] = await Promise.all([
            getPortfolio(slug),
            fetch(`${process.env.API_URL}/contact`, { cache: "no-store" }),
        ]);

        if (!portfolio) return { title: "Portfolio" };

        const contact = contactRes.ok ? await contactRes.json() : null;

        const contactTags: string[] = [];
    if (Array.isArray(contact?.tags)) {
      contact.tags.forEach((tag: any) => {
        const raw = typeof tag === "object" ? (tag[locale] || tag.az || "") : tag;
        const val = typeof raw === "string" ? raw.replace(/^#+/, "").trim() : raw;
        if (val) contactTags.push(val);
      });
    }

        const manualKeywords = portfolio.seoKeywords?.[locale] || "";
        const allKeywords = [
            ...manualKeywords.split(",").map((k: string) => k.trim()).filter(Boolean),
            ...contactTags,
        ].join(", ");

        return {
            title: portfolio.seoTitle?.[locale] || stripHtml(t(portfolio.title, locale)) || "Portfolio",
            description: portfolio.seoDescription?.[locale] || "",
            keywords: allKeywords || undefined,
        };
    } catch {
        return { title: "Portfolio" };
    }
}
export default async function PortfolioDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

    const [portfolio, translationResponse] = await Promise.all([
        getPortfolio(slug),
        api.get<Translation[]>(config.endpoints.translations.list, { locale }),
    ]);

    if (!portfolio) notFound();

    const jsonLd = portfolio.schema?.[locale];

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <NavbarWrapper
                locale={locale}
                languages={STATIC_LANGUAGES}
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