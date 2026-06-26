import { ContactUI } from "@repo/ui";
import { submitContactForm } from "@/app/actions/contact";

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
                return titleStr.replace(/<[^>]*>/g, "").trim();
            });
    } catch {
        return [];
    }
}

export async function ContactWrapper({ locale = "az" }: { locale?: string }) {
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

    return (
        <ContactUI
            title={t(data?.title, locale, "Contact us")}
            description={t(data?.description, locale, "")}
            info={{
                emailLabel: t(data?.emailLabel, locale, "Email Address"),
                email: t(data?.emailValue, locale, ""),
                phoneLabel: t(data?.phoneLabel, locale, "Phone"),
                phone: t(data?.phoneValue, locale, ""),
                locationLabel: t(data?.locationLabel, locale, "Location"),
                location: t(data?.locationValue, locale, ""),
                hoursLabel: t(data?.hoursLabel, locale, "Hours"),
                hours: t(data?.hoursValue, locale, ""),
                followUsLabel: t(data?.followUsLabel, locale, "Follow Us"),
                socialLinks,
                hashtags: (data?.tags ?? []).map((tag: any) =>
  typeof tag === "object" ? (tag[locale] || tag.az || "") : tag
).filter(Boolean),
            }}
            serviceOptions={serviceOptions}
            budgetOptions={budgetOptions}
            timelineOptions={timelineOptions}
            formLabels={{
                name: t(data?.formNameLabel, locale, "Name"),
                namePlaceholder: t(data?.formNamePlaceholder, locale, "Your name*"),
                email: t(data?.formEmailLabel, locale, "Email"),
                emailPlaceholder: t(data?.formEmailPlaceholder, locale, "Your email*"),
                phone: t(data?.formPhoneLabel, locale, "Phone"),
                phonePlaceholder: t(data?.formPhonePlaceholder, locale, "Your phone*"),
                service: t(data?.formServiceLabel, locale, "Service"),
                budget: t(data?.formBudgetLabel, locale, "Budget"),
                budgetPlaceholder: t(data?.formBudgetPlaceholder, locale, "Estimated Budget"),
                timeline: t(data?.formTimelineLabel, locale, "Project Timeline"),
                timelinePlaceholder: t(data?.formTimelinePlaceholder, locale, "ASAP"),
                message: t(data?.formMessageLabel, locale, "Message"),
                messagePlaceholder: t(data?.formMessagePlaceholder, locale, "Your message"),
                submit: t(data?.formSubmitLabel, locale, "Submit Inquiry"),
            }}
            onSubmit={submitContactForm}
        />
    );
}