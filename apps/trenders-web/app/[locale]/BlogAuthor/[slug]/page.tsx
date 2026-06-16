import { cookies } from "next/headers";
import { BlogAuthorHeroWrapper } from "@/app/components/BlogAuthor/blogauthorhero-wrapper";
import { BlogAuthorPreviewWrapper } from "@/app/components/BlogAuthor/blogauthorpreview-wrapper";
import { BlogAuthorListWrapper } from "@/app/components/BlogAuthor/blogauthorsearch-wrapper";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, resolveLocale } from "@/config/locales";
import type { Translation } from "@repo/types/types";

export default async function BlogAuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

    const translationResponse = await api.get<Translation[]>(
        config.endpoints.translations.list,
        { locale }
    );

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper
                locale={locale}
                languages={STATIC_LANGUAGES}
                initialTranslations={translationResponse.data ?? []}
            />
            <BlogAuthorHeroWrapper authorSlug={slug} />
            <BlogAuthorPreviewWrapper />
            <BlogAuthorListWrapper />
            <ContactWrapper locale={locale} />
        </div>
    );
}
