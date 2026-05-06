import { BlogAuthorHeroUI } from "@repo/ui";

export function BlogAuthorHeroWrapper() {
    return (
        <BlogAuthorHeroUI
            author={{
                name: "Cavid Axundov",
                role: "Baş İcarçı Direktor",
                avatar: "/images/team5.png",
                linkedinHref: "https://linkedin.com",
                bio: "Trenders-in təsisçisi, daşınmaz əmlak, biznesin inkişafı və korporativ idarəetmə sahələrində 10 ildən artıq təcrübəyə malik sahibkar və sistem qurucusudur.",
                skillsTitle: "SKILL",
                skills: [
                    { label: "Management" },
                    { label: "Business Strategy Development" },
                    { label: "Strategy Development" },
                ],
            }}
            postsTitle="Son bloqlar"
            posts={[
                {
                    id: 1,
                    image: "/images/author2.png",
                    category: "Visual Design Skills",
                    date: "17.04.2026",
                    title: "Bakıda Daşınmaz Əmlakda Satış Uğurunu Nə Müəyyən Edir?",
                    excerpt: "TREVA bir agentlik deyil, bir platformadır. Biz illərimizi bu infrastrukturu qurmağa həsr etmişik.",
                    readHref: "#",
                    readLabel: "Məqaləni oxu",
                },
                {
                    id: 2,
                    image: "/images/author3.png",
                    category: "Visual Design Skills",
                    date: "17.04.2026",
                    title: "Bakıda Daşınmaz Əmlakda Satış Uğurunu Nə Müəyyən Edir?",
                    excerpt: "TREVA bir agentlik deyil, bir platformadır. Biz illərimizi bu infrastrukturu qurmağa həsr etmişik.",
                    readHref: "#",
                    readLabel: "Məqaləni oxu",
                },
                {
                    id: 3,
                    image: "/images/author4.jpg",
                    category: "Visual Design Skills",
                    date: "17.04.2026",
                    title: "Bakıda Daşınmaz Əmlakda Satış Uğurunu Nə Müəyyən Edir?",
                    excerpt: "TREVA bir agentlik deyil, bir platformadır. Biz illərimizi bu infrastrukturu qurmağa həsr etmişik.",
                    readHref: "#",
                    readLabel: "Məqaləni oxu",
                },
            ]}
        />
    );
}