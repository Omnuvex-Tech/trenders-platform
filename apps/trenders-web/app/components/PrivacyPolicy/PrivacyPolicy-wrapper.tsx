import { PrivacyPolicyUI } from '@repo/ui';
import type { PrivacyPolicySection } from '@repo/ui';

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

interface PrivacyPolicySectionApi {
    id: number;
    title: LocalizedString;
    description: LocalizedString;
    order: number;
}

interface PrivacyPolicySettingsApi {
    id: number;
    title: LocalizedString;
    description: LocalizedString;
    sections: PrivacyPolicySectionApi[];
}

async function getPrivacyPolicy(locale: string): Promise<{ title: string; description: string; sections: PrivacyPolicySection[] }> {
    try {
        const res = await fetch(`${process.env.API_URL}/privacy-policy`, {
            next: { revalidate: 10 },
        });
        if (!res.ok) throw new Error();
        const data: PrivacyPolicySettingsApi = await res.json();

        const sections: PrivacyPolicySection[] = (data.sections ?? [])
            .sort((a, b) => a.order - b.order)
            .map((s) => ({
                id: s.id,
                title: t(s.title, locale),
                description: t(s.description, locale),
            }));

        return {
            title: t(data?.title, locale),
            description: t(data?.description, locale),
            sections,
        };
    } catch {
        return { title: "", description: "", sections: [] };
    }
}

export async function PrivacyPolicyWrapper({ locale = "az" }: { locale?: string }) {
    const { title, description, sections } = await getPrivacyPolicy(locale);

    return (
        <PrivacyPolicyUI
            title={title}
            description={description}
            sections={sections}
        />
    );
}