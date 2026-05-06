import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { PortfolioDetailHeroWrapper } from "@/app/components/PortfolioDetail/portfoliodetailhero-wrapper";
import { PortfolioDetailStepsWrapper } from "../components/PortfolioDetail/portfoliodetailsteps-wrapper";
import { PortfolioDetailServiceWrapper } from "../components/PortfolioDetail/portfoliodetailservice-wrapper";
import { PortfolioDetailStrategyWrapper } from "../components/PortfolioDetail/portfoliodetailstrategy-wrapper";
import { PortfolioDetailOverlayWrapper } from "../components/PortfolioDetail/portfoliodetailoverlay-wrapper";
import { ContactWrapper } from "../components/Contact/contact-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";

export default async function PortfolioDetailPage() {
    const langResponse = await api.get<Language[]>(config.endpoints.languages.list);
    const translationResponse = await api.get<Translation[]>(
        config.endpoints.translations.list,
        { locale: "az" }
    );

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper
                locale="az"
                languages={langResponse.data ?? []}
                initialTranslations={translationResponse.data ?? []}
            />
            <PortfolioDetailHeroWrapper />
            <PortfolioDetailStepsWrapper />
            <PortfolioDetailServiceWrapper/>
            <PortfolioDetailStrategyWrapper/>
            <PortfolioDetailOverlayWrapper/>
            <ContactWrapper/>
        </div>
    );
};
