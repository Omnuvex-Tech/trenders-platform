import { BlogSectionUI } from "@repo/ui";
import type { BlogItem, BlogSectionQuote } from "@repo/ui";

const FEATURED_POST: BlogItem = {
    id: 1,
    image: "/images/blogp3.png",
    badge: "Brendinq",
    title: "Young Lions Azerbaijan nədir?",
    description: "Korporativ üslubunuzu yaradaraq, rəqiblərinizdən fərqlənməyə kömək edirik.Süni intellekt dövründə sağ qalmağın yolu ona qarşı ",
    date: "FEBRUARY 24, 2026",
    href: "#",
};

const SIDE_POSTS: [BlogItem, BlogItem, BlogItem] = [
    {
        id: 2,

        image: "/images/blog5.jpg",
        badge: "AI",
        title: "Young Lions Azerbaijan nədir?",
        description: "Young Lions Azerbaijan 30 yaşadək yaradıcı, media və marketinq mütəxəssisləri üçün",
        date: "FEBRUARY 24, 2026",
        href: "#",
    },
    {
        id: 3,
        image: "/images/blogp2.png",
        badge: "AI",
        title: "Süni İntellekt Erasında Necə Sağ Qalmaq?",
        description: "Süni intellekt dövründə sağ qalmağın yolu ona qarşı mübarizə aparmaq deyil, onunla birlikdə işləməyi öyrənməkdir.",
        date: "FEBRUARY 24, 2026",
        href: "#",
    },
    {
        id: 4,
        image: "/images/blogp1.png", badge: "Dizayn",
        title: "Bir vizual, min fikir: İdeyanı 'kill etmə' mədəniyyəti",
        description: "Hər dizayn prosesinin əvvəlində ağlında partlayan onlarcafikir olur. Heç biri tam formalaşmayıb, amma hamısında bir potensial ...",
        date: "FEBRUARY 24, 2026",
        href: "#",
    },
];

const QUOTE: BlogSectionQuote = {
    backgroundImage: "/images/blogp4.jpg",
    text: (
        <>
            Agentliyimizin brend strategiyası xidmətlərinə{" "}
            <strong>bazar araşdırması, rəqabət təhlili, brend memarlığı və brend qaydaları daxildir.</strong>
        </>
    ),
};

export function BlogSectionWrapper() {
    return (
        <BlogSectionUI
            title="Bloglar"
            portfolioHref="#"
            featuredPost={FEATURED_POST}
            sidePosts={SIDE_POSTS}
            quote={QUOTE}
        />
    );
}