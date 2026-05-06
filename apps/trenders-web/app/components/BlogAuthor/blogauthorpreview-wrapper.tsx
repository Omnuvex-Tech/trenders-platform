import { BlogDetailPreviewUI } from "@repo/ui";

export function BlogAuthorPreviewWrapper() {
    return (
        <BlogDetailPreviewUI
            sectionTitle="Digər bloqlar"
            image="/images/blogdetail4.png"
            overlayBadge="Brendinq"
            overlayTitle="Korporativ üslubunuzu yaradaraq, rəqiblərinizdən fərqlənməyə kömək edirik."
            badge="Graphic Designer"
            title="Korporativ üslubunuzu yaradaraq, rəqiblərinizdən fərqlənməyə kömək edirik."
            description="Hər dizayn prosesinin əvvəlində ağlında partlayan onlarcafikir olur. Heç biri tam formalaşmayıb, amma hamısında bir potensial Hər dizayn prosesinin əvvəlində ağlında partlayan onlarcafikir olur. Heç biri tam formalaşmayıb, amma hamısında bir potensial ..."
            author={{
                name: "Leyla Abdullayeva",
                avatar: "/images/team1.jpg",
            }}
            date="February 24, 2026"
        />
    );
}