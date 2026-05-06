import { BlogUI } from "@repo/ui";
import type { BlogPost } from "@repo/ui";

const POSTS: BlogPost[] = [
    {
        id: 1,
        image: "/images/blog1.png",
        category: "Marketing",
        title: "Young Lions Azerbaijan nədir?",
        excerpt: `Young Lions Azerbaijan 30 yaşadək yaradıcı, media və marketinq mütəxəssisləri üçün nəzərdə tutulmuş beynəlxalq "Young Lions" proqramının Azərbaycan üzrə...`,
        authorImage: "/images/team3.jpg",
        authorName: "Almaz Abdullayeva",
        date: "February 24, 2026",
        href: "#",
    },
    {
        id: 2,
        image: "/images/blog2.png",
        category: "AI",
        title: "Süni İntellekt Erasında Necə Sağ Qalmaq?",
        excerpt: "Süni intellekt dövründə sağ qalmağın yolu ona qarşı mübarizə aparmaq deyil, onunla birlikdə işləməyi öyrənməkdir. AI insanı əvəz etmir; onu effektiv istifadə...",
        authorImage: "/images/team1.jpg",
        authorName: "Ramal Xankişiyev",
        date: "February 24, 2026",
        href: "#",
    },
    {
        id: 3,
        image: "/images/blog3.png",
        category: "Design",
        title: "Bir vizual, min fikir: İdeyanı 'kill etmə' mədəniyyəti",
        excerpt: "Hər dizayn prosesinin əvvəlində ağlında partlayan onlarcafikir olur. Heç biri tam formalaşmayıb, amma hamısında bir potensial var. Bu mərhələ,ağ səhifə...",
        authorImage: "/images/testimonials1.jpg",
        authorName: "Güler Məmmədova",
        date: "October 17, 2025",
        href: "#",
    }
];

export function BlogWrapper() {
    return (
        <BlogUI
            title="Bloglar"
            allPostsLabel="Bütün yazılar"
            allPostsHref="/blog"
            posts={POSTS}
        />
    );
}