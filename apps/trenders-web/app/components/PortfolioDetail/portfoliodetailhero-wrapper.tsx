import { PortfolioDetailHeroUI } from "@repo/ui";

export function PortfolioDetailHeroWrapper() {
    return (
        <PortfolioDetailHeroUI
            heroImage="/images/pdetail3.png"
            heroImageAlt="Marina Village"
            number="01"
            title="MARINA VILLAGE"
            description={
                <>
                    Agentliyimizin brend strategiyası xidmətlərinə{" "}
                    <strong>bazar araşdırması, rəqabət təhlili, brend memarlığı və brend qaydaları</strong>{" "}
                    daxildir.
                </>
            }
            galleryImages={[
                { src: "/images/pdetail2.png", alt: "Marina Village 1" },
                { src: "/images/pdetail1.png", alt: "Marina Village 2" },
                { src: "/images/pdetail4.png", alt: "Marina Village 3" },
            ]}
        />
    );
}