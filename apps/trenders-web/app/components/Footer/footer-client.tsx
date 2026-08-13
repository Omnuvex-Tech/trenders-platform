"use client";

import { useLocaleStore } from "@/store/locale.store";
import { FooterUI } from "@repo/ui";

type LocalizedString = Record<string, string>;

function parseLocationMapUrl(raw: string | null): { url: string; newTab: boolean } {
    if (!raw) return { url: "", newTab: false };
    try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.url === "string") {
            return { url: parsed.url, newTab: !!parsed.newTab };
        }
    } catch {}
    return { url: raw, newTab: false };
}

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    return obj[locale] || obj["az"] || fallback;
}

interface FooterClientProps {
    logoSrc: string;
    logoAlt: LocalizedString;
    description: LocalizedString;
    navLinks: any[];
    socialLinks: { id: number; href: string; icon?: string }[];
 locationLabel: LocalizedString;
    locationValue: LocalizedString;
    locationMapUrl: string | null;
    phoneLabel: LocalizedString;
    phoneValue: LocalizedString;
    emailLabel: LocalizedString;
    emailValue: LocalizedString;
    copyrightText: LocalizedString;
    privacyText: LocalizedString;
}

export function FooterClient({
    logoSrc,
    logoAlt,
    description,
    navLinks,
    socialLinks,
  locationLabel,
    locationValue,
    locationMapUrl,
    phoneLabel,
    phoneValue,
    emailLabel,
    emailValue,
    copyrightText,
    privacyText,
}: FooterClientProps) {
    const { locale } = useLocaleStore();

    const mappedNavLinks = navLinks.map((l: any) => ({
        id: l.id,
        label: t(l.label, locale),
        href: l.href,
    }));
   const { url: mapUrl, newTab: mapNewTab } = parseLocationMapUrl(locationMapUrl);
    const locLocationValue = t(locationValue, locale);
    const locPhoneValue = t(phoneValue, locale);
    const locEmailValue = t(emailValue, locale);

    const contactItems = [
         locLocationValue
            ? {
                label: t(locationLabel, locale, "Location"),
                value: locLocationValue,
                href: mapUrl || undefined,
                target: mapUrl && mapNewTab ? "_blank" as const : undefined,
            }
            : null,
        locPhoneValue
            ? {
                label: t(phoneLabel, locale, "Phone"),
                value: locPhoneValue,
                href: `tel:${locPhoneValue.replace(/\s/g, "")}`,
            }
            : null,
        locEmailValue
            ? {
                label: t(emailLabel, locale, "Email Address"),
                value: locEmailValue,
                href: `mailto:${locEmailValue}`,
            }
            : null,
    ].filter(Boolean) as { label: string; value: string; href?: string }[];

    return (
        <FooterUI
            logoSrc={logoSrc}
            logoAlt={t(logoAlt, locale, "Logo")}
            description={t(description, locale)}
            navLinks={mappedNavLinks}
            socialLinks={socialLinks}
            contactItems={contactItems}
           copyrightText={t(copyrightText, locale, `© ${new Date().getFullYear()} Trenders`)}
            privacyLabel={t(privacyText, locale)}
            privacyHref={`/${locale}/privacypolicy`}
        />
    );
}