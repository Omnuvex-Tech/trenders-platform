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

function getL(obj: LocalizedString | any, locale: string): string {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[locale] || obj.az || "";
}

function toAbsUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
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
        case "hero":
            return (
                <ServiceDetailHeroUI
                    key={index}
                    heroImage={toAbsUrl(section.heroImage ?? "")}
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
                    bottomImage={toAbsUrl(section.bottomImage ?? "")}
                    bottomImageAlt={getL(section.bottomImageAlt, locale)}
                />
            );

        case "content":
            return (
                <ServiceDetailContentUI
                    key={index}
                    items={(section.items ?? []).map((item: any) => ({
                        number: getL(item.number, locale),
                        badge: getL(item.badge, locale),
                        title: getL(item.title, locale),
                        descriptions: (item.descriptions ?? []).map((d: any) =>
                            getL(d, locale)
                        ),
                        quote: item.quote
                            ? getL(item.quote, locale)
                            : null,
                        quoteImage: toAbsUrl(item.quoteImage ?? ""),
                        subText: getL(item.subText, locale),
                        image: item.image
                            ? toAbsUrl(item.image)
                            : undefined,
                        imageAlt: getL(item.imageAlt, locale),
                    }))}
                />
            );

        case "quote":
            return (
                <ServiceDetailQuoteUI
                    key={index}
                    number={getL(section.number, locale)}
                    badge={getL(section.badge, locale)}
                    title={getL(section.title, locale)}
                    descriptions={(section.descriptions ?? []).map((d: any) =>
                        getL(d, locale)
                    )}
                    quoteImage={toAbsUrl(section.quoteImage ?? "")}
                    quoteImageAlt={getL(section.quoteImageAlt, locale)}
                    quoteText={getL(section.quoteText, locale)}
                />
            );

        case "overlay":
            return (
                <ServiceDetailOverlayUI
                    key={index}
                    image={toAbsUrl(section.image ?? "")}
                    imageAlt={getL(section.imageAlt, locale)}
                    badge={getL(section.badge, locale)}
                    title={getL(section.title, locale)}
                    descriptions={(section.descriptions ?? []).map((d: any) =>
                        getL(d, locale)
                    )}
                />
            );

        default:
            return null;
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

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
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
