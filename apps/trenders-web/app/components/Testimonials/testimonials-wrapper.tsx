"use client";

import { TestimonialsUI } from "@repo/ui";
import type { Testimonial } from "@repo/ui";

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        company: "MAZDA",
        quote: "Layihəmizə etibarlı tərəfdaş kimi real dəyər qatırlar.",
        name: "Aşur Cəbiyev",
        role: "Chief Marketing Officer @ Group Motors LTD | Strategic management, Logistics Management",
        image: "/images/testimonials1.jpg",
    },
    {
        id: 2,
        company: "ARABIAN RANCHES",
        quote: "Etibarlı tərəfdaş kimi layihəmizə real dəyər qatırlar.",
        name: "Natiq Ahmadov",
        role: "Chief Marketing Officer @ Group Motors LTD | Strategic management, Logistics Management",
        image: "/images/testimonials2.png",
    },
    {
        id: 3,
        company: "COMPANY 3",
        quote: "Peşəkar komanda ilə işləmək həmişə nəticə verir.",
        name: "Əli Həsənov",
        role: "CEO @ Tech Solutions | Digital Transformation",
        image: "/images/testimonials1.jpg",
    },
    {
        id: 4,
        company: "COMPANY 4",
        quote: "Marketinq strategiyamızı tamamilə yenilədilər.",
        name: "Leyla Məmmədova",
        role: "Marketing Director @ Global Corp | Brand Management",
        image: "/images/testimonials2.png",
    },
];

export function TestimonialsWrapper() {
    return (
        <TestimonialsUI
            title="Müştəri Rəyləri"
            description={`Young Lions Azerbaijan 30 yaşadək yaradıcı, media və marketinq mütəxəssisləri üçün nəzərdə tutulmuş beynəlxalq "Young Lions" proqramının Azərbaycan üzrə Young Lions Azerbaijan 30 yaşadək yaradıcı, media və marketinq mütəxəssisləri üçün nəzərdə tutulmuş beynə`}
            testimonials={TESTIMONIALS}
        />
    );
}