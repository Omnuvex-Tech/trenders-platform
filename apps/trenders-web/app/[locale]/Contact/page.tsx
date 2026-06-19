import { cookies } from "next/headers";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES } from "@/config/locales";
import type { Translation } from "@repo/types/types";
import { ContactPageWrapper } from "@/app/components/ContactPage/contactpage-wrapper";

export default async function ContactPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const translationResponse = await api.get<Translation[]>(
        config.endpoints.translations.list,
        { locale },
    );

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper
                locale={locale}
                languages={STATIC_LANGUAGES}
                initialTranslations={translationResponse.data ?? []}
            />
            <ContactPageWrapper locale={locale} />
        </div>
    );
}