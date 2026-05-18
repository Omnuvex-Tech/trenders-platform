import { PartnersPageUI } from "@repo/ui";
import type { PartnerPageItem } from "@repo/ui";

const PARTNERS: PartnerPageItem[] = [
    {
        id: 1,
        logo: "/images/partners/pasha-facility.png",
        logoAlt: "PASHA Facility Management",
        description: "App icons of EMUI 10, animated clock skins for P50 Pocket, design and graphics for OS",
    },
    {
        id: 2,
        logo: "/images/partners/kapital-bank.png",
        logoAlt: "Kapital Bank",
        description: "Homepage design for a webpage and email template builder",
    },
    {
        id: 3,
        logo: "/images/partners/sea-breeze.png",
        logoAlt: "Sea Breeze Resort",
        description: "Homepage design for a webpage and email template builder",
    },
    {
        id: 4,
        logo: "/images/partners/sabah-residence.png",
        logoAlt: "Sabah Residence",
        description: "Create scroll-stopping Social Media content, powered by AI",
    },
    {
        id: 5,
        logo: "/images/partners/tubadzin.png",
        logoAlt: "Tubadzin Azerbaijan",
        description: "Animated promos, UX expertise, and graphic design support for the marketing department",
    },
    {
        id: 6,
        logo: "/images/partners/parabokt.png",
        logoAlt: "Parabokt",
        description: "Redesign for the user interfaces and graphic content across the company's products",
    },
    {
        id: 7,
        logo: "/images/partners/kapital-bank.png",
        logoAlt: "Kapital Bank",
        description: "App icons of EMUI 10, animated clock skins for P50 Pocket, design and graphics for OS",
    },
    {
        id: 8,
        logo: "/images/partners/sea-breeze-2.png",
        logoAlt: "Sea Breeze Resort",
        description: "Homepage design for a webpage and email template builder",
    },
    {
        id: 9,
        logo: "/images/partners/le-mag.png",
        logoAlt: "Le MAG",
        description: "Homepage design for a webpage and email template builder",
    },
];

export function PartnersPageWrapper() {
    return (
        <PartnersPageUI
            title="Partnyorlar"
            partners={PARTNERS}
        />
    );
}