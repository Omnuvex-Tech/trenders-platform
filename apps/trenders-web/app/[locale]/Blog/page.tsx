import { cookies } from "next/headers";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { BlogSectionWrapper } from "@/app/components/BlogPage/bloghero-wrapper";
import { BlogListWrapper } from "@/app/components/BlogPage/bloglist-wrapper";
import { BlogPostPreviewWrapper } from "@/app/components/BlogPage/blogpostpreview-wrapper";
import { BlogGridWrapper } from "@/app/components/BlogPage/bloggrid-wrapper";
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";

export default async function BlogPage() {
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
            <BlogSectionWrapper />
            <BlogListWrapper />
            <BlogPostPreviewWrapper />
            <BlogGridWrapper />
            <ContactWrapper locale={locale} />
        </div>
    );
}