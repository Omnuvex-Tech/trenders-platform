import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";
import { ContactWrapper } from "../components/Contact/contact-wrapper";
import { AboutHeroWrapper } from "../components/About/abouthero-wrapper";
import { AboutStoryWrapper } from "../components/About/aboutstory-wrapper";
import { AboutTeamWrapper } from "../components/About/aboutteam-wrapper";

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
            <AboutHeroWrapper />
            <AboutStoryWrapper/>
            <AboutTeamWrapper/>
            <ContactWrapper />
        </div>
    );
}