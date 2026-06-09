import { BlogAuthorHeroWrapper } from "@/app/components/BlogAuthor/blogauthorhero-wrapper";
import { BlogAuthorPreviewWrapper } from "@/app/components/BlogAuthor/blogauthorpreview-wrapper";
import { BlogAuthorListWrapper } from "@/app/components/BlogAuthor/blogauthorsearch-wrapper";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";

export default async function BlogAuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const [langResponse, translationResponse] = await Promise.all([
        api.get<Language[]>(config.endpoints.languages.list),
        api.get<Translation[]>(config.endpoints.translations.list, { locale: "az" }),
    ]);

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper
                locale="az"
                languages={langResponse.data ?? []}
                initialTranslations={translationResponse.data ?? []}
            />
            <BlogAuthorHeroWrapper authorSlug={slug} />
            <BlogAuthorPreviewWrapper />
            <BlogAuthorListWrapper />
            <ContactWrapper />
        </div>
    );
}