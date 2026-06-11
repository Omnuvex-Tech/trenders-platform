import { FooterClient } from "./footer-client";

function toAbsUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

async function getFooterData() {
    try {
        const res = await fetch(`${process.env.API_URL}/footer`, { cache: "no-store" });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export async function FooterWrapper() {
    const data = await getFooterData();

    const rawNavLinks = data?.navLinks
        ? [...data.navLinks]
            .filter((l: any) => l.isVisible)
            .sort((a: any, b: any) => a.order - b.order)
        : [];

    const rawSocialLinks = data?.socialLinks
        ? [...data.socialLinks]
            .filter((l: any) => l.isVisible)
            .sort((a: any, b: any) => a.order - b.order)
            .map((l: any) => ({
                id: l.id,
                href: l.href,
                icon: l.icon ? toAbsUrl(l.icon) : undefined,
            }))
        : [];

    return (
        <FooterClient
            logoSrc={data?.logoImage ? toAbsUrl(data.logoImage) : "/images/footer-logo.png"}
            logoAlt={data?.logoAlt ?? {}}
            description={data?.description ?? {}}
            navLinks={rawNavLinks}
            socialLinks={rawSocialLinks}
            locationLabel={data?.locationLabel ?? {}}
            locationValue={data?.locationValue ?? {}}
            phoneLabel={data?.phoneLabel ?? {}}
            phoneValue={data?.phoneValue ?? {}}
            emailLabel={data?.emailLabel ?? {}}
            emailValue={data?.emailValue ?? {}}
            copyrightText={data?.copyrightText ?? {}}
            privacyText={data?.privacyText ?? {}}
        />
    );
}