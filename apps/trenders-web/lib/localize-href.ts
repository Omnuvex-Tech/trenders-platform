const DEFAULT_LOCALE = "az";

export function localizeHref(href: string | undefined | null, locale: string): string {
    if (!href) return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
    if (locale === DEFAULT_LOCALE) return href;
    const path = href === "/" ? "" : href;
    return `/${locale}${path}`;
}