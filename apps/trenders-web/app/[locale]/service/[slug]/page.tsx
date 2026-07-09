
import { notFound } from "next/navigation";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import {
    ServiceDetailHeroUI,
    ServiceDetailContentUI,
    ServiceDetailOverlayUI,
    ServiceDetailQuoteUI,
} from "@repo/ui";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, isSupportedLocale } from "@/config/locales";
import type { Translation } from "@repo/types/types";

type LocalizedString = Record<string, string>;
type LocalizedImages = Record<string, string[]>;

const LANG_PRIORITY = ["az", "en", "ru"];

function getL(obj: LocalizedString | any, locale: string): string {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[locale] || obj.az || "";
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
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}

async function getService(slug: string) {
    try {
        const res = await fetch(
            `${process.env.API_URL}/services/slug/${slug}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) return null;

        return res.json();
    } catch {
        return null;
    }
}

function renderSection(section: any, index: number, locale: string) {
    switch (section.type) {
        case "hero": {
            const heroImage = toAbsUrl(resolveLocalizedImage(section.heroImage, locale));
            const bottomImage = toAbsUrl(resolveLocalizedImage(section.bottomImage, locale));
            return (
                <ServiceDetailHeroUI
                    key={index}
                    heroImage={heroImage}
                    badge={getL(section.badge, locale)}
                    title={getL(section.title, locale)}
                    descriptions={(section.descriptions ?? []).map((d: any) =>
                        getL(d, locale)
                    )}
                    stats={(section.stats ?? []).map((s: any) => ({
                        label: getL(s.label, locale),
                        value: getL(s.value, locale),
                        icon: s.icon ? (
                            <img
                                src={toAbsUrl(s.icon)}
                                alt={getL(s.label, locale)}
                                style={{ width: 24, height: 24 }}
                            />
                        ) : undefined,
                    }))}
                    quoteText={getL(section.quoteText, locale)}
                    bottomImage={bottomImage}
                    bottomImageAlt={getL(section.bottomImageAlt, locale)}
                />
            );
        }

        case "content":
            return (
                <ServiceDetailContentUI
                    key={index}
                    items={(section.items ?? []).map((item: any) => {
                        const quoteImage = toAbsUrl(resolveLocalizedImage(item.quoteImage, locale));
                        const itemImage = resolveLocalizedImage(item.image, locale);
                        return {
                            number: getL(item.number, locale),
                            badge: getL(item.badge, locale),
                            title: getL(item.title, locale),
                            descriptions: (item.descriptions ?? []).map((d: any) =>
                                getL(d, locale)
                            ),
                            quote: item.quote ? getL(item.quote, locale) : null,
                            quoteImage,
                            subText: getL(item.subText, locale),
                            image: itemImage ? toAbsUrl(itemImage) : undefined,
                            imageAlt: getL(item.imageAlt, locale),
                            contactLabel: getL(item.contactLabel, locale),
                        };
                    })}
                />
            );
        case "quote": {
            const quoteImage = toAbsUrl(resolveLocalizedImage(section.quoteImage, locale));
            return (
                <ServiceDetailQuoteUI
                    key={index}
                    number={getL(section.number, locale)}
                    badge={getL(section.badge, locale)}
                    title={getL(section.title, locale)}
                    descriptions={(section.descriptions ?? []).map((d: any) =>
                        getL(d, locale)
                    )}
                    quoteImage={quoteImage}
                    quoteImageAlt={getL(section.quoteImageAlt, locale)}
                    quoteText={getL(section.quoteText, locale)}
                />
            );
        }

        case "overlay": {
            const image = toAbsUrl(resolveLocalizedImage(section.image, locale));
            return (
                <ServiceDetailOverlayUI
                    key={index}
                    image={image}
                    imageAlt={getL(section.imageAlt, locale)}
                    badge={getL(section.badge, locale)}
                    title={getL(section.title, locale)}
                    descriptions={(section.descriptions ?? []).map((d: any) =>
                        getL(d, locale)
                    )}
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
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    try {
        const [service, contactRes] = await Promise.all([
            getService(slug),
            fetch(`${process.env.API_URL}/contact`, { cache: "no-store" }),
        ]);

        if (!service) return { title: "Xidmət" };

        const contact = contactRes.ok ? await contactRes.json() : null;

      const contactTags: string[] = [];
    if (Array.isArray(contact?.tags)) {
      contact.tags.forEach((tag: any) => {
        const raw = typeof tag === "object" ? (tag[locale] || tag.az || "") : tag;
        const val = typeof raw === "string" ? raw.replace(/^#+/, "").trim() : raw;
        if (val) contactTags.push(val);
      });
    }

        const manualKeywords = service.seoKeywords?.[locale] || "";
        const allKeywords = [
            ...manualKeywords.split(",").map((k: string) => k.trim()).filter(Boolean),
            ...contactTags,
        ].join(", ");

        return {
            title: service.seoTitle?.[locale] || stripHtml(getL(service.title, locale)) || "Xidmət",
            description: service.seoDescription?.[locale] || "",
            keywords: allKeywords || undefined,
        };
    } catch {
        return { title: "Xidmət" };
    }
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;

    if (!isSupportedLocale(locale)) {
        notFound();
    }

    const [service, translationResponse] = await Promise.all([
        getService(slug),
        api.get<Translation[]>(
            config.endpoints.translations.list,
            { locale }
        ),
    ]);

    if (!service || !service.isVisible) {
        notFound();
    }

    const jsonLd = service.schema?.[locale];

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

            {(service.sections ?? [])
                .filter((section: any) => section.isVisible !== false)
                .map((section: any, i: number) =>
                    renderSection(section, i, locale)
                )}

            <ContactWrapper locale={locale} />
        </div>
    );
}
