import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";
import { OurTeamWrapper } from "../components/OurTeam/ourteam-wrapper";
import { ContactWrapper } from "../components/Contact/contact-wrapper";

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
            <OurTeamWrapper/>
            <ContactWrapper/>
        </div>
    );
}