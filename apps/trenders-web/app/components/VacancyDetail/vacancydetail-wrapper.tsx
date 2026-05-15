"use client";

import dynamic from "next/dynamic";
import { VacancyDetailUI } from "@repo/ui";

const MapComponent = dynamic(
    () => import("./mapcomponent"),
    { ssr: false }
);

export function VacancyDetailWrapper() {
    return (
        <VacancyDetailUI
            backLabel="Vakansiya"
            backHref="/vacancy"
            pageTitle="Vakansiya"
            jobTitle="Graphic Designer"
            sections={[
                {
                    title: "About The Role",
                    type: "text",
                    content: "Brendin pozisiyası, markanın rəqiblərinə nisbətən bazarda özünəməxsus mövqeyinin müəyyən edilməsi prosesidir. Bu, bir markanın əsas üstünlüklərini və xüsusiyyətlərini müəyyənləşdirməyi və müştərilərə informasiyanı birbaşa şəkildə çatdırmağı əhatə edir.",
                },
                {
                    title: "Skills",
                    type: "skills",
                    skills: ["Branding", "Graphic Design Skills", "Graphic Skills", "Visual Design Skills", "3D Rendering"],
                },
                {
                    title: "Responsible",
                    type: "bullets",
                    bullets: [
                        "• Markanın rəqiblərinə nisbətən bazarda özünəməxsus mövqeyinin müəyyən edilməsi prosesidir.",
                        "• Bu, bir markanın əsas üstünlüklərini və xüsusiyyətlərini müəyyənləşdirməyi və müştərilərə informasiyanı",
                        "• Birbaşa şəkildə çatdırmağı əhatə edir. Trendlər müştərilərə onları rəqiblərindən fərqləndirən və müştəriləri.",
                        "• Brendin pozisiyası, rendlər müştərilərə onları rəqiblərindən fərqləndirən və müştərləri. Brendin pozisiyası",
                    ],
                },
                {
                    title: "Requirements",
                    type: "bullets",
                    bullets: [
                        "• Brend identifikasiyası brendin vizual və emosional ifadəsidir.",
                        "• Trendlər müştərilərə öz brendlərinin mahiyyətini əks etdirən, onları rəqiblərindən fərqləndirən, unikal və yaddaqalan brend şəxsiyyətlərini inkişaf etdirməyə kömək edir.",
                        "• Bizim brend identifikasiyası xidmətlərimizə loqo dizaynı, vizual brend dizaynı və brend stilistikası daxildir.",
                        "• Loqo dizaynı brendi təmsil edən fərqli vizual simvolun yaradılması prosesidir.",
                    ],
                },
            ]}
            applyTitle="APPLY NOW"
            contact={{
                email: "trenders@mail.com",
                phone: "+(994) 502263035",
                location: "Baku, Sabail Alibayov Gardashlari, 12",
            }}
          mapComponent={
    <MapComponent lat={40.35156} lng={49.83206} />
}
            namePlaceholder="Your name*"
            phonePlaceholder="Your phone*"
            emailPlaceholder="Your email*"
            cvLabel="Cv yüklə"
            cvPlaceholder="pdf, png, jpg"
            submitLabel="Göndər"
        />
    );
}