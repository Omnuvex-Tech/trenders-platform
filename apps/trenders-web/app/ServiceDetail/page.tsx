import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ServiceDetailHeroWrapper } from "@/app/components/ServiceDetail/servicedetailhero-wrapper";
import { ServiceDetailContentWrapper } from "../components/ServiceDetail/servicedetailcontent-wrapper";
import { ServiceDetailQuoteWrapper } from "../components/ServiceDetail/servicedetailquote-wrapper";
import { ServiceDetailOverlayWrapper } from "../components/ServiceDetail/servicedetailoverlay-wrapper";
import { ContactWrapper } from "../components/Contact/contact-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";

export default async function ServiceDetailPage() {
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
            <ServiceDetailHeroWrapper />
            <ServiceDetailContentWrapper/>
            <ServiceDetailQuoteWrapper/>
            <ServiceDetailOverlayWrapper/>
            <ContactWrapper/>
        </div>
    );
}