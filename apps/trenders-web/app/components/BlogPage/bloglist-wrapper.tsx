import { BlogListUI } from "@repo/ui";
import type { BlogListItem, BlogCategory, FeaturedBlog } from "@repo/ui";

const POSTS: BlogListItem[] = [
    {
        id: 1,
        image: "/images/blog1.png",
        badge: "Design",
        title: "Hər dizayn prosesinin əvvəlində ağlında partlayan onlarca fikir olur ...",
        author: {
            name: "Almaz Abdullayeva",
            avatar: "/images/team1.jpg",
        },
        date: "February 24, 2026",
        href: "#",
    },
    {
        id: 2,
        image: "/images/blog2.png",
        badge: "Marketing",
        title: "Hər dizayn prosesinin əvvəlində ağlında partlayan onlarca fikir olur ...",
        author: {
            name: "Almaz Abdullayeva",
            avatar: "/images/team3.jpg",
        },
        date: "February 24, 2026",
        href: "#",
    },
    {
        id: 3,
        image: "/images/blog3.png",
        badge: "Case Studies",
        title: "Hər dizayn prosesinin əvvəlində ağlında partlayan onlarca fikir olur ...",
        author: {
            name: "Almaz Abdullayeva",
            avatar: "/images/team4.jpg",
        },
        date: "February 24, 2026",
        href: "#",
    },
    {
        id: 4,
        image: "/images/blog5.jpg",
        badge: "Creators",
        title: "Hər dizayn prosesinin əvvəlində ağlında partlayan onlarca fikir olur ...",
        author: {
            name: "Almaz Abdullayeva",
            avatar: "/images/testimonials1.jpg",
        },
        date: "February 24, 2026",
        href: "#",
    },
];

const CATEGORIES: BlogCategory[] = [
    { id: 1, label: "AI", href: "#" },
    { id: 2, label: "E-Commerce", href: "#" },
    { id: 3, label: "AEO", href: "#" },
    { id: 4, label: "Trend", href: "#" },
    { id: 5, label: "Marketing", href: "#" },
    { id: 6, label: "Case Studies", href: "#" },
    { id: 7, label: "Creators", href: "#" },
    { id: 8, label: "Design", href: "#" },
    { id: 9, label: "Social Media", href: "#" },
    { id: 10, label: "SMM", href: "#" },
    { id: 11, label: "Graphic Designer", href: "#" },
];

const FEATURED_BLOG: FeaturedBlog = {
    image: "/images/blogp2.png",
    badge: "Marketing",
    title: "Hər dizayn prosesinin əvvəlində ağlında partla...",
    date: "February 24, 2026",
    href: "#",
};

export function BlogListWrapper() {
    return (
        <BlogListUI
            posts={POSTS}
            categories={CATEGORIES}
            featuredBlog={FEATURED_BLOG}
            searchPlaceholder="Axtarış ..."
            categoriesTitle="KATEQORİYALAR"
            featuredBlogTitle="Həftənin seçilmiş blogu"
        />
    );
}