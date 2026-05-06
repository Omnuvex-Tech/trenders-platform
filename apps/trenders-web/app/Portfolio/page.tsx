import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";
import { PortfolioWrapper } from "../components/Portfolio/portfolio-wrapper";
export default async function ServicesPage() {
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
            <PortfolioWrapper/>
        </div>
    );
}