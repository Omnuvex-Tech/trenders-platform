"use client";

import { TeamUI } from "@repo/ui";
import type { TeamMember } from "@repo/ui";

const TEAM_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: "Cəmilə Əhmədova",
        role: "Baş İcraçı Direktor",
        image: "/images/team1.jpg",
    },
    {
        id: 2,
        name: "Səbinə Akhundov",
        role: "Marketinq Direktoru",
        image: "/images/team2.jpg",
    },
    {
        id: 3,
        name: "Kanan Akhbarov",
        role: "Qrafik Dizayner",
        image: "/images/team3.jpg",
    },
    {
        id: 4,
        name: "Əli Həsənov",
        role: "SMM Mütəxəssisi",
        image: "/images/team4.jpg",
    },
];

export function TeamWrapper() {
    return (
        <TeamUI
            title="İlham Verən Komanda"
            members={TEAM_MEMBERS}
            featuredImage="/images/team2.jpg"
        />
    );
}