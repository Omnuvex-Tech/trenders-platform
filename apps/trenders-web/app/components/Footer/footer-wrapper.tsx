// import { FooterUI } from "@repo/ui";

// export function FooterWrapper() {
//     return (
//         <FooterUI
//             logoSrc="/images/footer-logo.png"
//             description="Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet"
//             navLinks={[
//                 { label: "Haqqımızda", href: "/About" },
//                 { label: "Service", href: "/Service" },
//                 { label: "Portfolio", href: "#" },
//                 { label: "Vakansiyalar", href: "/Vacancy" },
//                 { label: "Blog", href: "/Blog" },
//                 { label: "Əlaqə", href: "#" },
//             ]}
//             socialLinks={[
//                 { label: "Facebook", href: "#" },
//                 { label: "Instagram", href: "#" },
//                 { label: "TikTok", href: "#" },
//                 { label: "LinkedIn", href: "#" },
//             ]}
//             contactItems={[
//                 {
//                     label: "Location",
//                     value: "Baku, Sabail Alibayov Gardashlari, 12",
//                 },
//                 {
//                     label: "Phone",
//                     value: "+(994) 502263035",
//                     href: "tel:+994502263035",
//                 },
//                 {
//                     label: "Email Adress",
//                     value: "trenders@gmail.com",
//                     href: "mailto:trenders@gmail.com",
//                 },
//             ]}
//             copyrightYear={2023}
//             copyrightName="Trenders"
//         />
//     );
// }


import { FooterUI } from "@repo/ui";

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

    const navLinks = data?.navLinks
        ? [...data.navLinks]
            .filter((l: any) => l.isVisible)
            .sort((a: any, b: any) => a.order - b.order)
            .map((l: any) => ({
                id: l.id,
                label: l.label,
                href: l.href,
            }))
        : [];

    const socialLinks = data?.socialLinks
        ? [...data.socialLinks]
            .filter((l: any) => l.isVisible)
            .sort((a: any, b: any) => a.order - b.order)
            .map((l: any) => ({
                id: l.id,
                label: l.label ?? "",
                href: l.href,
                icon: l.icon ? toAbsUrl(l.icon) : undefined,
            }))
        : [];

    const contactItems = [
        data?.locationValue
            ? { label: data.locationLabel || "Location", value: data.locationValue }
            : null,
        data?.phoneValue
            ? {
                  label: data.phoneLabel || "Phone",
                  value: data.phoneValue,
                  href: `tel:${data.phoneValue.replace(/\s/g, "")}`,
              }
            : null,
        data?.emailValue
            ? {
                  label: data.emailLabel || "Email Adress",
                  value: data.emailValue,
                  href: `mailto:${data.emailValue}`,
              }
            : null,
    ].filter(Boolean) as { label: string; value: string; href?: string }[];

    const copyrightMatch = data?.copyrightText?.match(/©\s*(\d{4})\s+(.*)/);
    const copyrightYear = copyrightMatch
        ? Number(copyrightMatch[1])
        : new Date().getFullYear();
    const copyrightName = copyrightMatch
        ? copyrightMatch[2]
        : (data?.copyrightText ?? "Trenders");

    return (
        <FooterUI
            logoSrc={data?.logoImage ? toAbsUrl(data.logoImage) : "/images/footer-logo.png"}
            logoAlt={data?.logoAlt || copyrightName}
            description={data?.description ?? ""}
            navLinks={navLinks}
            socialLinks={socialLinks}
            contactItems={contactItems}
            copyrightYear={copyrightYear}
            copyrightName={copyrightName}
            privacyLabel={data?.privacyText}
        />
    );
}