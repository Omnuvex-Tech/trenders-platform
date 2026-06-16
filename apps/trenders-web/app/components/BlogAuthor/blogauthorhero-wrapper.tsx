import { cookies } from "next/headers";
import { BlogAuthorHeroUI } from "@repo/ui";

const API = process.env.API_URL;

type LocalizedString = Record<string, string>;

function t(obj: LocalizedString | any, locale: string, fallback = ""): string {
    if (!obj) return fallback;
    if (typeof obj === "string") return obj;
    return obj[locale] || obj["az"] || fallback;
}

function toAbsUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API}${path}`;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("az-AZ");
}

async function getAuthorData(authorSlug: string) {
    try {
        const [authorRes, blogsRes] = await Promise.all([
            fetch(`${API}/blog/authors/slug/${authorSlug}`, { cache: "no-store" }),
            fetch(`${API}/blog/authors/slug/${authorSlug}/blogs`, { cache: "no-store" }),
        ]);
        return {
            author: authorRes.ok ? await authorRes.json() : null,
            blogs: blogsRes.ok ? await blogsRes.json() : [],
        };
    } catch {
        return { author: null, blogs: [] };
    }
}

interface Props {
    authorSlug: string;
}

export async function BlogAuthorHeroWrapper({ authorSlug }: Props) {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

    const { author, blogs } = await getAuthorData(authorSlug);
    if (!author) return null;

    const posts = (blogs as any[]).slice(0, 3).map((b: any) => ({
        id: b.id,
        image: toAbsUrl(t(b.coverImage, locale)),
        imageAlt: t(b.coverImageAlt, locale) || t(b.title, locale),
        category: t(b.badge, locale) || t(b.category?.label, locale),
        date: b.publishedAt ? formatDate(b.publishedAt) : "",
        title: t(b.title, locale).replace(/<[^>]*>/g, ""),
        excerpt: t(b.excerpt, locale).replace(/<[^>]*>/g, ""),
        readHref: `/Blog/${b.slug}`,
        readLabel: "Məqaləni oxu",
    }));

    return (
        <BlogAuthorHeroUI
            author={{
                name: t(author.name, locale),
                role: t(author.role, locale),
                avatar: toAbsUrl(author.avatar ?? ""),
                avatarAlt: t(author.avatarAlt, locale) || undefined,
                linkedinHref: author.linkedinHref ?? undefined,
                linkedinIcon: author.linkedinIcon ? toAbsUrl(author.linkedinIcon) : undefined,
                bio: t(author.bio, locale),
                skillsTitle: t(author.skillsTitle, locale, "SKILLS"),
                skills: (author.skills ?? []).map((s: any) => ({
                    label: typeof s === "object" ? t(s, locale) : s,
                })),
            }}
            postsTitle="Son bloqlar"
            posts={posts}
        />
    );
}