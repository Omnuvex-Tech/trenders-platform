import { ContactPageUI } from "@repo/ui";
import { submitContactForm } from "@/app/actions/contact";
import MapComponent from "@/app/components/VacancyDetail/mapcomponent";

const API = process.env.API_URL;

function toAbsUrl(path: string | null | undefined): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API}${path}`;
}

function t(obj: Record<string, string> | null | undefined, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    return obj[locale] || obj["az"] || obj["en"] || fallback;
}

function decodeHtmlEntities(str: string): string {
    return str
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}

async function getContactData() {
    try {
        const res = await fetch(`${API}/contact`, { cache: "no-store" });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

async function getServiceOptions(locale: string): Promise<string[]> {
    try {
        const res = await fetch(`${API}/services`, { cache: "no-store" });
        if (!res.ok) return [];
        const data = await res.json();
        return (data as any[])
            .filter((s: any) => s.isVisible !== false)
            .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
            .map((s: any) => {
                const raw = s.title ?? s.name ?? "";
                const titleStr = typeof raw === "object" ? (raw[locale] || raw["az"] || raw["en"] || "") : raw;
                return decodeHtmlEntities(titleStr.replace(/<[^>]*>/g, ""));
            })
            .filter(Boolean);
    } catch {
        return [];
    }
}

export async function ContactPageWrapper({ locale = "az" }: { locale?: string }) {
    const [data, serviceOptions] = await Promise.all([
        getContactData(),
        getServiceOptions(locale),
    ]);

    const socialLinks = data?.socialLinks
        ? [...data.socialLinks]
            .filter((l: any) => l.isVisible)
            .sort((a: any, b: any) => a.order - b.order)
            .map((l: any) => ({
                id: l.id,
                icon: l.icon ? toAbsUrl(l.icon) : null,
                href: l.href,
            }))
        : [];

    const budgetOptions: string[] = data?.budgetOptions
        ? [...data.budgetOptions]
            .sort((a: any, b: any) => a.order - b.order)
            .map((o: any) => t(o.label, locale, ""))
            .filter(Boolean)
        : [];

    const timelineOptions: string[] = data?.timelineOptions
        ? [...data.timelineOptions]
            .sort((a: any, b: any) => a.order - b.order)
            .map((o: any) => t(o.label, locale, ""))
            .filter(Boolean)
        : [];

    const image = data?.image ? toAbsUrl(data.image) : null;

    return (
        <ContactPageUI
            title={t(data?.title, locale)}
            description={t(data?.description, locale)}
            image={image}
            imageAlt={t(data?.imageAlt, locale, "")}
            info={{
                emailLabel: t(data?.emailLabel, locale),
                email: t(data?.emailValue, locale, ""),
                phoneLabel: t(data?.phoneLabel, locale),
                phone: t(data?.phoneValue, locale, ""),
                locationLabel: t(data?.locationLabel, locale),
                location: t(data?.locationValue, locale, ""),
                hoursLabel: t(data?.hoursLabel, locale),
                hours: t(data?.hoursValue, locale, ""),
                followUsLabel: t(data?.followUsLabel, locale),
                socialLinks,
                hashtags: (data?.tags ?? []).map((tag: any) =>
                    typeof tag === "object" ? (tag[locale] || tag.az || tag.en || "") : tag
                ).filter(Boolean),
            }}
            serviceOptions={serviceOptions}
            budgetOptions={budgetOptions}
            timelineOptions={timelineOptions}
            formLabels={{
                name: t(data?.formNameLabel, locale),
                namePlaceholder: t(data?.formNamePlaceholder, locale),
                email: t(data?.formEmailLabel, locale),
                emailPlaceholder: t(data?.formEmailPlaceholder, locale),
                phone: t(data?.formPhoneLabel, locale),
                phonePlaceholder: t(data?.formPhonePlaceholder, locale),
                service: t(data?.formServiceLabel, locale),
                servicePlaceholder: t(data?.formServicePlaceholder, locale),
                budget: t(data?.formBudgetLabel, locale),
                budgetPlaceholder: t(data?.formBudgetPlaceholder, locale),
                timeline: t(data?.formTimelineLabel, locale),
                timelinePlaceholder: t(data?.formTimelinePlaceholder, locale),
                message: t(data?.formMessageLabel, locale),
                messagePlaceholder: t(data?.formMessagePlaceholder, locale),
                submit: t(data?.formSubmitLabel, locale),
            }}
           mapComponent={<MapComponent lat={40.351556} lng={49.832056} />}
           mapLink="https://www.google.com/maps/place/TRENDERS/@40.3510338,49.832239,18.62z/data=!4m12!1m5!3m4!2zNDDCsDIxJzA1LjYiTiA0OcKwNDknNTUuNCJF!8m2!3d40.35156!4d49.83206!3m5!1s0xa4a8976b3b45e41:0xb00ab757d1fb334c!8m2!3d40.35089!4d49.8326318!16s%2Fg%2F11q9m6gs4m?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
            onSubmit={submitContactForm}
        />
    );
}