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
import { STATIC_LANGUAGES, resolveLocale } from "@/config/locales";
import type { Translation } from "@repo/types/types";

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

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
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
                            ? section.hashtags.map((h: any) =>
                                typeof h === "object" ? (h[locale] || h.az || "") : h
                            ).filter(Boolean)
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

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

    try {
        const [blog, contactRes] = await Promise.all([
            getBlog(slug),
            fetch(`${process.env.API_URL}/contact`, { cache: "no-store" }),
        ]);

        if (!blog) return { title: "Blog" };

        const contact = contactRes.ok ? await contactRes.json() : null;

        const articleHashtags: string[] = [];
        for (const section of blog.sections ?? []) {
            if (section.type === "article") {
                const raw = section.hashtags;
                if (Array.isArray(raw)) {
                    raw.forEach((h: any) => {
                        const val = typeof h === "object" ? (h[locale] || h.az || "") : h;
                        if (val) articleHashtags.push(val);
                    });
                } else if (typeof raw === "string") {
                    raw.split(/[,\s]+/).map((h: string) => h.trim()).filter(Boolean).forEach(h => articleHashtags.push(h));
                }
            }
        }

        const contactTags: string[] = [];
        if (Array.isArray(contact?.tags)) {
            contact.tags.forEach((tag: any) => {
                const val = typeof tag === "object" ? (tag[locale] || tag.az || "") : tag;
                if (val) contactTags.push(val);
            });
        }

        const manualKeywords = blog.seoKeywords?.[locale] || "";
        const allKeywords = [
            ...manualKeywords.split(",").map((k: string) => k.trim()).filter(Boolean),
            ...articleHashtags,
            ...contactTags,
        ].join(", ");

        return {
            title: blog.seoTitle?.[locale] || stripHtml(t(blog.title, locale)) || "Blog",
            description: blog.seoDescription?.[locale] || stripHtml(t(blog.excerpt, locale)) || "",
            keywords: allKeywords || undefined,
        };
    } catch {
        return { title: "Blog" };
    }
}
export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const locale = resolveLocale(cookieStore.get("NEXT_LOCALE")?.value);

    const [blog, translationResponse] = await Promise.all([
        getBlog(slug),
        api.get<Translation[]>(config.endpoints.translations.list, { locale }),
    ]);

    if (!blog || !blog.isVisible) notFound();

    const jsonLd = blog.schema?.[locale];

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <NavbarWrapper
                locale={locale}
                languages={STATIC_LANGUAGES}
                initialTranslations={translationResponse.data ?? []}
            />
            {(blog.sections ?? []).map((section: any, i: number) =>
                renderSection(section, i, blog, locale)
            )}
            <ContactWrapper locale={locale} />
        </div>
    );
}