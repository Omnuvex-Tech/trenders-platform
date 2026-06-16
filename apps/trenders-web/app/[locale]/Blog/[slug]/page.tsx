import { cookies } from "next/headers";
import { notFound } from 'next/navigation';
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import {
    BlogDetailPageHeroUI,
    BlogDetailContentUI,
    BlogDetailArticleUI,
} from '@repo/ui';
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

function toAbsUrl(path: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${process.env.API_URL}${path}`;
}

async function getBlog(slug: string) {
    try {
        const res = await fetch(`${process.env.API_URL}/blog/slug/${slug}`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

function renderSection(section: any, index: number, blog: any, locale: string) {
    if (section.isVisible === false) return null;

    switch (section.type) {
        case 'hero': {
            return (
                <BlogDetailPageHeroUI
                    key={index}
                    heroImage={toAbsUrl(section.heroImage ?? '')}
                    heroImageAlt={t(section.heroImageAlt, locale)}
                    hashtag={t(section.hashtag, locale)}
                    title={t(section.title, locale)}
                    paragraphs={(section.paragraphs ?? [])
                        .map((p: any) => t(p, locale))
                        .filter(Boolean)}
                    author={{
                        name: t(blog.author?.name, locale),
                        role: t(blog.author?.role, locale),
                        avatar: toAbsUrl(blog.author?.avatar ?? ''),
                        href: blog.author?.slug ? `/BlogAuthor/${blog.author.slug}` : undefined,
                    }}
                />
            );
        }

        case 'content': {
            return (
                <BlogDetailContentUI
                    key={index}
                    heroImage={toAbsUrl(section.heroImage ?? '')}
                    heroImageAlt={t(section.heroImageAlt, locale)}
                    overlapTitle={t(section.overlapTitle, locale)}
                    introParagraphs={(section.introParagraphs ?? [])
                        .map((p: any) => t(p, locale))
                        .filter(Boolean)}
                    sections={(section.sections ?? []).map((s: any) => ({
                        title: t(s.title, locale),
                        paragraphs: (s.paragraphs ?? [])
                            .map((p: any) => t(p, locale))
                            .filter(Boolean),
                    }))}
                    bottomImages={{
                        left: toAbsUrl(section.bottomImages?.left ?? ''),
                        leftAlt: t(section.bottomImages?.leftAlt, locale),
                        right: toAbsUrl(section.bottomImages?.right ?? ''),
                        rightAlt: t(section.bottomImages?.rightAlt, locale),
                    }}
                />
            );
        }

        case 'article': {
            return (
                <BlogDetailArticleUI
                    key={index}
                    sections={(section.sections ?? []).map((s: any) => ({
                        blocks: (s.blocks ?? []).map((b: any) => ({
                            type: b.type,
                            content: t(b.content, locale),
                        })),
                        hashHeading: t(s.hashHeading, locale),
                        heading: t(s.heading, locale),
                        paragraphs: (s.paragraphs ?? [])
                            .map((p: any) => t(p, locale))
                            .filter(Boolean),
                        hashSections: (s.hashSections ?? []).map((hs: any) => ({
                            tag: t(hs.tag, locale),
                            paragraphs: (hs.paragraphs ?? [])
                                .map((p: any) => t(p, locale))
                                .filter(Boolean),
                        })),
                        sideImage: s.sideImage ? toAbsUrl(s.sideImage) : undefined,
                        sideImageAlt: t(s.sideImageAlt, locale),
                    }))}
                    hashtags={
                        Array.isArray(section.hashtags)
                            ? section.hashtags.map((h: any) => t(h, locale))
                            : typeof section.hashtags === 'string'
                                ? section.hashtags.split(/[,\s]+/).map((h: string) => h.trim()).filter(Boolean)
                                : []
                    }
                />
            );
        }

        default:
            return null;
    }
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const [blog, langResponse, translationResponse] = await Promise.all([
        getBlog(slug),
        api.get<Language[]>(config.endpoints.languages.list),
        api.get<Translation[]>(config.endpoints.translations.list, { locale }),
    ]);

    if (!blog || !blog.isVisible) notFound();

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper
                locale={locale}
                languages={langResponse.data ?? []}
                initialTranslations={translationResponse.data ?? []}
            />
            {(blog.sections ?? []).map((section: any, i: number) =>
                renderSection(section, i, blog, locale)
            )}
            <ContactWrapper locale={locale} />
        </div>
    );
}