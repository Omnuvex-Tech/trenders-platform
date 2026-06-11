import { cookies } from "next/headers";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";
import { PortfolioWrapper } from "@/app/components/Portfolio/portfolio-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";

export default async function PortfolioPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const [langResponse, translationResponse] = await Promise.all([
        api.get<Language[]>(config.endpoints.languages.list),
        api.get<Translation[]>(config.endpoints.translations.list, { locale }),
    ]);

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper
                locale={locale}
                languages={langResponse.data ?? []}
                initialTranslations={translationResponse.data ?? []}
            />
            <PortfolioWrapper locale={locale} />
            <ContactWrapper locale={locale} />
        </div>
    );
}