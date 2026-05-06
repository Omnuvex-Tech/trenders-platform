import { AboutTeamUI } from "@repo/ui";

export function AboutTeamWrapper() {
    return (
        <AboutTeamUI
            title={<>İLHAM VERƏN KOMANDA</>}
            description="Biz tipik bir marketinq şirkəti deyilik! Bir çox brendlər trendləri izləməyə çalışdığı zaman, biz sizə trendi yaratmağa kömək edəcəyik. Biz tipik bir marketinq şirkəti deyilik! Bir çox brendlər trendləri izləməyə çalışdığı zaman, biz sizə trendi yaratmağa kömək edəcəyik."
            ctaLabel="Keçid edin →"
            ctaHref="/OurTeam"
            members={[
                {
                    id: 1,
                    image: "/images/team5.png",
                    name: "Cavid Axundov",
                    role: "Baş İcraçı Direktor",
                    href: "#",
                },
                {
                    id: 2,
                    image: "/images/team3.jpg",
                    name: "Fuada Isgəndər-Rəhimli",
                    role: "Marketinq Direktoru",
                    href: "#",
                },
                {
                    id: 3,
                    image: "/images/team4.jpg",
                    name: "Kanan Akhbarov",
                    role: "Aparıcı Qrafik Dizayner",
                    href: "#",
                },
                {
                    id: 4,
                    image: "/images/team1.jpg",
                    name: "Cəmilə Əhmədova",
                    role: "Baş Aparıcı İdarəedici",
                    href: "#",
                },
                {
                    id: 5,
                    image: "/images/team6.jpg",
                    name: "Səbinə Akhundov",
                    role: "Marketinq Direktoru",
                    href: "#",
                },
                {
                    id: 6,
                    image: "/images/team3.jpg",
                    name: "Kanan Akhbarov",
                    role: "Aparıcı Qrafik Dizayner",
                    href: "#",
                },
            ]}
        />
    );
}