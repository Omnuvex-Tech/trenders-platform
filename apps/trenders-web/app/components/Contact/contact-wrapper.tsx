import { ContactUI } from "@repo/ui";
import { submitContactForm } from "@/app/actions/contact";

const API = process.env.API_URL;

function toAbsUrl(path: string | null | undefined): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API}${path}`;
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

async function getServiceOptions(): Promise<string[]> {
    try {
        const res = await fetch(`${API}/services`, { cache: "no-store" }); 
        if (!res.ok) return [];
        const data = await res.json();
        return (data as any[])
            .filter((s: any) => s.isVisible !== false)
            .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
            .map((s: any) => {
                const raw = s.title ?? s.name ?? "";
                return raw.replace(/<[^>]*>/g, "").trim();
            });
    } catch {
        return [];
    }
}

export async function ContactWrapper() {
    const [data, serviceOptions] = await Promise.all([
        getContactData(),
        getServiceOptions(),
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
            .map((o: any) => o.label)
        : [];

    const timelineOptions: string[] = data?.timelineOptions
        ? [...data.timelineOptions]
            .sort((a: any, b: any) => a.order - b.order)
            .map((o: any) => o.label)
        : [];

    return (
        <ContactUI
            title={data?.title ?? "Contact us"}
            description={data?.description ?? ""}
            info={{
                emailLabel: data?.emailLabel ?? "Email Adress",
                email: data?.emailValue ?? "",
                phoneLabel: data?.phoneLabel ?? "Phone",
                phone: data?.phoneValue ?? "",
                locationLabel: data?.locationLabel ?? "Location",
                location: data?.locationValue ?? "",
                hoursLabel: data?.hoursLabel ?? "Hours",
                hours: data?.hoursValue ?? "",
                followUsLabel: data?.followUsLabel ?? "Follow Us",
                socialLinks,
                hashtags: data?.tags ?? [],
            }}
            serviceOptions={serviceOptions}
            budgetOptions={budgetOptions}
            timelineOptions={timelineOptions}
            formLabels={{
                name: data?.formNameLabel ?? "Name",
                namePlaceholder: data?.formNamePlaceholder ?? "Your name*",
                email: data?.formEmailLabel ?? "Email",
                emailPlaceholder: data?.formEmailPlaceholder ?? "Your email*",
                phone: data?.formPhoneLabel ?? "Phone",
                phonePlaceholder: data?.formPhonePlaceholder ?? "Your phone*",
                service: data?.formServiceLabel ?? "Service",
                budget: data?.formBudgetLabel ?? "Budget",
                budgetPlaceholder: data?.formBudgetPlaceholder ?? "Estimated Budget",
                timeline: data?.formTimelineLabel ?? "Project Timeline",
                timelinePlaceholder: data?.formTimelinePlaceholder ?? "ASAP",
                message: data?.formMessageLabel ?? "Message",
                messagePlaceholder: data?.formMessagePlaceholder ?? "Your message",
                submit: data?.formSubmitLabel ?? "Submit Inquiry",
            }}
             onSubmit={submitContactForm} 
        />
    );
}