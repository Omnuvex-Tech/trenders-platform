import { BlogAuthorHeroUI } from "@repo/ui";

const API = process.env.API_URL;

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
    const { author, blogs } = await getAuthorData(authorSlug);

    if (!author) return null;

    const posts = (blogs as any[]).slice(0, 3).map((b: any) => ({
        id: b.id,
        image: toAbsUrl(b.coverImage ?? ""),
        imageAlt: b.coverImageAlt ?? b.title,
        category: b.badge ?? b.category?.label ?? "",
        date: b.publishedAt ? formatDate(b.publishedAt) : "",
        title: b.title?.replace(/<[^>]*>/g, "") ?? "",
        excerpt: b.excerpt?.replace(/<[^>]*>/g, "") ?? "",
        readHref: `/Blog/${b.slug}`,
        readLabel: "Məqaləni oxu",
    }));

    return (
        <BlogAuthorHeroUI
            author={{
                name: author.name,
                role: author.role ?? "",
              avatar: toAbsUrl(author.avatar ?? ""),
                avatarAlt: author.avatarAlt ?? undefined,
                linkedinHref: author.linkedinHref ?? undefined,
                linkedinIcon: author.linkedinIcon ? toAbsUrl(author.linkedinIcon) : undefined,
                bio: author.bio ?? "",
                skillsTitle: author.skillsTitle ?? "SKILLS",
                skills: (author.skills ?? []).map((s: string) => ({ label: s })),
            }}
            postsTitle="Son bloqlar"
            posts={posts}
        />
    );
}
