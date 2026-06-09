// import { ServicesUI } from "@repo/ui";
// import type { Service } from "@repo/ui";

// function toAbsUrl(path: string): string {
//     if (!path) return "";
//     if (path.startsWith("http")) return path;
//     return `${process.env.API_URL}${path}`;
// }


// async function getServices(): Promise<Service[]> {
//     try {
//         const res = await fetch(`${process.env.API_URL}/services`, {
//             cache: "no-store",
//         });
//         if (!res.ok) return [];
//         const data = await res.json();
//         return (data as any[])
//             .filter((s) => s.isVisible)
//             .sort((a, b) => a.order - b.order)
//             .map((s) => ({
//                 id: s.id,
//                 number: s.number ?? "",
//                 title: s.title ?? "",
//                 imageAlt: s.imageAlt ?? "",
//                 description: s.description ?? "",
//                 image: toAbsUrl(s.image ?? ""),
//                 gif: s.gif ? toAbsUrl(s.gif) : undefined,
//                 badge: s.badge ?? "",
//                 imageDescription: s.description ?? "",
//                 items: (s.features ?? []).map((f: any) => ({ label: f.label })),
//                 portfolioHref: s.portfolioButtonLink || "#",
//                 portfolioNewTab: s.portfolioButtonNewTab ?? false,
//                 detailHref: s.detailButtonLink || `/service/${s.slug}`,
//                 detailNewTab: s.detailButtonNewTab ?? false,
//             }));
//     } catch {
//         return [];
//     }
// }

// export async function ServicesWrapper() {
//     const services = await getServices();
//     if (services.length === 0) return null;
//     return <ServicesUI title="Xidmətlərimiz" services={services} />;
// }












import { ServicesUI } from "@repo/ui";
import type { Service } from "@repo/ui";

function toAbsUrl(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${process.env.API_URL}${path}`;
}

async function getServices(): Promise<Service[]> {
    try {
        const res = await fetch(`${process.env.API_URL}/services`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        const data = await res.json();
        return (data as any[])
            .filter((s) => s.isVisible)
            .sort((a, b) => a.order - b.order)
            .map((s) => ({
                id: s.id,
                number: s.number ?? "",
                title: s.title ?? "",
                imageAlt: s.imageAlt ?? "",
                description: s.description ?? "",
                image: toAbsUrl(s.image ?? ""),
                gif: s.gif ? toAbsUrl(s.gif) : undefined,
                badge: s.badge ?? "",
                imageDescription: s.description ?? "",
                items: (s.features ?? []).map((f: any) => ({ label: f.label })),
                portfolioHref: s.portfolioButtonLink || "#",
                portfolioNewTab: s.portfolioButtonNewTab ?? false,
                detailHref: s.detailButtonLink || `/service/${s.slug}`,
                detailNewTab: s.detailButtonNewTab ?? false,
                portfolioLabel: s.portfolioButtonText ?? "Portfolio",
detailLabel: s.detailButtonText ?? "DAHA ƏTRAFLI",
            }));
    } catch {
        return [];
    }
}

export async function ServicesWrapper() {
    const services = await getServices();
    if (services.length === 0) return null;
    return <ServicesUI title="Xidmətlərimiz" services={services} />;
}