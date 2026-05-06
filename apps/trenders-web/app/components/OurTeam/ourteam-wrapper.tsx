import { OurTeamUI } from "@repo/ui";
import type { OurTeamMember } from "@repo/ui";

const MEMBERS: OurTeamMember[] = [
    {
        id: 1,
        image: "/images/team5.png",
        name: "Cavid Axundov",
        role: "Baş İcarçı Direktor",
        href: "#",
    },
    {
        id: 2,
        image: "/images/team6.jpg",
        name: "Fuada Isgender",
        role: "Marketing Direktor",
        href: "#",
    },
    {
        id: 3,
        image: "/images/team3.jpg",
        name: "İlham Aghazade",
        role: "Asistant",
        href: "#",
    },
    {
        id: 4,
        image: "/images/team4.jpg",
        name: "Nazrin Axundova",
        role: "Baş İcarçı Direktor",
        href: "#",
    },
     {
        id: 5,
        image: "/images/team1.jpg",
        name: "Cavid Axundov",
        role: "Baş İcarçı Direktor",
        href: "#",
    },
    {
        id: 6,
        image: "/images/team5.png",
        name: "Cavid Axundov",
        role: "Baş İcarçı Direktor",
        href: "#",
    },
    {
        id: 7,
        image: "/images/team3.jpg",
        name: "İlham Aghazade",
        role: "Asistant",
        href: "#",
    },
    {
        id: 8,
        image: "/images/team4.jpg",
        name: "Nazrin Axundova",
        role: "Baş İcarçı Direktor",
        href: "#",
    },
];

export function OurTeamWrapper() {
    return (
        <OurTeamUI
            title="Komandamız"
            descriptionText="Biz tipik bir marketinq şirkəti deyilik! Bir çox brendlər trendləri izləməyə çalışdığı zaman,"
            descriptionLink="biz sizə trendi yaratmağa kömək edəcəyik."
            members={MEMBERS}
        />
    );
}